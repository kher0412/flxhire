import { connect, ConnectedProps } from 'react-redux'
import JobOffers from './JobOffers'

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    jobOffers: state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'offer_made'),
  }
}

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(JobOffers)
