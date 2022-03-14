import React from 'react'
import { TextArea, Button } from 'components/themed'
import { IChatUser, ICurrentUser } from 'types'
import { IChatThreadInfo } from 'reducers/Chat'
import { getOtherUser, isDirectWithSelf } from 'services/chat'
import { isMobile } from 'services/browserAgent'
import { People, Send } from '@material-ui/icons'
import AddToThread from '../AddToThread'

interface IChatThreadActionsProps {
  thread: IChatThreadInfo,
  user: ICurrentUser
  contacts: IChatUser[]
  sendMessage: (message: string) => void
}

interface IChatThreadActionsState {
  message: string
  contactsOpen: boolean
}

export default class ChatDialog extends React.PureComponent<IChatThreadActionsProps, IChatThreadActionsState> {
  state = {
    message: '',
    contactsOpen: false,
  }

  render() {
    const { thread, user, contacts } = this.props
    const { message, contactsOpen } = this.state

    const loading = Boolean(thread?.loading && thread?.id)
    const directWithSelf = isDirectWithSelf(thread, user)
    const otherUser = getOtherUser(thread, user)
    const disabled = loading
    const enableGroupChat = thread?.thread_type === 'group' || contacts.length > 1

    return (
      <React.Fragment>
        {contactsOpen && (
          <AddToThread
            thread={directWithSelf ? null : thread}
            preselectedUser={otherUser}
            onClose={this.closeContacts}
          />
        )}

        {enableGroupChat && (
          <Button iconOnly color="primary" onClick={this.openContacts} disabled={disabled}>
            <People />
          </Button>
        )}

        <TextArea
          rows={1}
          fullWidth
          value={message}
          onChange={this.handleMessageChange}
          onKeyDown={this.handleKeyDown}
          disabled={disabled}
          autoFocus={!isMobile()}
          label="Type your message..."
        />

        <Button iconOnly color="primary" onClick={this.sendMessage} disabled={disabled}>
          <Send />
        </Button>
      </React.Fragment>
    )
  }

  handleMessageChange = event => this.setState({ message: event.target.value })

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.which === 13 && (event.ctrlKey || event.metaKey)) this.sendMessage()
  }

  sendMessage = () => {
    if (this.state.message.trim() !== '') {
      this.props.sendMessage(this.state.message)
      this.setState({ message: '' })
    }
  }

  openContacts = () => this.setState({ contactsOpen: true })

  closeContacts = () => this.setState({ contactsOpen: false })
}
