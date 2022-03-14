import React, { useState } from 'react'
import moment from 'moment'
import { DialogTitle, DialogContent, DialogActions, Grid, Collapse, DialogContentText } from '@material-ui/core'
import { ServerError, RadioButtons, ResponsiveDialog, ChatButton } from 'components'
import { Button, DateTimePicker, MessageField, TextField } from 'components/themed'
import { Field } from 'redux-form'
import InfoMessage from 'components/themed/InfoMessage'

import CalendlyButton from 'components/CalendlyButton'
import { IContractForFreelancer } from 'types'
import { CheckCircle } from '@material-ui/icons'
import { AcceptInterviewDialogContainerProps } from './AcceptInterviewDialogContainer'

const getInterviewTimeOptions = (interview: IContractForFreelancer) => {
  const format = 'ddd, MMM D [at] h:mma'
  const date1 = moment(interview?.interview_date_1).format(format)
  const results = [
    { label: date1, value: interview?.interview_date_1 },
  ]

  if (interview?.interview_date_2) {
    const date2 = moment(interview.interview_date_2).format(format)
    results.push({ label: date2, value: interview.interview_date_2 })
  }

  if (interview?.interview_date_3) {
    const date3 = moment(interview.interview_date_3).format(format)
    results.push({ label: date3, value: interview.interview_date_3 })
  }

  results.push({ label: 'None of these times work', value: 'none' })

  return results
}

const AcceptInterviewDialog = (props: AcceptInterviewDialogContainerProps) => {
  const { open, closeDialog, handleSubmit, submitForm, interview, serverError, isNoneSelected } = props
  const [calendlyScheduled, setCalendlyScheduled] = useState(false)

  if (!interview) return null
  const clientName = interview?.client?.first_name || 'the client'
  const hiringManager = interview?.hiring_manager || interview?.client
  const contact = {
    id: hiringManager?.id,
    first_name: hiringManager?.first_name,
    avatar_url: hiringManager?.avatar_url,
  }
  const useCalendly = Boolean(interview?.interview_scheduling_method === 'schedule_via_calendly' && interview?.calendly_url)
  const disableSubmit = useCalendly && !calendlyScheduled

  return (
    <ResponsiveDialog
      open={open}
      onClose={closeDialog}
      maxWidth="md"
      disableEnforceFocus={useCalendly} // prevent calendly dialog issues.
    >
      <form onSubmit={handleSubmit(formData => submitForm(formData, interview))}>
        <DialogTitle>
          Accept interview request with {interview.client.name} from {interview.client.company_name}
        </DialogTitle>

        <DialogContent>
          <div style={{ paddingBottom: 12 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ lineHeight: '1.5em' }}>
                <DialogContentText style={{ marginBottom: 0 }}>
                  {clientName} liked your profile and would like to talk to you about a work opportunity!
                  {' '}
                  {useCalendly && 'They are using calendly to show their available times to connect. Book a meeting below and then confirm the time and submit your contact details.'}
                  {!useCalendly && 'They have suggested the following times to talk. Please select which date and time you can be available on.'}
                </DialogContentText>
              </Grid>

              {useCalendly && (
                <React.Fragment>
                  {!calendlyScheduled && (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <CalendlyButton
                          url={interview.calendly_url}
                          onSuccess={() => setCalendlyScheduled(true)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button onClick={() => setCalendlyScheduled(true)} fullWidth>
                          I already booked a meeting
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                  {calendlyScheduled && (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={DateTimePicker}
                          name="interview_date"
                          label="Scheduled date"
                          fullWidth
                          disablePast
                          helperText="Please enter the date and time scheduled via Calendly to continue"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button onClick={() => setCalendlyScheduled(false)} fullWidth>
                          I haven't booked a meeting yet
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}

              {!useCalendly && (
                <Grid item xs={12}>
                  <Field
                    name="interview_date"
                    options={getInterviewTimeOptions(interview)}
                    component={RadioButtons}
                  />
                </Grid>
              )}
            </Grid>
          </div>
          <Collapse in={!isNoneSelected}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Leave {clientName} your contact information below so they can reach out
                  to organize the interview.
                </DialogContentText>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="freelancer_contact_email"
                  label="E-mail"
                  component={TextField}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="phone"
                  label="Phone number (optional)"
                  component={TextField}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="freelancer_message"
                  placeholder={`Send a personal message to ${clientName} (optional)`}
                  contact={contact}
                  component={MessageField}
                />
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={isNoneSelected}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoMessage>
                  Selecting this option will reject the interview request
                  and ask {clientName} to send another interview request with better options.
                  To speed this up, please leave a message with some dates and times that you will be available.
                </InfoMessage>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="freelancer_message"
                  placeholder="Suggest interview times & leave a personal message"
                  contact={contact}
                  component={MessageField}
                />
              </Grid>
            </Grid>
          </Collapse>

          <ServerError error={serverError} />
        </DialogContent>

        <DialogActions>
          <ChatButton
            showContactInfo
            contact={contact}
            recipientId={contact?.id}
            style={{ marginRight: 'auto' }}
          />

          <Button onClick={closeDialog} data-cy="close">
            Cancel
          </Button>

          <Button color="primary" type="submit" data-cy="submit-accept-interview" disabled={disableSubmit}>
            <CheckCircle />
            Submit
          </Button>
        </DialogActions>
      </form>
    </ResponsiveDialog>
  )
}

export default AcceptInterviewDialog
