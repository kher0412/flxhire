import { connect, ConnectedProps } from 'react-redux'
import { openChat } from 'reducers/Chat'
import { RootState } from 'reducers'
import ChatButton from './ChatButton'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  threads: state.chat.threads,
  contacts: state.chat.contacts,
})

const mapDispatchToProps = dispatch => ({
  openChat: params => dispatch(openChat(params)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ChatButton)
