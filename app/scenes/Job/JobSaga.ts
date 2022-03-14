import { createAction } from 'redux-actions'
import {
  put, call, takeLatest, select,
} from 'redux-saga/effects'
import { ICurrentUser, IJob, IContractForFreelancer } from 'types'
import { trackError, trackEvent } from 'services/analytics'
import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { showSnackbarMessage, getCurrentUser } from 'sagas/__helpers'
import { RootState } from 'reducers'
import { GET_JOB, SET_JOB, JOB_ERROR, APPLY_FOR_JOB, APPLIED_TO_JOB } from './JobDucks'

export function* performGetJob(action) {
  try {
    const { id } = action.payload
    const job: IJob = yield call([getAPIClient(), 'getJob'], id)

    yield put(createAction(SET_JOB)(job))
  } catch (err) {
    trackError(err)
    yield put(createAction(JOB_ERROR)({
      error: err.message || err,
    }))
  }
}

export function* performApplyForJob(action) {
  try {
    const { jobId, status } = action.payload
    const referer = yield select((state: RootState) => state.tracking.referer)
    const ref = yield select((state: RootState) => state.tracking.ref)
    const contract: IContractForFreelancer = yield call([getAPIClient(), 'applyUserToJob'], jobId, { status, referer_url: referer, ref })
    yield put(createAction(APPLIED_TO_JOB)({ contract }))
  } catch (err) {
    trackError(err)
    if (action?.payload?.send) yield showSnackbarMessage('An error occurred while applying for job.')
  }
}

export function* performAppliedForJob(action) {
  const contract = action.payload.contract as IContractForFreelancer
  if (contract.status === 'job_application_sent') {
    const user: ICurrentUser = yield select((state: RootState) => state.auth.currentUser)
    // When pending freelancers apply to a job, send them to their homepage
    // so they can complete their profile
    if (user.status === 'pending') {
      // Refresh current user (needed for profile editing)
      yield getCurrentUser()
      yield call(browserHistory.push, '/profile')
      yield showSnackbarMessage('Complete your Profile to Apply')
    } else {
      yield showSnackbarMessage('Job application sent!')
      trackEvent('Job Application Sent')
    }
  } else if (contract.status === 'job_viewed') {
    trackEvent('Job Viewed')
  } else if (contract.status === 'job_application_draft') {
    trackEvent('Job Application Drafted')
  }
}

function* watch() {
  yield takeLatest(GET_JOB, performGetJob)
  yield takeLatest(APPLY_FOR_JOB, performApplyForJob)
  yield takeLatest(APPLIED_TO_JOB, performAppliedForJob)
}

export default watch
