import { Currency } from 'types/currency'
import { IBillingPlan } from './billingPlan'
import { IVideo } from './freelancer'
import { IPaymentMethod, IPaymentMethodType } from './paymentMethod'

export interface ICustomerSuccessRep {
  id: number
  first_name: string
  last_name: string
  name: string
  avatar_url: string
}

export interface IFirm {
  description: any
  website: any
  logo_url: string
  avatar_url: string
  background_theme: 'light' | 'default'
  invoice_schedule: 'weekly' | 'monthly'
  payment_method?: IPaymentMethod
  payment_method_types?: IPaymentMethodType[]
  payout_mode: 'wait_for_invoice_payment' | 'skip_waiting_for_invoice_payment'
  instant_background_check_payment: boolean
  id: number
  jobs_count: number
  active_members_count: number
  slug: string
  name: string
  additional_invoice_text: string
  greenhouse_configured: boolean
  allow_invoice_auto_charge: boolean
  emails_for_invoices: string[]
  currency: string
  is_firm: true
  billing_plan?: IBillingPlan
  legacy_billing?: boolean
  allow_no_payment_method?: boolean
  customer_success_rep?: ICustomerSuccessRep
  allow_display_applicant_source?: boolean
  unify_invoices_in_preferred_currency?: boolean
  video: IVideo
}
