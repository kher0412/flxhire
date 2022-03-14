import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import VideoField from './VideoField'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
  getVideo: async (id) => {
    if (ownProps.user?.video?.id === id) return ownProps.user.video
    if (ownProps.editable) return getAPIClient().getVideo(id)
    return null
  },
  getSampleVideos: async () => {
    try {
      const freelancers = await getAPIClient().getTopFreelancers()
      return freelancers.filter(f => f?.video?.url).map(f => f.video)
    } catch (error) {
      trackError(error)
      return []
    }
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
  updateVideo: async (id, params) => {
    try {
      await getAPIClient().updateVideo(id, params)
      const currentUser = await getAPIClient().getCurrentUser()
      dispatch(createAction(SET_CURRENT_USER)({ currentUser }))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Video updated' }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not update video' }))
    }
  },
  getContracts: async () => {
    try {
      return await getAPIClient().getContracts({ firm_id: ownProps.user?.firm?.id })
    } catch (error) {
      trackError(error)
      return []
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(VideoField)
