import { startCase } from 'lodash'
import moment, { Moment } from 'moment'
import { IChatThreadInfo } from 'reducers/Chat'
import { IChatMessage, ICurrentUser } from 'types'
import { detectTimezoneName } from './timeKeeping'
import { isConnected as isWebsocketConnected } from './websockets'

export function isOnline(time: Moment) {
  if (!time) return false
  return time.isAfter(moment().subtract(2, 'minutes'))
}

export function getOnlineStatus(lastSeenAt: string) {
  if (!lastSeenAt) return 'Offline'
  const time = moment(lastSeenAt)
  if (isOnline(time)) return 'Online'
  return `Last Seen ${time.fromNow()}`
}

export function threadsMatch(firstThread, secondThread) {
  let result = false
  const idMatch = firstThread?.id === secondThread?.id
  if (idMatch) result = true
  const typeMatch = firstThread?.thread_type === secondThread?.thread_type
  if (!typeMatch && !result) result = false
  const threadType = firstThread?.thread_type
  if (threadType === 'direct' && firstThread?.user_id === secondThread?.user_id) result = true
  return result
}

export function isConnected() {
  return isWebsocketConnected()
}

export function isDirectWithSelf(thread: IChatThreadInfo, user: ICurrentUser) {
  return thread?.users?.length === 2 && thread.users.filter(x => x.id !== user.id).length === 1
}

export function getOtherUser(thread: IChatThreadInfo, user: ICurrentUser) {
  return isDirectWithSelf(thread, user) ? thread.users.filter(x => x.id !== user.id)[0] : null
}

export function getUserTime(timezoneName: string) {
  try {
    if (!timezoneName) return null
    if (timezoneName === detectTimezoneName()) return null
    return moment().tz(timezoneName).format('h:mm A z')
  } catch (error) {
    console.error(error)
  }
  return null
}

export function getMessageLabel(message: IChatMessage) {
  if (!message?.label) return null
  if (message.label === 'contract_introduction') return 'Automated Message'
  if (message.label === 'post_interview_reminder') return 'Automated Message'
  return startCase(message.label)
}
