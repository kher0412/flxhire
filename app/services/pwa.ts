import { isPrerendering } from 'services/prerender'
import { trackError } from 'services/analytics'
import { setOnline, setOffline, promptPWAInstall, setIsPWA, pwaInstalled } from 'reducers/Common'
import { ReduxStore } from 'Store'
import { Workbox } from 'workbox-window'
import { isGuest } from './user'

const UPDATE_CHECK_INTERVAL = 120000

export function getWorkbox() {
  const w = window as any
  if (w.flexhireWorkbox) return w.flexhireWorkbox as Workbox

  const wb = new Workbox('service-worker.js', { scope: '/' })
  w.flexhireWorkbox = wb
  console.log('Workbox initialized')
  return wb
}

export async function skipWaitingNewServiceWorker() {
  try {
    getWorkbox().messageSkipWaiting()
    return true
  } catch (error) {
    trackError(error)
  }
  return false
}

async function checkForServiceWorkerUpdates(registration: ServiceWorkerRegistration, store: ReduxStore) {
  try {
    console.log('Checking for service worker update...')
    if (!registration) {
      console.log('Service Worker registration is null, skipping update check')
    } else if (registration.installing) {
      console.log('Service Worker registration is in progress (installing), skipping update check')
    } else if (registration.waiting) {
      console.log('Service Worker registration is waiting to activate')
      const updateDetectionEnabled = store.getState().auth.currentUser.configuration?.enable_service_worker_update_detection
      const autoSkipWaitingEnabled = store.getState().auth.currentUser.configuration?.enable_service_worker_auto_skip_waiting
      if (autoSkipWaitingEnabled) {
        skipWaitingNewServiceWorker()
      } else {
        console.log('ServiceWorker auto skip waiting is disabled')
      }
      if (updateDetectionEnabled) {
        console.log('Update detection is enabled')
      } else {
        console.log('UpdateDetection is disabled, skipping update notification')
      }
    } else if (!registration.active) {
      console.log('Service Worker is not active (there is no active service worker), skipping update check')
    } else {
      try {
        await registration.update()
        console.log('Check for update completed, will check again in ', UPDATE_CHECK_INTERVAL)
      } catch (error) {
        console.log('Check for update failed')
        trackError(error)
      }
    }
    // Try again in a while
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    scheduleServiceWorkerUpdates(registration, store)
  } catch (error) {
    trackError(error)
  }
}

function scheduleServiceWorkerUpdates(registration: ServiceWorkerRegistration, store: ReduxStore) {
  /* eslint-disable-next-line no-use-before-define */
  window.setTimeout(() => checkForServiceWorkerUpdates(registration, store), UPDATE_CHECK_INTERVAL)
  console.log('Checking for service worker updates scheduled in', UPDATE_CHECK_INTERVAL)
}

function listenToServiceWorkerRegistrationEvents(registration: ServiceWorkerRegistration, store: ReduxStore) {
  try {
    // React on updates by updating redux store when an update is ready
    registration.onupdatefound = () => {
      try {
        console.log('ServiceWorker onupdatefound fired')
        const hasCurrentWorker = Boolean(registration.active || registration.waiting)
        const autoSkipWaitingEnabled = store.getState().auth.currentUser.configuration?.enable_service_worker_auto_skip_waiting
        if (registration.waiting && autoSkipWaitingEnabled) skipWaitingNewServiceWorker()
        const newWorker = registration.installing
        if (newWorker) {
          console.log('ServiceWorker new worker found with state:', newWorker.state)
          newWorker.addEventListener('statechange', () => {
            try {
              console.log('ServiceWorker new worker state changed to:', newWorker.state)
              if (newWorker.state === 'installed') {
                const updateDetectionEnabled = store.getState().auth.currentUser.configuration?.enable_service_worker_update_detection
                console.log(`New worker state is compatible with updateDetection. UpdateDetectionEnabled: ${updateDetectionEnabled} HasActiveWorker: ${Boolean(hasCurrentWorker)}`)
                if (hasCurrentWorker) {
                  console.log('Active service worker that needs update found')
                } else {
                  console.log('Skipping update notification: either it is disabled, or there is no active service worker to replace')
                }
              }
            } catch (error) {
              trackError(error)
            }
          })
        } else {
          console.log('New service worker not found!')
        }
      } catch (error) {
        trackError(error)
      }
    }

    // Automatically check for updates
    scheduleServiceWorkerUpdates(registration, store)
  } catch (error) {
    trackError(error)
  }
}

