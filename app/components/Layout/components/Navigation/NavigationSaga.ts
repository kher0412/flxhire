import { takeLatest, put, call } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { SET_BADGE_DATA, GET_BADGE_DATA, IBadgeData } from './NavigationDucks'

function* perform() {
  // Invoices
  const invoices = yield call([getAPIClient(), 'getClientInvoicesSummary'])
  const unpaidInvoices = invoices.body.unpaidCount
  const overdueInvoices = invoices.body.overdueCount

  // Timesheets
  const timesheets = yield call([getAPIClient(), 'getClientTimesheetsSummary'], { status: 'submitted' })
  const allTimesheets = yield call([getAPIClient(), 'getClientTimesheetsSummary'], {})
  const toApproveTimesheets = timesheets.body.count

  yield put(createAction(SET_BADGE_DATA)({
    badgeData: {
      unpaidInvoices,
      overdueInvoices,
      timesheetCount: toApproveTimesheets,
      allTimesheetCount: allTimesheets.body.count,
    } as IBadgeData,
  }))
}

function* watch() {
  yield takeLatest(GET_BADGE_DATA, perform)
}

export default watch
