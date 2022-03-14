import { combineReducers } from 'redux'

import interviewRequest from './Dashboard/components/InterviewRequests/components/InterviewRequest/InterviewRequestDucks'
import jobOffer from './Dashboard/components/JobOffers/components/JobOffer/JobOfferDucks'
import jobApplications from './Dashboard/components/JobApplications/JobApplicationsDucks'

const freelancerDashboardReducers = {
  interviewRequest,
  jobOffer,
  jobApplications,
}

export default combineReducers(freelancerDashboardReducers)
