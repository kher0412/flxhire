import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import {
  OPEN_CHAT,
  GET_STATS,
  SEND_CHAT_MESSAGE,
  CHAT_MESSAGE_RECEIVED,
  SET_THREAD,
  CREATE_THREAD,
  UPDATE_THREAD,
  setThreadData,
  setMessages,
  setChatError,
  setStats,
  setContacts,
  setThread,
} from 'reducers/Chat'
import { CONNECTED as WEBSOCKET_CONNECTED } from 'services/websockets'
import { LOGOUT, SET_CURRENT_USER, SET_LOGGED_OUT } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { trackError, trackEvent } from 'services/analytics'
import { RootState } from 'reducers'
import { IChatMessage } from 'types'
import { HYDRATE } from 'next-redux-wrapper'
import { createAction } from 'redux-actions'
import { createDesktopNotification } from 'services/notifications'
import { getCurrentUser } from './__helpers'

const MARK_READ_TIME = 1000
const MESSAGES_POLL_INTERVAL = 10000 // used when websocket is offline to try to get new messages

function* markChatThreadRead() {
  const thread = yield select((state: RootState) => state.chat.thread)
  if (thread?.id && thread?.unread_messages_count > 0) {
    try {
      const stats = yield call([getAPIClient(), 'markChatThreadRead'], thread.id)
      yield put(setStats(stats))
      trackEvent('Chat Thread Read')
    } catch (error) {
      trackError(error)
      yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not mark Conversation as read' }))
    }
  }
}

function* getChatMessages() {
  let thread = yield select((state: RootState) => state.chat.thread)
  if (thread?.id) {
    let success = false
    try {
      const messages: IChatMessage[] = yield call([getAPIClient(), 'getChatMessages'], { chat_thread_id: thread.id })
      const currentMessages = yield select((state: RootState) => state.chat.messages)
      const lengthChanged = messages.length !== currentMessages.length
      const lastMessageIdChanged = (messages.length > 0 && currentMessages.length > 0 && messages[0].id !== currentMessages[currentMessages.length - 1].id)
      const shouldUpdate = lengthChanged || lastMessageIdChanged
      // We avoid updating if not needed to prevent re-rendering the message list
      // Because when it re-renders it also scrolls to the bottom which is annoying
      if (shouldUpdate) yield put(setMessages(messages.reverse()))
      success = true
    } catch (error) {
      trackError(error)
      yield put(setChatError(error))
    }
    if (success) {
      yield new Promise(resolve => setTimeout(resolve, MARK_READ_TIME))
      const stillOpen = yield select((state: RootState) => state.chat.open)
      if (stillOpen) yield markChatThreadRead()
    }
  }
}

function* pollChatMessages() {
  try {
    const threadId = yield select((state: RootState) => state.chat.thread?.id)
    while (threadId) {
      yield new Promise(resolve => setTimeout(resolve, MESSAGES_POLL_INTERVAL + MARK_READ_TIME))
      // Stop polling if thread closed or changed
      const currentThreadId = yield select((state: RootState) => state.chat.thread?.id)
      const open = yield select((state: RootState) => state.chat.open)
      if (threadId !== currentThreadId || !open) break

      const connected = yield select((state: RootState) => state.chat.connected)
      if (!connected) {
        trackEvent('Chat Messages Polling')
        yield getChatMessages()
      }
    }
  } catch (error) {
    trackError(error)
  }
}

function* performGetStats() {
  const user = yield select((state: RootState) => state.auth.currentUser)
  if (user?.id) {
    try {
      const stats = yield call([getAPIClient(), 'getChatStats'])
      yield put(setStats(stats))
    } catch (error) {
      // This runs right after log in, so don't trigger error handling if the cookie expired.
      if (!error.code || error.code !== 401) {
        trackError(error)
        yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not get Chat data' }))
      }
    }
  }
}

function* performGetContacts() {
  try {
    const contacts = yield call([getAPIClient(), 'getChatContacts'])
    yield put(setContacts(contacts))
  } catch (error) {
    trackError(error)
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not fetch Chat Contacts' }))
  }
}

function* performGetThread(threadData) {
  // Note: threadData can be undefined or null
  // When the chat is opened without focusing on a specific thread
  try {
    let thread
    if (threadData?.id) {
      thread = { id: threadData.id }
      thread = yield call([getAPIClient(), 'getChatThread'], threadData.id)
    } else if (threadData?.user_id) {
      // Try thread search
      try {
        const currentUser = yield select((state: RootState) => state.auth.currentUser)
        if (currentUser?.id) {
          // If user has no ID, avoid calling method because it will cause SET_LOGGED_OUT to be called
          const result = yield call([getAPIClient(), 'findChatThread'], { user_id: threadData.user_id })
          if (result) thread = result
        }
      } catch (error) {
        // Thread can be not found, in that case we don't want to error out.
      }
    }
    if (thread) {
      yield put(setThreadData(thread))
      yield getChatMessages()
      yield pollChatMessages() // The polling will only run if the chat is disconnected
    }
  } catch (error) {
    trackError(error)
    yield put(setChatError(error))
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not fetch Conversation information' }))
  }
}

