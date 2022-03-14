import update from 'immutability-helper'

export const CONFIRM_EMAIL_FORM = 'flexhire/auth/CONFIRM_EMAIL_FORM'
export const CONFIRM_EMAIL_FORM_SUCCEEDED = 'flexhire/auth/CONFIRM_EMAIL_FORM_SUCCEEDED'
export const CONFIRM_EMAIL_FORM_FAILED = 'flexhire/auth/CONFIRM_EMAIL_FORM_FAILED'
export const SEND_CONFIRMATION_EMAIL = 'flexhire/auth/SEND_EMAIL_CONFIRMATION_EMAIL'
export const SEND_CONFIRMATION_EMAIL_SUCCEEDED = 'flexhire/auth/SEND_CONFIRMATION_EMAIL_SUCCEEDED'
export const SEND_CONFIRMATION_EMAIL_FAILED = 'flexhire/auth/SEND_CONFIRMATION_EMAIL_FAILED'
export const CONFIRM_EMAIL_FORM_CLEAR_ERROR = 'flexhire/auth/CONFIRM_EMAIL_FORM_CLEAR_ERROR'

const initialState = {
  serverError: null,
  isConfirming: false,
  isSending: false,
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case SEND_CONFIRMATION_EMAIL:
      return update(state, {
        isSending: { $set: true },
      })

    case SEND_CONFIRMATION_EMAIL_SUCCEEDED:
    case SEND_CONFIRMATION_EMAIL_FAILED:
      return update(state, {
        isSending: { $set: false },
      })

    case CONFIRM_EMAIL_FORM:
      return update(state, {
        isConfirming: { $set: true },
        serverError: { $set: null },
      })

    case CONFIRM_EMAIL_FORM_SUCCEEDED:
      return update(state, {
        isConfirming: { $set: false },
      })

    case CONFIRM_EMAIL_FORM_FAILED:
      return update(state, {
        isConfirming: { $set: false },
        serverError: { $set: p.error },
      })

    case CONFIRM_EMAIL_FORM_CLEAR_ERROR:
      return update(state, {
        serverError: { $set: null },
      })

    default:
      return state
  }
}
