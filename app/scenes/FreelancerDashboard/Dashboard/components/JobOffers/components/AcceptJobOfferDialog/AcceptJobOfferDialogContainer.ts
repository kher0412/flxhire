import { connect, ConnectedProps } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import AcceptJobOfferDialog from './AcceptJobOfferDialog'
import { CLOSE_ACCEPT_JOB_OFFER_DIALOG, SUBMIT_ACCEPT_JOB_OFFER } from '../JobOffer/JobOfferDucks'

const form = {
  form: 'acceptJobOffer',
  validate: (values) => {
    const errors: any = {}
    if (!values.freelancer_agrees_terms) { errors.freelancer_agrees_terms = 'Required' }
    return errors
  },
}

const mapStateToProps = (state: RootState) => {
  return {
    open: state.freelancerDashboard.jobOffer.acceptJobOfferDialog.open,
    jobOffer: state.freelancerDashboard.jobOffer.acceptJobOfferDialog.jobOffer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData, jobOffer) => { dispatch(createAction(SUBMIT_ACCEPT_JOB_OFFER)({ formData, jobOffer })) },
    closeDialog: () => { dispatch(createAction(CLOSE_ACCEPT_JOB_OFFER_DIALOG)()) },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(form)(AcceptJobOfferDialog))
