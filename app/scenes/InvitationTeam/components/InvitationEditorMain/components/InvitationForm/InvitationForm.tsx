import React, { useCallback } from 'react'
import { Grid, MenuItem, Typography, Collapse, ListSubheader, Card, Divider } from '@material-ui/core'
import { Field, FieldArray, Fields } from 'redux-form'
import { Condition, FormErrorSummary, GridExpandable, Link, RadioButtons } from 'components'
import { InfoMessage, SelectField, CheckboxField, DatePicker, Button, InputGroup, InputGroupHelpButton, InputGroupConnector, Box } from 'components/themed'
import moment from 'moment'
import { formatAsCurrency } from 'services/formatting'
import { useCurrentUser, useOnMount } from 'hooks'
import { JobStatus, Currency } from 'types'
import { Send } from '@material-ui/icons'
import storage from 'services/localStorage'
import RateFields from '../../../RateFields'
import {
  IInvitationFormFields,
  INVITATION_FORM_LOCAL_STORAGE_KEY,
  InvitationFormContainerProps,
} from './InvitationFormContainer'
import InvitationRecipientsFieldArray from './components/InvitationRecipientsFieldArray'
import BonusField from './components/BonusField'

const inviteeUsageOptions = [
  { label: 'Free Solution - Work Report Tracking Only', value: false },
  { label: 'Full Solution - Work Report Tracking, Contract Managment, Taxation & Payment Processing', value: true },
]

export interface IInvitationFormProps {
  onSubmit: (formData: IInvitationFormFields) => void
  managers: { id: string, self: boolean, name: string }[]
  jobs: { id: string, status: JobStatus, title: string }[]
  allowMultipleManagers: boolean
  allowGivingManageAccess: boolean
  allowSettingManager: boolean
  isInvitingAdminButCant: boolean
  backgroundCheckUnavailable: boolean
  currencies: Currency[]
  offerMode: boolean
  contractId?: string
}

