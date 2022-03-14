import { Currency } from '../currency'
import { IFirm } from './firm'
import { IProfile, IVideo } from './freelancer'
import { IPaymentMethodType } from './paymentMethod'

export type IUserType = 'client' | 'member'
export type IUserRole = 'client' | 'member' | 'admin' | 'user' | 'screening' | 'sales' | 'customer_success_rep' | 'recruiter'
export type IFirmRole = 'firm_admin' | 'firm_member'
export type IUserStatus = 'pending' | 'unverified' | 'applying' | 'applied' | 'interview' | 'accepted' | 'rejected' | 'deleted'
export type IClientStatus = 'none' | 'pending' | 'applied' | 'accepted' | 'rejected'

export interface IFlexhireConfiguration {
  loading?: boolean
  jobs_min_client_rate_usd?: number
  jobs_min_annual_compensation_usd?: number
  invitation_min_client_rate_usd?: number
  min_hourly_rate_usd?: number
  min_annual_compensation_usd?: number
  video_max_duration?: number
  video_max_duration_company?: number
  video_min_duration?: number
  profile_feedback_participants_ids?: number[]
  enable_service_worker?: boolean
  enable_service_worker_update_detection?: boolean
  enable_service_worker_auto_skip_waiting?: boolean
  enable_pwa_install?: boolean
  oauth_signup_providers?: string[]
  advertising_providers?: string[]
  credit_card_fixed_fee?: number
  credit_card_percentage_fee?: number
  supported_currencies?: Currency[]
  currencies_exempt_from_conversion_fee?: string[]
  currency_conversion_percentage_fee?: number
  payment_method_types?: IPaymentMethodType[]
  background_check_price_usd?: number
  allow_changing_auto_invoice_charge?: boolean
  payouts_wait_for_payout_due_date?: boolean
  enable_calendly?: boolean
  enable_payroll_page?: boolean
  enable_bonuses_page?: boolean
  enable_auto_bonuses?: boolean
  payout_method_types?: ('payoneer' | 'stripe_connect')[]
  sepa_limit?: number
  max_candidates?: number
  enable_company_videos?: boolean
  enable_hiring_manager?: boolean
  frontend_build_id?: string
  use_video_cdn?: boolean
  video_cdn_url?: string
  enable_new_navigation_sidebar?: boolean
  enable_expenses_page?: boolean
  allow_jobs_with_no_rates?: boolean
}

export interface ICurrentUser {
  roles: IUserRole[]
  configuration: IFlexhireConfiguration
  email?: string
  unconfirmed_email?: string
  confirmed_email?: boolean
  is_firm_admin?: boolean
  id?: number
  first_name?: string
  last_name?: string
  name?: string
  profile?: IProfile
  firm?: IFirm
  status?: IUserStatus
  loading?: boolean
  featured?: boolean
  avatar_url?: string
  job_applications_count?: number
  has_invoice_access?: boolean
  video?: IVideo
  phone?: string
  send_timesheet_reminders?: boolean
  additional_invoice_text?: string
  purchase_order_number?: string
  address?: string
  team_invitation_message?: string
  manager_invitation_message?: string
  password_setup_required?: boolean
  integration_name?: string
  hire_sourced_by_flexhire_margin?: number
  hire_sourced_by_client_margin?: number
  invite_margin?: number
  min_margin_usd?: number
  timezone?: string
  timezone_name?: string
  timezone_offset?: number
  remote_debug_code?: string
  real_user?: Omit<ICurrentUser, 'real_user'>
  has_active_payout_method?: boolean
  display_dialog_after_saving_draft_timesheet?: boolean
  block_platform_access_due_to_unpaid_invoices_date?: string
  calendly_url?: string
  is_flexhire_team?: boolean
  api_access?: boolean
}

export function isFirm(object: any) : object is IFirm {
  return Boolean(object?.is_firm)
}