function* performRefreshThread(action) {
  const currentThread = yield select((state: RootState) => state.chat.thread)
  if (currentThread?.id === action.payload.chat_thread_id) {
    // Refresh thread
    yield performGetThread({ id: currentThread.id })
  }
}

function* performCreateThread(action) {
  try {
    const thread = yield call([getAPIClient(), 'createChatThread'], action.payload.thread)
    yield put(setThread(thread))
    trackEvent('Chat Thread Created')
  } catch (error) {
    trackError(error)
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not create Conversation' }))
  }
}

function* performUpdateThread(action) {
  try {
    const thread = yield call([getAPIClient(), 'updateChatThread'], action.payload.thread.id, action.payload.thread)
    const currentThread = yield select((state: RootState) => state.chat.thread)
    if (currentThread?.id === thread.id) yield put(setThread(thread))
    trackEvent('Chat Thread Updated')
    yield performGetStats()
  } catch (error) {
    trackError(error)
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not update Conversation' }))
  }
}

function* performGetStatsAndContacts() {
  yield performGetStats()
  yield performGetContacts()
}

function* handleOpenChat(action) {
  yield performGetThread(action.payload.thread)
  yield performGetStatsAndContacts()
}

function* performSendChatMessage(action) {
  try {
    let thread = yield select((state: RootState) => state.chat.thread)
    const data = {
      message: action.payload.message,
      chat_thread_id: thread?.id,
      recipient_id: thread?.user_id,
    }
    const message: IChatMessage = yield call([getAPIClient(), 'sendChatMessage'], data)
    trackEvent('Chat Message Sent')
    const currentUser = yield select((state: RootState) => state.auth.currentUser)
    if (!currentUser?.id) yield getCurrentUser()
    if (!thread?.id && message.chat_thread_id) {
      thread = yield call([getAPIClient(), 'getChatThread'], message.chat_thread_id)
      yield put(setThreadData(thread))
    }
    // Note: we always poll for messages after sending, to avoid accidentally
    // not getting the event about the first message if we send it
    yield getChatMessages()
  } catch (error) {
    trackError(error)
    yield put(setChatError(error))
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Could not send Chat Message' }))
  }
}

function* hydrateChat() {
  const chat = yield select((state: RootState) => state.chat)
  if (chat.open) {
    yield performGetStats()
    if (chat.thread) yield performGetThread(chat.thread)
  }
}

function* performNotifyMessage(action) {
  try {
    const currentUser = yield select((state: RootState) => state.auth.currentUser)
    const chatState = yield select((state: RootState) => state.chat)
    const pageHidden = yield call(() => document.hidden)
    const message = action.payload as IChatMessage
    const notFromSelf = message.user_id !== currentUser.id
    const chatNotOpenOnThread = (!chatState.open || (chatState.thread?.id !== message.chat_thread_id))
    if (notFromSelf && (pageHidden || chatNotOpenOnThread)) {
      let text = message.message
      const name = message.author_name || 'Unnamed User'
      if (text.length > 100) text = `${text.slice(0, 100)}...`
      yield call(createDesktopNotification, `Flexhire | New Message from ${name}`, {
        body: `${name} says: ${text}`,
        // Picture can also be passed to "badge" and "image" but Icon seems to be the only one that works
        icon: message.author_avatar_url || 'https://flexhire.com/icon.png',
      })
      trackEvent('Chat Message Desktop Notification')
    }
  } catch (error) {
    trackError(error)
  }
}

export default function* watchChat() {
  yield takeLatest([OPEN_CHAT, SET_THREAD], handleOpenChat)
  yield takeLatest(GET_STATS, performGetStats)
  yield takeLatest([SET_CURRENT_USER, SET_LOGGED_OUT, LOGOUT], performGetStatsAndContacts)
  yield takeLatest(HYDRATE, hydrateChat)
  yield takeLatest(CHAT_MESSAGE_RECEIVED, performRefreshThread)
  yield takeLatest(CHAT_MESSAGE_RECEIVED, performNotifyMessage)
  yield takeLatest(WEBSOCKET_CONNECTED, getChatMessages)
  yield takeEvery(SEND_CHAT_MESSAGE, performSendChatMessage)
  yield takeEvery(CREATE_THREAD, performCreateThread)
  yield takeEvery(UPDATE_THREAD, performUpdateThread)
}
