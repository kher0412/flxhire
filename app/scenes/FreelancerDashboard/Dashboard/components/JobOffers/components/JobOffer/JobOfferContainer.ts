import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import JobOffer from './JobOffer'
import { OPEN_DECLINE_JOB_OFFER_DIALOG, OPEN_ACCEPT_JOB_OFFER_DIALOG } from './JobOfferDucks'

const mapDispatchToProps = (dispatch) => {
  return {
    openAcceptJobOfferDialog: jobOffer => dispatch(createAction(OPEN_ACCEPT_JOB_OFFER_DIALOG)({ jobOffer })),
    openDeclineJobOfferDialog: jobOffer => dispatch(createAction(OPEN_DECLINE_JOB_OFFER_DIALOG)({ jobOffer })),
  }
}

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(JobOffer)
