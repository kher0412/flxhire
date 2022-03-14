import { all } from 'redux-saga/effects'
import watchGetTimesheet from '../../components/Timesheet/GetTimesheetSaga'
import watchGetTimesheets from './GetTimesheetsSaga'
import watchGetTimesheetStats from './GetTimesheetStatsSaga'
import watchGetInterviews from './GetContractsSaga'

export default function* watch() {
  yield all([
    watchGetTimesheet(),
    watchGetTimesheets(),
    watchGetTimesheetStats(),
    watchGetInterviews(),
  ])
}
