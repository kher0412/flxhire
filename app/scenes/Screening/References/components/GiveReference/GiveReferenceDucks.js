export const SET_REFERENCE_USER = 'flexhire/profile/references/SET_REFERENCE_USER'
export const SUBMIT_GIVE_REFERENCE_FORM = 'flexhire/profile/references/SUBMIT_GIVE_REFERENCE_FORM'
export const SUBMIT_GIVE_REFERENCE_FORM_FAILED = 'flexhire/profile/references/SUBMIT_GIVE_REFERENCE_FORM_FAILED'

import update from 'immutability-helper'

const initialState = {
  serverError: undefined, user: {}
}

export function submitGiveReferenceForm(formData) {
  return {
    type: SUBMIT_GIVE_REFERENCE_FORM,
    formData
  }
}

export function submitGiveReferenceFormFailed(error) {
  return {
    type: SUBMIT_GIVE_REFERENCE_FORM_FAILED,
    error
  }
}

export function setReferenceUser(user) {
  return {
    type: SET_REFERENCE_USER,
    user
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_GIVE_REFERENCE_FORM:
      return state
    case SUBMIT_GIVE_REFERENCE_FORM_FAILED:
      return update(state, {serverError: {$set: action.error}})
    case SET_REFERENCE_USER:
      return update(state, {user: {$set: action.user}})
    default:
      return state
  }
}
