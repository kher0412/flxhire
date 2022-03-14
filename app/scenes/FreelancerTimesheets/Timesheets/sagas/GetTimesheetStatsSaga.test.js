import { perform as getTimesheetStatsSaga } from './GetTimesheetStatsSaga'

test('getTiemsheetStatsSaga', () => {
  const saga = getTimesheetStatsSaga()
  const apiCallResult = {
    text: 'hello world'
  }
  saga.next()
  const next = saga.next(apiCallResult)
  expect(next.value.payload.action.type).toEqual('flexhire/freelancer/SET_TIMESHEET_STATS')
  expect(next.value.payload.action.payload).toEqual({ stats: apiCallResult })
  expect(saga.next().done).toBeTruthy()
})
