import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { GET_TIMESHEETS, GET_TIMESHEET_STATS } from 'scenes/FreelancerTimesheets/FreelancerTimesheetsDucks'
import Summary from './Summary'

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.currentUser,
    timesheets: state.freelancerTimesheets.timesheets,
    timesheetsReceived: state.freelancerTimesheets.timesheetsReceived,
    stats: state.freelancerTimesheets.timesheetStats || {},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTimesheets: () => dispatch(createAction(GET_TIMESHEETS)()),
    getTimesheetStats: () => dispatch(createAction(GET_TIMESHEET_STATS)()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Summary)
