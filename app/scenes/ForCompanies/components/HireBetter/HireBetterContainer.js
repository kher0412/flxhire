import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { SET_TOP_FREELANCERS } from 'scenes/Home/HomeDucks'
import HireBetter from './HireBetter'

const mapStateToProps = state => ({
  freelancers: state.home.topFreelancers,
})

const mapDispatchToProps = dispatch => ({
  getFreelancers: async () => {
    try {
      const freelancers = await getAPIClient().getTopFreelancers()
      dispatch(createAction(SET_TOP_FREELANCERS)({ freelancers }))
    } catch (error) {
      trackError(error)
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HireBetter)
