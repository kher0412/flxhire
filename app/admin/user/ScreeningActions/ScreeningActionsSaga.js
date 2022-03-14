import { put, takeEvery, all } from 'redux-saga/effects'
import { showNotification } from 'react-admin'

function* screeningActionsSuccess() {
  yield put(showNotification('Member updated'))
}

function* screeningActionsFailure({ error }) {
  yield put(showNotification(`Error: ${error}`, 'warning'))
  console.error(error)
}

export default function* screeningActionsSaga() {
  yield all([
    takeEvery('ACCEPT_FREELANCER_SUCCESS', screeningActionsSuccess),
    takeEvery('ACCEPT_FREELANCER_FAILURE', screeningActionsFailure),
    takeEvery('REJECT_FREELANCER_SUCCESS', screeningActionsSuccess),
    takeEvery('REJECT_FREELANCER_FAILURE', screeningActionsFailure),
  ])
}
