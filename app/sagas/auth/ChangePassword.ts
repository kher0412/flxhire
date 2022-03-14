import { takeEvery, call, put } from 'redux-saga/effects'
import { CHANGE_PASSWORD_FORM, CHANGE_PASSWORD_FORM_FAILED } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { authSuccess } from 'sagas/__helpers'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'

function* freelancerSignup(action) {
  try {
    let response = yield getAPIClient().sendChangePasswordForm(action.payload.formData)
    yield call(authSuccess, response)
  } catch (err) {
    yield put(createAction(CHANGE_PASSWORD_FORM_FAILED)({ error: err.response }))
    trackError(err)
  }
}

function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_FORM, freelancerSignup)
}

export default watchChangePassword
