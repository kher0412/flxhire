import { connect, ConnectedProps } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import DeclineJobOfferDialog from './DeclineJobOfferDialog'
import { CLOSE_DECLINE_JOB_OFFER_DIALOG, SUBMIT_DECLINE_JOB_OFFER } from '../JobOffer/JobOfferDucks'

const form = {
  form: 'declineJobOffer',
  validate: (values) => {
    const errors: any = {}
    if (!values.freelancer_feedback) { errors.freelancer_feedback = 'Required' }
    return errors
  },
}

const mapStateToProps = (state: RootState) => {
  return {
    open: state.freelancerDashboard.jobOffer.declineJobOfferDialog.open,
    jobOffer: state.freelancerDashboard.jobOffer.declineJobOfferDialog.jobOffer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData, jobOffer) => {
      dispatch(createAction(SUBMIT_DECLINE_JOB_OFFER)({ formData, jobOffer }))
    },
    closeDialog: () => {
      dispatch(createAction(CLOSE_DECLINE_JOB_OFFER_DIALOG)())
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(form)(DeclineJobOfferDialog))
