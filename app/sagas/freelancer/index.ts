import {
  watchSubmitSkipInterview,
  watchSubmitAcceptInterview,
  watchSubmitDeclineJobOffer,
  watchSubmitAcceptJobOffer,
  watchClientStatusChange,
} from 'scenes/FreelancerDashboard/sagas'

import watchFreelancerTimesheets from 'scenes/FreelancerTimesheets/sagas'

import watchFreelancerProfile from 'scenes/FreelancerProfile/FreelancerProfileSaga'

const sagas = [
  watchFreelancerTimesheets(),
  watchSubmitSkipInterview(),
  watchSubmitAcceptInterview(),
  watchSubmitDeclineJobOffer(),
  watchSubmitAcceptJobOffer(),
  watchClientStatusChange(),
  watchFreelancerProfile(),
]

export default sagas
