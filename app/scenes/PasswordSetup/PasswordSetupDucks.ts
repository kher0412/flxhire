import update from 'immutability-helper'

export const SET_PASSWORD = 'flexhire/auth/SET_PASSWORD'
export const SET_PASSWORD_SUCCEEDED = 'flexhire/auth/SET_PASSWORD_SUCCEEDED'
export const SET_PASSWORD_FAILED = 'flexhire/auth/SET_PASSWORD_FAILED'

const initialState = {
  serverError: null,
  isSending: false,
}

export default function reducer(state = initialState, action) {
  const p = action?.payload

  switch (action.type) {
    case SET_PASSWORD:
      return update(state, {
        isSending: { $set: true },
      })

    case SET_PASSWORD_SUCCEEDED:
    case SET_PASSWORD_FAILED:
      return update(state, {
        isSending: { $set: false },
        serverError: { $set: p?.error },
      })

    default:
      return state
  }
}
