import { connect } from 'react-redux'
import { startApplication, cancelApplication } from 'scenes/Screening/Review/ReviewDucks'
import ApplicationStatus from './ApplicationStatus'

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    startApplicationError: state.screening.review.startApplicationError,
    submitProfileError: state.screening.review.submitProfileError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startApplication: () => { dispatch(startApplication()) },
    cancelApplication: () => dispatch(cancelApplication()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStatus)
