import update from 'immutability-helper'
import { IJob, IAPIError } from 'types'

export const GET_JOB = 'flexhire/job/GET_JOB'
export const SET_JOB = 'flexhire/job/SET_JOB'
export const JOB_ERROR = 'flexhire/job/ERROR'
export const APPLY_FOR_JOB = 'flexhire/job/APPLY_FOR_JOB'
export const APPLIED_TO_JOB = 'flexhire/job/APPLIED_TO_JOB'
export const SET_CONFIRM_DIALOG = 'flexhire/job/SET_CONFIRM_DIALOG'

const initialState = {
  jobReceived: false,
  job: null as IJob,
  messageDialog: 'Do you want to apply to this job?',
  showOkButton: true,
  error: null as IAPIError,
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case GET_JOB:
      return update(state, {
        error: { $set: null },
        jobReceived: { $set: p && p.refresh ? state.jobReceived : false },
      })

    case SET_JOB:
      return update(state, {
        error: { $set: null },
        job: { $set: p },
        jobReceived: { $set: true },
      })

    case SET_CONFIRM_DIALOG:
      return update(state, {
        messageDialog: { $set: p.message },
        showOkButton: { $set: p.showButton },
      })

    case APPLIED_TO_JOB:
      return update(state, {
        job: {
          contract: { $set: p.contract },
        },
      })

    case JOB_ERROR:
      return update(state, {
        error: { $set: p.error },
      })
    default:
      return state
  }
}
