import { connect } from 'react-redux'
import ApplicationRedirector from './ApplicationRedirector'

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(ApplicationRedirector)
