import { put, takeEvery, all } from 'redux-saga/effects'
import { showNotification } from 'react-admin'

function* payReferralSuccess() {
  yield put(showNotification('Referral payment scheduled'))
}

function* payReferralFailure({ error }) {
  yield put(showNotification(`Error: ${error}`, 'warning'))
  console.error(error)
}

export default function* payReferralSaga() {
  yield all([
    takeEvery('PAY_INVOICE_SUCCESS', payReferralSuccess),
    takeEvery('PAY_INVOICE_FAILURE', payReferralFailure),
  ])
}
