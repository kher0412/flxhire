import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import { APPLY_FOR_JOB } from './JobDucks'
import Job from './Job'

const mapStateToProps = (state: RootState) => ({
  job: state.job.job,
  error: state.job.error,
  jobReceived: state.job.jobReceived,
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  apply: (jobId: number | string, status: null | 'job_application_draft' | 'job_application_sent') => dispatch(createAction(APPLY_FOR_JOB)({ jobId, status })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Job))
