import { IconButton } from '@material-ui/core'
import { CloseDialogButton } from 'components'
import { IChatThreadInfo } from 'reducers/Chat'
import { getOtherUser } from 'services/chat'
import { isRealAdmin } from 'services/user'
import { ICurrentUser, IChatUser } from 'types'
import { ChevronLeft, People } from '@material-ui/icons'
import ChatThreadSettingsButton from './ChatThreadSettings'
import ChatThreadSubheader from './ChatThreadSubheader'
import ChatUserAvatar from './ChatUserAvatar'
import DesktopNotificationButton from './DesktopNotificationButton'
import JoinVideoCallButton from './JoinVideoCallButton'

interface IChatThreadTitleProps {
  thread: IChatThreadInfo
  user: ICurrentUser
  contacts?: IChatUser[]
  closeChat?: () => void
  handleBackButton?: () => void
}

export default function ChatThreadTitle({ thread, handleBackButton, user, contacts, closeChat }: IChatThreadTitleProps) {
  let otherUser = thread?.user || getOtherUser(thread, user)
  const otherUserId = otherUser?.id || thread?.user_id
  if (otherUserId && contacts?.length > 0) {
    // Do this to make sure we have recent info such as online status etc
    const contact = contacts.find(x => x.id === thread.user_id)
    if (contact) otherUser = contact
  }
  let title = thread?.title || thread?.default_title || otherUser?.name || otherUser?.first_name || 'New Conversation'
  const loading = Boolean(thread?.loading && thread?.id)
  const showAvatar = !loading
  const slug = otherUser?.slug
  const href = slug ? `/${slug}` : null
  if (loading) title = '...'

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      {handleBackButton && (
        <IconButton
          size="small"
          onClick={handleBackButton}
          style={{ marginRight: 12 }}
        >
          <ChevronLeft />
        </IconButton>
      )}
      {showAvatar && (
        <ChatUserAvatar
          id={otherUser?.id}
          icon={!otherUser && <People />}
          url={thread?.avatar_url || otherUser?.avatar_url}
          name={title}
          href={href}
          onClick={href ? closeChat : null}
        />
      )}
      <div style={{ marginLeft: 12 }}>
        {title}
        {otherUser && <ChatThreadSubheader otherUser={otherUser} />}
      </div>
      <div style={{ display: 'flex', position: 'absolute', right: 12, top: 12 }}>
        <JoinVideoCallButton thread={thread} onClick={closeChat} />
        <DesktopNotificationButton />
        {isRealAdmin(user) && <ChatThreadSettingsButton thread={thread} />}
        <CloseDialogButton onClick={closeChat} />
      </div>
    </div>
  )
}
