import update from 'immutability-helper'
import {
  IJob,
  LocationType,
} from 'types'

export const REFRESH_HIRING_CONTRACT = 'flexhire/client/REFRESH_HIRING_CONTRACT'
export const RESET_JOB_FORM = 'flexhire/client/RESET_JOB_FORM'

export const SET_FREELANCER_SUBTYPES = 'flexhire/client/SET_FREELANCER_SUBTYPES'
export const SEND_NOTIFICATION = 'flexhire/client/SEND_NOTIFICATION'
export const NOTIFICATION_SENT = 'flexhire/client/NOTIFICATION_SENT'
export const SEND_NOTIFICATION_FAILED = 'flexhire/client/SEND_NOTIFICATION_FAILED'
export const RESEND_INVITATION = 'flexhire/client/RESEND_INVITATION'

export function getInitialState() {
  return {
    isSavingJob: false,
    addJobForm: {
      serverError: '',
      formData: {
        location_type: 'anywhere' as LocationType,
      } as IJob,
    },
  }
}

export type HireState = ReturnType<typeof getInitialState>

export default function reducer(state: HireState, action) : HireState {
  state = state || getInitialState()

  switch (action.type) {
    case RESET_JOB_FORM:
      return update(state, {
        addJobForm: {
          formData: { $set: getInitialState().addJobForm.formData },
        },
      })

    default:
      return state
  }
}
