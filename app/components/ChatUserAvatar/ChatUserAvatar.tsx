import { ComponentProps, useCallback, useMemo } from 'react'
import moment from 'moment'
import { UserAvatar } from 'components'
import { isOnline } from 'services/chat'
import { useDispatch } from 'react-redux'
import { closeChat } from 'reducers/Chat'
import { useChatContact, useCurrentUser } from 'hooks'

type IChatUserAvatarProps = Omit<ComponentProps<typeof UserAvatar>, 'id'> & {
  id?: number
}

export default function ChatUserAvatar({ id, ...props }: IChatUserAvatarProps) {
  const dispatch = useDispatch()
  const onClick = useCallback(() => dispatch(closeChat()), [dispatch])
  const [user] = useCurrentUser()
  const contact = useChatContact({ id })
  const online = useMemo(() => {
    let value = id && id === user?.id
    if (!value && contact?.last_seen_at) value = isOnline(moment(contact.last_seen_at))
    return value
  }, [contact, user?.id])

  return (
    <UserAvatar
      dotColor={online ? 'primary' : undefined}
      onClick={onClick}
      {...props}
    />
  )
}
