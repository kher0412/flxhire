import { PayloadError } from 'relay-runtime'
import { getFlexhireEnvironment } from 'services/environment'
import { isPrerendering } from 'services/prerender'
import { IAPIError, ICurrentUser } from 'types'
import { extractQueryParams } from './router'
import { getBuildID } from './versioning'
import { errorToObject } from './error'

async function getMixpanel() {
  // NOTE: the webpack chunk name here is DELIBERATELY WRONG
  // The reason is that Ad Block type extensions will block the request
  // for this script if the name contains "mixpanel"
  // Also, the Service Worker WILL NOT INSTALL if the user has ad block
  // because it tries to precache this .js bundle and the ad block prevents that
  // if the bundle contains "mixpanel" in the name.
  return import(/* webpackChunkName: "Mapelpix" */'mixpanel-browser')
}

async function getSentry() {
  // Webpack will import @sentry/browser or @sentry/node depending on the environment
  // see next.config.js
  return import(/* webpackChunkName: "Sentry" */'@sentry/browser')
}

async function getLogRocket() {
  return import(/* webpackChunkName: "LogRocket" */'logrocket').then(m => m.default)
}

async function getLogRocketReact() {
  return import(/* webpackChunkName: "LogRocketReact" */'logrocket-react').then(m => m.default)
}

async function getLogRocketSessionURL() {
  if (isPrerendering() || !process.env.LOGROCKET_APP_ID) return null

  const sessionURL = (window as any).logrocketsessionurl
  if (sessionURL) return sessionURL

  const logrocket = await getLogRocket()
  return new Promise(resolve => logrocket.getSessionURL((sessionUrl) => {
    (window as any).logrocketsessionurl = sessionUrl
    resolve(sessionUrl)
  }))
}

function shouldEnableLogrocket(user?: ICurrentUser) {
  return user?.is_flexhire_team !== true
}

