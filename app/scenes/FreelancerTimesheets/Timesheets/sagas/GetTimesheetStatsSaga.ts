import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { put, call, takeLatest } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { SET_TIMESHEET_STATS, GET_TIMESHEET_STATS } from '../../FreelancerTimesheetsDucks'

export function* perform() {
  try {
    const stats = yield call([getAPIClient(), 'getTimesheetStats'])
    yield put(createAction(SET_TIMESHEET_STATS)({ stats }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeLatest(GET_TIMESHEET_STATS, perform)
}

export default watch
