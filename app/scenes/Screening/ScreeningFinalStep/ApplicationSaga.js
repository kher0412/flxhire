import { takeEvery, put, all } from 'redux-saga/effects'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { trackEvent } from 'services/analytics'
import { SUBMIT_APPLICATION } from './ApplicationDucks'
import { watchSubmitProject } from './components/ProjectForm/ProjectFormSaga'

function* submitApplication(action) {
  let response = yield getAPIClient().sendSubmitApplication()
  yield put(createAction(SET_CURRENT_USER)({ currentUser: response }))
  trackEvent('Member application - submitted')
}

function* watchSubmitApplication() {
  yield takeEvery(SUBMIT_APPLICATION, submitApplication)
}

function* watch() {
  yield all([
    watchSubmitApplication(),
    watchSubmitProject(),
  ])
}

export default watch
