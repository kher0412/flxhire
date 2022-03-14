import React from 'react'
import { Meta } from '@storybook/react'
import StatusInfoButton from 'components/StatusInfoButton'
import moment from 'moment'
import { StatusInfoButtonContainer } from './StatusInfoButtonContainer'

export default {
  component: StatusInfoButton,
  title: 'Components/StatusInfoButton/Client/Invoice',
  argTypes: {
    status: { options: ['pending', 'submitted', 'approved'], control: { type: 'select' } },
    invoice_status: { options: ['not_requested', 'payment_processing'], control: { type: 'select' } },
    invoice_emailed: { control: 'boolean' },
    invoice_client_paid: { control: 'boolean' },
    ThingsBelowThisShouldNotAffectThisComponent: { control: 'text' },
  },
} as Meta

export const InvoiceNotRequested: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
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
    invoice={{}}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

InvoiceNotRequested.args = {
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
  invoice_status: 'not_requested',
  timesheet_submitted: false,
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: false,
  invoice_client_paid: false,
}

export const InvoiceNotRequestedButEmailed: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
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
    invoice={{}}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

InvoiceNotRequestedButEmailed.args = {
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
  invoice_status: 'not_requested',
  timesheet_submitted: false,
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: true,
  invoice_client_paid: false,
}

export const PaymentProcessingNotPaid: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
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
    invoice={{}}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

PaymentProcessingNotPaid.args = {
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
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: true,
  invoice_client_paid: false,
}

export const PaymentProcessingPaid: any = ({ invoice_client_paid, invoice_emailed, timesheet_payment_done, timesheet_client_paid, timesheet_invoiced, timesheet_submitted, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice_status }) => (
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
    invoice={{}}
    isClient={isClient}
    submitted_at={timesheet_submitted}
    invoice_date={timesheet_invoiced}
    client_paid_at={timesheet_client_paid}
    paid_at={timesheet_payment_done}
    emailed_at={invoice_emailed}
    invoice_client_paid_at={invoice_client_paid}
  />
)

PaymentProcessingPaid.args = {
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
  timesheet_invoiced: false,
  timesheet_client_paid: false,
  timesheet_payment_done: false,
  invoice_emailed: true,
  invoice_client_paid: true,
}
