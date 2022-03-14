import { MoreButtonMenu, Suspense } from 'components'
import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import SmsIcon from '@material-ui/icons/Sms'
import CancelIcon from '@material-ui/icons/Cancel'
import React, { Fragment, useCallback, useState } from 'react'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { useRouter } from 'next/router'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { TimesheetListActions_RejectMutation } from '__generated__/TimesheetListActions_RejectMutation.graphql'
import { TimesheetListActions_Timesheet$key } from '__generated__/TimesheetListActions_Timesheet.graphql'
import { trackEvent } from 'services/analytics'
import { useSnackbar } from 'hooks'
import ApproveDialog from './ApproveDialog'
import QueryDialog from './QueryDialog'

const TimesheetListActions = ({ timesheetFragmentRef }: { timesheetFragmentRef: TimesheetListActions_Timesheet$key }) => {
  const timesheet = useFragment(graphql`
    fragment TimesheetListActions_Timesheet on Timesheet {
      id
      status
      rawId
    } 
  `, timesheetFragmentRef)

  const [actionDialogOpen, setActionDialogOpen] = useState(null as 'approve' | 'query')
  const closeActionDialog = useCallback(() => setActionDialogOpen(null), [setActionDialogOpen])

  const approve = useCallback(() => setActionDialogOpen('approve'), [setActionDialogOpen])
  const query = useCallback(() => setActionDialogOpen('query'), [setActionDialogOpen])
  const rejectMutation = useQuickCommit<TimesheetListActions_RejectMutation>(graphql`
    mutation TimesheetListActions_RejectMutation($input: RejectTimesheetInput!) {
      rejectTimesheet(input: $input) {
        timesheet {
          status
        }
      }
    }
  `)
  const showSnackbarMessage = useSnackbar()
  const reject = useCallback(() => {
    rejectMutation.execute({ input: { timesheetId: timesheet?.id } })
      .then((response) => {
        if (response) {
          showSnackbarMessage('Work report rejected')
          trackEvent('Client Timesheet Reject')
        }
      })
  }, [timesheet?.id])

  const router = useRouter()
  const showTimesheet = useCallback(() => router.push('/client/work_reports/[id]', `/client/work_reports/${timesheet?.rawId}`), [timesheet?.rawId])

  if (!timesheet) return null

  return (
    <Fragment>
      <Suspense><ApproveDialog open={actionDialogOpen === 'approve'} onClose={closeActionDialog} timesheetId={timesheet?.rawId} /></Suspense>
      <Suspense><QueryDialog open={actionDialogOpen === 'query'} onClose={closeActionDialog} timesheetId={timesheet?.rawId} /></Suspense>
      <MoreButtonMenu onClick={e => e.stopPropagation()} data-cy="actions">
        <MenuItem
          onClick={showTimesheet}
          data-cy="view"
        >
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>

          <ListItemText primary="View" />
        </MenuItem>

        <MenuItem
          disabled={timesheet.status !== 'submitted'}
          onClick={approve}
          data-cy="approve"
        >
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>

          <ListItemText primary="Approve" />
        </MenuItem>

        <MenuItem
          disabled={timesheet.status !== 'submitted'}
          onClick={query}
          data-cy="query"
        >
          <ListItemIcon>
            <SmsIcon />
          </ListItemIcon>

          <ListItemText primary="Query" />
        </MenuItem>

        <MenuItem
          disabled={timesheet.status !== 'submitted'}
          onClick={reject}
          data-cy="reject"
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>

          <ListItemText primary="Reject" />
        </MenuItem>
      </MoreButtonMenu>
    </Fragment>
  )
}

export default TimesheetListActions
