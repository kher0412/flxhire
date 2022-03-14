import React, { memo, useEffect, useRef } from 'react'
import { Card, CardHeader, CardContent, Chip } from '@material-ui/core'
import { IChatMessage, IChatUser, ICurrentUser } from 'types'
import moment from 'moment'
import { getMessageLabel } from 'services/chat'
import ChatUserAvatar from '../ChatUserAvatar'
import { getContactSubheader } from '../Contact/Contact'
import ChatMessageContents from '../ChatMessageContents'
import ChatMessageActions from '../ChatMessageActions'

interface IChatMessageProps {
  message: IChatMessage
  subheader?: string
  user?: ICurrentUser
  contact?: IChatUser
  autoScroll?: boolean
  children?: any
  closeChat?: () => void
}

const ChatMessage = memo((props: IChatMessageProps) => {
  const { message, contact, user, subheader: subheaderProp, children, closeChat } = props
  const href = message.author_slug ? `/${message.author_slug}` : null
  const ref = useRef(null)
  useEffect(() => {
    if (props.autoScroll && ref.current) ref.current.scrollIntoView(false)
  })
  let subheader = subheaderProp
  if (!subheader) {
    if (message.created_at) {
      let messageCreatedAt = moment(message.created_at)
      if (messageCreatedAt.isAfter()) {
        messageCreatedAt = moment()
      }
      subheader = messageCreatedAt.fromNow()
    } else if (contact) {
      subheader = getContactSubheader(contact, user, true)
    }
  }
  const chipContent = getMessageLabel(message)
  return (
    <Card variant="outlined" ref={ref}>
      <CardHeader
        avatar={(
          <ChatUserAvatar
            id={message.user_id}
            name={message.author_name}
            url={message.author_avatar_url}
            href={href}
          />
        )}
        title={(
          <React.Fragment>
            {message.author_name || 'Unnamed User'}
            {chipContent && <Chip size="small" color="primary" label={chipContent} style={{ marginLeft: 6 }} />}
          </React.Fragment>
        )}
        subheader={subheader}
      />
      {message.message && <CardContent><ChatMessageContents message={message.message} /></CardContent>}
      <ChatMessageActions
        message={message}
        user={user}
        onAction={closeChat}
      />
      {children}
    </Card>
  )
})

export default ChatMessage
