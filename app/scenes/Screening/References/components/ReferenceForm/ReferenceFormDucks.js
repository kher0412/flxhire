import update from 'immutability-helper'

export const SET_REFERENCES = 'flexhire/profile/references/SET_REFERENCES'
export const DELETE_REFERENCE = 'flexhire/profile/references/DELETE_REFERENCE'
export const SUBMIT_REFERENCE_FORM = 'flexhire/profile/references/SUBMIT_REFERENCE_FORM'
export const SUBMIT_REFERENCE_FORM_FAILED = 'flexhire/profile/references/SUBMIT_REFERENCE_FORM_FAILED'

const initialState = {
  serverError: undefined, references: [],
}

export function setReferences(references) {
  return {
    type: SET_REFERENCES,
    references
  }
}

export function deleteReference(id) {
  return {
    type: DELETE_REFERENCE,
    id
  }
}

export function submitReferenceForm(formData) {
  return {
    type: SUBMIT_REFERENCE_FORM,
    formData
  }
}

export function submitReferenceFormFailed(error) {
  return {
    type: SUBMIT_REFERENCE_FORM_FAILED,
    error
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_REFERENCES:
      return update(state, {references: {$set: action.references}})
    case SUBMIT_REFERENCE_FORM:
      return update(state, {serverError: {$set: null}})
    case SUBMIT_REFERENCE_FORM_FAILED:
      return update(state, {serverError: {$set: action.error}})
    default:
      return state
  }
}
