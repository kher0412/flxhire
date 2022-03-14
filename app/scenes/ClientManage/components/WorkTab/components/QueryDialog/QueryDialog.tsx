import React, { useCallback } from 'react'
import { ResponsiveDialog } from 'components'
import { Button, InfoMessage, TextArea } from 'components/themed'
import { Field, InjectedFormProps } from 'redux-form'
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@material-ui/core'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { QueryDialog_TimesheetQuery } from '__generated__/QueryDialog_TimesheetQuery.graphql'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { QueryDialog_Mutation } from '__generated__/QueryDialog_Mutation.graphql'
import { trackEvent } from 'services/analytics'
import { useSnackbar } from 'hooks'
import { useRouter } from 'next/router'
import {
  IQueryDialogFormValues,
} from './QueryDialogContainer'

export interface IQueryDialogProps {
  open: boolean
  timesheetId: number
  onClose: () => void
}

const QueryDialog = ({ open, timesheetId, onClose, handleSubmit, submitting }: InjectedFormProps<IQueryDialogFormValues> & IQueryDialogProps) => {
  const queryMutation = useQuickCommit<QueryDialog_Mutation>(graphql`
    mutation QueryDialog_Mutation($input: QueryTimesheetInput!) {
      queryTimesheet(input: $input) {
        timesheet {
          status
          clientComments
        }
      }
    }
  `)

  const data = useLazyLoadQuery<QueryDialog_TimesheetQuery>(graphql`
    query QueryDialog_TimesheetQuery($rawId: Int) {
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
  const submit = useCallback((formData: IQueryDialogFormValues) => (
    queryMutation.execute({ input: { timesheetId: timesheet?.id, ...formData } })
      .then((response) => {
        if (response) {
          showSnackbarMessage('Work report queried')
          trackEvent('Client Timesheet Query')
          onClose()
          router.push('/client/manage', '/client/manage?tab=work')
        }
      })
  ), [timesheet?.id])
  if (!timesheet || !open) return null

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>
          Query {timesheet.freelancer?.name} about the work report
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Once your query is received by the member they will have the option to update and resubmit their report.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field name="clientComments" label="Your Query..." component={TextArea} />
            </Grid>
            <Grid item xs={12}>
              <InfoMessage>Querying a work report might result in payments being delayed if the query isn't resolved quickly</InfoMessage>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button color="secondary" type="submit" disabled={submitting || queryMutation?.loading} data-cy="query-timesheet">
            Send Query
          </Button>
        </DialogActions>
      </form>
    </ResponsiveDialog>
  )
}

export default QueryDialog
