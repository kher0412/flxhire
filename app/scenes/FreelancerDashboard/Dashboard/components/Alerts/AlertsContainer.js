import { connect } from 'react-redux'
import Alerts from './Alerts'

const mapStateToProps = (state) => {
  const interviews = state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'pending')
  const jobOffers = state.freelancerDashboard.interviewRequest.interviews.filter(x => x.status === 'offer_made')

  return {
    numInterviews: interviews.length,
    numJobOffers: jobOffers.length,
    hasJobOfferWithPaymentsDisabled: (jobOffers.length === 1 && !jobOffers[0].payments_enabled),
  }
}

export default connect(mapStateToProps)(Alerts)
