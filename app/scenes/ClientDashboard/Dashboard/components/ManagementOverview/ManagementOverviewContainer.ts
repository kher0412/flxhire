import { connect } from 'react-redux'
import ManagementOverview from './ManagementOverview'

const mapStateToProps = (state) => {
  return {
    dashboard: state.clientDashboard.data || {},
  }
}

export default connect(mapStateToProps)(ManagementOverview)
