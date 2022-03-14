import { getAPIClient } from 'api'
import { oauth } from 'config'
import storage from 'services/localStorage'
import { buildQueryParams } from 'services/router'
import { ensureNotPopupBlocked } from 'services/window'

export const KEY_LINKEDIN_AUTH_CODE = 'linkedin_auth_code'

let promiseCache: Promise<string>

async function doAcquireAuthorizationCode(readOnly: boolean) {
  const authWindow = window.open(
    `${oauth.linkedin.api_url}?${buildQueryParams(oauth.linkedin.params(readOnly))}`,
    'linkedin_auth',
    (window.innerWidth > 1200 && window.innerHeight > 700) ? 'height=600,width=600' : undefined,
  )

  ensureNotPopupBlocked(authWindow)

  const authorizationCode = await new Promise<string>((resolve, reject) => {
    const closePollIntervalHandle = window.setInterval(() => {
      // authWindow could be null (see https://sentry.io/organizations/flexhire/issues/2373891442/?project=169865&referrer=slack)
      if (authWindow?.closed) {
        window.clearInterval(closePollIntervalHandle)

        if (storage.getItem(KEY_LINKEDIN_AUTH_CODE)) {
          // window closed manually by user but the auth code was acquired regardless
          resolve(storage.getItem(KEY_LINKEDIN_AUTH_CODE))
        } else {
          // window closed manually before the authentication process could complete, this is considered a rejection
          reject(new Error('canceled'))
        }
      } else {
        // check for new token in localStorage
        if (storage.getItem(KEY_LINKEDIN_AUTH_CODE)) {
          resolve(storage.getItem(KEY_LINKEDIN_AUTH_CODE))
        }
      }
    }, 200)
  })

  if (!authWindow.closed) {
    authWindow.close()
  }

  return authorizationCode
}

async function acquireAuthorizationCode(readOnly: boolean) {
  if (!promiseCache) {
    promiseCache = doAcquireAuthorizationCode(readOnly)
  }

  let authorizationCode: string

  try {
    authorizationCode = await promiseCache
  } finally {
    promiseCache = undefined
  }

  return authorizationCode
}

export async function acquireLinkedInAccessToken(authenticate: boolean = true, readOnly: boolean = false) {
  let accessToken: string

  storage.removeItem(KEY_LINKEDIN_AUTH_CODE)

  if (authenticate) {
    // this is fine, proceed with the standard oauth flow
    const authorizationCode = await acquireAuthorizationCode(readOnly)

    // acquiring an access token requires the client secret, which we can't expose to the frontend
    // as such, the access token is requested through the backend, which has access to the client secret
    accessToken = await getAPIClient().getLinkedInAccessToken(authorizationCode)
  } else {
    try {
      // for logged in users, try acquiring stored oauth access token
      // if this fails, the full authentication process will be done
      // this call makes it so that users are not required to connect their linkedin account on multiple machines
      accessToken = await getAPIClient().getLinkedInAccessToken('')
    } catch (err) {
      accessToken = undefined
    }
  }

  return accessToken
}
