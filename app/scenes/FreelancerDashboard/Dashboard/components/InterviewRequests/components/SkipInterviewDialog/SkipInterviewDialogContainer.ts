import { connect, ConnectedProps } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import SkipInterviewDialog, { REJECT_REASONS } from './SkipInterviewDialog'
import { CLOSE_SKIP_INTERVIEW_DIALOG, SUBMIT_SKIP_INTERVIEW } from '../InterviewRequest/InterviewRequestDucks'

const form = {
  form: 'skipInterview',
  validate: (values) => {
    const errors: any = {}
    if (!values.freelancer_feedback) errors.freelancer_feedback = 'Required'
    return errors
  },
}

const mapStateToProps = (state: RootState) => {
  return {
    open: state.freelancerDashboard.interviewRequest.skipInterviewDialog.open,
    interview: state.freelancerDashboard.interviewRequest.skipInterviewDialog.interview,
    initialValues: {
      freelancer_feedback: REJECT_REASONS[0],
    },
  }
}

const mapDispatchToProps = dispatch => ({
  submitForm: (formData, interview) => dispatch(createAction(SUBMIT_SKIP_INTERVIEW)({ formData, interview })),
  closeDialog: () => dispatch(createAction(CLOSE_SKIP_INTERVIEW_DIALOG)()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = InjectedFormProps & ConnectedProps<typeof connector>

export default connector(reduxForm(form)(SkipInterviewDialog))
