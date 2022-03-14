import { takeLatest, call, put, select } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getCurrentUser } from 'sagas/__helpers'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { isMember } from 'services/user'
import {
  SET_PASSWORD,
  SET_PASSWORD_FAILED,
  SET_PASSWORD_SUCCEEDED,
} from './PasswordSetupDucks'

function* passwordSetup(action) {
  try {
    const user = yield select(state => state.auth.currentUser)
    if (user.password_setup_required && action.payload?.formData) {
      yield call([getAPIClient(), 'updateUser'], user.id, action.payload.formData)
      yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Password set!' }))
      yield call(getCurrentUser)

      yield put(createAction(SET_PASSWORD_SUCCEEDED)())
    }
  } catch (err) {
    yield put(createAction(SET_PASSWORD_FAILED)({ error: err.response || err.message }))
    trackError(err)
  }
}

function* watchPasswordSetup() {
  yield takeLatest(SET_PASSWORD, passwordSetup)
}

export default watchPasswordSetup
