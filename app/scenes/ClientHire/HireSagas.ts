/* eslint-disable camelcase */
import { takeLatest, put, call } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { isClient, isSales } from 'services/user'
import { commitMutationEffect } from 'sagas/__helpers'
import { graphql } from 'relay-runtime'
import { HireSagas_ResendInvitationEmailMutation } from '__generated__/HireSagas_ResendInvitationEmailMutation.graphql'
import {
  SEND_NOTIFICATION,
  NOTIFICATION_SENT,
  SEND_NOTIFICATION_FAILED,
  RESEND_INVITATION,
} from './HireDucks'

function* performSendNotification(action) {
  try {
    if (isNaN(action.payload.freelancerId)) {
      yield getAPIClient().sendJobOpportunity(action.payload.jobId, { freelancer_slug: action.payload.freelancerId })
    } else {
      yield getAPIClient().sendJobOpportunity(action.payload.jobId, { freelancer_id: action.payload.freelancerId })
    }
    yield put(createAction(NOTIFICATION_SENT)({ freelancerId: action.payload.freelancerId }))
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Notification email sent' }))
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || 'Failed to send notification' }))
    trackError(err)
    yield put(createAction(SEND_NOTIFICATION_FAILED)({ freelancerId: action.payload.freelancerId }))
  }
}

function* performResendInvitation(action) {
  try {
    yield commitMutationEffect<HireSagas_ResendInvitationEmailMutation>({
      mutation: graphql`
        mutation HireSagas_ResendInvitationEmailMutation($input: ResendInvitationEmailInput!) {
          resendInvitationEmail(input: $input) {
            contract {
              lastInteractionAt
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: action.payload.contract.id,
        },
      },
    })
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Email Sent' }))
  } catch (error) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Operation Failed' }))
    trackError(error)
  }
}

function* watchHire() {
  yield takeLatest(SEND_NOTIFICATION, performSendNotification)
  yield takeLatest(RESEND_INVITATION, performResendInvitation)
}

export default watchHire
