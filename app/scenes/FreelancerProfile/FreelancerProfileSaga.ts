import { put, takeLatest, select, call } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { RootState } from 'reducers'
import {
  GET_FREELANCER,
  REFRESH_FREELANCER,
  REFRESH_FREELANCER_SELF,
  RESUME_PROCESSING_FINISHED,
  GET_CONTRACTS,
  setFreelancer,
  setContracts,
  setError,
} from './FreelancerProfileDucks'

function getAPICallName(id) {
  if (typeof id === 'number') {
    return 'getFreelancer'
  }
  return 'getMember'
}

export function* getFreelancer(id) {
  try {
    const user = yield select((state: RootState) => state.auth.currentUser)
    let freelancer = yield call([getAPIClient(), getAPICallName(id)], id)
    yield put(setFreelancer(freelancer))

    if (user.profile?.slug === freelancer.profile.slug) {
      // Viewing own profile
      while (['processing', 'processing_queued'].includes(freelancer.resume?.status)) {
        yield new Promise(resolve => setTimeout(resolve, 2000))
        freelancer = yield call([getAPIClient(), getAPICallName(id)], id)
        yield put(setFreelancer(freelancer))
      }
    }
  } catch (err) {
    yield put(setError(err.response || err.message || err))
    trackError(err)
  }
}

export function* getContracts() {
  try {
    const user = yield select((state: RootState) => state.auth.currentUser)
    const freelancer = yield select((state: RootState) => state.freelancer)
    const contracts = yield call([getAPIClient(), 'getContracts'], { freelancer_id: freelancer.id, firm_id: user.firm?.id })
    yield put(setContracts(contracts))
  } catch (error) {
    trackError(error)
  }
}

export function* performRefreshFreelancer() {
  const id = yield select((state: RootState) => state.freelancer.freelancerId)

  if (id) yield getFreelancer(id)
}

export function* performRefreshSelf() {
  const id = yield select((state: RootState) => state.auth.currentUser.id)

  if (id) yield getFreelancer(id)
}

export function* performGetFreelancer(action) {
  const { id } = action.payload
  if (id) yield getFreelancer(id)
}

export function* performAction(action) {
  if (action.type === GET_FREELANCER) yield performGetFreelancer(action)
  if (action.type === REFRESH_FREELANCER) yield performRefreshFreelancer()
  if (action.type === REFRESH_FREELANCER_SELF) yield performRefreshSelf()
}

export function* handleResumeProcessingFinished(action) {
  const url = yield select((state: RootState) => state.freelancer.resume?.url)
  if (action.payload?.resume?.url === url) yield performRefreshFreelancer()
}

function* watch() {
  yield takeLatest([GET_FREELANCER, REFRESH_FREELANCER, REFRESH_FREELANCER_SELF], performAction)
  yield takeLatest(RESUME_PROCESSING_FINISHED, handleResumeProcessingFinished)
  yield takeLatest(GET_CONTRACTS, getContracts)
}

export default watch
