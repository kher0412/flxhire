import { takeLatest, select } from 'redux-saga/effects'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { RootState } from 'reducers'
import { startRemoteJSAgent, removeExistingAgent } from 'services/remoteDebug'
import { ICurrentUser } from 'types'

function* performStartRemoteDebug() {
  const user: ICurrentUser = yield select((state: RootState) => state.auth.currentUser)
  if (user.remote_debug_code) {
    startRemoteJSAgent(user.remote_debug_code)
  } else {
    removeExistingAgent()
  }
}

export default function* watchRemoteDebug() {
  yield takeLatest(SET_CURRENT_USER, performStartRemoteDebug)
}
