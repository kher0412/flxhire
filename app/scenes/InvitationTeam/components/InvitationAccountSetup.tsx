import React from 'react'
import { Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import { useCurrentUser, useDispatchAction } from 'hooks'
import { Box, PaymentMethodSetup } from 'components'
import { Button } from 'components/themed'
import PlanSelectionField from 'components/PlanSelectionField'
import { createAction } from 'redux-actions'
import { SUBMIT_COMPANY_FORM } from 'scenes/Account/AccountDucks'
import { CheckCircle } from '@material-ui/icons'

export interface IInvitationAccountSetupProps {
  onBack: () => void
  onSubmit: () => void
  requireMultipleManagers: boolean
  requireBackgroundChecks: boolean
}

function InvitationAccountSetup(props: IInvitationAccountSetupProps) {
  const { onBack, onSubmit, requireMultipleManagers, requireBackgroundChecks } = props

  const [currentUser, refreshCurrentUser] = useCurrentUser()
  const updateFirm = useDispatchAction(data => createAction(SUBMIT_COMPANY_FORM)({ formData: data }), [])
  const firm = currentUser?.firm
  const paymentMethod = firm?.payment_method
  const paymentMethodRequired = !paymentMethod && !firm?.allow_no_payment_method
  const billingPlanRequired = !firm?.billing_plan && !firm?.legacy_billing
  const [billingPlanDone, setBillingPlanDone] = React.useState(!billingPlanRequired)
  const [paymentMethodDone, setPaymentMethodDone] = React.useState(!paymentMethodRequired)

  return (
    <div>
      {billingPlanRequired && (
        <React.Fragment>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h3">
                  Your Plan
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  First, choose a plan for your account to send invitations.
                </Typography>
              </Grid>

              <Grid item xs={12} />

              <Grid item xs={12}>
                <Collapse in={billingPlanDone}>
                  <List>
                    <ListItem button onClick={() => setBillingPlanDone(false)}>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>

                      <ListItemText primary={firm?.billing_plan?.name} secondary="Billing plan" />
                    </ListItem>
                  </List>
                </Collapse>

                <Collapse in={!billingPlanDone}>
                  <PlanSelectionField
                    requireMultipleManagers={requireMultipleManagers}
                    requireBackgroundChecks={requireBackgroundChecks}
                    meta={{}}
                    input={{
                      value: firm?.billing_plan,
                      name: 'billing_plan',
                      onChange: async (billingPlan) => {
                        await updateFirm({ billing_plan_id: billingPlan.id })
                        setBillingPlanDone(true)
                      },
                    }}
                  />
                </Collapse>
              </Grid>
            </Grid>
          </Box>

          <Divider />
        </React.Fragment>
      )}

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">
              Payment Method
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              Set up a payment method for your account
            </Typography>
          </Grid>

          <Grid item xs={12} />

          <Grid item xs={12}>
            <Collapse in={paymentMethodDone}>
              <List>
                <ListItem button onClick={() => setPaymentMethodDone(false)}>
                  <ListItemIcon>
                    <CheckCircle />
                  </ListItemIcon>

                  <ListItemText primary="Set up" secondary="Payment method" />
                </ListItem>
              </List>
            </Collapse>

            <Collapse in={!paymentMethodDone}>
              <PaymentMethodSetup
                onAdded={() => {
                  refreshCurrentUser()
                  setPaymentMethodDone(true)
                }}
              />
            </Collapse>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onBack} style={{ marginRight: 12 }}>
            Back
          </Button>

          <Button onClick={onSubmit} color="primary" disabled={billingPlanRequired || paymentMethodRequired} data-cy="account-setup-continue">
            Review &amp; Send Invitation
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default React.memo(InvitationAccountSetup)
