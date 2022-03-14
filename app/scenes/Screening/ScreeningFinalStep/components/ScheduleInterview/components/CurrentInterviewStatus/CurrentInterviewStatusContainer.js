import CurrentInterviewStatus from './CurrentInterviewStatus'
import { connect } from 'react-redux'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { setCurrentSlot } from '../../ScheduleInterviewDucks'

const mapStateToProps = (state) => ({
  interviewSlot: state.screening.application.scheduleInterview.currentSlot
})

const mapDispatchToProps = (dispatch, state) => ({
  getCurrentScreeningInterview: async () => {
    const response = await getAPIClient().getCurrentScreeningInterview()
    dispatch(setCurrentSlot(response))
  },
  handlePostpone: async (id, reason = '') => {
    try {
      const response = await getAPIClient().postponeScreeningInterview(id, reason)
      dispatch(setCurrentSlot(response))
    } catch (error) {
      console.log(error)
      const message = 'Postpone Failed'
      dispatch(createAction(TOGGLE_SNACKBAR)({message}))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentInterviewStatus)