import { Currency } from 'types/currency'
import { ITimesheetEntry } from './timesheet-entry'
import { IFirm } from './firm'

/* eslint-disable camelcase */

/**
 * @see backend/app/serializers/timesheet_for_client_serializer.rb
 */

export interface IExpense {
  timesheet_id: number
  project_code: string
  description: string
  receipt_url: string
  expense_date: string
  amount: number
  currency: string
  expense_type: string
}

export type ITimesheetStatus = 'pending' | 'submitted' | 'client_query' | 'approved' | 'rejected' | 'void'

export interface ITimesheet {
  id: number
  start_date: string
  end_date: string
  total_hours: number
  total_minutes: number
  status: ITimesheetStatus
  client_status: ITimesheetStatus | 'paid' | 'payout_failed'
  freelancer_status: ITimesheetStatus | 'paid' | 'payout_failed' | 'client_paid' | 'client_payment_processing' | 'invoiced'
  project_codes: number[]
  freelancer_id: number
  client_id: number
  created_at: string
  submitted_at: string
  approved_at: string
  client_rating_score: number
  client_rating_feedback_start: string
  client_rating_feedback_stop: string
  client_rating_feedback_continue: string
  payments_enabled: boolean
  timesheet_entries: ITimesheetEntry[]
  expenses: IExpense[]
  paid_at: string
  freelancer_rate: number
  total_to_pay: number
  total_to_pay_for_hours: number
  client_name: string
  invoice_date: string
  assumed_invoice_date: string
  invoice_due_date: string
  assumed_invoice_due_date: string
  payout_due_date: string
  assumed_payout_due_date: string
  client_paid_at: string
  payment_started_at: string
  currency: string
}

export interface ITimesheetForFreelancer extends ITimesheet {
  payable: boolean
  client_avatar: string
  client_comments: string
  invoice_id: number
  invoice_schedule: IFirm['invoice_schedule']
  payment_net_terms: number
}

export interface ITimesheetForClient extends ITimesheet {
  freelancer_name: string
  client_rate: number
  avatar_url: string
  invoice_num: number
  total_expenses: string
  freelancer_slug: string
  total_to_pay_for_hours_client: number
  editable: boolean
  auto_approve: boolean
}
