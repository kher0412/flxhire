import { getAPIClient } from 'api'
import { call, takeLatest, select } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { getCurrentUser } from 'sagas/__helpers'
import { RootState } from 'reducers'
import {
  SUBMIT_DISABLE_DRAFT_DIALOG,
} from '../../../FreelancerTimesheetsDucks'

export function* performDisableDraftDialog() {
  try {
    const user = yield select((state: RootState) => state.auth.currentUser)
    yield getAPIClient().updateUser(user.id, {
      display_dialog_after_saving_draft_timesheet: false,
    })

    yield call(getCurrentUser)
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeLatest(SUBMIT_DISABLE_DRAFT_DIALOG, performDisableDraftDialog)
}

export default watch
