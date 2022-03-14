import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import ProjectSubmissionsField from './ProjectSubmissionsField'

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onProjectSubmissionSubmit: () => dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Sample work submitted' })),
    onDeleteProjectSubmission: async (id) => {
      try {
        await getAPIClient().deleteProjectSubmission(id)

        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Sample work deleted' }))
      } catch (err) {
        trackError(err)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'An error occurred while deleting sample' }))
      }
    },
    onSetProjectSubmissionVisibility: async (id, visible) => {
      try {
        await getAPIClient().updateProjectSubmission(id, { status: visible ? 'public' : 'private' })

        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Sample work updated' }))
      } catch (err) {
        trackError(err)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'An error occurred while updating sample' }))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSubmissionsField)
