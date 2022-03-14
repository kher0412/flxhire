import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { CLOSE_ACCEPT_INTERVIEW_DIALOG, SUBMIT_ACCEPT_INTERVIEW } from '../InterviewRequest/InterviewRequestDucks'
import AcceptInterviewDialog from './AcceptInterviewDialog'

const form = {
  form: 'acceptInterview',
  enableReinitialize: true,
  validate: (values) => {
    const errors: any = {}
    if (!values.freelancer_contact_email) {
      errors.freelancer_contact_email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.freelancer_contact_email)) {
      errors.freelancer_contact_email = 'Invalid email address'
    }
    if (!values.interview_date) { errors.interview_date = 'Required' }
    if (!values.freelancer_message && values.interview_date === 'none') { errors.freelancer_message = 'Required' }

    return errors
  },
}

const mapStateToProps = (state: RootState) => {
  return {
    isNoneSelected: (formValueSelector('acceptInterview')(state, 'interview_date') === 'none'),
    open: state.freelancerDashboard.interviewRequest.acceptInterviewDialog.open,
    interview: state.freelancerDashboard.interviewRequest.acceptInterviewDialog.interview,
    serverError: state.freelancerDashboard.interviewRequest.acceptInterviewDialog.serverError,
    initialValues: {
      freelancer_contact_email: state.auth.currentUser.email,
      phone: state.auth.currentUser.phone,
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData, interview) => { dispatch(createAction(SUBMIT_ACCEPT_INTERVIEW)({ formData, interview })) },
    closeDialog: () => { dispatch(createAction(CLOSE_ACCEPT_INTERVIEW_DIALOG)()) },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type AcceptInterviewDialogContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<any>

export default connector(reduxForm<any>(form)(AcceptInterviewDialog))
