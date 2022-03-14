import { UPDATE } from 'react-admin'

export const ACCEPT_FREELANCER = 'ACCEPT_FREELANCER'
export const REJECT_FREELANCER = 'REJECT_FREELANCER'

export const acceptFreelancerAction = id => ({
  type: ACCEPT_FREELANCER,
  payload: { id, data: { accept: true } },
  meta: { resource: 'freelancers', fetch: UPDATE, cancelPrevious: false },
})


export const rejectFreelancerAction = (id, message = null, allowScreening = true) => ({
  type: REJECT_FREELANCER,
  payload: { id, data: { reject: true, screening_feedback: message, allow_screening: allowScreening } },
  meta: { resource: 'freelancers', fetch: UPDATE, cancelPrevious: false },
})
