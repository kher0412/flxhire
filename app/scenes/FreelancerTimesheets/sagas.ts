import { all } from 'redux-saga/effects'
import watchTimesheetForm from './components/TimesheetForm/sagas'
import watchTimesheets from './Timesheets/sagas'
import watchSubmitTimesheet from './components/TimesheetForm/SubmitTimesheetSaga'
import watchSubmitTimesheetToClient from './SubmitTimesheetToClientSaga'
import watchDeleteDialog from './components/DeleteDialog/DeleteDialogSaga'

export default function* watch() {
  yield all([
    watchTimesheetForm(),
    watchTimesheets(),
    watchSubmitTimesheet(),
    watchSubmitTimesheetToClient(),
    watchDeleteDialog(),
  ])
}
