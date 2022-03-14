import { perform as getContractsSaga } from './GetContractsSaga'

test('getContractsSaga', () => {
  const saga = getContractsSaga()
  saga.next()
  saga.next({ id: 1 })
  const apiCallResponse = { text: 'Hello World' }
  const next = saga.next(apiCallResponse)
  expect(next.value.payload.action.type).toEqual('flexhire/freelancer/SET_CONTRACTS')
  expect(next.value.payload.action.payload).toEqual({ contracts: apiCallResponse })
  expect(saga.next().done).toBeTruthy()
})
