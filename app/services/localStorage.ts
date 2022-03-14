import storage from 'local-storage-fallback'
import { isPrerendering } from './prerender'

export function init() {
  // this automatically polyfills localStorage if needed
  Object.defineProperty(window, 'localStorage', { value: storage })
}

const storageGated = {
  getItem: (key: string) => {
    if (isPrerendering()) return undefined
    return storage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    if (isPrerendering()) return undefined
    return storage.setItem(key, value)
  },
  removeItem: (key: string) => {
    if (isPrerendering()) return undefined
    return storage.removeItem(key)
  },
}

export default storageGated
