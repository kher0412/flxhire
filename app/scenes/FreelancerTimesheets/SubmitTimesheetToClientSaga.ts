import { takeEvery, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { showSnackbarMessage } from 'sagas/__helpers'
import { trackEvent, trackError } from 'services/analytics'
import { getErrorText } from 'services/error'
import {
  SUBMIT_TIMESHEET_TO_CLIENT,
  GET_TIMESHEETS,
} from './FreelancerTimesheetsDucks'

function* perform(action) {
  try {
    yield call([getAPIClient(), 'sendSubmitTimesheet'], action.payload.id)
    yield showSnackbarMessage('Report submitted')
    // Refresh timesheets
    yield put(createAction(GET_TIMESHEETS)())
    yield call(trackEvent, 'Member Timesheet Submission')
  } catch (err) {
    trackError(err)
    yield showSnackbarMessage(getErrorText(err))
  }
}

function* watch() {
  yield takeEvery(SUBMIT_TIMESHEET_TO_CLIENT, perform)
}

export default watch
