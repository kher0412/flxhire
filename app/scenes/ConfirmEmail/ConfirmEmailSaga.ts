import { takeLatest, call, put, select } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getCurrentUser } from 'sagas/__helpers'
import { browserHistory } from 'services/router'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { isMember } from 'services/user'
import {
  CONFIRM_EMAIL_FORM,
  CONFIRM_EMAIL_FORM_FAILED,
  CONFIRM_EMAIL_FORM_SUCCEEDED,
  SEND_CONFIRMATION_EMAIL,
  SEND_CONFIRMATION_EMAIL_SUCCEEDED,
  SEND_CONFIRMATION_EMAIL_FAILED,
} from './ConfirmEmailDucks'

function* confirmEmail(action) {
  try {
    let user = yield select(state => state.auth.currentUser)
    if (action.payload.formData.token) {
      yield call([getAPIClient(), 'confirmEmail'], { token: action.payload.formData.token.trim() })
      yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Email confirmed!' }))
      yield call(getCurrentUser)
      user = yield select(state => state.auth.currentUser)
      if (!user.id) yield call(browserHistory.push, '/login')
    } else if (user) {
      yield call([getAPIClient(), 'updateUser'], user.id, { email: action.payload.formData.email })
      yield call(getCurrentUser)
      yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Email sent, check your inbox' }))
    }

    yield put(createAction(CONFIRM_EMAIL_FORM_SUCCEEDED)())
  } catch (err) {
    yield put(createAction(CONFIRM_EMAIL_FORM_FAILED)({ error: err.response || err.message }))
    trackError(err)
  }
}

function* sendConfirmationEmail() {
  try {
    yield call([getAPIClient(), 'sendConfirmationEmail'])
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Email sent, check your inbox' }))
    yield put(createAction(SEND_CONFIRMATION_EMAIL_SUCCEEDED)())
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message }))
    yield put(createAction(SEND_CONFIRMATION_EMAIL_FAILED)())
    trackError(err)
  }
}

function* watchConfirmEmail() {
  yield takeLatest(CONFIRM_EMAIL_FORM, confirmEmail)
  yield takeLatest(SEND_CONFIRMATION_EMAIL, sendConfirmationEmail)
}

export default watchConfirmEmail
