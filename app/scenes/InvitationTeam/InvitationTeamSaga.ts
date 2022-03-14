import { takeEvery, put, takeLatest, call, select } from 'redux-saga/effects'
import { showSnackbarMessage } from 'sagas/__helpers'
import { getAPIClient } from 'api'
import { get } from 'lodash'
import { trackError, trackEvent } from 'services/analytics'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { isInteger } from 'services/numbers'
import { RootState } from 'reducers'
import {
  SET_INVITATIONS,
  REVOKE_INVITATION,
  GET_INVITATIONS,
  ROWS_PER_PAGE,
} from './InvitationTeamDucks'

function* revokeInvitationTeam(action) {
  try {
    let { id, name, first_name } = action.payload.invitation
    let message = 'Invitation Revoked'
    if (!name) {
      if (first_name) {
        message = `Invitation for ${first_name} revoked`
      }
    } else {
      message = `Invitation for ${name} revoked`
    }

    yield getAPIClient().deleteContract(id)
    trackEvent('Client Delete Contract')

    yield put(createAction(TOGGLE_SNACKBAR)({ message }))

    yield put(createAction(GET_INVITATIONS)())
  } catch (err) {
    yield showSnackbarMessage(err.response || err.message)
    trackError(err)
  }
}

export function* getInvitations(action) {
  try {
    const state = (yield select()) as RootState
    const page = isInteger(action.payload?.page) ? action.payload.page : get(state, 'InvitationTeam.pagination.page', 0)
    const rowsPerPage = action.payload?.rowsPerPage || get(state, 'InvitationTeam.pagination.rowsPerPage', ROWS_PER_PAGE)
    const apiParams = {
      invitation_type: 'invitation',
      status: 'offer_made',
      page: page + 1,
      per_page: rowsPerPage,
    }
    const response = yield call([getAPIClient(), 'getContractsPaginated'], apiParams)
    const propsToUpdate = {
      invitations: response.body,
      count: response.headers.totalCount,
      page: page || 0,
      rowsPerPage: rowsPerPage || ROWS_PER_PAGE,
    }
    yield put(createAction(SET_INVITATIONS)(propsToUpdate))
  } catch (err) {
    trackError(err)
    yield showSnackbarMessage(err.response || err.message)
  }
}

function* watchSubmitInvitationTeam() {
  yield takeEvery(REVOKE_INVITATION, revokeInvitationTeam)
  yield takeLatest(GET_INVITATIONS, getInvitations)
}

export default watchSubmitInvitationTeam
