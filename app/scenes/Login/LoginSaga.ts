import { takeLatest, call, put, select } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { authSuccess, acquireRecaptchaToken, showSnackbarMessage } from 'sagas/__helpers'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import { restartConnection } from 'services/websockets'
import { omit } from 'lodash'
import { ICurrentUser } from 'types'
import { LOGIN_FORM, LOGIN_FORM_FAILED, LOGIN_BY_TOKEN, FORCE_LOGIN } from './LoginDucks'

function* login(action) {
  try {
    const recaptchaToken = yield acquireRecaptchaToken()
    const referer = yield select((state: RootState) => state.tracking.referer)

    const formData = {
      ...action.payload.formData,
      recaptcha_token: recaptchaToken,
      referer_url: referer,
    }
    const response = yield getAPIClient().sendLoginForm(formData)
    const { user, message } = response

    yield call(authSuccess, user)
    yield call(restartConnection)
    if (message) yield showSnackbarMessage(message)
  } catch (err) {
    console.error(err)
    yield put(createAction(LOGIN_FORM_FAILED)({ error: err.response || err.message }))
  }
}

function* loginByToken(action) {
  try {
    const auth = {
      auth_token: action.payload.token,
      email: action.payload.email,
    }

    yield call(authSuccess, auth)
    yield call(restartConnection)
  } catch (err) {
    trackError(err)
    yield put(createAction(LOGIN_FORM_FAILED)({ error: err.response || err.message }))
  }
}

function* forceLogin(action) {
  try {
    const realUser = yield select((state: RootState) => state.auth.currentUser?.real_user)
    if (action.payload.keepRealUser) {
      yield call(authSuccess, { ...omit(action.payload.currentUser, 'real_user'), real_user: realUser } as ICurrentUser)
    } else {
      yield call(authSuccess, action.payload.currentUser)
    }
    yield call(restartConnection)
  } catch (err) {
    trackError(err)
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_FORM, login)
  yield takeLatest(LOGIN_BY_TOKEN, loginByToken)
  yield takeLatest(FORCE_LOGIN, forceLogin)
}

export default watchLogin
