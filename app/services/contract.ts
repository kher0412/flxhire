import { IContractForClient, IContract, IContractStatus, IContractForFreelancer, IContractRequestType, IContractRequestStatus, RateMode } from 'types'
import { IHireTab, HireMembersFilters } from 'scenes/ClientHire/Hire'
import { FaGoogle, FaLinkedin, FaStackOverflow } from 'react-icons/fa'
import { startCase } from 'lodash'
import moment from 'moment'
import { readInlineData, graphql } from 'react-relay'
import { contract_FilteredOutReason$key, contract_FilteredOutReason } from '__generated__/contract_FilteredOutReason.graphql'
import { contract_getApplicantSource, contract_getApplicantSource$key } from '__generated__/contract_getApplicantSource.graphql'
import { contract_getApplicantSourceIcon, contract_getApplicantSourceIcon$key } from '__generated__/contract_getApplicantSourceIcon.graphql'
import { trackError } from './analytics'
import { mismatchingSkills, missingSubtypes } from './job'

export const STATUS_COLORS = new Map([
  ['job_application_draft', 'rgb(225,175,0)'],
  ['job_application_sent', 'rgb(0,165,0)'],
  ['job_application_invited', 'rgb(225,175,0)'],
  ['interview_accepted', 'rgb(0,165,0)'],
  ['interview_rejected', 'rgb(235,0,0)'],
  ['offer_rejected', 'rgb(235,0,0)'],
  ['rejected', 'rgb(235,0,0)'],
  ['pending', 'rgb(225,175,0)'],
  ['offer_made', 'rgb(225,175,0)'],
  ['active', 'rgb(0,105,225)'],
  ['paused', 'rgb(225,175,0)'],
  ['expired', 'rgb(235,0,0)'],
])

type PartialContract = Pick<IContractForClient, 'status'>

export function isUnsentJobApplication(contract: PartialContract) {
  return ['potential', 'job_viewed', 'job_application_draft', 'job_application_invited'].includes(contract?.status)
}

export function isSentJobApplication(contract: PartialContract) {
  return contract?.status === 'job_application_sent'
}

export function isJobApplication(contract: PartialContract) {
  return isSentJobApplication(contract) || isUnsentJobApplication(contract)
}

export function hasScreening(contract: { contract_requests: readonly any[] }) {
  return contract?.contract_requests?.length > 0
}

export function getRequestsByType(contract: IContractForFreelancer, type: IContractRequestType) {
  return contract?.contract_requests ? contract.contract_requests.filter(r => r.request_type === type) : []
}

export function getRequestsByStatus(contract: IContractForFreelancer, status: IContractRequestStatus) {
  return contract?.contract_requests ? contract.contract_requests.filter(r => r.status === status) : []
}

export function isScreeningAccepted(contract: IContractForFreelancer) {
  return hasScreening(contract) && getRequestsByStatus(contract, 'pending').length === 0 && getRequestsByStatus(contract, 'rejected').length === 0
}

export function isScreeningRejected(contract: IContractForFreelancer) {
  return hasScreening(contract) &&
    getRequestsByStatus(contract, 'rejected').length > 0 &&
    getRequestsByStatus(contract, 'started').length === 0 &&
    getRequestsByStatus(contract, 'completed').length === 0
}

export function getQuestionsRequests(contract: IContractForFreelancer) {
  return getRequestsByType(contract, 'answer')
}

export function getCodeTestRequests(contract: IContractForFreelancer) {
  return getRequestsByType(contract, 'project_submission')
}

export function getVideoIntroRequests(contract: IContractForFreelancer) {
  return getRequestsByType(contract, 'video_introduction')
}

export function hasQuestionsRequests(contract: IContractForFreelancer) {
  return getQuestionsRequests(contract).length > 0
}

export function hasVideoIntroRequests(contract: IContractForFreelancer) {
  return getVideoIntroRequests(contract).length > 0
}

export function hasCodeTestRequests(contract: IContractForFreelancer) {
  return getCodeTestRequests(contract).length > 0
}

export function isInScreening(contract: PartialContract & { contract_requests: readonly any[] }) {
  return isSentJobApplication(contract) && hasScreening(contract)
}

export function isOfferStage(contract: PartialContract) {
  return ['offer_made', 'offer_rejected'].includes(contract?.status)
}

export function isInterviewStage(contract: PartialContract) {
  return ['interview_rejected', 'interview_accepted', 'pending'].includes(contract?.status)
}

export function isStartedContract(contract: PartialContract) {
  return ['active', 'paused'].includes(contract?.status)
}

