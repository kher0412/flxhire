import { connect } from 'react-redux'
import InterviewRequest from './InterviewRequest'
import { OPEN_SKIP_INTERVIEW_DIALOG, OPEN_ACCEPT_INTERVIEW_DIALOG } from './InterviewRequestDucks'
import { createAction } from 'redux-actions'

const mapDispatchToProps = dispatch => ({
  openSkipInterviewDialog: interview => dispatch(createAction(OPEN_SKIP_INTERVIEW_DIALOG)({ interview })),
  openAcceptInterviewDialog: interview => dispatch(createAction(OPEN_ACCEPT_INTERVIEW_DIALOG)({ interview })),
})

export default connect(null, mapDispatchToProps)(InterviewRequest)
