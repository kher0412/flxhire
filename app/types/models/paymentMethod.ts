import { Currency } from 'types/currency'

export type IPaymentMethodType = 'card' | 'plaid_link' | 'sepa_debit' | 'ach_credit_transfer'

export interface IPaymentMethod {
  id: number
  user_id: number
  mask: string
  name: string
  institution_name: string
  payment_method_type: IPaymentMethodType
  ach_routing_number: string
  ach_account_number: string
  swift_code: string
  amount_available: number
  customer_id: string
  token: string
  exp_month: number
  exp_year: number
  cardholder_name: string
  currency: string
}
