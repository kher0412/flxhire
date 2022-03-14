import { all } from 'redux-saga/effects'
import watchSubmitTimesheetForm from './SubmitTimesheetFormSaga'
import watchGetClients from './GetClientsSaga'

export default function* watch() {
  yield all([
    watchSubmitTimesheetForm(),
    watchGetClients(),
  ])
}
