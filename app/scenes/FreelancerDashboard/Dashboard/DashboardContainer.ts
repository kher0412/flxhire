import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IContractForFreelancer } from 'types'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { browserHistory, extractQueryParams } from 'services/router'
import Dashboard from './Dashboard'
import { OPEN_ACCEPT_INTERVIEW_DIALOG, SET_INTERVIEWS } from './components/InterviewRequests/components/InterviewRequest/InterviewRequestDucks'

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.currentUser,
    interviews: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'pending' || x.status === 'interview_accepted'),
    interviewsReceived: state.freelancerDashboard.interviewRequest.interviewsReceived,
    jobOffers: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'offer_made'),
    clients: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'active'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInterviews: async () => {
      try {
        const user = ownProps.user
        const interviews = await getAPIClient().getContracts({ freelancer_id: user?.id, firm_id: user?.firm?.id }) as IContractForFreelancer[]

        dispatch(createAction(SET_INTERVIEWS)({ interviews }))

        const interviewId = parseInt(extractQueryParams(ownProps.router.asPath)?.interview || '0', 10)

        if (interviewId > 0) {
          const interview = interviews.find(i => i.id === interviewId)
          if (interview?.status === 'pending') {
            dispatch(createAction(OPEN_ACCEPT_INTERVIEW_DIALOG)({ interview }))
            browserHistory.push('/freelancer/dashboard', null, { shallow: true })
          }
        }
      } catch (error) {
        trackError(error)
      }
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Dashboard))
