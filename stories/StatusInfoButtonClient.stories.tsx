import React from 'react'
import { Meta } from '@storybook/react'
import StatusInfoButton from 'components/StatusInfoButton'
import moment from 'moment'
import { StatusInfoButtonContainer } from './StatusInfoButtonContainer'

export default {
  component: StatusInfoButton,
  title: 'Components/StatusInfoButton/Client/Timesheet',
  argTypes: {
    assumed_payout_due_date: { control: 'date' },
    payout_due_date: { control: 'date' },
    status: { options: ['pending', 'submitted', 'approved'], control: { type: 'select' } },
    freelancer_status: { options: ['submitted', 'approved', 'invoiced', 'client_paid', 'client_payment_processing', 'paid_out'], control: { type: 'select' } },
    invoice_status: { options: ['not_requested', 'payment_processing'], control: { type: 'select' } },
    timesheet_submitted: { control: 'boolean' },
    timesheet_invoiced: { control: 'boolean' },
    timesheet_client_paid: { control: 'boolean' },
    timesheet_payment_done: { control: 'boolean' },
    auto_approve: { control: 'boolean' },
    has_active_payout_method: { control: 'boolean' },
    payouts_wait_for_payout_due_date: { control: 'boolean' },
    invoice_schedule: { options: ['weekly', 'monthly'], control: { type: 'select' } },
    payout_mode: { control: 'text' },
  },
} as Meta

export const TimesheetSubmittedAwaitingApproval: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
  <StatusInfoButtonContainer
    assumed_payout_due_date={assumed_payout_due_date}
    payout_due_date={payout_due_date}
    status={status}
    freelancer_status={freelancer_status}
    has_active_payout_method={has_active_payout_method}
    invoice_schedule={invoice_schedule}
    auto_approve={auto_approve}
    payouts_wait_for_payout_due_date={payouts_wait_for_payout_due_date}
    payout_mode={payout_mode}
    invoice_status={invoice_status}
    invoice={null}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

TimesheetSubmittedAwaitingApproval.args = {
  assumed_payout_due_date: moment(),
  payout_due_date: moment(),
  status: 'submitted',
  freelancer_status: 'submitted',
  isClient: true,
  has_active_payout_method: true,
  invoice_schedule: 'weekly',
  auto_approve: true,
  payouts_wait_for_payout_due_date: true,
  payout_mode: 'skip_waiting_for_invoice_payment',
  invoice_status: 'payment_processing',
  timesheet_submitted: false,
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: false,
  invoice_client_paid: false,
}

export const TimesheetSubmittedApproved: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
  <StatusInfoButtonContainer
    assumed_payout_due_date={assumed_payout_due_date}
    payout_due_date={payout_due_date}
    status={status}
    freelancer_status={freelancer_status}
    has_active_payout_method={has_active_payout_method}
    invoice_schedule={invoice_schedule}
    auto_approve={auto_approve}
    payouts_wait_for_payout_due_date={payouts_wait_for_payout_due_date}
    payout_mode={payout_mode}
    invoice_status={invoice_status}
    invoice={null}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

TimesheetSubmittedApproved.args = {
  assumed_payout_due_date: moment(),
  payout_due_date: moment(),
  status: 'approved',
  freelancer_status: 'approved',
  isClient: true,
  has_active_payout_method: true,
  invoice_schedule: 'weekly',
  auto_approve: true,
  payouts_wait_for_payout_due_date: true,
  payout_mode: 'skip_waiting_for_invoice_payment',
  invoice_status: 'payment_processing',
  timesheet_submitted: false,
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: false,
  invoice_client_paid: false,
}

export const TimesheetInvoicedNotPaid: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
  <StatusInfoButtonContainer
    assumed_payout_due_date={assumed_payout_due_date}
    payout_due_date={payout_due_date}
    status={status}
    freelancer_status={freelancer_status}
    has_active_payout_method={has_active_payout_method}
    invoice_schedule={invoice_schedule}
    auto_approve={auto_approve}
    payouts_wait_for_payout_due_date={payouts_wait_for_payout_due_date}
    payout_mode={payout_mode}
    invoice_status={invoice_status}
    invoice={null}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

TimesheetInvoicedNotPaid.args = {
  assumed_payout_due_date: moment(),
  payout_due_date: moment(),
  status: 'approved',
  freelancer_status: 'invoiced',
  isClient: true,
  has_active_payout_method: true,
  invoice_schedule: 'weekly',
  auto_approve: true,
  payouts_wait_for_payout_due_date: true,
  payout_mode: 'skip_waiting_for_invoice_payment',
  invoice_status: 'payment_processing',
  timesheet_submitted: false,
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: false,
  invoice_client_paid: false,
}

export const TimesheetInvoicedAndPaid: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
  <StatusInfoButtonContainer
    assumed_payout_due_date={assumed_payout_due_date}
    payout_due_date={payout_due_date}
    status={status}
    freelancer_status={freelancer_status}
    has_active_payout_method={has_active_payout_method}
    invoice_schedule={invoice_schedule}
    auto_approve={auto_approve}
    payouts_wait_for_payout_due_date={payouts_wait_for_payout_due_date}
    payout_mode={payout_mode}
    invoice_status={invoice_status}
    invoice={null}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

TimesheetInvoicedAndPaid.args = {
  assumed_payout_due_date: moment(),
  payout_due_date: moment(),
  status: 'approved',
  freelancer_status: 'client_payment_processing',
  isClient: true,
  has_active_payout_method: true,
  invoice_schedule: 'weekly',
  auto_approve: true,
  payouts_wait_for_payout_due_date: true,
  payout_mode: 'skip_waiting_for_invoice_payment',
  invoice_status: 'payment_processing',
  timesheet_submitted: false,
  timesheet_invoiced: true,
  timesheet_client_paid: true,
  timesheet_payment_done: false,
  invoice_emailed: false,
  invoice_client_paid: false,
}

export const TimesheetPaidToFreelancer: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
  <StatusInfoButtonContainer
    assumed_payout_due_date={assumed_payout_due_date}
    payout_due_date={payout_due_date}
    status={status}
    freelancer_status={freelancer_status}
    has_active_payout_method={has_active_payout_method}
    invoice_schedule={invoice_schedule}
    auto_approve={auto_approve}
    payouts_wait_for_payout_due_date={payouts_wait_for_payout_due_date}
    payout_mode={payout_mode}
    invoice_status={invoice_status}
    invoice={null}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

TimesheetPaidToFreelancer.args = {
  assumed_payout_due_date: moment(),
  payout_due_date: moment(),
  status: 'approved',
  freelancer_status: 'client_paid',
  isClient: true,
  has_active_payout_method: true,
  invoice_schedule: 'weekly',
  auto_approve: true,
  payouts_wait_for_payout_due_date: true,
  payout_mode: 'skip_waiting_for_invoice_payment',
  invoice_status: 'payment_processing',
  timesheet_submitted: false,
  timesheet_invoiced: true,
  timesheet_client_paid: true,
  timesheet_payment_done: true,
  invoice_emailed: false,
  invoice_client_paid: false,
}
