import { takeEvery, put, call } from 'redux-saga/effects'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { browserHistory } from 'services/router'
import { trackEvent, trackError } from 'services/analytics'
import {
  START_APPLICATION,
  START_APPLICATION_ERROR,
  CANCEL_APPLICATION,
  START_APPLICATION_SUCCESS,
} from './ReviewDucks'

function* startApplication() {
  try {
    const response = yield getAPIClient().sendStartApplication()
    yield put(createAction(SET_CURRENT_USER)({ currentUser: response }))
    yield put(createAction(START_APPLICATION_SUCCESS)())
    yield call(browserHistory.push, '/application')
  } catch (error) {
    yield put(createAction(START_APPLICATION_ERROR)({ error: error.message || error }))
    yield put(createAction(TOGGLE_SNACKBAR)({ message: error.message || error }))
    trackError(error)
  }
  trackEvent('Member application - started')
}

function* cancelApplication() {
  try {
    const response = yield getAPIClient().sendCancelApplication()
    yield put(createAction(SET_CURRENT_USER)({ currentUser: response }))
    trackEvent('Member application - canceled')
    yield call(browserHistory.push, '/member/dashboard')
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Application canceled' }))
  } catch (error) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: error.message || error }))
    trackError(error)
  }
}

function* watch() {
  yield takeEvery(START_APPLICATION, startApplication)
  yield takeEvery(CANCEL_APPLICATION, cancelApplication)
}

export default watch
