import { Currency } from 'types/currency'
import { IFreelancer, IProfileAvailabilityType, IVideoAnswer } from './freelancer'
import { IClient } from './client'
import { IJob, JobPositionType, RateMode } from './job'
import { IQuestionForFreelancer } from './question'
import { IProject, IProjectSubmission } from './project'
import { ITag } from './tag'
import { IAnswer } from './answer'

type ICandidateContractStatus = 'potential' | 'job_viewed' | 'job_application_draft' |'job_application_invited'
type IJobApplicationStatus = 'job_application_sent'
type IInterviewStatus = 'pending' | 'interview_accepted' | 'interview_rejected'
type IOfferStatus = 'offer_made' | 'offer_rejected'
type IStartedContractStatus = 'active' | 'paused'
type IFailedContractStatus = 'rejected' | 'expired' | 'deleted'

export type IContractStatus = ICandidateContractStatus |
  IJobApplicationStatus |
  IInterviewStatus |
  IOfferStatus |
  IStartedContractStatus |
  IFailedContractStatus

export type IContractRequestType = 'answer' | 'project_submission' | 'video_introduction'
export type IContractRequestStatus = 'pending' | 'started' | 'completed' | 'rejected'

export interface IContractRequest {
  id: number
  status: IContractRequestStatus
  request_type: IContractRequestType
  question_id: number
  project_id: number
  title: string
  question?: IQuestionForFreelancer
  project?: IProject
  project_submission?: IProjectSubmission,
  allow_textual_answers: boolean
}

export interface IContract {
  id: number
  status: IContractStatus
  freelancer_rate: number
  firm_slug: string
  job_slug?: string
  job_id?: number
  job_title?: string
  job?: IJob
  client_id: number
  freelancer_id: number
  interview_date: string
  interview_date_1: string
  interview_date_2: string
  interview_date_3: string
  interview_note: string
  company_name: string
  requests_status: string
  payments_enabled: boolean
  start_date: Date
  end_date: Date
  position_types: JobPositionType[]
  project_length_in_months: number
  offer_note: string
  availability_type: IProfileAvailabilityType[]
  payment_net_terms: number
  annual_compensation: number
  last_interaction_at: string
  hidden?: boolean
  chat_thread_id: number
  previous_status: IContractStatus
  profile_job_incompatibility_reasons: string[]
  currency: string
  job_opportunity_sent_at: string
  interview_scheduling_method: 'schedule_via_flexhire' | 'schedule_via_calendly'
  calendly_url?: string
  payment_mode: 'pay_work_reports' | 'salary'
  next_salary_invoice_date: string
  estimated_next_salary_payout_date: string
  rate_mode: RateMode,
  allow_textual_answers: boolean
  enable_timesheets: boolean
  require_timesheet_approval_for_payments: boolean
}

export interface Discount {
  code: string
  type_discount: 'fixed_amount_discount' | 'percentage'
  amount: number
  type_use: 'single' | 'multiple'
  expiry_date: string
}

export interface IContractForClient extends IContract {
  discount: Discount
  markup: number
  margin: number
  min_margin_usd: number
  client_rate: number
  min_client_rate: number
  min_freelancer_rate: number
  freelancer_first_name: string
  freelancer_last_name: string
  freelancer_email: string
  freelancer_contact_email: string
  freelancer_phone: string
  freelancer_feedback: string
  freelancer_message: string
  freelancer: IFreelancer
  invitation_type: 'hire' | 'invitation'
  requests_status: 'pending' | 'started' | 'completed' | 'rejected'
  positive_feedback_count: number
  negative_feedback_count: number
  total_feedback_count: number
  has_feedback_from_self: boolean
  project_submission?: IProjectSubmission
  managed_by: string
  managed_by_id: number
  contract_requests: IContractRequest[]
  answers: IVideoAnswer[]
  textual_answers: IAnswer[]
  tags: ITag[]
  job_application_reminder_sent_at: string
  referer_url: string
  applicant_source: string
  referer_name: string
  managed_off_platform: boolean
  disable_min_usd_margin_limit: boolean
  freelancer_timezone_name?: string
  job_status?: IJob['status']
  bookmarked?: boolean
}

export interface IContractForFreelancer extends IContract {
  client: IClient
  hiring_manager?: IClient
  company_name: string
  invoice_schedule: string
  contract_requests: IContractRequest[]
}

export interface IContractFeedback {
  id: number
  user_id: number
  contract_id: number
  name: string
  avatar_url: string
  rating_positive: boolean
  status: 'draft' | 'requested' | 'sent'
  description: string
  updated_at: string
}
