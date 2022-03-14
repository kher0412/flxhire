import update from 'immutability-helper'
import { IAPIError, IUserType, IJob } from 'types'

export const SIGNUP_FORM = 'flexhire/signup/SIGNUP_FORM'
export const SIGNUP_FORM_FAILED = 'flexhire/signup/SIGNUP_FORM_FAILED'
export const SET_JOB_DATA = 'flexhire/signup/SET_JOB_DATA'
export const GET_JOB_DATA = 'flexhire/signup/GET_JOB_DATA'

const initialState = {
  signupForm: {
    serverError: undefined as IAPIError,
    isSubmitting: false,
    job: null as IJob,
    loadingJob: false,
  },
}

export function submitSignupForm(formData, userType: IUserType, clientData?: any) {
  return {
    type: SIGNUP_FORM,
    payload: {
      formData,
      userType,
      clientData,
    },
  }
}

export function getJobData(slug) {
  return {
    type: GET_JOB_DATA,
    payload: { slug },
  }
}

export function setJobData(job) {
  return {
    type: SET_JOB_DATA,
    payload: { job },
  }
}

export function submitSignupFormFailed(error: IAPIError) {
  return {
    type: SIGNUP_FORM_FAILED,
    error: error,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_FORM:
      return update(state, {
        signupForm: {
          serverError: { $set: undefined },
          isSubmitting: { $set: true },
        },
      })

    case SIGNUP_FORM_FAILED:
      return update(state, {
        signupForm: {
          serverError: { $set: action.error },
          isSubmitting: { $set: false },
        },
      })

    case SET_JOB_DATA:
      return update(state, {
        signupForm: {
          job: { $set: action.payload.job },
          loadingJob: { $set: false },
        },
      })

    case GET_JOB_DATA:
      return update(state, {
        signupForm: {
          loadingJob: { $set: true },
        },
      })

    default:
      return state
  }
}
