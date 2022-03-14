import { getAPIClient } from 'api'
import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { IContractForFreelancer } from 'types'
import { WithRouterProps } from 'next/dist/client/with-router'
import JobApplications from './JobApplications'
import { SET_JOB_APPLICATIONS } from './JobApplicationsDucks'

const mapStateToProps = (state: RootState) => ({
  contracts: state.freelancerDashboard.jobApplications.contracts,
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getContracts: async () => {
    try {
      const contracts = await getAPIClient().getContracts({ status: 'job_application_draft,job_application_invited,job_application_sent,pending' }) as IContractForFreelancer[]
      dispatch(createAction(SET_JOB_APPLICATIONS)({ contracts }))
    } catch (error) {
      trackError(error)
    }
  },
  deleteContract: async (id: number) => {
    try {
      await getAPIClient().deleteContract(id)
      const contracts = await getAPIClient().getContracts({ status: 'job_application_draft,job_application_invited,job_application_sent' })
      dispatch(createAction(SET_JOB_APPLICATIONS)({ contracts }))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Application Deleted' }))
    } catch (error) {
      trackError(error)
    }
  },
  acceptRequests: async (contractId: number) => {
    try {
      await getAPIClient().acceptContractRequests(contractId)
      const contracts = await getAPIClient().getContracts({ status: 'job_application_draft,job_application_invited,job_application_sent' })
      dispatch(createAction(SET_JOB_APPLICATIONS)({ contracts }))
    } catch (error) {
      trackError(error)
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(JobApplications))