export function getHireTabForContract(contract: PartialContract & { contract_requests: readonly any[] }) : IHireTab {
  if (isUnsentJobApplication(contract)) return 'potential'
  if (isInScreening(contract)) return 'screening'
  // Note: "isSentJobApplication" will return true for contracts in screening, so the order matters here
  if (isSentJobApplication(contract)) return 'applicants'
  if (isInterviewStage(contract)) return 'interviews'
  if (isOfferStage(contract)) return 'offers'
  return null
}

export function getStatusColor(contract: Pick<IContract, ('status' | 'requests_status')> | IContractStatus): string {
  if (typeof contract === 'string') {
    return STATUS_COLORS.get(contract)
  }

  if (isJobApplication(contract)) {
    switch (contract.requests_status) {
      case 'completed':
        return 'rgb(0,165,0)'
      case 'rejected':
        return 'rgb(235,0,0)'

      case 'started':
      case 'pending':
        return 'rgb(225,175,0)'
    }
  }

  return STATUS_COLORS.get(contract.status)
}

export const getHumanizedStatusMap = (isMobile = false) => ({
  candidate: 'Potential',
  job_viewed: 'Job Viewed',
  job_application_draft: 'Application Started',
  job_application_invited: 'Invited to Apply',
  job_application_sent: 'Application Sent',
  pending: 'Interview Requested',
  interview_accepted: 'Interview Accepted',
  interview_rejected: 'Interview Rejected',
  offer_made: 'Offer Made',
  rejected: 'Rejected',
  offer_rejected: 'Offer Rejected',
  active: isMobile ? 'Active' : 'Contract Active',
  paused: isMobile ? 'Paused' : 'Contract Paused',
  expired: isMobile ? 'Expired' : 'Contract Expired',
  deleted: 'Deleted',
})

export function getStatus(status: IContractStatus, requestsStatus?: IContract['requests_status'], isMobile = false): string {
  if (!status) return null

  if (isJobApplication({ status })) {
    switch (requestsStatus) {
      case 'completed':
        return 'Screening Completed'

      case 'started':
        return 'Screening Started'

      case 'pending':
        return 'Screening Requested'

      case 'rejected':
        return 'Screening Rejected'
    }
  }

  let humanizedStatus = getHumanizedStatusMap(isMobile)[status]
  return humanizedStatus || startCase(status)
}

export function getContractStatus(contract: Pick<IContractForClient, ('status' | 'requests_status' | 'invitation_type')>, isMobile = false): string {
  if (contract.invitation_type === 'invitation') {
    // special-case handling for contracts created from invitations
    switch (contract.status) {
      case 'offer_made':
        return 'Invitation sent'

      case 'offer_rejected':
        return 'Invitation rejected'
    }
  }

  return getStatus(contract?.status, contract?.requests_status, isMobile)
}

export function getApplicantSource(contractFragment: contract_getApplicantSource$key) {
  const contract = readInlineData<contract_getApplicantSource>(graphql`
    fragment contract_getApplicantSource on Contract @inline {
      applicantSource
    }
  `, contractFragment)
  if (!contract?.applicantSource) return null

  if (contract.applicantSource === 'iframe') return 'Careers Page Integration'
  if (contract.applicantSource === 'linkedin') return 'LinkedIn'
  if (contract.applicantSource === 'stackoverflow') return 'StackOverflow'
  if (contract.applicantSource === 'google') return 'Google'

  return null
}

export function getApplicantSourceIcon(contractFragment: contract_getApplicantSourceIcon$key) {
  const contract = readInlineData<contract_getApplicantSourceIcon>(graphql`
    fragment contract_getApplicantSourceIcon on Contract @inline {
      applicantSource
    }
  `, contractFragment)
  if (contract?.applicantSource === 'linkedin') return FaLinkedin
  if (contract?.applicantSource === 'stackoverflow') return FaStackOverflow
  if (contract?.applicantSource === 'google') return FaGoogle

  return null
}

