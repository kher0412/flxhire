import { takeEvery, put } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { reset } from 'redux-form'
import { showSnackbarMessage } from 'sagas/__helpers'
import { trackEvent, trackError } from 'services/analytics'
import {
  SUBMIT_ACCEPT_INTERVIEW,
  ACCEPT_INTERVIEW,
  SKIP_INTERVIEW,
  CLOSE_ACCEPT_INTERVIEW_DIALOG,
  SUBMIT_ACCEPT_INTERVIEW_FAILED,
} from '../InterviewRequest/InterviewRequestDucks'

function* perform(action) {
  try {
    yield put(createAction(CLOSE_ACCEPT_INTERVIEW_DIALOG)())
    yield put(reset('acceptInterview'))

    if (action.payload.formData?.interview_date === 'none') {
      // reject interview
      yield getAPIClient().rejectContract(action.payload.interview.id, {
        ...action.payload.formData,
        freelancer_feedback: action.payload.formData.freelancer_message,
      })

      trackEvent('Member Skip Interview')

      yield put(createAction(SKIP_INTERVIEW)({
        interview: action.payload.interview,
      }))

      yield showSnackbarMessage('Interview rejected')
    } else {
      // accept interview
      yield getAPIClient().acceptContract(action.payload.interview.id, action.payload.formData)
      trackEvent('Member Accept Interview')
      yield put(createAction(ACCEPT_INTERVIEW)({ interview: action.payload.interview, formData: action.payload.formData }))
      yield showSnackbarMessage('Interview accepted')
    }
  } catch (err) {
    trackError(err)
    yield put(createAction(SUBMIT_ACCEPT_INTERVIEW_FAILED)({ error: err.response }))
    yield showSnackbarMessage('Submit failed')
  }
}

function* watch() {
  yield takeEvery(SUBMIT_ACCEPT_INTERVIEW, perform)
}

export default watch
