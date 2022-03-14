import { createAction } from 'redux-actions'
import { select, put, takeEvery, call } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { GET_MANAGERS, SET_MANAGER_COUNT } from './ClientPageTitleDuck'

function* perform() {
  try {
    const teamManagerCount = yield select(state => state.clientPageTitle.teamManagerCount)
    if (teamManagerCount === null) {
      const firmAdmins = yield call([getAPIClient(), 'getGodfatherFirm'])
      const invitations = yield call([getAPIClient(), 'getColleaguesInvitations'])
      yield put(createAction(SET_MANAGER_COUNT)({ teamManagerCount: invitations.concat(firmAdmins).length }))
    }
  } catch (err) {
    console.log(err)
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(GET_MANAGERS, perform)
}

export default watch
