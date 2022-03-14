import React, { CSSProperties } from 'react'
import { trackError } from 'services/analytics'
import { Button } from 'components/themed'
import { Badge, IconButton } from '@material-ui/core'
import { getAPIClient } from 'api'
import { IChatThread, IChatUser } from 'types'
import { threadsMatch } from 'services/chat'
import { Message } from '@material-ui/icons'
import { ContainerProps } from './ChatButtonContainer'

interface IChatButtonProps extends ContainerProps {
  newThreadTitle?: string
  threadId?: number
  recipientId?: number
  showContactInfo?: boolean
  contact?: Partial<IChatUser>
  color?: 'primary' | 'secondary' | 'default'
  style?: CSSProperties
  iconOnly?: boolean
}

interface IChatButtonState {
  thread: IChatThread
}

export default class ChatButton extends React.PureComponent<IChatButtonProps, IChatButtonState> {
  state = {
    thread: null as IChatThread,
  }

  componentDidMount() {
    const { threadId, recipientId } = this.props
    if (threadId || recipientId) this.refresh()
  }

  refresh = async () => {
    const { threadId, recipientId, threads } = this.props
    const threadData = this.getThreadData()
    let thread = threads.find(t => threadsMatch(t, threadData))

    if (!thread) {
      try {
        if (threadId) {
          thread = await getAPIClient().getChatThread(threadId)
        } else if (recipientId) {
          thread = await getAPIClient().findChatThread({ user_id: recipientId })
        }
        this.setState({ thread })
      } catch (error) {
        if (error?.code !== 404) trackError(error)
      }
    }
  }

  render() {
    const { user, threadId, recipientId, threads, contacts, showContactInfo, color = 'secondary', style, contact: contactProp, iconOnly } = this.props
    const { thread: stateThread } = this.state

    if ((!recipientId && !threadId) || recipientId === user?.id) return null

    const threadData = this.getThreadData()
    const thread = threads.find(t => threadsMatch(t, threadData)) || stateThread
    const contact = (recipientId ? contacts.find(c => c.id === recipientId) : null) || contactProp
    const icon = <Message />

    const name = contact?.first_name || contact?.name
    const label = name && showContactInfo ? `Chat with ${name}` : 'Chat'

    return (
      <Badge
        color="secondary"
        badgeContent={thread?.unread_messages_count}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        overlap={iconOnly ? 'circle' : undefined}
        style={style}
      >
        {iconOnly && (
          <IconButton color={color} onClick={this.openChat}>
            {icon}
          </IconButton>
        )}
        {!iconOnly && (
          <Button color={color} onClick={this.openChat}>
            {icon}
            {label} {thread?.messages_count > 0 && `(${thread?.messages_count})`}
          </Button>
        )}
      </Badge>
    )
  }

  openChat = () => {
    const { threadId: threadIdProp, threads, recipientId, newThreadTitle, openChat, contact } = this.props
    const threadData = this.getThreadData()
    const threadId = threads.find(t => threadsMatch(t, threadData))?.id || threadIdProp
    if (threadId) {
      openChat({ id: threadId })
    } else {
      openChat({
        user_id: recipientId,
        title: newThreadTitle,
        user: contact,
      })
    }
  }

  getThreadData() {
    const { threadId, recipientId } = this.props
    return { id: threadId, user_id: recipientId }
  }
}
