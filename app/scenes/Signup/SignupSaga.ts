import { takeEvery, call, put, takeLatest, select } from 'redux-saga/effects'
import { authSuccess, acquireRecaptchaToken, showSnackbarMessage } from 'sagas/__helpers'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { api as apiConfig } from 'config'
import { IUserType } from 'types'
import { RootState } from 'reducers'
import { browserHistory } from 'services/router'
import { SIGNUP_FORM, submitSignupFormFailed, GET_JOB_DATA, setJobData } from './SignupDucks'

/**
 * @param {string} userType
 * @returns {string}
 */
function getRoute(userType: IUserType) {
  if (userType === 'member') {
    return apiConfig.routes.auth.freelancer_signup
  } if (userType === 'client') {
    return apiConfig.routes.auth.client_signup
  }
  throw new Error(`Invalid userType '${userType}'`)
}

export function* performSignup(action) {
  try {
    const recaptchaToken = yield acquireRecaptchaToken()
    const referer = yield select((state: RootState) => state.tracking.referer)
    const { companyName, ...formData } = action.payload.formData
    const userType = action.payload.userType as IUserType

    const response = yield call([getAPIClient(), 'post'], getRoute(userType), {
      user: { ...formData, referer_url: referer },
      firm: { company_name: companyName },
      recaptcha_token: recaptchaToken,
      remember: true,
    })

    const { user, message } = response

    yield call(authSuccess, user)

    if (message) yield showSnackbarMessage(message)

    if (action.payload.clientData && action.payload.clientData.isJobMode) {
      const { freelancerType, freelancerSubtype } = action.payload.clientData

      // note: this will work with the current email confirmation step through a redirect URL
      if (freelancerType && freelancerSubtype) {
        browserHistory.push(`/client/job/add_job/job?freelancer_type=${freelancerType}&freelancer_subtype=${freelancerSubtype}&mode=signup`)
      } else {
        browserHistory.push('/client/job/add_job/job?mode=signup')
      }
    }
  } catch (err) {
    // Note: Do not track "Unprocessable Entity" errors
    if (err.code !== 422) trackError(err)
    yield showSnackbarMessage(err.response || err.message)
    yield put(submitSignupFormFailed(err.response || err.message))
  }
}

function* performGetJobData(action) {
  try {
    const slug = action.payload.slug
    if (slug) {
      const job = yield call([getAPIClient(), 'getJob'], slug)
      yield put(setJobData(job))
    } else {
      yield put(setJobData(null))
    }
  } catch (error) {
    trackError(error)
  }
}

function* watchSignup() {
  yield takeEvery(SIGNUP_FORM, performSignup)
  yield takeLatest(GET_JOB_DATA, performGetJobData)
}

export default watchSignup
