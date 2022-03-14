import { connect } from 'react-redux'
import IncomeByClient from './IncomeByClient'

const mapStateToProps = (state) => {
  return {
    runningContracts: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'active' || x.status === 'paused'),
    timesheets: state.freelancerTimesheets.timesheets
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeByClient)
