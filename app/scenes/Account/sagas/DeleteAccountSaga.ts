import { takeEvery, put, select } from 'redux-saga/effects'
import { LOGOUT } from 'reducers/Auth'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { showSnackbarMessage } from 'sagas/__helpers'
import { trackError, trackEvent } from 'services/analytics'
import { DELETE_ACCOUNT } from '../AccountDucks'

function* perform(action) {
  try {
    const user = yield select(state => state.auth.currentUser)
    yield getAPIClient().deleteUser(user.id, {
      password: action.payload.password,
    })
    trackEvent('Delete Account')

    yield put(createAction(LOGOUT)())
  } catch (err) {
    yield showSnackbarMessage(`Deletion failed: ${err.response || err.message || err}`)
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(DELETE_ACCOUNT, perform)
}

export default watch
