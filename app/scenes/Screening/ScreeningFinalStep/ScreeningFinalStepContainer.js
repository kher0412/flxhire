import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { GET_CURRENT_USER } from 'reducers/Auth'
import { submitApplication } from './ApplicationDucks'

import ScreeningFinalStep from './ScreeningFinalStep'

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    profile: state.auth.currentUser.profile,
    project: state.screening.application.projectForm.initialValues,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitApplication: () => dispatch(submitApplication()),
    getCurrentUser: () => dispatch(createAction(GET_CURRENT_USER)()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningFinalStep)
