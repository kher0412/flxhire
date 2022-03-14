import { takeEvery, call, put } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { showSnackbarMessage, getCurrentUser } from 'sagas/__helpers'
import { SUBMIT_COMPANY_FORM, SUBMIT_COMPANY_FORM_FAILED } from '../AccountDucks'

function* perform(action) {
  try {
    let formData = action.payload.formData

    if (formData.alternative_background !== undefined) {
      formData = {
        ...formData,
        background_theme: formData.alternative_background ? 'light' : 'default',
      }
    }

    yield getAPIClient().updateFirm({ ...formData })
    yield call(getCurrentUser)
    yield showSnackbarMessage('Company details saved')
  } catch (err) {
    yield put(createAction(SUBMIT_COMPANY_FORM_FAILED)({ error: err.response }))
    yield showSnackbarMessage('Could not save company details')
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_COMPANY_FORM, perform)
}

export default watch
