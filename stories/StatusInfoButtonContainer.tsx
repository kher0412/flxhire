import React from 'react'
import { Provider } from 'react-redux'
import StatusInfoButton from 'components/StatusInfoButton'
import { createStore } from 'redux'
import reducer, { getInitialState } from 'reducers'
import { ThemeProvider } from '@material-ui/core'
import FlexHireTheme from 'FlexHireTheme'
import moment from 'moment'

interface ContainerProps {
    assumed_payout_due_date: any;
    payout_due_date: string;
    status: string;
    freelancer_status: string;
    has_active_payout_method: boolean;
    invoice_schedule: string;
    auto_approve: boolean;
    payouts_wait_for_payout_due_date: boolean;
    payout_mode: string;
    invoice: any;
    invoice_status: string;
    isClient: boolean;
    submitted_at: any;
    invoice_date: any;
    client_paid_at: any;
    paid_at: any;
    emailed_at: any;
    invoice_client_paid_at: any;
  }

// eslint-disable-next-line max-len
export const StatusInfoButtonContainer = ({ invoice_client_paid_at, emailed_at, paid_at, client_paid_at, invoice_date, submitted_at, isClient, assumed_payout_due_date, payout_due_date, status, freelancer_status, has_active_payout_method, invoice_schedule, auto_approve, payouts_wait_for_payout_due_date, payout_mode, invoice, invoice_status }: ContainerProps) => {
  const firm = {
    invoice_schedule: invoice_schedule,
    payout_mode: payout_mode,
  }
  const configuration = {
    payouts_wait_for_payout_due_date: payouts_wait_for_payout_due_date,
  }
  if (submitted_at) {
    submitted_at = moment().toString()
  }
  if (invoice_date) {
    invoice_date = moment().toString()
  }
  if (client_paid_at) {
    client_paid_at = moment().toString()
  }
  if (paid_at) {
    paid_at = moment().toString()
  }
  if (emailed_at) {
    emailed_at = moment().toString()
  }
  if (invoice_client_paid_at) {
    invoice_client_paid_at = moment().toString()
  }

  if (invoice) {
    invoice = {
      status: invoice_status,
      emailed_at: emailed_at,
      client_paid_at: invoice_client_paid_at,
    }
  }
  return (
    <ThemeProvider theme={FlexHireTheme}>
      <Provider store={createStore(reducer, getInitialState())}>
        <StatusInfoButton
          isClient={isClient}
          timesheet={{
            assumed_payout_due_date,
            payout_due_date,
            status,
            freelancer_status,
            invoice_schedule,
            auto_approve,
            submitted_at,
            invoice_date,
            client_paid_at,
            paid_at,
          } as any}
          storybookUser={{
            configuration,
            firm,
            has_active_payout_method,
          } as any}
          invoice={invoice}
        />
      </Provider>
    </ThemeProvider>
  )
}
