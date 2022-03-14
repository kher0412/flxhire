import { takeEvery, put } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { reset } from 'redux-form'
import { trackEvent, trackError } from 'services/analytics'
import { showSnackbarMessage } from 'sagas/__helpers'
import {
  SUBMIT_SKIP_INTERVIEW,
  SKIP_INTERVIEW,
  CLOSE_SKIP_INTERVIEW_DIALOG,
} from '../InterviewRequest/InterviewRequestDucks'

function* perform(action) {
  try {
    yield put(createAction(CLOSE_SKIP_INTERVIEW_DIALOG)())
    yield put(reset('skipInterview'))
    yield getAPIClient().rejectContract(action.payload.interview.id, action.payload.formData)
    trackEvent('Member Skip Interview')
    yield put(createAction(SKIP_INTERVIEW)({ interview: action.payload.interview }))
    yield showSnackbarMessage('Interview rejected')
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_SKIP_INTERVIEW, perform)
}

export default watch
