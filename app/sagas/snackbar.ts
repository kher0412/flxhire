import { RootState } from 'reducers'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { debounce, put, select } from 'redux-saga/effects'

const WAIT_INTERVAL = 4000

function* performAutoCloseSnackbar() {
  const open = yield select((state: RootState) => state.common.snackbar.open)
  if (open) yield put(createAction(TOGGLE_SNACKBAR)({ open: false }))
}

export default function* watchSnackbar() {
  yield debounce(WAIT_INTERVAL, TOGGLE_SNACKBAR, performAutoCloseSnackbar)
}
