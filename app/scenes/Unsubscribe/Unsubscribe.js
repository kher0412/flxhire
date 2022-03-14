import React from 'react'
import { withRouter } from 'next/router'
import { getAPIClient } from 'api'
import { LoadingPage, PageHeader, PageHeaderTitle, PageHeaderDivider, PageContainer, InfoMessage } from 'components'
import { trackError, trackEvent } from 'services/analytics'

class Unsubscribe extends React.Component {
  state = {
    error: null,
    subscription: null,
  }

  componentDidMount() {
    const { router } = this.props
    getAPIClient().unsubscribe(router.query.token).then((subscription) => {
      this.setState({ subscription })
      if (subscription.user_enabled) {
        trackError(new Error('Subscription could not be disabled'))
      } else {
        trackEvent('Unsubscribed')
      }
    }).catch(error => this.setState({ error }, () => trackError(error)))
  }

  render() {
    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle>Unsubscribe</PageHeaderTitle>
          <PageHeaderDivider />
        </PageHeader>
        <PageContainer style={{ zIndex: 3 }}>
          {this.renderContent()}
        </PageContainer>
      </React.Fragment>
    )
  }

  renderContent() {
    const { error, subscription } = this.state
    if (error) return <InfoMessage style={{ color: 'white' }}>{error.response || error.message || error}</InfoMessage>
    if (subscription && subscription.user_enabled === false) return <InfoMessage style={{ color: 'white' }}>You have been unsubscribed succesfully</InfoMessage>
    if (subscription && subscription.user_enabled !== false) return <InfoMessage style={{ color: 'white' }}>Something went wrong</InfoMessage>
    return <LoadingPage />
  }
}

export default withRouter(Unsubscribe)
