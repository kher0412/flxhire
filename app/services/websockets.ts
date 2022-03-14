import { getAPIClient } from 'api'
import { trackError } from './analytics'

export const CONNECTED = 'flexhire/websockets/CONNECTED'
export const DISCONNECTED = 'flexhire/websockets/DISCONNECTED'

function dispatchDisconnected(dispatch) {
  const w = window as any
  if (w.ActionCableConnected) {
    w.ActionCableConnected = false
    dispatch({
      type: DISCONNECTED,
    })
  }
}

function dispatchConnected(dispatch) {
  const w = window as any
  if (!w.ActionCableConnected) {
    w.ActionCableConnected = true
    dispatch({
      type: CONNECTED,
    })
  }
}

export function getWebsocketBaseURL() {
  return `${getAPIClient().baseUrl.replace('/api/v1', '')}/websocket`
}

async function openWebsocket() {
  const w = window as any
  let consumer = w.ActionCableConsumer
  if (!consumer) {
    let ActionCable = w.ActionCable
    if (!ActionCable) {
      // Importing action cable completely crashes on the server side, so we dynamically import it.
      // See: https://github.com/rails/rails/pull/39543
      ActionCable = await import(/* webpackChunkName: "ActionCable" */'@rails/actioncable')
      w.ActionCable = ActionCable
    }
    consumer = ActionCable.createConsumer(getWebsocketBaseURL())
    w.ActionCableConsumer = consumer
  }
  return consumer
}

export function isConnected() {
  try {
    const w = window as any
    return Boolean(w.ActionCableConsumer?.connection?.isOpen())
  } catch (error) {
    console.error(error)
    return false
  }
}

async function connectWebsocket(dispatch) {
  const options = {
    received(data) {
      console.log('Received Event:', data)
      try {
        dispatchConnected(dispatch)
        dispatch(data)
      } catch (error) {
        trackError(error)
      }
    },
    disconnected() {
      console.log('WebSocket channel disconnected')
    },
    rejected() {
      console.log('WebSocket connection rejected by server')
    },
  }
  const consumer = await openWebsocket()
  const w = window as any
  w.websocketConsumer = consumer
  console.log('Opening Subscription')
  consumer.subscriptions.create({ channel: 'EventsChannel' }, options)
  return consumer
}

export async function dispatchServerEvents(dispatch) {
  try {
    await connectWebsocket(dispatch)
    dispatchConnected(dispatch)
  } catch (error) {
    dispatchDisconnected(dispatch)
    if (error) {
      trackError(error)
    } else {
      trackError(new Error('Websocket disconnected with no error'))
    }
  }
}

export function closeConnection() {
  try {
    const w = window as any
    const consumer = w.websocketConsumer
    if (consumer) {
      consumer.connection.close({ allowReconnect: false })
      consumer.connection.monitor.stop()
      w.websocketConsumer = null
      return true
    }
  } catch (error) {
    trackError(error)
  }
  return false
}

export function restartConnection() {
  try {
    const w = window as any
    const closed = closeConnection()
    if (closed && w.reduxStore?.dispatch) {
      dispatchServerEvents(w.reduxStore.dispatch)
      return true
    }
  } catch (error) {
    trackError(error)
  }
  return false
}
