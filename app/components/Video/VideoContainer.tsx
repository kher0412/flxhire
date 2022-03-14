import { RootState } from 'reducers'
import { connect, ConnectedProps } from 'react-redux'
import Video from './Video'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Video)
