import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { GET_MANAGERS } from './ClientPageTitleDuck'
import ClientPageTitle from './ClientPageTitle'

const mapStateToProps = state => ({
  teamManagerCount: state.clientPageTitle.teamManagerCount,
})

const mapDispatchToProps = dispatch => ({
  getTeamManagerCount: () => dispatch(createAction(GET_MANAGERS)()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientPageTitle)
