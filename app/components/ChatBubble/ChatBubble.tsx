import React, { CSSProperties } from 'react'
import { Badge } from '@material-ui/core'
import { Fab } from 'components/themed'
import { Message } from '@material-ui/icons'
import { ContainerProps } from './ChatBubbleContainer'
import ChatDialog from '../ChatDialog'
import styles from './ChatBubble.module.css'

interface IChatBubbleProps extends ContainerProps {
  autoOpenChat?: boolean
  autoOpenProfileFeedbackChat?: boolean
  autoOpenChatThreadId?: number
  autoOpenChatUserId?: number
  style?: CSSProperties
}

export default class ChatBubble extends React.PureComponent<IChatBubbleProps> {
  componentDidMount() {
    const { autoOpenChatThreadId, autoOpenProfileFeedbackChat, autoOpenChat, autoOpenChatUserId, openChat, dispatchServerEvents, getStats, user } = this.props
    if (user?.id) dispatchServerEvents()
    getStats()
    if (autoOpenChatThreadId) {
      openChat({ id: autoOpenChatThreadId })
    } else if (autoOpenProfileFeedbackChat) {
      const userId = user.configuration?.profile_feedback_participants_ids?.[0]
      if (userId) openChat({ thread_type: 'profile_feedback', user_id: userId })
    } else if (autoOpenChatUserId) {
      openChat({ user_id: autoOpenChatUserId })
    } else if (autoOpenChat) {
      openChat()
    }
  }

  componentDidUpdate(prevProps) {
    const { autoOpenChatThreadId, autoOpenProfileFeedbackChat, openChat, user, dispatchServerEvents, autoOpenChatUserId } = this.props
    if (prevProps.autoOpenChatThreadId !== autoOpenChatThreadId && autoOpenChatThreadId) {
      openChat({ id: autoOpenChatThreadId })
    } else if (prevProps.autoOpenChatUserId !== autoOpenChatUserId && autoOpenChatUserId) {
      openChat({ user_id: autoOpenChatUserId })
    } else if (prevProps.autoOpenProfileFeedbackChat !== autoOpenProfileFeedbackChat && autoOpenProfileFeedbackChat) {
      const userId = user.configuration?.profile_feedback_participants_ids?.[0]
      if (userId) openChat({ thread_type: 'profile_feedback', user_id: userId })
    }
    if (!prevProps.user.id && user.id) dispatchServerEvents()
  }

  render() {
    const { unreadCount = 0, threads, contacts, open, style } = this.props

    const showButton = threads.length > 0 || contacts.length > 0

    return (
      <React.Fragment>
        {showButton && (
          <Badge color="secondary" badgeContent={unreadCount} className={styles.fab} overlap="circle" style={style}>
            <Fab color="primary" onClick={this.toggleChat}>
              <Message />
            </Fab>
          </Badge>
        )}
        {open && <ChatDialog />}
      </React.Fragment>
    )
  }

  toggleChat = () => {
    const { threads, contacts, openChat, closeChat, open } = this.props
    if (open) {
      closeChat()
    } else {
      if (threads.length === 1 && contacts.length === 0) {
        openChat(threads[0])
      } else if (contacts.length === 1) {
        openChat({ user_id: contacts[0].id })
      } else {
        openChat()
      }
    }
  }
}
