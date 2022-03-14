import { Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { getOnlineStatus, getUserTime } from 'services/chat'
import { IChatUser } from 'types'

const ChatThreadSubheader = ({ otherUser }: { otherUser: IChatUser }) => {
  const subheaderParts = []
  const otherUserTimezone = otherUser?.timezone_name
  const [otherUserTime, setOtherUserTime] = useState(getUserTime(otherUserTimezone))
  useEffect(() => {
    const interval = setInterval(() => setOtherUserTime(getUserTime(otherUserTimezone)), 3000)
    return () => clearInterval(interval)
  })
  if (otherUser?.last_seen_at) subheaderParts.push(getOnlineStatus(otherUser?.last_seen_at))
  if (otherUserTime) subheaderParts.push(`Local Time: ${otherUserTime}`)
  if (subheaderParts.length === 0) return null
  return (
    <Typography variant="subtitle1" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
      {subheaderParts.join(' • ')}
    </Typography>
  )
}

export default ChatThreadSubheader
