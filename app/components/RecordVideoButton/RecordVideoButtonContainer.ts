import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { createAction } from 'redux-actions'
import { GET_CURRENT_USER } from 'reducers/Auth'
import { getAPIClient } from 'api'
import RecordVideoButton from './RecordVideoButton'

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(createAction(GET_CURRENT_USER)()),
  getSampleVideos: async () => {
    const freelancers = await getAPIClient().getTopFreelancers()
    return freelancers.filter(f => f?.video?.url).map(f => ({ src: f.video.url }))
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordVideoButton as any)) as any
