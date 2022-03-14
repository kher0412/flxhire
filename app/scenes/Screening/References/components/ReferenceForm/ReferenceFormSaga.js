import { takeEvery, call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { getAPIClient } from 'api'
import { showSnackbarMessage, getCurrentUser } from 'sagas/__helpers'
import { trackError, trackEvent } from 'services/analytics'
import { SUBMIT_REFERENCE_FORM, DELETE_REFERENCE, setReferences, submitReferenceFormFailed } from './ReferenceFormDucks'

function* submitReferenceFormGenerator(action) {
  try {
    let references = yield getAPIClient().sendProfileReferenceForm(action.formData)

    yield put(setReferences(references))
    yield put(reset('profileReference'))
    yield call(getCurrentUser)
    trackEvent('Member profile - add reference')
  } catch (err) {
    trackError(err)
    yield put(submitReferenceFormFailed(err.response))
    yield showSnackbarMessage('Submit failed')
  }
}

function* deleteReferenceGenerator(action) {
  try {
    let references = yield getAPIClient().sendDeleteReference(action.id)
    trackEvent('Member profile - delete reference')
    yield put(setReferences(references))
  } catch (err) {
    yield showSnackbarMessage('Delete failed')
  }
}

export function* watchSubmitReference() {
  yield takeEvery(SUBMIT_REFERENCE_FORM, submitReferenceFormGenerator)
}

export function* watchDeleteReference() {
  yield takeEvery(DELETE_REFERENCE, deleteReferenceGenerator)
}
