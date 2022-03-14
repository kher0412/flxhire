import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { trackError } from 'services/analytics'
import VideoField from './VideoField'

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
  getVideo: async (id) => {
    if (ownProps.user?.video?.id === id) return ownProps.user.video // Shortcut
    return getAPIClient().getVideo(id)
  },
  getSampleVideos: async () => {
    try {
      const freelancers = await getAPIClient().getTopFreelancers()
      return freelancers.filter(f => f?.video?.url).map(f => ({ src: f.video.url }))
    } catch (error) {
      trackError(error)
      return []
    }
  },
  uploadVideo: (file) => {
    const videoFormData = new FormData()
    videoFormData.append('file', file)
    videoFormData.append('video_type', 'blog_post')
    return getAPIClient().postVideoUpload(videoFormData)
  },
  deleteVideo: async (id) => {
    try {
      await getAPIClient().deleteVideo(id)
      const currentUser = await getAPIClient().getCurrentUser()
      dispatch(createAction(SET_CURRENT_USER)({ currentUser }))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Video deleted' }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not delete video' }))
    }
  },
  getOffers: async () => {
    try {
      return await getAPIClient().getContracts({
        status: 'offer_made',
        firm_id: ownProps.user?.firm?.id,
      })
    } catch (error) {
      trackError(error)
      return []
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoField)
