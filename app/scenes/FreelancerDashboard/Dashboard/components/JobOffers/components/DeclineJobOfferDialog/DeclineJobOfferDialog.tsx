import React from 'react'
import { Field } from 'redux-form'
import { DialogTitle, DialogActions, Grid, MenuItem, DialogContent, DialogContentText, Collapse } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button, SelectField, TextArea } from 'components/themed'
import { ContainerProps } from './DeclineJobOfferDialogContainer'

const REJECT_REASONS = [
  'The proposed rate is too low',
  'No longer available',
  'Other...',
]
const REJECT_REASON_OTHER = 2

interface IDeclineJobOfferDialogState {
  rejectReason: (typeof REJECT_REASONS)[number]
}

class DeclineJobOfferDialog extends React.Component<ContainerProps, IDeclineJobOfferDialogState> {
  state = {
    rejectReason: undefined,
  }

  customRejectReasonField() {
    return (
      <Collapse in={this.state.rejectReason === REJECT_REASON_OTHER}>
        <Field name="freelancer_feedback" label="Reject reason" component={TextArea} />
      </Collapse>
    )
  }

  submitForm(formData, jobOffer) {
    if (this.state.rejectReason !== undefined && this.state.rejectReason !== REJECT_REASON_OTHER) {
      formData = {
        ...formData,
        freelancer_feedback: REJECT_REASONS[this.state.rejectReason],
      }
    }

    this.props.submitForm(formData, jobOffer)
  }

  onSelectReason = (e) => {
    this.setState({ rejectReason: e.target.value })
  }

  render() {
    let { open, closeDialog, handleSubmit, pristine, submitting, jobOffer } = this.props

    if (!jobOffer) return null

    if (this.state.rejectReason !== undefined && this.state.rejectReason !== REJECT_REASON_OTHER) {
      pristine = false
    }

    return (
      <ResponsiveDialog open={open} onClose={closeDialog} fullWidth>
        <form onSubmit={handleSubmit(formData => this.submitForm(formData, jobOffer))}>
          <DialogTitle>
            Decline offer
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              We would appreciate any feedback on why you choose not to accept this offer.
            </DialogContentText>
          </DialogContent>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  id="interview-reject-reason"
                  name="interview-reject-reason"
                  label="Reject reason"
                  value={this.state.rejectReason}
                  onChange={this.onSelectReason}
                  component={SelectField}
                  fullWidth
                >
                  {REJECT_REASONS.map((text, value) => (
                    <MenuItem
                      key={value}
                      value={value}
                      data-cy={`select-offer-reject-reason-option-${value}`}
                    >
                      {text}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12}>
                {this.customRejectReasonField()}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog}>
              Cancel
            </Button>

            <Button type="submit" disabled={pristine || submitting} color="primary" data-cy="submit-reject-offer">
              Decline
            </Button>
          </DialogActions>
        </form>
      </ResponsiveDialog>
    )
  }
}

export default DeclineJobOfferDialog
