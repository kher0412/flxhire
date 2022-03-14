let isInitialized = false
let latestHandler
let clientID = -1

const handleGlobalRecaptchaSubmit = (response) => {
  if (latestHandler) {
    latestHandler(response)
  }
}

const handleGlobalRecaptchaError = () => {
  if (latestHandler) {
    latestHandler(undefined, new Error('An error occurred with ReCaptcha, please try again.'))
  }
}

const handleGlobalRecaptchaExpire = () => {
  if (latestHandler) {
    latestHandler(undefined, new Error('ReCaptcha expired, please try again.'))
  }
}

/**
 * Returns a Promise that resolves when reCAPTCHA completely loaded, or rejects if it didn't load in a timely manner.
 */
async function waitForRecaptcha(): Promise<void> {
  for (let i = 0, n = 20; i <= n; i++) {
    if (i === n) {
      throw new Error('Timed out while loading reCAPTCHA. Please try reloading the page.')
    } else if ((window as any).grecaptcha?.render) {
      break
    } else {
      await new Promise(resolve => window.setTimeout(resolve, 1000))
    }
  }
}

/**
 * Acquires a ReCaptcha token to be submitted along with forms that require ReCaptcha verification on the backend.
 *
 * Note: this function will attempt to get a token without requiring user-interaction and uses ReCaptcha v2/Invisible.
 * If the user cannot be verified to be a human, a challenge will be shown through an overlay.
 * The challenge is fully integrated into this function and no further action is necessary.
 */
export function* acquireRecaptchaToken() {
  const siteKey = process.env.GOOGLE_RECAPTCHA_KEY

  if (!siteKey) {
    // If no ReCaptcha key is available, skip validation.
    // This can be used to do validation on a per-environment opt-in basis.
    console.warn('GOOGLE_RECAPTCHA_KEY not set in environment, skipping token acquisition (using fake token)')
    return 'fake'
  }

  if (!isInitialized) {
    // Make sure recaptcha has loaded.
    // This shouldn't make a difference usually, as it's likely to be loaded by the time the user logs in.
    yield waitForRecaptcha()

    let container = document.createElement('div')
    container.id = 'global-recaptcha-container'
    document.body.insertBefore(container, document.body.firstChild)

    clientID = (window as any).grecaptcha.render(container.id, {
      sitekey: siteKey,
      size: 'invisible',
      callback: handleGlobalRecaptchaSubmit,
      'error-callback': handleGlobalRecaptchaError,
      'data-expired-callback': handleGlobalRecaptchaExpire,
      hl: 'en',
    })

    isInitialized = true
  } else {
    (window as any).grecaptcha.reset(clientID)
  }

  const promise = new Promise((resolve, reject) => {
    if (latestHandler) {
      // Since we only have 1 ReCaptcha going at any one time, reject previously started captcha that's still going.
      // This shouldn't generally happen during standard use.
      latestHandler(undefined, new Error('ReCaptcha challenge was aborted.'))
    }

    latestHandler = (response, error) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    }

    (window as any).grecaptcha.execute(clientID)
  })

  let response

  try {
    response = yield promise
    latestHandler = undefined
  } catch (error) {
    latestHandler = undefined
    throw error
  }

  return response
}
