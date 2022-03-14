import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import React, { useCallback } from 'react'
import { getStatusForClient } from 'services/timesheets'
import { formatAsCurrency, formatAsShortDate, formatAsShortDateRange, formatDuration } from 'services/formatting'
import CardContent from '@material-ui/core/CardContent'
import { StatusInfoButton, Tag, Tags } from 'components'
import { useRouter } from 'next/router'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { TimesheetCard_Timesheet$key } from '__generated__/TimesheetCard_Timesheet.graphql'
import { classList } from 'services/styles'
import styles from './TimesheetsList/TimesheetsList.module.css'
import TimesheetListActions from './TimesheetListActions'

const TimesheetCard = ({ timesheetFragmentRef }: { timesheetFragmentRef: TimesheetCard_Timesheet$key }) => {
  const router = useRouter()
  const timesheet = useFragment(graphql`
    fragment TimesheetCard_Timesheet on Timesheet {
      rawId
      freelancer {
        name
        avatarUrl
      }
      approvedAt
      status
      totalHours
      totalMinutes
      startDate
      endDate
      totalToPayClient {
        currency {
          code
        }
        value
      }
      currency { code }
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
      submittedAt
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
    <Card
      key={timesheet.rawId}
      onClick={showTimesheet}
      variant="outlined"
      elevation={0}
      data-cy="card"
      data-cy-timesheet-id={timesheet.rawId}
    >
      <CardHeader
        avatar={<Avatar src={timesheet.freelancer?.avatarUrl} />}
        title={timesheet.freelancer?.name}
        subheader={(
          <React.Fragment>
            {formatAsShortDateRange(timesheet.startDate, timesheet.endDate)}

            {timesheet.invoice?.invoiceNum && (
              <React.Fragment>
                <br />
                Invoice #{timesheet.invoice.invoiceNum}{timesheet.approvedAt ? ` - Approved on: ${formatAsShortDate(timesheet.approvedAt)}` : ''}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        action={<TimesheetListActions timesheetFragmentRef={timesheet} />}
      />

      <CardContent className={styles.details}>
        <Tags className={styles.timesheetTags}>
          <Tag className={classList(styles.status, styles[timesheet.status], styles.timesheetFirstTag)} style={{ fontWeight: 'inherit' }}>
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
          </Tag>

          <Tag>
            {formatDuration(timesheet.totalHours, timesheet.totalMinutes)}
          </Tag>

          <Tag>
            {timesheet.totalToPayClient ? formatAsCurrency(timesheet.totalToPayClient.value, { currency: timesheet.currency, removeEmptyCents: false }) : '-'} due
          </Tag>
        </Tags>
      </CardContent>
    </Card>
  )
}

export default TimesheetCard
