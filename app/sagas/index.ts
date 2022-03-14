import { trackError } from 'services/analytics'
import { all } from 'redux-saga/effects'
import auth from 'sagas/auth'
import freelancer from 'sagas/freelancer'
import client from 'sagas/client'
import common from 'sagas/common'
import profile from 'scenes/Profile/ProfileSaga'
import screening from 'scenes/Screening/ScreeningSagas'
import chat from './chat'
import debug from './debug'
import timezone from './timezone'
import snackbar from './snackbar'

export default function* rootSaga() {
  try {
    yield all([
      ...auth,
      ...freelancer,
      ...client,
      ...common,
      ...screening,
      chat(),
      profile(),
      debug(),
      timezone(),
      snackbar(),
    ])
  } catch (e) {
    // TODO: these errors can be quite fatal. We should figure out
    // some kind of recovery mechanism or at least tell the user the
    // app needs to be reloaded
    trackError(e)
  }
}
