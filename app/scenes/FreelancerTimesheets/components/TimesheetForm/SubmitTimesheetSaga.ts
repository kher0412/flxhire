import { takeEvery, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { trackError, trackEvent } from 'services/analytics'
import { getErrorText } from 'services/error'
import { showSnackbarMessage } from 'sagas/__helpers'
import { SUBMIT_TIMESHEET, SUBMIT_TIMESHEET_SUCCEEDED, SUBMIT_TIMESHEET_FAILED } from '../../FreelancerTimesheetsDucks'

function* perform(action) {
  try {
    const formData = action.payload.formData

    if (formData.id) {
      yield call([getAPIClient(), 'sendUpdateTimesheet'], formData.id, formData)
      trackEvent('Member Update Timesheet')
    } else {
      yield call([getAPIClient(), 'sendTimesheet'], formData)
      trackEvent('Member Create Timesheet')
    }

    yield put(createAction(SUBMIT_TIMESHEET_SUCCEEDED)())
    yield call(browserHistory.push, '/member/work_reports')
  } catch (err) {
    trackError(err)
    yield put(createAction(SUBMIT_TIMESHEET_FAILED)({ error: getErrorText(err) }))
    yield showSnackbarMessage(getErrorText(err))
  }
}

function* watch() {
  yield takeEvery(SUBMIT_TIMESHEET, perform)
}

export default watch
