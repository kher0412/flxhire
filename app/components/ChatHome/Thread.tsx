import { IChatThreadInfo } from 'reducers/Chat'
import moment from 'moment'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getOtherUser } from 'services/chat'
import { ICurrentUser } from 'types'
import { CSSProperties, memo } from 'react'
import { People } from '@material-ui/icons'
import ChatUserAvatar from '../ChatUserAvatar'

interface IThreadProps {
  setThread: (thread: IChatThreadInfo) => void
  thread: IChatThreadInfo
  threadId: number
  user: ICurrentUser
  style?: CSSProperties
}

export const getThreadDescription = (thread: IChatThreadInfo) => {
  let parts = []
  if (thread.last_activity_at) parts.push(moment(thread.last_activity_at).fromNow())
  if (thread.last_message && thread.last_message_author_name) {
    parts.push(`${thread.last_message_author_name}: ${thread.last_message}`)
  }
  return parts.join(' • ')
}

const Thread = memo(({ setThread, threadId, thread, user, style }: IThreadProps) => (
  <ListItem button onClick={() => setThread(thread)} selected={threadId === thread.id} style={style}>
    <ListItemIcon>
      <ChatUserAvatar
        id={getOtherUser(thread, user)?.id}
        icon={thread.users?.length > 2 && <People />}
        url={thread.avatar_url}
        name={thread.title || thread.default_title}
        badgeContent={thread.unread_messages_count || thread.messages_count}
        badgeProps={{ color: thread.unread_messages_count > 0 ? 'secondary' : 'primary' }}
      />
    </ListItemIcon>
    <ListItemText
      primary={thread.title || thread.default_title}
      secondary={getThreadDescription(thread)}
      secondaryTypographyProps={{
        style: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      }}
    />
  </ListItem>
))

export default Thread
