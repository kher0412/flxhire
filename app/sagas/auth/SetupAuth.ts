import { takeLatest } from 'redux-saga/effects'
import { getCurrentUser } from 'sagas/__helpers'
import { SETUP_AUTH } from 'reducers/Auth'

function* setupAuth() {
  yield getCurrentUser()
}

function* watchSetupAuth() {
  yield takeLatest(SETUP_AUTH, setupAuth)
}

export default watchSetupAuth
