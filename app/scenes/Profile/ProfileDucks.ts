import update from 'immutability-helper'

export const AUTOSAVE_STARTED = 'flexhire/profile/AUTOSAVE_MY_PROFILE_FORM_STARTED'
export const AUTOSAVE_ENDED = 'flexhire/profile/AUTOSAVE_MY_PROFILE_FORM_ENDED'
export const SUBMIT_MY_PROFILE_FORM = 'flexhire/profile/SUBMIT_MY_PROFILE_FORM'
export const SUBMIT_MY_PROFILE_FORM_SUCCESS = 'flexhire/profile/SUBMIT_MY_PROFILE_SUCCESS'
export const SUBMIT_MY_PROFILE_FORM_FAILED = 'flexhire/profile/SUBMIT_MY_PROFILE_FORM_FAILED'

const initialState = {
  serverError: undefined,
  submitting: false,
  autosaving: false,
  importingResume: false,
}

export function submitMyProfileForm(formData) {
  return {
    type: SUBMIT_MY_PROFILE_FORM,
    formData,
  }
}

export function submitMyProfileFormFailed(error) {
  return {
    type: SUBMIT_MY_PROFILE_FORM_FAILED,
    error: error,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_MY_PROFILE_FORM:
      return update(state, { serverError: { $set: null }, submitting: { $set: true } })
    case SUBMIT_MY_PROFILE_FORM_SUCCESS:
      return update(state, { serverError: { $set: null }, submitting: { $set: false } })
    case SUBMIT_MY_PROFILE_FORM_FAILED:
      return update(state, { serverError: { $set: action.error }, submitting: { $set: false } })
    case AUTOSAVE_STARTED:
      return update(state, { autosaving: { $set: true } })
    case AUTOSAVE_ENDED:
      return update(state, { autosaving: { $set: false } })
    default:
      return state
  }
}
