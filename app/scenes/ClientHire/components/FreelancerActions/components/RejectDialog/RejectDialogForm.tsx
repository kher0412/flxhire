import React, { useEffect } from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { ResponsiveDialog } from 'components'
import { Button, SelectField, TextArea } from 'components/themed'
import { MenuItem, DialogTitle, DialogContent, DialogActions, DialogContentText, Divider, Grid } from '@material-ui/core'
import { isUnsentJobApplication } from 'services/contract'
import { ICurrentUser, IContractStatus } from 'types'
import { useCurrentUser } from 'hooks'
import { useFragment, graphql } from 'react-relay'
import { RejectDialogForm_Freelancer$key } from '__generated__/RejectDialogForm_Freelancer.graphql'
import { RejectDialogForm_Contract$key } from '__generated__/RejectDialogForm_Contract.graphql'

export const SKIP_REASONS = [
  { value: 'Location', label: 'Location' },
  { value: 'Rate', label: 'Rate is too high' },
  { value: 'Experience', label: 'Not enough experience' },
  { value: 'Other', label: 'Other...' },
]

const defaultFreelancerFeedback = ({ jobTitle, name, user }: { user: ICurrentUser, jobTitle?: string, name: string }) => `
Hi ${name},

We wanted to sincerely thank you for your application for our ${jobTitle ? `${jobTitle} ` : ''}position at ${user.firm.name}. We really appreciate your application but unfortunately we have decided to not move forward at this time.
`.trim()

interface IRejectDialogFormProps {
  open: boolean
  freelancer: RejectDialogForm_Freelancer$key
  contract?: RejectDialogForm_Contract$key
  onClose: () => void
  formValues: any
}

const RejectDialogForm = (props: IRejectDialogFormProps & InjectedFormProps) => {
  const { open, onClose, freelancer: freelancerProp, contract: contractProp, handleSubmit, submitting, formValues, change } = props

  const freelancer = useFragment(graphql`
    fragment RejectDialogForm_Freelancer on User {
      id
      firstName
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment RejectDialogForm_Contract on Contract {
      id
      status
      freelancerFirstName
      job {
        title
      }
    }
  `, contractProp)
  const name = freelancer?.firstName || contract?.freelancerFirstName

  const [user] = useCurrentUser()
  useEffect(() => {
    if (contract?.id) change('client_rejection_message', defaultFreelancerFeedback({ jobTitle: contract?.job?.title, name, user }))
  }, [contract?.id, open])

  if (!open) return null

  const hasContract = contract?.id && !isUnsentJobApplication({ status: contract?.status as IContractStatus })
  const showComment = (formValues as any)?.client_rejection_reason === 'Other'

  return (
    <ResponsiveDialog
      open
      fullWidth
      onClose={onClose}
      data-cy="reject-dialog"
    >
      <form onSubmit={handleSubmit}>
        {hasContract && (
        <React.Fragment>
          <DialogTitle>
            Feedback to {name}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Let {name} know that you decided not to move forward. {name} will be emailed with your feedback.
              Please feel free to customize the default text below and add any additional feedback for the applicant
              so they can understand how to improve their applications in future.
            </DialogContentText>
          </DialogContent>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="client_rejection_message" label={`Feedback to ${name}`} component={TextArea} />
              </Grid>
            </Grid>
          </DialogContent>

          <Divider style={{ marginTop: 18 }} />
        </React.Fragment>
        )}

        <DialogTitle>
          Feedback to Flexhire
        </DialogTitle>

        <DialogContent>
          {!hasContract && (
          <DialogContentText>
            To improve matches in the future, please let us know why you are skipping {name}.
            Your feedback is sent to Flexhire staff only. Thank you.
          </DialogContentText>
          )}

          {hasContract && (
          <DialogContentText>
            To improve matches in the future, please let us know why you are rejecting {name}.
            Your feedback is sent to Flexhire staff only. Thank you.
          </DialogContentText>
          )}
        </DialogContent>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field name="client_rejection_reason" label="Reason" component={SelectField} fullWidth>
                {SKIP_REASONS.map(v => (
                  <MenuItem key={v.value} value={v.value} button data-cy={`reject-${v.value.toLowerCase()}`}>
                    {v.label}
                  </MenuItem>
                ))}
              </Field>
            </Grid>

            {showComment && (
            <Grid item xs={12}>
              <Field
                name="client_rejection_comments"
                label="Feedback"
                placeholder={`I am ${hasContract ? 'rejecting' : 'skipping'} ${name} because...`}
                fullWidth
                component={TextArea}
              />
            </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={submitting} data-cy="cancel">
            Cancel
          </Button>

          <Button color="secondary" type="submit" disabled={submitting} data-cy="reject">
            {hasContract ? 'Reject' : 'Skip'}
          </Button>
        </DialogActions>
      </form>
    </ResponsiveDialog>
  )
}

export const FORM_NAME = 'skipFreelancer'

const form = {
  form: FORM_NAME,
  enableReinitialize: true,
  validate: (values) => {
    const errors: any = {}
    if (!values.comments && values.reason === 'Other') { errors.comments = 'Required' }
    if (!values.reason) { errors.reason = 'Required' }
    return errors
  },
  initialValues: {
    client_rejection_reason: 'Other',
  },
}

export default reduxForm<any, IRejectDialogFormProps>(form)(RejectDialogForm)
