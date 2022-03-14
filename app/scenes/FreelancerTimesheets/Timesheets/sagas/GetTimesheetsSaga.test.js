import { perform as getTimesheetsSaga } from './GetTimesheetsSaga'

test('getTimesheetsSaga', () => {
  const action = {
    payload: {
      page: 1,
      rowsPerPage: 25
    }
  }
  const saga = getTimesheetsSaga(action)
  const response = {
    body: [],
    headers: {
      totalCount: 100
    }
  }
  saga.next()
  saga.next()
  const next = saga.next(response)
  expect(next.value.payload.action.type).toEqual('flexhire/freelancer/SET_TIMESHEETS')
  expect(next.value.payload.action.payload).toEqual({
    timesheets: response.body,
    count: 100,
    page: 1,
    rowsPerPage: 25
  })
})
