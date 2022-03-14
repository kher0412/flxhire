import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { getStatusForClient } from 'services/timesheets'
import { formatAsCurrency, formatAsShortDate, formatAsShortDateRange, formatDuration } from 'services/formatting'
import { Condition, EventPropagationBlocker, StatusInfoButton } from 'components'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { TimesheetRow_Timesheet$key } from '__generated__/TimesheetRow_Timesheet.graphql'
import styles from './TimesheetsList/TimesheetsList.module.css'
import TimesheetListActions from './TimesheetListActions'

interface ITimesheetRowProps {
  timesheetFragmentRef: TimesheetRow_Timesheet$key
  isMediumSmallMode: boolean
}

const TimesheetRow = ({ timesheetFragmentRef, isMediumSmallMode }: ITimesheetRowProps) => {
  const router = useRouter()
  const timesheet = useFragment(graphql`
    fragment TimesheetRow_Timesheet on Timesheet {
      rawId
      freelancer {
        name
      }
      submittedAt
      approvedAt
      totalToPayClient {
        currency {
          code
        }
        value
      }
      currency { code }
      totalHours
      totalMinutes
      startDate
      endDate
      invoice {
        invoiceNum
        invoiceDate
        paymentStartedAt
        clientPaidAt
        payoutDueDate
      }
      status
      freelancerStatus
      autoApprove
      payrollItem {
        assumedPayoutDueDate
        assumedInvoiceDate
        paycheck {
          paidOutAt
        }
      }
      ...TimesheetListActions_Timesheet
    }
  `, timesheetFragmentRef)
  const showTimesheet = useCallback(() => router.push('/client/work_reports/[id]', `/client/work_reports/${timesheet?.rawId}`), [timesheet?.rawId])

  if (!timesheet) return null

  return (
    <TableRow
      key={timesheet.rawId}
      hover
      className={styles.row}
      onClick={showTimesheet}
      data-cy="row"
      data-cy-timesheet-id={timesheet.rawId}
    >
      <TableCell>
        {timesheet.freelancer?.name}
      </TableCell>

      <TableCell>
        {formatAsShortDateRange(timesheet.startDate, timesheet.endDate)}
      </TableCell>

      <TableCell>
        {formatAsShortDate(timesheet.submittedAt) || <span>{'\u2014'}</span>}
      </TableCell>

      <TableCell>
        {formatDuration(timesheet.totalHours, timesheet.totalMinutes)}
      </TableCell>

      <TableCell>
        {timesheet.totalToPayClient ? formatAsCurrency(timesheet.totalToPayClient.value, { currency: timesheet.currency, removeEmptyCents: false }) : '-'}
      </TableCell>

      <TableCell>
        {timesheet.invoice?.invoiceNum || <span title="Not invoiced">{'\u2014'}</span>}
      </TableCell>

      <TableCell className={styles.nowrap}>
        <Condition condition={!isMediumSmallMode}>
          <div className={`${styles['status-bulb']} ${styles[`status-${timesheet.status}`]}`} />
        </Condition>

        {getStatusForClient(timesheet)}

        <StatusInfoButton
          timesheet={{
            auto_approve: timesheet?.autoApprove,
            assumed_payout_due_date: timesheet?.payrollItem?.assumedPayoutDueDate,
            payout_due_date: timesheet?.invoice?.payoutDueDate,
            client_paid_at: timesheet?.invoice?.clientPaidAt,
            submitted_at: timesheet?.submittedAt,
            approved_at: timesheet?.approvedAt,
            invoice_date: timesheet?.invoice?.invoiceDate,
            assumed_invoice_date: timesheet?.payrollItem?.assumedInvoiceDate,
            payment_started_at: timesheet?.invoice?.paymentStartedAt,
            paid_at: timesheet?.payrollItem?.paycheck?.paidOutAt,
            freelancer_status: timesheet?.freelancerStatus,
          }}
          isClient
        />
      </TableCell>

      <TableCell>
        <EventPropagationBlocker>
          <TimesheetListActions timesheetFragmentRef={timesheet} />
        </EventPropagationBlocker>
      </TableCell>
    </TableRow>
  )
}

export default TimesheetRow
