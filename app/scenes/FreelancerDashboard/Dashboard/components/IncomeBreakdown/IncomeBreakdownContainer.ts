import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { GET_TIMESHEETS } from '../../../../FreelancerTimesheets/FreelancerTimesheetsDucks'
import IncomeBreakdown from './IncomeBreakdown'

const mapStateToProps = (state: RootState) => {
  return {
    timesheets: state.freelancerTimesheets.timesheets,
    timesheetsReceived: state.freelancerTimesheets.timesheetsReceived,
    stats: state.freelancerTimesheets.timesheetStats,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTimesheets: () => dispatch(createAction(GET_TIMESHEETS)()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type IncomeBreakdownContainerProps = ConnectedProps<typeof connector>

export default connector(IncomeBreakdown)
