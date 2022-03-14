import { connect, ConnectedProps } from 'react-redux'
import { openChat, closeChat, getStats } from 'reducers/Chat'
import { RootState } from 'reducers'
import { trackError } from 'services/analytics'
import { dispatchServerEvents } from 'services/websockets'
import ChatBubble from './ChatBubble'

const mapStateToProps = (state: RootState) => ({
  open: state.chat.open,
  user: state.auth.currentUser,
  unreadCount: state.chat.stats.unread_count,
  threads: state.chat.threads,
  contacts: state.chat.contacts,
})

const mapDispatchToProps = dispatch => ({
  openChat: (params?: any) => dispatch(openChat(params)),
  closeChat: () => dispatch(closeChat()),
  getStats: () => dispatch(getStats()),
  dispatchServerEvents: async () => dispatchServerEvents(dispatch).catch(error => trackError(error)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ChatBubble)
