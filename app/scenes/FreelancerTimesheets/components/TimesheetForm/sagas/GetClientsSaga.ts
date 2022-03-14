import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { put, call, takeLatest, select } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import {
  SET_CONTRACTS,
  GET_CONTRACTS,
} from '../../../FreelancerTimesheetsDucks'

export function* perform() {
  try {
    const user = yield select((state: RootState) => state.auth.currentUser)
    const contracts = yield call([getAPIClient(), 'getContracts'], { status: 'active', freelancer_id: user?.id })
    yield put(createAction(SET_CONTRACTS)({ contracts }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeLatest(GET_CONTRACTS, perform)
}

export default watch
