import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { select, put, call, takeLatest } from 'redux-saga/effects'
import { get } from 'lodash'
import { isInteger } from 'services/numbers'
import { SET_TIMESHEETS, GET_TIMESHEETS, ROWS_PER_PAGE } from '../../FreelancerTimesheetsDucks'

export function* perform(action) {
  try {
    const state = yield select()
    const payload = action.payload
    const page = isInteger(get(payload, 'page')) ? payload.page : get(state, 'freelancerTimesheets.pagination.page', 0)
    const rowsPerPage = get(payload, 'rowsPerPage') || get(state, 'freelancerTimesheets.pagination.rowsPerPage', ROWS_PER_PAGE)
    const apiParams = {
      page: page + 1,
      per_page: rowsPerPage,
    }
    const response = yield call([getAPIClient(), 'getFreelancerTimesheets'], apiParams)
    const propsToUpdate = {
      timesheets: response.body,
      count: response.headers.totalCount,
      page: page || 0,
      rowsPerPage: rowsPerPage || ROWS_PER_PAGE,
    }
    yield put(createAction(SET_TIMESHEETS)(propsToUpdate))
  } catch (err) {
    console.error(err)
  }
}

function* watch() {
  yield takeLatest(GET_TIMESHEETS, perform)
}

export default watch
