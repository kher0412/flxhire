import React from 'react'
import { Field } from 'redux-form'
import {
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Collapse,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button, MessageField, SelectField } from 'components/themed'
import { CheckCircle } from '@material-ui/icons'
import { ContainerProps } from './SkipInterviewDialogContainer'

export const REJECT_REASONS = [
  'Not interested in this role',
  'Not interested in this technology',
  'The proposed rate is too low',
  'Interview timing does not work',
  'Other...',
]
export const REJECT_REASON_OTHER = 4

interface ISkipInterviewState {
  rejectReason: number
}

class SkipInterviewDialog extends React.Component<ContainerProps, ISkipInterviewState> {
  shouldComponentUpdate(nextProps) {
    // Skip updating if the dialog remains closed.
    return (this.props.open || nextProps.open)
  }

  state = {
    rejectReason: null,
  }

  componentDidMount() {
    const val = REJECT_REASONS.indexOf(this.props.initialValues.freelancer_feedback)
    this.setState({ rejectReason: val >= 0 ? val : null })
  }

  submitForm(formData, interview) {
    console.log('skip0', formData)
    if (this.state.rejectReason !== undefined && this.state.rejectReason !== REJECT_REASON_OTHER) {
      formData = {
        ...formData,
        freelancer_feedback: REJECT_REASONS[this.state.rejectReason],
      }
    }
    console.log('skip1', formData)

    this.props.submitForm(formData, interview)
  }

  onSelectReason = (e) => {
    const rejectReason = e.target.value
    this.setState({ rejectReason }, () => {
      if (rejectReason === REJECT_REASON_OTHER) {
        this.props.change('freelancer_feedback', '')
      } else {
        this.props.change('freelancer_feedback', REJECT_REASONS[e.target.value])
      }
    })
  }

  render() {
    let { open, closeDialog, handleSubmit, submitting, interview } = this.props

    if (!interview) return null

    return (
      <ResponsiveDialog open={open} onClose={closeDialog} maxWidth="sm">
        <div style={{ width: 9999 }} />

        <form onSubmit={handleSubmit(formData => this.submitForm(formData, interview))}>
          <DialogTitle>
            Reject Interview with {interview.client.first_name} from {interview.client.company_name}
          </DialogTitle>

          <DialogContent>
            <div style={{ padding: '6px 0' }}>
              <Grid container spacing={3}>
                <Field
                  name="freelancer_feedback"
                  label="Reject reason"
                  component={({ input, meta }) => (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <SelectField
                          input={{
                            value: this.state.rejectReason,
                            onChange: this.onSelectReason,
                            name: 'reject_reason',
                          }}
                          meta={this.state.rejectReason === REJECT_REASON_OTHER ? {} : meta}
                          fullWidth
                        >
                          {REJECT_REASONS.map((text, value) => (
                            <MenuItem
                              key={text}
                              value={value}
                              data-cy={`select-interview-reject-reason-option-${value}`}
                            >
                              {text}
                            </MenuItem>
                          ))}
                        </SelectField>
                      </Grid>

                      <Grid item xs={12}>
                        <Collapse in={this.state.rejectReason === REJECT_REASON_OTHER}>
                          <MessageField
                            placeholder={`Tell ${interview.client.first_name} why you are rejecting the Interview request`}
                            contact={{
                              id: interview.client.id,
                              first_name: interview.client.first_name,
                              avatar_url: interview.client.avatar_url,
                            }}
                            input={input}
                            meta={meta}
                          />
                        </Collapse>
                      </Grid>
                    </React.Fragment>
                  )}
                />
              </Grid>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog}>
              Cancel
            </Button>

            <Button type="submit" color="primary" disabled={submitting} data-cy="submit-reject-interview">
              <CheckCircle /> Submit
            </Button>
          </DialogActions>
        </form>
      </ResponsiveDialog>
    )
  }
}

export default SkipInterviewDialog
