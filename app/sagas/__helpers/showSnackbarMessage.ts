import { put } from 'redux-saga/effects'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'

export function* showSnackbarMessage(message) {
  yield put(createAction(TOGGLE_SNACKBAR)({ message }))
}
