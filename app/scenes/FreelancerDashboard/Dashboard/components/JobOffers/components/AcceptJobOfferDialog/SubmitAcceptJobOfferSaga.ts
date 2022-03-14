import { takeEvery, put, select } from 'redux-saga/effects'
import { RootState } from 'reducers'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { reset } from 'redux-form'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { SET_INTERVIEWS } from '../../../InterviewRequests/components/InterviewRequest/InterviewRequestDucks'
import { SUBMIT_ACCEPT_JOB_OFFER, CLOSE_ACCEPT_JOB_OFFER_DIALOG } from '../JobOffer/JobOfferDucks'

function* perform(action) {
  try {
    yield put(createAction(CLOSE_ACCEPT_JOB_OFFER_DIALOG)())
    yield put(reset('acceptJobOffer'))
    yield getAPIClient().acceptContract(action.payload.jobOffer.id, action.payload.formData)
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Offer accepted' }))

    const user = yield select((state: RootState) => state.auth.currentUser)
    const interviews = yield getAPIClient().getContracts({ freelancer_id: user?.id })
    yield put(createAction(SET_INTERVIEWS)({ interviews }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_ACCEPT_JOB_OFFER, perform)
}

export default watch
