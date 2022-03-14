import { IPaymentMethodType } from './paymentMethod'

export interface IBillingPlan {
  id: number
  hidden: boolean
  name: string
  highlighted?: boolean
  daily_plan_fee_usd: number
  daily_job_fee_usd: number
  daily_manager_fee_usd: number
  daily_sourced_by_flexhire_hire_contract_fee_usd: number
  daily_sourced_by_client_hire_contract_fee_usd: number
  daily_invite_contract_fee_usd: number
  daily_payments_enabled_contract_fee_usd: number
  daily_payments_disabled_contract_fee_usd: number
  max_candidates: number
  minimum_managers: number
  contracts_invitation_margin: number
  contracts_hire_margin: number
  contracts_hire_min_margin_usd: number
  contracts_hire_sourced_by_flexhire_margin: number
  contracts_hire_sourced_by_client_margin: number
  allow_multiple_managers: boolean
  allow_ats_job_integrations: boolean
  allow_career_page_integration: boolean
  allow_background_checks: boolean
  allow_payments_disabled_contracts: boolean
  customer_success_rep: boolean
  free_payments_disabled_contracts_limit: number
  payment_method_types: IPaymentMethodType[]
}
