import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { WithRouterProps } from 'next/dist/client/with-router'
import { GET_JOBS, SET_JOBS } from './JobsListingDucks'
import JobsListing from './JobsListing'

const mapStateToProps = (state: RootState) => ({
  jobs: state.jobsListing.jobs,
  jobsReceived: state.jobsListing.jobsReceived,
  isIframe: state.common.isIframe,
})

const mapDispatchToProps = dispatch => ({
  async getJobs(id) {
    dispatch(createAction(GET_JOBS)(id))
    try {
      const jobs = await getAPIClient().getJobs({ firm_id: id, status: 'opened' })
      dispatch(createAction(SET_JOBS)({ jobs, id }))
    } catch (error) {
      trackError(error)
    }
  },
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(JobsListing))
