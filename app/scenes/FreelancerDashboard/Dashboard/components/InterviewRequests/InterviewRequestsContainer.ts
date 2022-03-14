import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { WithRouterProps } from 'next/dist/client/with-router'
import { SET_INTERVIEWS } from './components/InterviewRequest/InterviewRequestDucks'
import InterviewRequests from './InterviewRequests'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  interviews: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'pending' || x.status === 'interview_accepted'),
})

const mapDispatchToProps = dispatch => ({
  acceptRequests: async (contractId) => {
    try {
      await getAPIClient().acceptContractRequests(contractId)
      const interviews = await getAPIClient().getContracts()
      dispatch(createAction(SET_INTERVIEWS)({ interviews }))
    } catch (error) {
      trackError(error)
    }
  },
  getInterviews: async () => {
    try {
      const interviews = await getAPIClient().getContracts()
      dispatch(createAction(SET_INTERVIEWS)({ interviews }))
    } catch (error) {
      trackError(error)
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(InterviewRequests))
