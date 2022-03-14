import { call, put, select } from 'redux-saga/effects'
import { LOGIN } from 'reducers/Auth'
import { RootState } from 'reducers'
import { ICurrentUser } from 'types'
import { isGuest } from 'services/user'
import { cleanUpRelayEnvironment } from 'api/graphql'
import { getCurrentUser } from './getCurrentUser'

export function* authSuccess(auth: Partial<ICurrentUser>) {
  const currentUser = yield select((state: RootState) => state.auth.currentUser)
  const shouldReloadCurrentUser = !currentUser || isGuest(currentUser) || currentUser.id !== auth.id || currentUser.ssr
  if (shouldReloadCurrentUser) {
    yield call(cleanUpRelayEnvironment)
    yield call(getCurrentUser)
  }
  yield put({ type: LOGIN })
}
