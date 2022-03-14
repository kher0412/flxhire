import { connect } from 'react-redux'
import HiringOverview from './HiringOverview'

const mapStateToProps = (state) => {
  return {
    dashboard: state.clientDashboard.data || {},
  }
}

export default connect(mapStateToProps)(HiringOverview)
