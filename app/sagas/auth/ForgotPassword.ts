import { takeEvery, put, call } from 'redux-saga/effects'
import { FORGOT_PASSWORD_FORM } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { reset, SubmissionError } from 'redux-form'
import { showSnackbarMessage } from 'sagas/__helpers'

function* forgotPassword(action) {
  const { formData, resolve, reject } = action.payload

  try {
    const response = yield getAPIClient().sendForgotPasswordForm(formData)
    yield call(resolve)
    yield put(reset('resetPassword'))
    yield showSnackbarMessage(response?.message || 'An email has been sent to your inbox to reset your password if the account was found')
  } catch (err) {
    const error = new SubmissionError({ _error: err.response })
    yield call(reject, error)
  }
}

function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD_FORM, forgotPassword)
}

export default watchForgotPassword
