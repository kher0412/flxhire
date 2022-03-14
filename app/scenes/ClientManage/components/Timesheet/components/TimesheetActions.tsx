import { Button } from 'components/themed'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import SmsIcon from '@material-ui/icons/Sms'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import ScheduleIcon from '@material-ui/icons/Schedule'
import React, { useCallback, useState } from 'react'
import { useOnMount, useSnackbar } from 'hooks'
import { ITimesheetForClient } from 'types'
import { useRouter } from 'next/router'
import { trackEvent } from 'services/analytics'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { TimesheetActions_RejectMutation } from '__generated__/TimesheetActions_RejectMutation.graphql'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Condition, Suspense } from 'components'
import ApproveDialog from 'scenes/ClientManage/components/WorkTab/components/ApproveDialog/ApproveDialogContainer'
import QueryDialog from 'scenes/ClientManage/components/WorkTab/components/QueryDialog/QueryDialogContainer'
import { TimesheetActions_TimesheetQuery } from '__generated__/TimesheetActions_TimesheetQuery.graphql'

const TimesheetActions = ({ timesheet }: { timesheet: ITimesheetForClient }) => {
  const router = useRouter()

  const data = useLazyLoadQuery<TimesheetActions_TimesheetQuery>(graphql`
    query TimesheetActions_TimesheetQuery($rawId: Int) {
      timesheet(rawId: $rawId) {
        id
        freelancer {
          name
        }
      }
    }
  `, {
    rawId: timesheet?.id,
  }, {
    fetchPolicy: 'store-and-network',
  })

  const [actionDialogOpen, setActionDialogOpen] = useState(null as 'approve' | 'query')
  const closeActionDialog = useCallback(() => setActionDialogOpen(null), [setActionDialogOpen])

  const approve = useCallback(() => setActionDialogOpen('approve'), [setActionDialogOpen])
  const query = useCallback(() => setActionDialogOpen('query'), [setActionDialogOpen])

  const rejectMutation = useQuickCommit<TimesheetActions_RejectMutation>(graphql`
    mutation TimesheetActions_RejectMutation($input: RejectTimesheetInput!) {
      rejectTimesheet(input: $input) {
        timesheet {
          status
        }
      }
    }
  `)

  const showSnackbarMessage = useSnackbar()

  const reject = useCallback(() => {
    rejectMutation.execute({ input: { timesheetId: data?.timesheet?.id } })
      .then((response) => {
        if (response) {
          showSnackbarMessage('Work report rejected')
          trackEvent('Client Timesheet Reject')
          router.push('/client/manage', '/client/manage?tab=work')
        }
      })
  }, [data?.timesheet?.id])

  useOnMount(() => {
    if (router.query.action === 'approve') approve()
  })

  const disabled = !timesheet.editable || ['approved', 'client_query', 'rejected'].indexOf(timesheet.status) >= 0
  const queryButtonNameLabel = timesheet.freelancer_name?.length > 13 ? `${timesheet.freelancer_name.substring(0, 11)}...` : timesheet.freelancer_name

  return (
    <React.Fragment>
      <Suspense>
        <ApproveDialog open={actionDialogOpen === 'approve'} onClose={closeActionDialog} timesheetId={timesheet?.id} />
      </Suspense>

      <Suspense>
        <QueryDialog open={actionDialogOpen === 'query'} onClose={closeActionDialog} timesheetId={timesheet?.id} />
      </Suspense>

      <Condition condition={timesheet.status === 'submitted'}>
        <Button
          color="delete"
          onClick={reject}
          disabled={disabled}
          data-cy="timesheet-reject"
        >
          <CancelIcon /> Reject
        </Button>

        <Button
          color="secondary"
          onClick={query}
          disabled={disabled}
          data-cy="timesheet-query"
        >
          <SmsIcon /> Query {queryButtonNameLabel}
        </Button>

        <Button
          color="primary"
          onClick={approve}
          disabled={disabled}
          data-cy="timesheet-approve"
        >
          <CheckCircleIcon /> Approve
        </Button>
      </Condition>

      <Condition condition={timesheet.status === 'client_query'}>
        <Button disabled={disabled}>
          <ScheduleIcon /> Awaiting query response
        </Button>
      </Condition>

      <Condition condition={timesheet.status === 'approved'}>
        <Button disabled={disabled}>
          <CheckIcon /> Approved
        </Button>
      </Condition>

      <Condition condition={timesheet.status === 'rejected'}>
        <Button disabled={disabled}>
          <CloseIcon /> Rejected
        </Button>
      </Condition>
    </React.Fragment>
  )
}

export default TimesheetActions
