import update from 'immutability-helper'
import { IContractForFreelancer } from 'types'

export const OPEN_DECLINE_JOB_OFFER_DIALOG = 'flexhire/freelancer/OPEN_DECLINE_JOB_OFFER_DIALOG'
export const CLOSE_DECLINE_JOB_OFFER_DIALOG = 'flexhire/freelancer/CLOSE_DECLINE_JOB_OFFER_DIALOG'
export const SUBMIT_DECLINE_JOB_OFFER = 'flexhire/freelancer/SUBMIT_DECLINE_JOB_OFFER'

export const OPEN_ACCEPT_JOB_OFFER_DIALOG = 'flexhire/freelancer/OPEN_ACCEPT_JOB_OFFER_DIALOG'
export const CLOSE_ACCEPT_JOB_OFFER_DIALOG = 'flexhire/freelancer/CLOSE_ACCEPT_JOB_OFFER_DIALOG'
export const SUBMIT_ACCEPT_JOB_OFFER = 'flexhire/freelancer/SUBMIT_ACCEPT_JOB_OFFER'

const initialState = {
  declineJobOfferDialog: { open: false, jobOffer: null as IContractForFreelancer },
  acceptJobOfferDialog: { open: false, jobOffer: null as IContractForFreelancer },
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case OPEN_DECLINE_JOB_OFFER_DIALOG:
      return update(state, { declineJobOfferDialog: { open: { $set: true }, jobOffer: { $set: p.jobOffer } } })
    case CLOSE_DECLINE_JOB_OFFER_DIALOG:
      return update(state, { declineJobOfferDialog: { open: { $set: false } } })
    case OPEN_ACCEPT_JOB_OFFER_DIALOG:
      return update(state, { acceptJobOfferDialog: { open: { $set: true }, jobOffer: { $set: p.jobOffer } } })
    case CLOSE_ACCEPT_JOB_OFFER_DIALOG:
      return update(state, { acceptJobOfferDialog: { open: { $set: false } } })
    default:
      return state
  }
}
