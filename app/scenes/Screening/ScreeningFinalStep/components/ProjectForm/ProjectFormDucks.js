import { get } from 'lodash'
import update from 'immutability-helper'

export const SET_PROJECTS = 'flexhire/profile/projects/SET_PROJECTS'
export const SUBMIT_PROJECT_FORM = 'flexhire/profile/projects/SUBMIT_PROJECT_FORM'
export const SUBMIT_PROJECT_FORM_FAILED = 'flexhire/profile/projects/SUBMIT_PROJECT_FORM_FAILED'

const initialState = {
  serverError: null,
  initialValues: {} 
}

export function submitProjectForm(formData) {
  return {
    type: SUBMIT_PROJECT_FORM,
    payload: { formData }
  }
}

export function submitProjectFormFailed(error) {
  return {
    type: SUBMIT_PROJECT_FORM_FAILED,
    payload: { error }
  }
}

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    payload: { projects }
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PROJECT_FORM:
      return state
    case SUBMIT_PROJECT_FORM_FAILED:
      return update(state, {serverError: {$set: action.payload.error}})
    case SET_PROJECTS:
      return update(state, {initialValues: {$set: get(action, 'payload.projects[0]', {})}})
    default:
      return state
  }
}
