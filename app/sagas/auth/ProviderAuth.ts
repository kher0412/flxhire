import { call, put, takeLatest } from 'redux-saga/effects'
import { PROVIDER_AUTH_START, PROVIDER_AUTH_FAILED } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { authSuccess } from 'sagas/__helpers'
import { trackError } from 'services/analytics'

function* providerAuth(action) {
  try {
    if (!action?.payload?.code) throw new Error('Missing oauth code') // access token
    const response = yield getAPIClient().oauth(action.payload.provider, action.payload.code, action.payload.user_type)
    yield call(authSuccess, response)
  } catch (err) {
    yield put(createAction(PROVIDER_AUTH_FAILED)({ error: err.response || err.message }))
    trackError(err)
  }
}

function* watchProviderAuthStart() {
  yield takeLatest(PROVIDER_AUTH_START, providerAuth)
}

export default watchProviderAuthStart
