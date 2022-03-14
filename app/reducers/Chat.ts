import update from 'immutability-helper'
import { IChatMessage, IChatThread, IChatUser } from 'types'
import { threadsMatch } from 'services/chat'
import { CONNECTED as WEBSOCKET_CONNECTED, DISCONNECTED as WEBSOCKET_DISCONNECTED } from 'services/websockets'
import { LOGOUT } from './Auth'

export const SEND_CHAT_MESSAGE = 'flexhire/chat/SEND_MESSAGE'
export const CHAT_MESSAGE_RECEIVED = 'flexhire/chat/MESSAGE_RECEIVED'
export const THREAD_UPDATED = 'flexhire/chat/THREAD_UPDATED'
export const GET_STATS = 'flexhire/chat/GET_STATS'
export const SET_CONTACTS = 'flexhire/chat/SET_CONTACTS'
export const OPEN_CHAT = 'flexhire/chat/OPEN'
export const CLOSE_CHAT = 'flexhire/chat/CLOSE'
export const SET_THREAD = 'flexhire/chat/SET_THREAD'
export const SET_THREAD_DATA = 'flexhire/chat/SET_THREAD_DATA'
export const SET_MESSAGES = 'flexhire/chat/SET_MESSAGES'
export const CHAT_ERROR = 'flexhire/chat/SET_ERROR'
export const SET_STATS = 'flexhire/chat/SET_STATS'
export const CREATE_THREAD = 'flexhire/chat/CREATE_THREAD'
export const UPDATE_THREAD = 'flexhire/chat/UPDATE_THREAD'
export const SEEN_ONLINE = 'flexhire/chat/SEEN_ONLINE'

export type IChatThreadInfo = Partial<IChatThread> & { loading?: boolean, user?: IChatUser }

export function getStats() {
  return {
    type: GET_STATS,
  }
}

export function createThread(thread) {
  return {
    type: CREATE_THREAD,
    payload: { thread },
  }
}

export function updateThread(thread) {
  return {
    type: UPDATE_THREAD,
    payload: { thread },
  }
}

export function threadUpdated(thread) {
  return {
    type: THREAD_UPDATED,
    payload: { thread },
  }
}

export function sendChatMessage(message) {
  return {
    type: SEND_CHAT_MESSAGE,
    payload: { message },
  }
}

export function openChat(thread, loading: boolean = true) {
  if (thread?.id === false) throw new Error('Invalid Thread ID')
  return {
    type: OPEN_CHAT,
    payload: { thread: thread ? { ...thread, loading } : null },
  }
}

export function closeChat() {
  return {
    type: CLOSE_CHAT,
  }
}

export function setThread(thread) {
  return {
    type: SET_THREAD,
    payload: { thread },
  }
}

export function setThreadData(thread) {
  return {
    type: SET_THREAD_DATA,
    payload: { thread },
  }
}

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    payload: { messages },
  }
}

export function setChatError(error) {
  return {
    type: CHAT_ERROR,
    payload: { error: error?.response || error?.message || error },
  }
}

export function setStats(stats) {
  return {
    type: SET_STATS,
    payload: stats,
  }
}

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: { contacts },
  }
}

function getInitialState() {
  return {
    connected: false,
    open: false,
    loadingThreads: true,
    loadingContacts: true,
    thread: null as IChatThreadInfo,
    threads: [] as IChatThread[],
    messages: [] as IChatMessage[],
    contacts: [] as IChatUser[],
    stats: {
      unread_count: 0,
    },
    sending: false,
    error: null,
  }
}

function isThreadTheSame(newThread, oldThread) {
  return newThread?.id && threadsMatch(newThread, oldThread)
}

function updateThreadFromOldList(threadInfo, threads) {
  if (!threadInfo?.id) return threadInfo
  const oldThreadInfo = threads.find(t => t.id === threadInfo?.id)
  if (oldThreadInfo) return { ...oldThreadInfo, ...threadInfo }
  return threadInfo
}

function updateThreadFromNewList(threadInfo, threads) {
  if (!threadInfo?.id) return threadInfo
  const newThreadInfo = threads.find(t => t.id === threadInfo?.id)
  if (newThreadInfo) return { ...threadInfo, ...newThreadInfo }
  return threadInfo
}

function findMatchingThread(newThread, threads) {
  const match = threads.find(t => threadsMatch(t, newThread))
  return match || newThread
}

function messageExists(messages: IChatMessage[], message: IChatMessage) {
  if (!messages || messages.length === 0 || !message?.id) return false
  return Boolean(messages.find(x => x.id === message.id))
}

function updateContact(contacts: IChatUser[], contact: Partial<IChatUser>) {
  if (!contact?.id) return contacts
  return contacts.map((c) => {
    if (c?.id === contact?.id) return { ...c, ...contact }
    return c
  })
}

function updateLastSeenAt(contacts: IChatUser[], id: number) {
  return updateContact(contacts, { id, last_seen_at: (new Date()).toISOString() })
}

export default function ChatReducer(state = getInitialState(), action) {
  const p = action.payload
  switch (action.type) {
    case CLOSE_CHAT:
      return update(state, {
        open: { $set: false },
        error: { $set: null },
      })
    case OPEN_CHAT: {
      const isSame = isThreadTheSame(p.thread, state.thread)
      return update(state, {
        open: { $set: true },
        thread: { $set: isSame ? state.thread : findMatchingThread(p.thread, state.threads) },
        error: { $set: null },
        messages: {
          $set: isSame ? state.messages : [],
        },
      })
    }
    case SET_THREAD: {
      const isSame = isThreadTheSame(p.thread, state.thread)
      return update(state, {
        thread: { $set: updateThreadFromOldList(p.thread, state.threads) },
        messages: { $set: isSame ? state.messages : [] },
      })
    }
    case SET_THREAD_DATA:
      return update(state, {
        thread: { $set: p.thread },
      })
    case SET_MESSAGES:
      return update(state, {
        messages: { $set: p.messages || [] },
      })
    case CHAT_MESSAGE_RECEIVED: {
      const threadSelected = state.thread?.id === p.chat_thread_id
      const threadOpened = threadSelected && state.open
      if (threadSelected && messageExists(state.messages, p)) return state
      return update(state, {
        messages: {
          $set: threadSelected ? state.messages.concat(p) : state.messages,
        },
        stats: {
          unread_count: { $set: state.stats.unread_count + (threadOpened ? 0 : 1) },
        },
      })
    }
    case THREAD_UPDATED:
      return update(state, {
        thread: { $set: updateThreadFromNewList(state.thread, [action.payload.thread]) },
      })
    case CHAT_ERROR:
      return update(state, {
        error: { $set: p.error },
      })
    case SET_STATS:
      return update(state, {
        stats: {
          unread_count: { $set: p.unread_count },
        },
        threads: { $set: p.threads },
        loadingThreads: { $set: false },
        thread: { $set: updateThreadFromNewList(state.thread, p.threads) },
      })
    case SET_CONTACTS:
      return update(state, {
        contacts: { $set: p.contacts },
        loadingContacts: { $set: false },
      })
    case SEEN_ONLINE:
      return update(state, {
        contacts: { $set: updateLastSeenAt(state.contacts, p.id) },
      })
    case LOGOUT:
      return getInitialState()
    case WEBSOCKET_CONNECTED:
      return update(state, {
        connected: { $set: true },
      })
    case WEBSOCKET_DISCONNECTED:
      return update(state, {
        connected: { $set: false },
      })
  }
  return state
}
