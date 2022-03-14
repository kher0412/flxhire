import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { sendChatMessage, closeChat, setThread } from 'reducers/Chat'
import ChatDialog from './ChatDialog'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  open: state.chat.open,
  thread: state.chat.thread,
  threads: state.chat.threads,
  contacts: state.chat.contacts,
  messages: state.chat.messages,
  loadingContacts: state.chat.loadingContacts,
  loadingThreads: state.chat.loadingThreads,
})

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendChatMessage(message)),
  setThread: thread => dispatch(setThread(thread)),
  closeChat: () => dispatch(closeChat()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ChatDialog)
