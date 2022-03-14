import update from 'immutability-helper'
import { IAPIError } from 'types'

export const LOGIN_FORM = 'flexhire/auth/LOGIN_FORM'
export const LOGIN_FORM_FAILED = 'flexhire/auth/LOGIN_FORM_FAILED'
export const LOGIN_BY_TOKEN = 'flexhire/auth/LOGIN_BY_TOKEN'
export const FORCE_LOGIN = 'flexhire/auth/FORCE_LOGIN'

const initialState = {
  serverError: null as IAPIError,
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case LOGIN_FORM:
      return update(state, { serverError: { $set: null } })
    case LOGIN_FORM_FAILED:
      return update(state, { serverError: { $set: p.error } })
    default:
      return state
  }
}