function InvitationForm(props: IInvitationFormProps & InvitationFormContainerProps) {
  const {
    handleSubmit,
    onSubmit,
    allowSettingManager,
    payments_enabled,
    managers,
    jobs = [],
    currencies,
    backgroundCheckUnavailable,
    recipients,
    firstInvitation,
    submitFailed,
    initialValues,
    initializeAccountSetupStep,
    offerMode,
    asyncValidating,
    contractId,
    currencyCode,
    allowGivingManageAccess,
  } = props

  const [currentUser] = useCurrentUser()
  const firm = currentUser?.firm

  useOnMount(() => {
    // TODO: this part moves onto plan/payment setup if the form is restored after redirection
    // can be removed once stripe redirection has been phased out
    if (initializeAccountSetupStep) {
      onSubmit(initialValues)
      storage.removeItem(INVITATION_FORM_LOCAL_STORAGE_KEY)
    }
  })

  const submit = useCallback((formData: IInvitationFormFields) => {
    onSubmit(formData)
    // TODO: this storage section can be removed once stripe redirection is phased out
    try {
      storage.setItem(INVITATION_FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData))
    } catch (err) {
      // no need to handle this
    }
  }, [onSubmit])

  // allow inviting managers if there is no billing plan yet
  // instead, billing plan selection will be restricted to plans with this capability on the next step
  const allowMultipleManagers = firm?.legacy_billing || !firm?.billing_plan || firm?.billing_plan?.allow_multiple_managers
  const allowPaymentsDisabled = firm?.billing_plan?.allow_payments_disabled_contracts
  const invitationType = recipients[0]?.invitation_type // infer from first recipient
  const freelancerFirstName = recipients[0]?.first_name // infer from first recipient
  const freelancerEmail = recipients[0]?.email // infer from first recipient
  const showManageAccessToggle = invitationType === 'manager'
  const isInvitingManagerButCant = (invitationType === 'admin' || invitationType === 'manager') && !allowMultipleManagers
  const isInvitingAdminButCant = invitationType === 'admin' && !currentUser.is_firm_admin
  const blockSending = Boolean(isInvitingManagerButCant || isInvitingAdminButCant || asyncValidating)

  const openedJobs = jobs.filter(job => job.status === 'opened')
  const closedJobs = jobs.filter(job => job.status === 'closed')
  const jobSelectSubheadersShown = openedJobs.length > 0 && closedJobs.length > 0

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h4" data-cy="invitation-title">
                    {offerMode ? `Make an Offer to ${freelancerFirstName || '...'}` : 'Invitation to join your team'}
                  </Typography>
                </Grid>

                {!offerMode && (
                  <Grid item xs={12}>
                    <FieldArray
                      name="recipients"
                      component={InvitationRecipientsFieldArray as any} // TODO: fix, likely issue is the functional component
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Card>
        </Grid>

        <GridExpandable item xs={12} expand={invitationType === 'manager' || invitationType === 'admin'}>
          <Card variant="outlined" elevation={0}>
            {!allowMultipleManagers && (
              <Box>
                <InfoMessage>
                  Your billing plan does not include multiple managers.
                  {' '}
                  <Link href="/account/plans">View upgrade options</Link>
                  {' '}
                  to unlock multiple managers
                </InfoMessage>
              </Box>
            )}

            {isInvitingAdminButCant && allowMultipleManagers && (
              <Box>
                <InfoMessage>
                  Only company admins can invite other admins.
                </InfoMessage>
              </Box>
            )}

            {(allowMultipleManagers || invitationType === 'manager') && !isInvitingAdminButCant && (
              <Box>
                <Grid container spacing={3}>
                  {allowMultipleManagers && (
                    <Grid item xs={12} md={6}>
                      <Field
                        name="invoice_manager_id"
                        label="Invoice Recipient"
                        component={SelectField}
                        disabled={!allowSettingManager}
                        helperText={allowSettingManager ? null : 'Only company admins can change this'}
                        fullWidth
                      >
                        <MenuItem value="self">Him/herself</MenuItem>

                        {managers.map(m => <MenuItem value={m.id}>{m.name}</MenuItem>)}
                      </Field>
                    </Grid>
                  )}

                  {showManageAccessToggle && (
                    <Grid item xs={12} md={6}>
                      <Field
                        name="allow_manage_access"
                        component={CheckboxField}
                        label="Allow access to Team Management"
                        disabled={!allowGivingManageAccess}
                        helperText={allowGivingManageAccess ? null : "You don't have permission to grant this access"}
                        fullWidth
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Card>
        </GridExpandable>

        <GridExpandable item xs={12} expand={invitationType === 'individual'}>
          <Card variant="outlined" elevation={0}>
            {!offerMode && allowPaymentsDisabled && (
              <React.Fragment>
                <Box>
                  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="h5">
                        How will they be using Flexhire
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Field
                        name="payments_enabled"
                        options={inviteeUsageOptions}
                        component={RadioButtons}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </React.Fragment>
            )}

            <Collapse in={payments_enabled || offerMode}>
              <Box data-cy="invitation-details">
                <Grid container direction="row" spacing={3} alignItems="flex-start">
                  {!offerMode && (
                    <Grid item xs={12} md={12}>
                      <Typography variant="h5" gutterBottom>
                        The following offer
                      </Typography>
                    </Grid>
                  )}

                  {offerMode && (
                    <Grid item xs={12} md={12}>
                      <Typography variant="h5" gutterBottom>
                        Offer details
                      </Typography>
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <Fields
                      names={['client_rate', 'currency', 'rate_mode']}
                      component={RateFields}
                      currencies={currencies}
                      offerMode={offerMode}
                      freelancerFirstName={freelancerFirstName}
                      freelancerEmail={freelancerEmail}
                      firstInvitation={firstInvitation}
                      contractId={contractId}
                    />
                  </Grid>

                  <Condition condition={currentUser?.configuration?.enable_auto_bonuses}>
                    <Grid item xs={12} md={6}>
                      <InputGroup>
                        <Field
                          name="bonus_client_rate"
                          component={BonusField}
                          currencyCode={currencyCode}
                          freelancerEmail={freelancerEmail}
                          contractId={contractId}
                        />

                        <InputGroupConnector>
                          /
                        </InputGroupConnector>

                        <Field
                          name="bonus_period"
                          component={SelectField}
                          disabled={!jobs || jobs.length === 0}
                        >
                          <MenuItem value="monthly">
                            Month
                          </MenuItem>

                          <MenuItem value="yearly">
                            Year
                          </MenuItem>
                        </Field>
                      </InputGroup>
                    </Grid>
                  </Condition>

                  <Grid item xs={12} md={6}>
                    <Field
                      name="job_id"
                      label="Associated job (optional)"
                      component={SelectField}
                      disabled={!jobs || jobs.length === 0}
                      fullWidth
                    >
                      {openedJobs.map((j, i) => (
                        <MenuItem key={j.id} value={j.id} data-cy={`job-${i}`}>
                          {j.title}
                        </MenuItem>
                      ))}

                      {jobSelectSubheadersShown && (
                        <Divider style={{ margin: '6px 0' }} />
                      )}

                      {jobSelectSubheadersShown && (
                        <ListSubheader>
                          Closed jobs
                        </ListSubheader>
                      )}

                      {closedJobs.map((j, i) => (
                        <MenuItem key={j.id} value={j.id} data-cy={`job-${i}`}>
                          {j.title}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      id="start_date"
                      name="start_date"
                      label="Start date"
                      fullWidth
                      component={DatePicker}
                      autoOk
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      id="end_date"
                      name="end_date"
                      label="End date"
                      fullWidth
                      component={DatePicker}
                      minDate={moment().add(1, 'day').toDate()}
                      autoOk
                    />
                  </Grid>

                  {allowSettingManager && (
                    <Grid item xs={12} md={6}>
                      <Field
                        name="client_id"
                        label="Manager"
                        component={SelectField}
                        fullWidth
                      >
                        {managers.map(m => <MenuItem value={m.id}>{m.name}</MenuItem>)}
                      </Field>
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <InputGroup>
                      <Field
                        name="enable_timesheets"
                        label="Enable Work Reports"
                        component={CheckboxField}
                        fullWidth
                      >
                        {managers.map(m => <MenuItem value={m.id}>{m.name}</MenuItem>)}
                      </Field>

                      <InputGroupHelpButton title="Enable Work Reports">
                        Use Work Reports to track work done.
                        If this is enabled, an option to make invoices and payouts only be initiated based on approved work reports is also available.
                      </InputGroupHelpButton>
                    </InputGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InputGroup>
                      <Field
                        name="require_timesheet_approval_for_payments"
                        label="Require Work Report approval for payments"
                        component={CheckboxField}
                        fullWidth
                      />

                      <InputGroupHelpButton title="Require Work Report approval for payments">
                        Enable this field to require work reports to be approved by the associated manager in order to get paid.
                        This field requires that work reports are enabled for the {offerMode ? 'offer' : 'invitation'}.
                      </InputGroupHelpButton>
                    </InputGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div>
                      <InputGroup>
                        <Field
                          id="request_background"
                          name="request_background"
                          component={CheckboxField}
                          fullWidth
                          label="Request a background check"
                          disabled={backgroundCheckUnavailable}
                          helperText={`Optional, has an additional ${formatAsCurrency(currentUser?.configuration?.background_check_price_usd, { currency: 'USD' })} fee`}
                        />

                        <InputGroupHelpButton title="Request a background check">
                          {backgroundCheckUnavailable && (
                            <React.Fragment>
                              Your Billing Plan does not include Integrated Background Checks.
                              {' '}
                              <Link href="/account/plans">View upgrade options</Link>
                              {' '}
                              to unlock background checks.
                            </React.Fragment>
                          )}

                          {' '}
                          This is an optional service with an additional {formatAsCurrency(currentUser?.configuration?.background_check_price_usd, { currency: 'USD' })} fee.
                        </InputGroupHelpButton>
                      </InputGroup>
                    </div>
                  </Grid>

                  {firstInvitation && (
                    <Grid item xs={12} md={6}>
                      <InputGroup>
                        <Field
                          name="invoice_schedule"
                          component={SelectField}
                          label="Invoice & Payroll Schedule"
                          fullWidth
                        >
                          <MenuItem value="monthly">
                            Invoice every month
                          </MenuItem>

                          <MenuItem value="weekly">
                            Invoice every week
                          </MenuItem>
                        </Field>

                        <InputGroupHelpButton title="Invoice & Payroll Schedule">
                          This field determines the schedule by which we invoice your company for all work done by your team.
                          We distribute payment to your team as soon as we receive payment from you
                          so this field also determines the schedule by which your team gets paid.
                          <br />
                          <br />
                          If you select weekly, we invoice you every Wednesday.
                          If you select monthly, we invoice you on the first Wednesday of every month.
                          As soon as we receive your funds we automatically pay your team members.
                          <br />
                          <br />
                          Note, this field does not affect when you will be invoiced for non payroll fees such as open job fees and manager account fees.
                          Those fees are always invoiced weekly.
                        </InputGroupHelpButton>
                      </InputGroup>
                    </Grid>
                  )}

                  <GridExpandable item xs={12} expand={recipients.length > 1 && recipients[0]?.invitation_type === 'individual'}>
                    <InfoMessage>
                      Note: when sending out multiple invitations at once, each invitee will receive their own contract.
                      While the amount you pay will be the same for each contract (as indicated by the <em>You Pay</em> setting),
                      the rates received by your invitees (as indicated by the <em>They Receive</em> field) may vary slightly between invitations, depending on your plan.
                      Once the invitations are sent, you can check your team page under Flexmanage for the resulting rates, and make further adjustments to them if necessary.
                    </InfoMessage>
                  </GridExpandable>
                </Grid>
              </Box>
            </Collapse>
          </Card>
        </GridExpandable>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box style={{ textAlign: 'right' }}>
              <FormErrorSummary show={submitFailed} />

              <Button type="submit" disabled={blockSending} color="primary" data-cy="invitation-form-continue">
                <Send /> Continue
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default React.memo(InvitationForm)
