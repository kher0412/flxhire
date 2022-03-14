import { connect, ConnectedProps } from 'react-redux'
import { startApplication, cancelApplication } from 'scenes/Screening/Review/ReviewDucks'
import ProfileLevelStepper from './ProfileLevelStepper'

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startApplication: () => dispatch(startApplication()),
    cancelApplication: () => dispatch(cancelApplication()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileLevelStepperContainerProps = ConnectedProps<typeof connector>

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLevelStepper)
