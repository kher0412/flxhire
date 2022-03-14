import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { IJob } from 'types'
import JobShare from './JobShare'

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  share: async (job: Pick<IJob, 'slug'>) => {
    if (!job?.slug) return null
    try {
      return await getAPIClient().shareJob(job.slug)
    } catch (error) {
      trackError(error)
    }
    return undefined
  },
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(JobShare)
