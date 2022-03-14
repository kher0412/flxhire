import { getAPIClient } from 'api'
import storage from 'services/localStorage'
import { ensureNotPopupBlocked } from 'services/window'

export const KEY_TWITTER_REQUEST_TOKEN = 'twitter_request_token'
export const KEY_TWITTER_VERIFIER_TOKEN = 'twitter_verifier_token'

let authorizationPromiseCache: Promise<any>

async function authorizeRequestToken(requestTokenPromise: Promise<string>): Promise<string> {
  // Note: the twitter auth flow requires a request token from our backend.
  // However, we can't wait for the request token API call to finish, because the window must be opened immediately to avoid popup blocks.
  // Instead, the window is opened immediately, and then redirected to the twitter auth URL once we have the request token.
  const authWindow = window.open(
    '',
    'twitter_auth',
    (window.innerWidth > 1200 && window.innerHeight > 700) ? 'height=600,width=600' : undefined,
  )

  authWindow.document.write('Preparing authentication, this may take a few seconds...')

  ensureNotPopupBlocked(authWindow)

  const requestToken = await requestTokenPromise

  // Request token acquired, redirect popup window to twitter auth URL.
  authWindow.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`

  // Clear the indication of any previously processed request tokens, and poll until a new one is processed.
  storage.removeItem(KEY_TWITTER_REQUEST_TOKEN)
  storage.removeItem(KEY_TWITTER_VERIFIER_TOKEN)

  await new Promise<string>((resolve, reject) => {
    const closePollIntervalHandle = window.setInterval(() => {
      if (authWindow.closed) {
        window.clearInterval(closePollIntervalHandle)

        if (storage.getItem(KEY_TWITTER_REQUEST_TOKEN)) {
          // window closed manually by user but the auth code was acquired regardless
          resolve(storage.getItem(KEY_TWITTER_REQUEST_TOKEN))
        } else {
          // window closed manually before the authentication process could complete, this is considered a rejection
          reject(new Error('canceled'))
        }
      } else {
        // check for new token in localStorage
        if (storage.getItem(KEY_TWITTER_REQUEST_TOKEN)) {
          resolve(storage.getItem(KEY_TWITTER_REQUEST_TOKEN))
        }
      }
    }, 200)
  })

  if (!authWindow.closed) {
    authWindow.close()
  }

  // in oauth1, the authentication process does not return an authorization code after the redirection step,
  // instead, the service provider (twitter) internally tracks that the request token has been authenticated against
  // 3-legged oauth returns an oauth verifier token
  return storage.getItem(KEY_TWITTER_VERIFIER_TOKEN)
}

async function doGetAuthorizedRequestToken() {
  const requestTokenPromise = getAPIClient().getTwitterRequestToken()
  const verifierToken = await authorizeRequestToken(requestTokenPromise)

  return {
    requestToken: await requestTokenPromise,
    verifierToken: verifierToken,
  }
}

async function getAuthorizedRequestToken() {
  if (!authorizationPromiseCache) {
    authorizationPromiseCache = doGetAuthorizedRequestToken()
  }

  let requestToken: string
  let verifierToken: string

  try {
    ({ requestToken, verifierToken } = await authorizationPromiseCache)
  } finally {
    authorizationPromiseCache = undefined
  }

  return { requestToken, verifierToken }
}

export async function acquireTwitterAccessToken(authenticate: boolean = true): Promise<string> {
  let accessToken: string

  if (authenticate) {
    const { requestToken, verifierToken } = await getAuthorizedRequestToken()

    accessToken = await getAPIClient().getTwitterAccessToken(requestToken, verifierToken)
  } else {
    accessToken = await getAPIClient().getTwitterAccessToken()
  }

  return accessToken
}
