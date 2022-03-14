import { takeEvery, put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { showSnackbarMessage } from 'sagas/__helpers'
import { SUBMIT_GIVE_REFERENCE_FORM, submitGiveReferenceFormFailed } from './GiveReferenceDucks'

function* submitGiveReferenceFormGenerator(action) {
  try {
    yield getAPIClient().sendProfileGiveReferenceForm(action.formData)
    yield put(reset('profileGiveReference'))
    yield call(browserHistory.push, '/reference_submitted')
  } catch (err) {
    trackError(err)
    yield put(submitGiveReferenceFormFailed(err.response))
    yield showSnackbarMessage('Submit failed')
  }
}

function* watch() {
  yield takeEvery(SUBMIT_GIVE_REFERENCE_FORM, submitGiveReferenceFormGenerator)
}

export default watch
