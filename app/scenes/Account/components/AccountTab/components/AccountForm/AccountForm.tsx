import React from 'react'
import { Grid, Divider, MenuItem, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/CheckCircle'
import { FileUpload, Link } from 'components'
import { Button, TextField, TextArea, SelectField, InfoMessage, Box } from 'components/themed'
import { Field } from 'redux-form'
import { UserRole } from '__generated__/AccountTab_User.graphql'
import AccountDeleteButton from '../AccountDeleteButton'
import { AccountFormContainerProps } from './AccountFormContainer'
import styles from './AccountForm.module.css'

export interface IAccountFormProps {
  submitting: boolean
  userRoles: UserRole[]
  userUnconfirmedEmail: string
  onSubmit: (data: any) => void
}

const AccountForm: React.FunctionComponent<IAccountFormProps & AccountFormContainerProps> = (props) => {
  const { submitting, userRoles, userUnconfirmedEmail, handleSubmit, onSubmit } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} className={styles.logo}>
            <Field name="avatarUrl" label="Upload Avatar" component={FileUpload} avatar />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="firstName" label="First Name" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="lastName" label="Last Name" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="email" label="Email" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="phone" label="Phone" component={TextField} type="tel" fullWidth />
          </Grid>

          {userUnconfirmedEmail && (
            <Grid item xs={12}>
              <InfoMessage>
                You requested your email to be changed to {userUnconfirmedEmail}.
                Please <Link to="/confirm_email">Confirm your new email now</Link>
              </InfoMessage>
            </Grid>
          )}
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Field name="currentPassword" label="Current Password" type="password" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="password" label="New Password" type="password" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="confirmPassword" label="Confirm New Password" type="password" component={TextField} fullWidth />
          </Grid>
        </Grid>
      </Box>

      {userRoles?.includes('member') && (
        <React.Fragment>
          <Divider />

          <Box>
            <Grid item xs={12} md={6}>
              <Field
                name="visibility"
                label="Profile visibility"
                component={SelectField}
                fullWidth
              >
                <MenuItem value="visibility_public">
                  Public
                </MenuItem>

                <MenuItem value="visibility_clients">
                  Clients only
                </MenuItem>

                <MenuItem value="visibility_private">
                  Only me
                </MenuItem>
              </Field>
            </Grid>
          </Box>
        </React.Fragment>
      )}

      {userRoles?.includes('client') && (
        <React.Fragment>
          <Divider />

          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Team invitation settings
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="teamInvitationMessage"
                  label="Invitation Message"
                  component={TextArea}
                  style={{ minHeight: 240 }}
                />
              </Grid>

              <Grid item xs={12}>
                <InfoMessage>
                  You can use templates to tailor individual messages easily:
                  $invitee_name$ for the name of the invited team member,
                  $name$ for your name,
                  $company$ for the name of your company,
                  $rate$ for the contract rate, and
                  $start_date$ for the contract start date.
                </InfoMessage>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Field name="sendTimesheetReminders" label="Work Report Reminder Emails" component={SelectField} fullWidth>
                  <MenuItem value={true as any}>
                    Send For Active Contracts
                  </MenuItem>

                  <MenuItem value={false as any}>
                    Don't send
                  </MenuItem>
                </Field>
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      )}

      <Divider />

      <Box className={styles.buttons}>
        <AccountDeleteButton />

        <Button
          type="submit"
          color="primary"
          disabled={submitting}
          data-cy="save-changes"
          style={{ marginLeft: 'auto' }}
        >
          <CheckIcon /> Save changes
        </Button>
      </Box>
    </form>
  )
}

export default AccountForm
