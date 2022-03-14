import update from 'immutability-helper'
import { IAPIError } from 'types'

export const SUBMIT_ACCOUNT_FORM = 'flexhire/client/SUBMIT_ACCOUNT_FORM'
export const SUBMIT_ACCOUNT_FORM_FAILED = 'flexhire/client/SUBMIT_ACCOUNT_FORM_FAILED'
export const SUBMIT_ACCOUNT_FORM_SUCCESS = 'flexhire/client/SUBMIT_ACCOUNT_FORM_SUCCESS'

export const DELETE_ACCOUNT = 'flexhire/client/DELETE_ACCOUNT'

export const SUBMIT_COMPANY_FORM = 'flexhire/client/SUBMIT_COMPANY_FORM'
export const SUBMIT_COMPANY_FORM_FAILED = 'flexhire/client/SUBMIT_COMPANY_FORM_FAILED'

const initialState = {
  accountForm: {
    serverError: '',
  },
  companyForm: {
    serverError: '',
  },
  serverError: undefined as IAPIError,
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case SUBMIT_ACCOUNT_FORM_SUCCESS:
      return update(state, { accountForm: { serverError: { $set: null } } })
    case SUBMIT_ACCOUNT_FORM_FAILED:
      return update(state, { accountForm: { serverError: { $set: p.error } } })
    case SUBMIT_COMPANY_FORM_FAILED:
      return update(state, { companyForm: { serverError: { $set: p.error } } })
    default:
      return state
  }
}
