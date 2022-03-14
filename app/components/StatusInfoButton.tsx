import { Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { MoreButtonCard } from 'components'
import { Button } from 'components/themed'
import { useCurrentUser } from 'hooks'
import moment from 'moment'
import { getNextPayoutMoment } from 'services/invoice'
import { getPayoutsWaitForDate, getTimesheetPayoutDeadline } from 'services/timesheets'
import { IClientInvoice, ICurrentUser, ITimesheetForClient, ITimesheetForFreelancer } from 'types'
import Link from './Link'

interface IStep {
  status: string
  title: string
  description: string
  completed: boolean
  completedDescription?: string
  completedTitle?: string
  completedAt?: string
  expectedArrivalAt?: string
  statusAliases?: string[]
  storybookUser?: any
}

type FreelancerTimesheetFields = 'id' | 'status' | 'invoice_schedule' | 'payment_net_terms' | 'assumed_payout_due_date' | 'client_paid_at' | 'payout_due_date' | 'submitted_at' | 'invoice_date' | 'assumed_invoice_date' | 'paid_at' | 'freelancer_status'

function getFreelancerTimesheetSteps(timesheet: Pick<ITimesheetForFreelancer, FreelancerTimesheetFields>, user: ICurrentUser) : IStep[] {
  const canBePaid = user?.has_active_payout_method
  const invoiceSchedule = timesheet.invoice_schedule || 'monthly'
  const paymentTerms = timesheet.payment_net_terms || 7
  const payoutsWaitForDate = user.id ? getPayoutsWaitForDate(user) : true
  const payoutDueDate = timesheet?.payout_due_date || timesheet?.assumed_payout_due_date
  const payoutDueDateText = payoutDueDate && moment(payoutDueDate).isAfter(moment()) ? moment(payoutDueDate).fromNow() : 'within one business day'
  const setupPayoneerText = canBePaid ? '' : '. Set up payments using the button below to receive the payment'
  const timesheetPayoutDeadline = getTimesheetPayoutDeadline(timesheet)?.toString()
  const expectedPaidAt = timesheet.client_paid_at && !payoutsWaitForDate ? getNextPayoutMoment().toDate().toString() : timesheetPayoutDeadline

  return [
    {
      status: 'pending',
      statusAliases: ['submitted'],
      title: 'Draft',
      completedTitle: 'Submitted',
      description: 'This work report is still a draft. When you are ready, submit the work report to the client',
      completedDescription: 'This work report has been emailed to the client, and is pending approval. This process usually takes a few days',
      completed: Boolean(timesheet.submitted_at),
      completedAt: timesheet.submitted_at,
    },
    {
      status: 'approved',
      statusAliases: ['invoiced'],
      title: 'Approved',
      completedTitle: 'Invoiced',
      description: `Your work report has been approved! It will be invoiced to the client in their next ${invoiceSchedule} invoice schedule`,
      completedDescription: `Your work report has been invoiced and is awaiting payment from the client. The client's payment terms are ${paymentTerms} days. Thus you will be paid in approximately ${paymentTerms} days.`,
      completed: Boolean(timesheet.invoice_date),
      expectedArrivalAt: timesheet.invoice_date || timesheet.assumed_invoice_date,
      completedAt: timesheet.invoice_date,
    },
    {
      status: 'client_payment_processing',
      statusAliases: ['client_paid'],
      title: 'Client payment processing',
      completedTitle: 'Paid by client',
      description: 'The client has initiated payment, but it is still being processed. This can take up to five business days',
      completedDescription: payoutsWaitForDate ? (
        `Payment will be sent to you ${payoutDueDateText}${setupPayoneerText}`
      ) : (
        `Payment will be sent to you today${setupPayoneerText}`
      ),
      completed: Boolean(timesheet.client_paid_at),
      completedAt: timesheet.client_paid_at,
    },
    {
      status: 'paid',
      title: 'Paid to you',
      description: 'We have initiated a payment for this work report. You should receive this payment within a few hours',
      expectedArrivalAt: expectedPaidAt,
      completed: Boolean(timesheet.paid_at),
      completedAt: timesheet.paid_at,
    },
  ]
}

type ClientTimesheetFields = 'auto_approve' | 'assumed_payout_due_date' | 'payout_due_date' | 'client_paid_at' | 'submitted_at' | 'approved_at' | 'invoice_date' | 'assumed_invoice_date' | 'payment_started_at' | 'paid_at' | 'freelancer_status'

function getClientTimesheetSteps(timesheet: Pick<ITimesheetForClient, ClientTimesheetFields>, user: ICurrentUser) : IStep[] {
  const mustPay = user?.firm?.payout_mode !== 'skip_waiting_for_invoice_payment'
  const autoApprove = timesheet?.auto_approve
  const invoiceSchedule = user?.firm?.invoice_schedule || 'weekly'
  const payoutsWaitForDate = user?.configuration?.payouts_wait_for_payout_due_date
  const autoApproveText = autoApprove ? ". If you don't approve, query or reject this work report, it will be automatically approved at invoicing time" : ''
  const payoutDeadline = timesheet.payout_due_date || timesheet.assumed_payout_due_date
  const expectedPaidAt = timesheet.client_paid_at && !payoutsWaitForDate ? getNextPayoutMoment().toDate().toString() : payoutDeadline

  return [
    {
      status: 'pending',
      title: 'Draft',
      completedTitle: 'Submitted',
      description: 'This work report has not been submitted yet',
      completed: Boolean(timesheet.submitted_at || timesheet.freelancer_status === 'submitted'),
      completedAt: timesheet.submitted_at,
    },
    {
      status: 'submitted',
      statusAliases: ['approved'],
      title: 'Pending Approval',
      completedTitle: 'Approved',
      description: `This work report is pending approval. Review and approve it to avoid payment delays${autoApproveText}`,
      completedDescription: `Work report approved! It will be included in your next ${invoiceSchedule} invoice`,
      completed: Boolean(timesheet.approved_at || timesheet.freelancer_status === 'approved'),
      completedAt: timesheet.approved_at,
    },
    {
      status: 'invoiced',
      statusAliases: ['client_payment_processing'],
      title: 'Invoiced',
      completedTitle: 'Paid',
      description: mustPay ? (
        'The report has been invoiced and is awaiting payment from you. Complete payment as soon as possible to avoid delays'
      ) : (
        'The report has been invoiced and is awaiting payment from you'
      ),
      completedDescription: 'Thank you for initiating payment! We automatically distribute payment as soon as we receive funds. If you paid by bank transfer this can take up to 5 business days. Funds are currently not received',
      expectedArrivalAt: timesheet.invoice_date || timesheet.assumed_invoice_date,
      completed: Boolean(timesheet.payment_started_at || timesheet.client_paid_at),
      completedAt: timesheet.payment_started_at || timesheet.client_paid_at,
    },
    {
      status: 'paid',
      statusAliases: ['client_paid'],
      title: 'Scheduled for payout',
      completedTitle: 'Paid out',
      description: payoutsWaitForDate ? (
        'This work report will be automatically paid out on the scheduled date'
      ) : (
        'This work report is being automatically paid out today'
      ),
      completedDescription: 'Funds have been received and this work report has been paid out',
      expectedArrivalAt: expectedPaidAt,
      completed: Boolean(timesheet.paid_at),
      completedAt: timesheet.paid_at,
    },
  ]
}

type ClientInvoiceFields = 'emailed_at' | 'client_paid_at' | 'created_at' | 'payment_started_at' | 'status' | 'token'

function getClientInvoiceSteps(invoice: Pick<IClientInvoice, ClientInvoiceFields>, user: ICurrentUser) : IStep[] {
  const mustPay = user?.firm?.payout_mode !== 'skip_waiting_for_invoice_payment'
  // TODO: set mustPay to false if the invoice has no payroll in it
  const mustPayText = mustPay ? '. Complete payment quickly to prevent delays with any work report or salary payments' : ''

  return [
    {
      status: 'not_requested',
      statusAliases: ['overdue', 'requested'],
      title: 'Not requested',
      completedTitle: 'Requested',
      description: 'This invoiced has been generated, but not emailed yet. The invoice will be emailed shortly',
      completedDescription: `This invoice has been emailed and is pending payment from you${mustPayText}`,
      completed: Boolean(invoice.emailed_at),
      completedAt: invoice.created_at,
    },
    {
      status: 'payment_processing',
      statusAliases: ['paid'],
      title: 'Payment Processing',
      completedTitle: 'Paid',
      description: 'Thank you for initiating payment! We automatically distribute payment as soon as we receive funds. If you paid by bank transfer this can take up to 5 business days. Funds are currently not received',
      completedDescription: 'Your payment has been received and this invoice has been marked as paid. Thank you!',
      completed: Boolean(invoice.client_paid_at),
      completedAt: invoice.client_paid_at || invoice.payment_started_at,
    },
  ]
}

interface IFreelancerTimesheetStepActionProps {
  timesheet: Pick<ITimesheetForFreelancer, FreelancerTimesheetFields>
  user: ICurrentUser
}

const FreelancerTimesheetStepAction = ({ timesheet, user }: IFreelancerTimesheetStepActionProps) => {
  if (timesheet.status === 'pending') {
    return (
      <Button
        color="primary"
        muiComponent={Link}
        href="/member/work_reports/[id]"
        as={`/member/work_reports/${timesheet.id}`}
        style={{ marginTop: 6 }}
      >
        Submit report
      </Button>
    )
  }

  if (!user.has_active_payout_method) {
    return (
      <Button
        color="primary"
        muiComponent={Link}
        href="/account/[tab]"
        as="/account/paying_you"
        style={{ marginTop: 6 }}
      >
        Setup Payments
      </Button>
    )
  }

  return null
}

interface IClientTimesheetStepActionProps {
  timesheet: ITimesheetForClient
}

const ClientTimesheetStepAction = ({ timesheet }: IClientTimesheetStepActionProps) => {
  if (timesheet.status === 'submitted') {
    return (
      <Button
        color="primary"
        muiComponent={Link}
        href="/client/work_reports/[id]"
        as={`/client/work_reports/${timesheet.id}`}
        style={{ marginTop: 6 }}
      >
        Review report
      </Button>
    )
  }

  return null
}

interface IClientInvoiceStepActionProps {
  invoice: Pick<IClientInvoice, ClientInvoiceFields>
}

const ClientInvoiceStepAction = ({ invoice }: IClientInvoiceStepActionProps) => {
  if (invoice.status === 'requested' || invoice.status === 'not_requested') {
    return (
      <Button
        color="primary"
        muiComponent={Link}
        href="/client/invoices/[token]"
        as={`/client/invoices/${invoice.token}`}
        style={{ marginTop: 6 }}
      >
        Review invoice
      </Button>
    )
  }

  return null
}

const stepTimingInfo = (completed: boolean, expectedArrivalAt, completedAt) => {
  if (completed) {
    if (!completedAt) return null
    const m = moment(completedAt)
    if (m.isValid()) return m.fromNow()
  } else if (expectedArrivalAt) {
    const m = moment(expectedArrivalAt)
    if (m.isValid()) return `(estimated within ${m.fromNow(true)})`
  }

  return null
}

interface IStatusInfoButtonProps {
  timesheet?: Pick<ITimesheetForFreelancer, FreelancerTimesheetFields> | Pick<ITimesheetForClient, ClientTimesheetFields>
  invoice?: Pick<IClientInvoice, ClientInvoiceFields>
  isClient?: boolean
  storybookUser?: any
}

const StatusInfoButton = ({ timesheet, invoice, isClient, storybookUser }: IStatusInfoButtonProps) => {
  let [user] = useCurrentUser()
  if (storybookUser) {
    user = storybookUser
  }
  let steps = [] as IStep[]
  let activeStep = -1
  if (isClient || invoice) {
    if (invoice) {
      steps = getClientInvoiceSteps(invoice, user)
      activeStep = steps.findIndex(s => s.status === invoice.status || s.statusAliases?.indexOf(invoice.status) >= 0)
    } else {
      steps = getClientTimesheetSteps(timesheet as Pick<ITimesheetForClient, ClientTimesheetFields>, user)
      activeStep = steps.findIndex(s => s.status === timesheet.freelancer_status || s.statusAliases?.indexOf(timesheet.freelancer_status) >= 0)
    }
  } else {
    steps = getFreelancerTimesheetSteps(timesheet as Pick<ITimesheetForFreelancer, FreelancerTimesheetFields>, user)
    activeStep = steps.findIndex(s => s.status === timesheet.freelancer_status || s.statusAliases?.indexOf(timesheet.freelancer_status) >= 0)
  }

  if (activeStep < 0 || steps.length === 0) return null

  return (
    <MoreButtonCard iconOnly icon={<HelpOutline />}>
      <Stepper activeStep={activeStep} orientation="vertical" style={{ padding: 0, maxWidth: 300 }}>
        {steps.map((step, index) => {
          const title = (step.completed || index < activeStep) && step.completedTitle ? step.completedTitle : step.title
          const description = step.completed && step.completedDescription ? step.completedDescription : step.description
          return (
            <Step key={step.status}>
              <StepLabel>
                {title} {stepTimingInfo(step.completed, step.expectedArrivalAt, step.completedAt)}
              </StepLabel>
              <StepContent>
                {description && <Typography>{description}</Typography>}
                {!isClient && timesheet && <FreelancerTimesheetStepAction user={user} timesheet={timesheet as ITimesheetForFreelancer} /> }
                {isClient && timesheet && <ClientTimesheetStepAction timesheet={timesheet as ITimesheetForClient} /> }
                {invoice && <ClientInvoiceStepAction invoice={invoice} /> }
              </StepContent>
            </Step>
          )
        })}
      </Stepper>
    </MoreButtonCard>
  )
}

export default StatusInfoButton