export function getFilteredOutReason(contractFragment: contract_FilteredOutReason$key, filterParams: HireMembersFilters) {
  try {
    if (!contractFragment || !filterParams) return null
    const contract = readInlineData<contract_FilteredOutReason>(graphql`
      fragment contract_FilteredOutReason on Contract @inline {
        requestsStatus
        clientRate {
          currency {
            code
          }
          value
        }
        annualCompensation {
          currency {
            code
          }
          value
        }
        bookmarked
        projectSubmission {
          id
        }
        freelancer {
          timezoneOffset
          video {
            id
          }
          profile {
            totalExperience
            freelancerSubtypes {
              rawId
            }
          }
          userSkills {
            experience
            skill {
              rawId
            }
          }
        }
      }
    `, contractFragment)
    let reason = null
    if (filterParams.contractStatus === 'screening_started' && contract.requestsStatus !== 'started') reason = 'Status'
    else if (filterParams.contractStatus === 'screening_requested' && contract.requestsStatus !== 'pending') reason = 'Status'
    else if (filterParams.contractStatus === 'screening_completed' && contract.requestsStatus !== 'completed') reason = 'Status'
    else if (filterParams.contractStatus === 'screening_rejected' && contract.requestsStatus !== 'rejected') reason = 'Status'
    else if (filterParams.contractStatus && filterParams.contractStatus !== contract.requestsStatus) reason = 'Status'
    else if (filterParams.maxClientRate && contract.clientRate.value > filterParams.maxClientRate) reason = 'Rate'
    else if (filterParams.maxAnnualCompensation && contract.annualCompensation.value > filterParams.maxAnnualCompensation) reason = 'Compensation'
    else if (filterParams.maxClientRate && contract.clientRate.value > filterParams.maxClientRate) reason = 'Rate'
    else if (filterParams.locationType === 'job_timezone' && Math.abs(contract.freelancer?.timezoneOffset - filterParams.timezone) > (filterParams.timezoneRange || 0)) reason = 'Timezone'
    else if (filterParams.missingVideoIntroduction && contract.freelancer?.video?.id) reason = 'Video'
    else if (filterParams.hasVideoIntroduction && !contract.freelancer?.video?.id) reason = 'Video'
    else if (filterParams.missingProjectSubmission && contract.projectSubmission) reason = 'Code Test'
    else if (filterParams.hasProjectSubmission && !contract.projectSubmission) reason = 'Code Test'
    else if (filterParams.experience && contract.freelancer?.profile?.totalExperience < filterParams.experience) reason = 'Experience'
    else if (contract.freelancer?.userSkills && filterParams.skills?.length > 0) {
      const mismatches = mismatchingSkills(
        { user_skills: contract.freelancer.userSkills.map(s => ({ id: s.skill.rawId, experience: s.experience })) },
        { job_skills: filterParams.skills.map(s => ({ ...s, name: s.name, required: true })) },
      )
      if (mismatches.length > 0) reason = 'Skills'
    } else if (contract.freelancer?.profile?.freelancerSubtypes && filterParams.freelancerSubtypes?.length > 0) {
      const mismatches = missingSubtypes(
        { profile: { freelancer_subtype_ids: contract.freelancer.profile.freelancerSubtypes.map(s => s.rawId) } },
        { freelancer_subtypes: filterParams.freelancerSubtypes.map(s => ({ ...s, name: s.name, group_index: s.groupIndex })) },
      )
      if (mismatches.length > 0) reason = 'Specializations'
    } else if (filterParams.bookmarked && !contract?.bookmarked) {
      reason = 'Bookmark'
    }

    return reason
  } catch (error) {
    // It's easy for this to error out
    trackError(error)
    return null
  }
}

export function isPastInterview(contract: Pick<IContractForClient, 'status' | 'interview_date'>) {
  try {
    if (!contract) return null
    if (contract?.status === 'interview_accepted' && contract?.interview_date) {
      return moment(contract.interview_date).isBefore(moment().add(1, 'hours'))
    }
  } catch (error) {
    trackError(error)
  }
  return false
}

export function canRescheduleInterview(contract: Pick<IContractForClient, 'interview_date' | 'status'>) {
  return !isPastInterview(contract) && ['pending', 'interview_accepted'].indexOf(contract?.status) >= 0
}

export function getManagerName(contract: PartialContract) {
  let name = 'Manager'
  if (isInterviewStage(contract)) name = 'Interviewer'
  if (isOfferStage(contract) || isStartedContract(contract)) name = 'Reporting Manager'
  return name
}

export function getDefaultInterviewDate() {
  return moment().add(1, 'days').hours(10).minutes(0).seconds(0).format()
}

export function getDefaultStartDate() {
  return moment().add(1, 'weeks').isoWeekday(1).format('YYYY-MM-DD')
}

export function getDefaultEndDate(lengthInMonths = 6) {
  return moment(getDefaultStartDate()).add(lengthInMonths, 'months').format('YYYY-MM-DD')
}

export function getHourlyRate(rate: number, rateMode: RateMode) {
  if (!rate || rateMode === 'hour') return rate
  if (rateMode === 'day') return rate / 8.0

  return null
}
