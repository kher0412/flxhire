import React from 'react'
import { PageBundlePlaceholder } from 'components'
import { buildQueryParams, browserHistory } from 'services/router'
import { getHireTabForContract } from 'services/contract'
import { openChat as openChatAction } from 'reducers/Chat'
import { trackError } from 'services/analytics'
import { withRouter } from 'next/router'
import { getAPIClient } from 'api'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import { createAction } from 'redux-actions'
import { FORCE_LOGIN } from 'scenes/Login/LoginDucks'
import { isGuest, isRealAdmin } from 'services/user'

class LinkOpener extends React.PureComponent<WithRouterProps & ContainerProps, { error: string }> {
  state = {
    error: null as string,
  }

  async componentDidMount() {
    const { router, currentUser, login, openChat } = this.props
    try {
      const canAutoLogin = isGuest(currentUser) || isRealAdmin(currentUser)
      const link = await getAPIClient().getLink(router.query.token as string)
      if (link.current_user && canAutoLogin) login(link.current_user)
      // TODO: we should probably move the user to their homepage if:
      // - link was type=login
      // - user was logged out but is now logged in
      // - user is logged in and still on this page
      if (link.type === 'profile_feedback') {
        // Open chat
        openChat({ user_id: link.current_user.configuration.profile_feedback_participants_ids[0] })
        browserHistory.push('/')
      } if (link.type === 'chat') {
        // Open chat
        if (link.chat_thread) {
          openChat(link.chat_thread)
        } else if (link.chat_user_id) {
          openChat({ user_id: link.chat_user_id })
        }
        browserHistory.push('/')
      } else if (link.type === 'candidate') {
        const jobSlug = link.job_slug
        const freelancerSlug = link.freelancer_slug
        if (isGuest(currentUser) && !link.current_user) {
          browserHistory.push(`/${freelancerSlug}?token=${router.query.token}`)
        } else {
          const params = buildQueryParams({
            job: jobSlug,
            focus: freelancerSlug,
            tab: getHireTabForContract(link.contract),
          })
          browserHistory.push(`/client/hire?${params}`)
        }
      } else {
        browserHistory.push('/')
      }
    } catch (error) {
      trackError(error)
      this.setState({ error: error.response || error.message || error })
    }
  }

  render() {
    const { error } = this.state
    return <PageBundlePlaceholder error={error} />
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(createAction(FORCE_LOGIN)({ currentUser: user, keepRealUser: true })),
  openChat: thread => dispatch(openChatAction(thread, false)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type ContainerProps = ConnectedProps<typeof connector>

export default withRouter(connector(LinkOpener))
