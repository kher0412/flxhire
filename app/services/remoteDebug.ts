import { trackError } from './analytics'

const ID = 'remotejs'

export function getExistingAgent() {
  return document.getElementById(ID)
}

export function removeExistingAgent() {
  try {
    const el = document.getElementById(ID)
    if (el) {
      console.log('Removing Remote Debug Agent')
      el.remove()
    }
  } catch (error) {
    trackError(error)
  }
}

export function startRemoteJSAgent(code: string) {
  try {
    if (!getExistingAgent()) {
      console.log('Starting Remote Debug Agent')
      const s = document.createElement('script') as HTMLScriptElement
      s.id = 'remotejs'
      s.src = 'https://remotejs.com/agent/agent.js'
      s.setAttribute('data-consolejs-channel', code)
      document.head.appendChild(s)
    }
  } catch (error) {
    trackError(error)
  }
}
