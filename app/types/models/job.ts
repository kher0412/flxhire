import { IFreelancerSubtype } from './freelancerSubtype'
import { IFreelancerType } from './freelancerType'
import { IJobSkill } from './skill'
import { IContractForFreelancer } from './contract'
import { IQuestion } from './question'
import { IFirm } from './firm'

export type LocationType = 'anywhere' | 'specific_countries' | 'full_address' | 'job_timezone'
export type JobPositionType = 'freelancer' | 'permanent'
export type JobAvailabilityType = 'part_time' | 'full_time' | 'on_site' | 'contract_to_perm'
export type JobStatus = 'opened' | 'closed' | 'draft'
export type JobIntegrationPostingStatus = 'pending' | 'published' | 'waiting' | 'removed'
export type RateMode = 'hour' | 'day' | 'month' | 'year'

export interface ICandidateToNotify {
  id: number
  status?: 'pending' | 'scheduled' | 'notified'
}

export interface IJobSubtype extends IFreelancerSubtype {
  group_index: number
}

export interface IJob {
  id: number
  status?: JobStatus
  token?: string
  expires_at?: string
  auto_renew: boolean
  project_length_in_months: number
  number_of_hires?: number
  slug: string
  user_id: number
  firm_slug: string
  company_name: string
  company_logo_url: string
  company_avatar_url: string
  title: string
  description: string
  created_at: string
  company_website: string
  company_description: string
  job_skills: IJobSkill[]
  job_social_integrations: string[]
  candidates_to_notify?: ICandidateToNotify[]
  freelancer_subtypes: IJobSubtype[]
  freelancer_type: IFreelancerType
  freelancer_type_id: number
  availability_type: JobAvailabilityType
  freelancer_rate: number
  min_freelancer_rate: number
  client_rate: number
  min_client_rate: number
  rate_mode: RateMode
  required_experience_years: number
  position_types: JobPositionType[]
  location_type: LocationType
  job_countries: string[]
  job_timezone: string
  timezone_value: number
  timezone_range: number
  auto_send_screening_requests: boolean
  screening_request_message_template: string
  questions?: IQuestion[]
  project?: any
  candidates_count: number
  direct_applications_count: number
  screening_count: number
  interviews_count: number
  offers_count: number
  is_job: true
  location_latitude?: number
  location_longitude?: number
  full_address?: string
  city?: string
  region?: string
  country?: string
  contract?: IContractForFreelancer
  job_integrations?: IJobIntegration[]
  active_job_integrations_names?: string[]
  referral_bounty: number
  company_background_theme: IFirm['background_theme']
  margin?: number
  markup?: number
  min_margin_usd?: number
  automatically_notify_candidates?: boolean
  allow_textual_answers: boolean
}

export interface IJobIntegrationType {
  name: string
  compatible: boolean
  enabled: boolean
  activation_fee_usd: number
  daily_fee_usd: number
}

export interface IJobIntegration {
  id: number
  active: boolean
  integration_name: string
  activation_fee_usd: number
  daily_fee_usd: number
  published_job_url: string
  publication_expires: string
  posting_status: JobIntegrationPostingStatus
  enabled_by_user: boolean
  supported_actions: string[]
}

export function isJob(object: any) : object is IJob {
  return Boolean(object?.is_job)
}
