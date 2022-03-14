import { takeEvery, put, select } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { reset } from 'redux-form'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import { SET_INTERVIEWS } from '../../../InterviewRequests/components/InterviewRequest/InterviewRequestDucks'
import { SUBMIT_DECLINE_JOB_OFFER, CLOSE_DECLINE_JOB_OFFER_DIALOG } from '../JobOffer/JobOfferDucks'

function* perform(action) {
  try {
    yield put(createAction(CLOSE_DECLINE_JOB_OFFER_DIALOG)())
    yield put(reset('declineJobOffer'))
    yield getAPIClient().rejectContract(action.payload.jobOffer.id, action.payload.formData)

    const user = yield select((state: RootState) => state.auth.currentUser)
    const interviews = yield getAPIClient().getContracts({ freelancer_id: user?.id })
    yield put(createAction(SET_INTERVIEWS)({ interviews }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_DECLINE_JOB_OFFER, perform)
}

export default watch
