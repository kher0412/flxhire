import { getAPIClient } from 'api'
import { cleanUpRelayEnvironment} from 'api/graphql'
import { clearState, RootState } from 'reducers'
import { setCurrentUser } from 'reducers/Auth'
import { getDefaultPath } from 'services/auth'
import { browserHistory } from 'services/router'
import { ICurrentUser } from 'types'
import { restartConnection } from './websockets'

export type IMasqPayload = { id: number } | { slug: string } | { email: string }

function reloadApp(user: ICurrentUser, realUser?: ICurrentUser) {
  const w = window as any
  let newUser = { ...user }
  if (realUser) newUser.real_user = realUser
  w.reduxStore.dispatch(clearState())
  w.reduxStore.dispatch(setCurrentUser({ currentUser: newUser }))
  cleanUpRelayEnvironment()
  restartConnection()
  browserHistory.push(getDefaultPath(user))
}

export async function masqAsUser(record: IMasqPayload) {
  const w = window as any
  const state = w.reduxStore.getState() as RootState
  const oldCurrentUser = state.auth.currentUser
  const realUser = oldCurrentUser?.real_user || oldCurrentUser
  const user = await getAPIClient().masq(record)
  reloadApp(user, realUser)
}

export async function unmasq() {
  const user = await getAPIClient().unmasq()
  reloadApp(user)
}
