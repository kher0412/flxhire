import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createThread, updateThread } from 'reducers/Chat'
import AddToThread from './AddToThread'

const mapStateToProps = (state: RootState) => ({
  contacts: state.chat.contacts,
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  createThread: thread => dispatch(createThread(thread)),
  updateThread: thread => dispatch(updateThread(thread)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(AddToThread)