export async function setUserInfo(currentUser: Partial<ICurrentUser>) {
  const user = currentUser?.real_user || currentUser
  const mask = currentUser?.real_user ? currentUser : null
  try {
    if (process.env.SENTRY_DSN && user) {
      const Sentry = await getSentry()
      Sentry.configureScope((scope) => {
        scope.setUser({
          id: user?.id ? `${user.id}` : null,
          name: user?.name,
          email: user?.email || user?.unconfirmed_email,
          roles: user?.roles?.join(', ') || 'guest',
          mask_id: mask?.id,
          mask_name: mask?.name,
          mask_email: mask?.email || mask?.unconfirmed_email,
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
  try {
    if (!isPrerendering() && process.env.GA_TRACKING_ID && user) {
      const w = window as any
      if (w.gtag) {
        w.gtag('config', 'GA_MEASUREMENT_ID', {
          user_id: user?.id,
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
  try {
    if (!isPrerendering() && process.env.MIXPANEL_TOKEN && user) {
      const mixpanel = await getMixpanel()
      mixpanel.identify(user?.id ? `${user.id}` : null)
      mixpanel.people.set({
        name: user?.name,
        email: user?.email,
      })
    }
  } catch (error) {
    console.log(error)
  }
  try {
    if (!isPrerendering() && process.env.LOGROCKET_APP_ID && user) {
      const logrocket = await getLogRocket()
      logrocket.identify(user?.id ? `${user.id}` : null, {
        // only name and email are "defaults", the rest is considered extra data by LogRocket
        // NOTE: all this data needs to be the same on all the user's sessions!
        name: user?.name,
        email: user?.email || user?.unconfirmed_email,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function init(user?: ICurrentUser) {
  let logRocketSessionURL = null

  if (!isPrerendering() && process.env.LOGROCKET_APP_ID && shouldEnableLogrocket(user)) {
    try {
      const logrocket = await getLogRocket()
      logrocket.init(process.env.LOGROCKET_APP_ID, {
        release: getBuildID(),
        network: {
          requestSanitizer: (request) => {
            try {
              const query = extractQueryParams(request.url)
              if (query.password || query.password_confirmation) return null

              if (request.body?.indexOf('password')) return null

              return request
            } catch (error) {
              console.error(error)
            }
            return null
          },
        },
      })
      const w = window as any
      w.logrocket = logrocket
      const logrocketReact = await getLogRocketReact()
      logrocketReact(logrocket)
      logRocketSessionURL = await getLogRocketSessionURL()
    } catch (error) {
      console.log(error)
    }
  }

  if (process.env.SENTRY_DSN) {
    try {
      const Sentry = await getSentry()
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: getFlexhireEnvironment(),
        release: getBuildID(),
        maxBreadcrumbs: 50,
        attachStacktrace: true,
      })
      Sentry.setTag('ssr', isPrerendering() as any)
      if (logRocketSessionURL) Sentry.setTag('LogRocket', logRocketSessionURL)
      if (!isPrerendering()) {
        const w = window as any
        w.Sentry = Sentry
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!isPrerendering()) {
    if (process.env.MIXPANEL_TOKEN) {
      try {
        const mixpanel = await getMixpanel()
        mixpanel.init(process.env.MIXPANEL_TOKEN)
        const w = window as any
        w.mixpanel = mixpanel
        if (logRocketSessionURL) mixpanel.track('LogRocket', { logRocketSessionURL })
      } catch (error) {
        console.log(error)
      }
    }

    if (process.env.GA_TRACKING_ID && (window as any).gtag && logRocketSessionURL) {
      (window as any).gtag('send', {
        hitType: 'event',
        eventCategory: 'LogRocket',
        eventAction: logRocketSessionURL,
      })
    }
  }

  if (user) setUserInfo(user)
}

export async function logPageView(url) {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  if (process.env.GA_TRACKING_ID) {
    try {
      const w = window as any
      if (w.gtag) {
        w.gtag('config', process.env.GA_TRACKING_ID, {
          page_path: url,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export async function trackEvent(name: string, data?: any) {
  if (process.env.SENTRY_DSN) {
    const Sentry = await getSentry()
    Sentry.addBreadcrumb({
      message: name,
      data,
    })
  }
  if (!isPrerendering()) {
    if (process.env.MIXPANEL_TOKEN) {
      try {
        const mixpanel = await getMixpanel()
        mixpanel.track(name, data)
      } catch (error) {
        console.log(error)
      }
    }
    if (process.env.GA_TRACKING_ID) {
      try {
        const w = window as any
        if (w.gtag) {
          w.gtag('event', name)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (process.env.LOGROCKET_APP_ID) {
      try {
        const logrocket = await getLogRocket()
        logrocket.track(name)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export function ctxErrorInfo(ctx) {
  if (ctx) {
    return {
      url: ctx?.req?.url,
      method: ctx?.req?.method,
      headers: ctx?.req?.headers,
      query: ctx?.req?.query,
    }
  }
  return {}
}

export function isAPIError(error: Error | IAPIError | PayloadError) : error is IAPIError {
  return Boolean((error as IAPIError)?.response || (error as IAPIError)?.code)
}

export function shouldTrackError(error: Error | IAPIError | PayloadError) {
  if (isAPIError(error) && error.code === 401) return false

  return true
}

export async function trackError(error: Error | IAPIError | PayloadError, extraInfo: any = {}) {
  console.error(error)
  let sentryErrorId = null
  if (process.env.SENTRY_DSN && shouldTrackError(error)) {
    const Sentry = await getSentry()
    const logRocketSessionURL = await getLogRocketSessionURL()
    sentryErrorId = await new Promise((resolve, reject) => {
      try {
        Sentry.withScope((scope) => {
          try {
            if (isAPIError(error)) {
              scope.setFingerprint(['{{ default }}', error?.response, error.message, String(error?.code)])
            }
            // TODO: if error is payload error, add all its information
            let allExtraInfo = { ...extraInfo }
            if (logRocketSessionURL) allExtraInfo.logRocketSessionURL = logRocketSessionURL
            scope.setExtras(allExtraInfo)
            console.log('Sentry error extra info:', allExtraInfo)
            resolve(Sentry.captureException(error))
            console.log('Error Reported to Sentry successfully')
          } catch (err) {
            reject(err)
          }
        })
      } catch (err) {
        reject(err)
      }
    }).catch(err => console.log(err))
  } else {
    console.log('Skipping error report. Either Sentry is disabled or the error was determined to not need to be reported')
  }
  if (!isPrerendering()) {
    if (process.env.MIXPANEL_TOKEN) {
      try {
        const mixpanel = await getMixpanel()
        mixpanel.track(isAPIError(error) ? error.response : error.message, { sentryErrorId, ...extraInfo })
      } catch (err) {
        console.log(err)
      }
    }
    if (process.env.LOGROCKET_APP_ID) {
      try {
        const logrocket = await getLogRocket()
        logrocket.captureException(errorToObject(error), {
          // TODO: add proper extras for PayloadError
          extra: isAPIError(error) ? {
            response: (error as IAPIError)?.response,
            status: (error as IAPIError)?.code,
          } : {},
        })
        // TODO: pass "tags" and "extra"
      } catch (err) {
        console.log(err)
      }
    }
  }
  return sentryErrorId
}

export async function showErrorReportDialog(data) : Promise<void> {
  if (process.env.SENTRY_DSN) {
    try {
      const Sentry = await getSentry() as any
      Sentry.showReportDialog(data)
    } catch (error) {
      console.log(error)
    }
  } else {
    console.warn('Sentry error report dialog not appearing because Sentry is disabled.')
  }
}
