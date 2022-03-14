import { Currency } from 'types/currency'

/* eslint-disable camelcase */

/**
 * @see backend/app/serializers/client_invoice_serializer.rb
 */

export type InvoiceClientStatus = 'paid' | 'payment_processing' | 'overdue' | 'requested' | 'not_requested'

export interface IClientInvoice {
  id: number
  due_date: string
  invoice_date: string
  pdf_url: string
  invoice_num: number
  company_name: string
  status: InvoiceClientStatus
  emailed_at: string
  'overdue?': boolean
  token: string
  'client_paid?': boolean
  expenses: IInvoiceExpense[]
  expenses_amount: number
  invoice_items_amount: number
  invoice_items_no_timesheets_subtotal: number
  total_to_pay_client: number
  client_paid_at: string
  timesheets: IInvoiceTimesheet[]
  invoice_items: IInvoiceItem[]
  capital_expenditure_subtotal: number
  operating_expenditure_subtotal: number
  unassigned_expenditure_subtotal: number
  payment_processing_fee_included: boolean
  currency: string
  is_payment_processing: boolean
  created_at: string
  payment_started_at: string
  start_date: string
  end_date: string
}

export interface IInvoiceTimesheet {
  id: number
  freelancer_name: string
  client_rate: number
  start_date: string
  end_date: string
  status: string
  avatar_url: string
  total_hours: number
  total_minutes: number
  total_to_pay_client: number
  total_to_pay_for_hours_client: number
  total_expenses: string
  project_codes: string[]
  currency: string
}

export interface IInvoiceItem {
  id: number
  description: string
  explanation: string
  num_units: number
  amount_per_unit: number
  currency: string
  total_amount: number
  // eslint-disable-next-line max-len
  item_type: 'custom' | 'background_check' | 'manager_fee' | 'job_fee' | 'tracking_log' | 'job_integration_activation_fee' | 'referral_boost' | 'payment_processing_fee'
}

export interface IInvoiceExpense {
  id: number
  project_code: string | number
  description: string
  receipt_url: string
  expense_date: string
  amount: number
  freelancer_name: string
  currency: string
}
