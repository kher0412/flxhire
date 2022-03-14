import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import VideoAnswersField from './VideoAnswersField'

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

// TODO: this should be removed and instead, video answers should be updated with the rest of the freelancer profile on save.
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteVideo: async (id) => {
      try {
        await getAPIClient().deleteVideo(id)

        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Video deleted' }))
      } catch (error) {
        trackError(error)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not delete video' }))
      }
    },
    onSetVideoVisibility: async (id, visible) => {
      try {
        await getAPIClient().updateVideo(id, { public: visible })

        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Video updated' }))
      } catch (error) {
        trackError(error)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not update video' }))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoAnswersField)
