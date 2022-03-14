import { takeLatest, put, call } from 'redux-saga/effects'
import { LOGOUT, GOTO_ADMIN } from 'reducers/Auth'
import { showSnackbarMessage } from 'sagas/__helpers'
import { deleteAuthCookie } from 'services/cookies'
import { browserHistory } from 'services/router'
import { clearState } from 'reducers'
import { closeConnection } from 'services/websockets'
import storage from 'services/localStorage'
import { KEY_LINKEDIN_AUTH_CODE } from 'services/linkedin'
import { cleanUpRelayEnvironment } from 'api/graphql'

function* logout() {
  deleteAuthCookie()
  closeConnection()
  storage.removeItem('client_team_filter_params')
  storage.removeItem(KEY_LINKEDIN_AUTH_CODE)

  yield put(clearState())
  yield call(cleanUpRelayEnvironment)
  yield showSnackbarMessage('You logged out successfully')
  yield call(browserHistory.push, '/login')
}

function* goToAdmin() {
  // Needs to be a full page load to work properly
  yield call([window, 'open'], '/admin', '_blank')
}

function* watchLogout() {
  yield takeLatest(LOGOUT, logout)
  yield takeLatest(GOTO_ADMIN, goToAdmin)
}

export default watchLogout
