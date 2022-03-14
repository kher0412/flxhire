import update from 'immutability-helper'
import _ from 'lodash'
import { IContractForFreelancer, IAPIError } from 'types'

export const SUBMIT_AVAILABILITY_AND_RATE_FORM = 'flexhire/freelancer/SUBMIT_AVAILABILITY_AND_RATE_FORM'
export const SUBMIT_AVAILABILITY_AND_RATE_FORM_FAILED = 'flexhire/freelancer/SUBMIT_AVAILABILITY_AND_RATE_FORM_FAILED'

export const OPEN_SKIP_INTERVIEW_DIALOG = 'flexhire/freelancer/OPEN_SKIP_INTERVIEW_DIALOG'
export const CLOSE_SKIP_INTERVIEW_DIALOG = 'flexhire/freelancer/CLOSE_SKIP_INTERVIEW_DIALOG'
export const SUBMIT_SKIP_INTERVIEW = 'flexhire/freelancer/SUBMIT_SKIP_INTERVIEW'
export const SKIP_INTERVIEW = 'flexhire/freelancer/SKIP_INTERVIEW'

export const OPEN_ACCEPT_INTERVIEW_DIALOG = 'flexhire/freelancer/OPEN_ACCEPT_INTERVIEW_DIALOG'
export const CLOSE_ACCEPT_INTERVIEW_DIALOG = 'flexhire/freelancer/CLOSE_ACCEPT_INTERVIEW_DIALOG'
export const SUBMIT_ACCEPT_INTERVIEW = 'flexhire/freelancer/SUBMIT_ACCEPT_INTERVIEW'
export const SUBMIT_ACCEPT_INTERVIEW_FAILED = 'flexhire/freelancer/SUBMIT_ACCEPT_INTERVIEW_FAILED'
export const ACCEPT_INTERVIEW = 'flexhire/freelancer/ACCEPT_INTERVIEW'

export const GET_INTERVIEWS = 'flexhire/freelancer/GET_INTERVIEWS'
export const SET_INTERVIEWS = 'flexhire/freelancer/SET_INTERVIEWS'

const initialState = {
  skipInterviewDialog: { open: false, interview: null as IContractForFreelancer },
  acceptInterviewDialog: { open: false, interview: null as IContractForFreelancer, serverError: null as IAPIError },
  interviewsReceived: false,
  interviews: [] as IContractForFreelancer[],
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case SET_INTERVIEWS:
      return update(state, {
        interviews: { $set: p.interviews },
        interviewsReceived: { $set: true },
      })

    case OPEN_SKIP_INTERVIEW_DIALOG:
      return update(state, {
        skipInterviewDialog: { open: { $set: true }, interview: { $set: p.interview } },
      })

    case CLOSE_SKIP_INTERVIEW_DIALOG:
      return update(state, {
        skipInterviewDialog: { open: { $set: false } },
      })

    case SKIP_INTERVIEW: {
      const index = _.findIndex(state.interviews, x => x.id === p.interview.id)
      return update(state, {
        interviews: { $splice: [[index, 1]] },
      })
    }

    case OPEN_ACCEPT_INTERVIEW_DIALOG:
      return update(state, {
        acceptInterviewDialog: {
          open: { $set: true },
          interview: { $set: p.interview },
        },
      })

    case CLOSE_ACCEPT_INTERVIEW_DIALOG:
      return update(state, {
        acceptInterviewDialog: {
          open: { $set: false },
        },
      })

    case ACCEPT_INTERVIEW: {
      const i = _.findIndex(state.interviews, x => x.id === p.interview.id)
      const acceptedInterview = update(state.interviews[i], {
        status: { $set: 'interview_accepted' },
        interview_date: { $set: p.formData?.interview_date },
      })

      return update(state, {
        interviews: { $splice: [[i, 1, acceptedInterview]] },
      })
    }

    case SUBMIT_ACCEPT_INTERVIEW_FAILED:
      return update(state, {
        acceptInterviewDialog: {
          serverError: { $set: p.error },
        },
      })

    default:
      return state
  }
}
