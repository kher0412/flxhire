import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { SET_CURRENT_USER } from 'reducers/Auth'
import CodeTests from './CodeTests'

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProjectSubmission: async (id) => {
      try {
        await getAPIClient().deleteProjectSubmission(id)

        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Sample work deleted' }))

        dispatch(createAction(SET_CURRENT_USER)({
          currentUser: await getAPIClient().getCurrentUser(),
        }))
      } catch (err) {
        trackError(err)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'An error occurred while deleting sample' }))
      }
    },
  }
}

export default connect(null, mapDispatchToProps)(CodeTests)
