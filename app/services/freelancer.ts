import { uniq, isEmpty, upperFirst, replace } from 'lodash'
import { ICurrentUser, IProfile, IProfileJobType, IProfileAvailabilityType, IUserStatus, IContractForClient, IResume } from 'types'
import { isOfferStage, isUnsentJobApplication } from './contract'
import { getCountryName, adjustCountryName } from './location'

type ProfileLocationData = Pick<IProfile, ('city' | 'country' | 'region' | 'full_address')>

export function getLocation(profile: ProfileLocationData, hideCity: boolean = false) {
  if (!profile) return null
  const addressParts = (profile.full_address || '').split(', ')
  let city: string
  let region: string
  let country: string
  let parts: string[]

  if (addressParts.length === 3) {
    city = addressParts[0]
    region = addressParts[1]
    country = addressParts[2]
  }

  country = getCountryName(profile.country) || adjustCountryName(country)

  if (hideCity) {
    parts = [profile.region || region, country]
  } else {
    parts = [profile.city || city, profile.region || region, country]
  }

  return uniq(parts)
    .filter(x => typeof x === 'string' && !isEmpty(x))
    .join(', ')
}

export function contractFullTime(availabilityType: string[]): string[] {
  return availabilityType.map(term => upperFirst(replace(term, '_', ' ')))
}

export const getOwnProfileUrl = (user: ICurrentUser) : { to: string, as?: string } => {
  if (user?.profile?.slug) {
    return { to: '/[...slugs]', as: `/${user.profile.slug}` }
  }
  return { to: '/member/profile' }
}

export const isFreelancerApplying = (status: IUserStatus) => {
  return ['applying', 'applied', 'interview'].indexOf(status) >= 0
}

export const TOTAL_EXPERIENCE = [
  { value: 0, label: '0-2 years' },
  { value: 3, label: '3 years' },
  { value: 4, label: '4 years' },
  { value: 5, label: '5 years' },
  { value: 6, label: '6 years' },
  { value: 7, label: '7 years' },
  { value: 8, label: '8 years' },
  { value: 9, label: '9 years' },
  { value: 10, label: '10 years' },
  { value: 11, label: '11+ years' },
]

export const AVAILABILITY_TYPES: { label: string, value: IProfileAvailabilityType }[] = [
  { label: 'Full-time', value: 'full_time' },
  { label: 'Part-time', value: 'part_time' },
]

export const JOB_TYPES : { label: string, value: IProfileJobType }[] = [
  { label: 'Freelance', value: 'freelance' },
  { label: 'Permanent', value: 'permanent' },
]

export const STATUS_COLORS = new Map([
  ['pending', 'rgb(225,175,0)'],
  ['unverified', 'rgb(0,165,0)'],
  ['applying', 'rgb(225,175,0)'],
  ['applied', 'rgb(225,175,0)'],
  ['interview', 'rgb(225,175,0)'],
  ['accepted', 'rgb(0,165,0)'],
  ['rejected', 'rgb(235,0,0)'],
  ['deleted', 'rgb(235,0,0)'],
])

export function getStatusColor(status: IUserStatus) : string {
  return STATUS_COLORS.get(status)
}

type PartialContract = Pick<IContractForClient, 'status'>

export function isRejectable(contract: Pick<IContractForClient, 'status' | 'invitation_type'>) {
  const rejectableStatuses = ['interview_accepted', 'job_application_sent', 'job_application_draft', 'offer_made']
  return !contract?.status || (contract?.invitation_type === 'hire' && rejectableStatuses.includes(contract?.status))
}

export function canMakeOffer(contract: PartialContract) {
  const hasApplied = Boolean(contract?.status) && !isUnsentJobApplication(contract)
  const offerMade = contract?.status === 'offer_made'
  return hasApplied && !offerMade && contract?.status !== 'rejected'
}

export function canRequestInterview(contract: PartialContract) {
  return Boolean(contract?.status) && ['job_application_sent', 'pending', 'interview_accepted', 'interview_rejected', 'offer_rejected'].includes(contract?.status)
}

export function canScreen(contract: PartialContract) {
  return Boolean(contract?.status) && !isUnsentJobApplication(contract) && !isOfferStage(contract) && contract?.status !== 'rejected'
}

export function isImportingResume(resume: Pick<IResume, 'status' | 'import_timed_out'>) {
  return ['processing', 'processing_queued'].includes(resume?.status) && !resume.import_timed_out
}
