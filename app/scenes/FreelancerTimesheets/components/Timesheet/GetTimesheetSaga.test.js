import { perform as getTimesheetSaga } from './GetTimesheetSaga'

test('getTimesheetSaga', () => {
  const action = {
    payload: {
      id: 1
    }
  }
  const saga = getTimesheetSaga(action)
  const timesheet = {
    id: 1,
    content: 'hello world'
  }
  saga.next()
  const next = saga.next(timesheet)
  expect(next.value.payload.action.type).toEqual('flexhire/freelancer/SET_TIMESHEET')
  expect(next.value.payload.action.payload).toEqual({ timesheet })
})
