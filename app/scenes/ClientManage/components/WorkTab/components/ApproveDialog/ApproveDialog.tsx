import React, { useCallback } from 'react'
import { ResponsiveDialog } from 'components'
import { Button, SelectField, TextArea } from 'components/themed'
import { Field, InjectedFormProps } from 'redux-form'
import { DialogTitle, DialogContent, DialogContentText, DialogActions, MenuItem, Grid } from '@material-ui/core'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { ApproveDialog_TimesheetQuery } from '__generated__/ApproveDialog_TimesheetQuery.graphql'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { ApproveDialog_Mutation } from '__generated__/ApproveDialog_Mutation.graphql'
import { trackEvent } from 'services/analytics'
import { useSnackbar } from 'hooks'
import { useRouter } from 'next/router'
import { IApproveDialogFormValues } from './ApproveDialogContainer'

export interface IApproveDialogProps {
  open: boolean
  timesheetId: number
  onClose: () => void
}

const ApproveDialog = (props: IApproveDialogProps & InjectedFormProps<IApproveDialogFormValues>) => {
  const { open, timesheetId, onClose, handleSubmit, submitting } = props

  const approveMutation = useQuickCommit<ApproveDialog_Mutation>(graphql`
    mutation ApproveDialog_Mutation($input: ApproveTimesheetInput!) {
      approveTimesheet(input: $input) {
        timesheet {
          status
          clientRatingScore
          clientRatingFeedbackStart
          clientRatingFeedbackStop
          clientRatingFeedbackContinue
        }
      }
    }
  `)

  const data = useLazyLoadQuery<ApproveDialog_TimesheetQuery>(graphql`
     query ApproveDialog_TimesheetQuery($rawId: Int) {
       timesheet(rawId: $rawId) {
         id
         freelancer {
           name
         }
       }
     }
  `, {
    rawId: timesheetId,
  }, {
    fetchPolicy: 'store-and-network',
  })
  const timesheet = data?.timesheet
  const showSnackbarMessage = useSnackbar()
  const router = useRouter()
  const submit = useCallback((formData: IApproveDialogFormValues) => (
    approveMutation.execute({ input: { timesheetId: timesheet?.id, ...formData } })
      .then((response) => {
        if (response) {
          showSnackbarMessage('Work report approved')
          trackEvent('Client Timesheet Approve')
          onClose()
          router.push('/client/manage', '/client/manage?tab=work')
        }
      })
  ), [timesheet?.id])

  if (!open || !timesheet) return null

  const freelancerName = timesheet.freelancer?.name

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>
          Approve work report
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Providing regular feedback can significantly improve work performance.
            Let {freelancerName} know how they have done for this work report.
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={SelectField}
                name="clientRatingScore"
                label="General Feedback"
                fullWidth
              >
                <MenuItem value={2}>
                  None
                </MenuItem>
                <MenuItem value={1}>
                  Excellent job!
                </MenuItem>
                <MenuItem value={0}>
                  Good job!
                </MenuItem>
                <MenuItem value={-1}>
                  Could do better
                </MenuItem>
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                name="clientRatingFeedbackStop"
                label="Stop - What's not good"
                placeholder={`What ${freelancerName} should stop doing... (optional)`}
                component={TextArea}
                style={{ minHeight: 80 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="clientRatingFeedbackStart"
                label="Start - What would be good"
                placeholder={`What ${freelancerName} should start doing... (optional)`}
                component={TextArea}
                style={{ minHeight: 80 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="clientRatingFeedbackContinue"
                label="Continue - What's good"
                placeholder={`What ${freelancerName} should continue doing... (optional)`}
                component={TextArea}
                style={{ minHeight: 80 }}
              />
            </Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button color="secondary" type="submit" disabled={submitting || approveMutation?.loading} data-cy="timesheet-approve-submit">
            Approve
          </Button>
        </DialogActions>
      </form>
    </ResponsiveDialog>
  )
}

export default ApproveDialog
