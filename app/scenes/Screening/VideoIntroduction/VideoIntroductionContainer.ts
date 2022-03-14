import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { GET_CURRENT_USER } from 'reducers/Auth'
import { RootState } from 'reducers'
import VideoIntroduction from './VideoIntroduction'

const mapStateToProps = (state: RootState) => ({
  video: state.auth.currentUser?.video,
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(createAction(GET_CURRENT_USER)()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(VideoIntroduction)
