import { takeEvery, put, call, select } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { browserHistory } from 'services/router'
import { trackEvent } from 'services/analytics'
import { SUBMIT_DELETE_TIMESHEET, CLOSE_DELETE_DIALOG, DELETE_TIMESHEET } from 'scenes/FreelancerTimesheets/FreelancerTimesheetsDucks'
import { getAPIClient } from 'api'

function* perform(action) {
  try {
    yield getAPIClient().deleteTimesheet(action.payload.id)
    const isUpdatesStore = (yield select()).freelancerTimesheets.deleteDialog.isUpdatesStore
    yield put(createAction(CLOSE_DELETE_DIALOG)())
    trackEvent('Member Timesheet Delete')

    if (isUpdatesStore) {
      yield put({
        type: DELETE_TIMESHEET,
        payload: {
          id: action.payload.id,
        },
      })
    } else {
      yield call(browserHistory.push, '/member/work_reports')
    }
  } catch (exception) {
    console.error(exception)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_DELETE_TIMESHEET, perform)
}

export default watch