export function registerServiceWorker(store: ReduxStore) {
  // In some browsers, even though navigator.serviceWorker is defined, the register function is missing.
  if ('serviceWorker' in navigator && typeof navigator?.serviceWorker?.register === 'function') {
    console.log('Workbox registration started')
    getWorkbox().register().then((registration: ServiceWorkerRegistration) => {
      const w = window as any
      w.flexhireServiceWorkerRegistration = registration
      console.log('Workbox registration completed')
      listenToServiceWorkerRegistrationEvents(registration, store)
    }).catch(error => trackError(error))
  } else {
    console.log('Workbox registration skipped: ServiceWorkers are not supported')
  }
}

export function registerServiceWorkerOnLoad(store) {
  try {
    console.log('Starting registerServiceWorkerOnLoad')
    const enabled = store.getState().auth.currentUser.configuration?.enable_service_worker
    console.log('Service Worker Enabled:', enabled)
    console.log('Prerendering:', isPrerendering())
    if (!isPrerendering() && enabled) {
      console.log('Document readyState', document.readyState)
      if (document.readyState === 'complete') {
        registerServiceWorker(store)
      } else {
        window.addEventListener('load', () => registerServiceWorker(store))
      }
    }
  } catch (error) {
    trackError(error)
  }
}

export function isServiceWorkerRegistered() {
  return Boolean((window as any).flexhireServiceWorkerRegistration)
}

export function isInstallable() {
  return Boolean((window as any).savedBeforeInstallPromptEvent)
}

export async function installPWA() {
  // Note: calling this function must be done in response to a user event, such as a button click
  // Otherwise it will throw.
  if (!isInstallable()) return false
  try {
    await (window as any).savedBeforeInstallPromptEvent.prompt()
    // Wait for the user to respond to the prompt
    const result = await (window as any).savedBeforeInstallPromptEvent.userChoice
    return result?.outcome === 'accepted'
  } catch (error) {
    trackError(error)
  }
  return false
}

export function initPWAStatus(store: ReduxStore) {
  // Set Offline mode if offline
  if (!navigator.onLine) store.dispatch(setOffline())
  if (matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) store.dispatch(setIsPWA())
}

export function listenToEvents(store: ReduxStore) {
  // Listen to offline/online events
  window.addEventListener('online', () => store.dispatch(setOnline()))
  window.addEventListener('offline', () => store.dispatch(setOffline()))

  // Control PWA Install prompt
  window.addEventListener('beforeinstallprompt', (event) => {
    try {
      store.dispatch(promptPWAInstall()) // update redux state
      const state = store.getState()
      const user = state.auth.currentUser
      const isPWA = state.common.isPWA
      // Display the Prompt now if the conditions are right
      const pwaInstallEnabled = store.getState().auth.currentUser.configuration?.enable_pwa_install
      const displayNow = !isPWA && !isGuest(user) && pwaInstallEnabled
      // Prevent the mini-infobar from appearing on mobile
      if (!displayNow) event.preventDefault()
      // Stash the event so it can be triggered later.
      const w = window as any
      w.savedBeforeInstallPromptEvent = event
    } catch (error) {
      trackError(error)
    }
  })

  window.addEventListener('appinstalled', () => store.dispatch(pwaInstalled()))
}
