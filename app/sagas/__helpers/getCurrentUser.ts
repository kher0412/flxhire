import { call, put, select, takeLatest } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { GET_CURRENT_USER, SET_CURRENT_USER, SET_LOGGED_OUT, SET_CONFIGURATION } from 'reducers/Auth'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { ICurrentUser } from 'types'

export function* getCurrentUser() {
  let currentUser: ICurrentUser
  let configuration = yield select(state => state.auth.currentUser?.configuration) || { loading: true }

  try {
    currentUser = yield call([getAPIClient(), 'getCurrentUser'])
  } catch (e) {
    console.log(e)
    // 401 means the token has expired. However if we get another error code it should be tracked!
    if (e.code !== 401) trackError(e)
  }

  if (currentUser?.id) {
    yield put(createAction(SET_CURRENT_USER)({ currentUser }))
  } else {
    yield put(createAction(SET_LOGGED_OUT)())
    // We refresh guest configuration settings from the backend.
    // If the user is logged in it's not needed, they come with CurrentUser
    try {
      configuration = yield call([getAPIClient(), 'getConfiguration'])
      yield put(createAction(SET_CONFIGURATION)({ configuration }))
    } catch (error) {
      trackError(error)
    }
  }
}

export default function* watchCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser)
}
