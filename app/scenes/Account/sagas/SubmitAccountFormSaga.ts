import { takeEvery, call, put, select } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { getCurrentUser, showSnackbarMessage } from 'sagas/__helpers'
import { trackError } from 'services/analytics'
import { isMember } from 'services/user'
import { SUBMIT_ACCOUNT_FORM, SUBMIT_ACCOUNT_FORM_FAILED, SUBMIT_ACCOUNT_FORM_SUCCESS } from '../AccountDucks'

function* perform(action) {
  try {
    const currentUser = yield select(state => state.auth.currentUser)
    const { user } = action.payload
    const { formData } = action.payload

    if (isMember(currentUser) && user) {
      formData.profile_attributes = user.profile

      if (formData.visibility) {
        formData.profile_attributes.visibility = formData.visibility
      }
    }

    yield call([getAPIClient(), 'updateUser'], currentUser.id, action.payload.formData)
    yield put(createAction(SUBMIT_ACCOUNT_FORM_SUCCESS)())

    yield call(getCurrentUser)
    yield showSnackbarMessage('Account updated')
  } catch (err) {
    yield put(createAction(SUBMIT_ACCOUNT_FORM_FAILED)({ error: err.response }))
    yield showSnackbarMessage('Submit failed')
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(SUBMIT_ACCOUNT_FORM, perform)
}

export default watch
