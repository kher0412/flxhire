import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { put, call, takeLatest } from 'redux-saga/effects'
import { SET_TIMESHEET, GET_TIMESHEET } from '../../FreelancerTimesheetsDucks'

export function* perform(action) {
  try {
    const id = action.payload.id
    const timesheet = yield call([getAPIClient(), 'getTimesheet'], id)
    yield put(createAction(SET_TIMESHEET)({ timesheet }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeLatest(GET_TIMESHEET, perform)
}

export default watch
