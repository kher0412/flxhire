import React, { useCallback } from 'react'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { useAPIRead, useCurrentUser } from 'hooks'
import { hasCompletedBillingSetup } from 'services/user'
import { browserHistory } from 'services/router'
import { getAPIClient } from 'api'
import { CheckCircle, Timer } from '@material-ui/icons'

export interface IBillingSetupDialogProps {
  open: boolean
  onClose: () => void
}

const useContainer = (onClose: () => void) => {
  const [user] = useCurrentUser()

  const resumeJob = useCallback(() => {
    onClose()
    browserHistory.push('/client/hire', '/client/hire?tab=jobs')
  }, [])

  const goToPlans = useCallback(() => {
    onClose()
    browserHistory.push('/account/plans')
  }, [])

  const goToPayments = useCallback(() => {
    onClose()
    browserHistory.push('/account/paying_us')
  }, [])

  const openedJobs = useAPIRead(() => getAPIClient().getJobs({ status: 'opened' }), { preload: true, defaultValue: [] })
  const shouldAppear = !hasCompletedBillingSetup(user)

  const paymentMethodRequired = !user?.firm?.allow_no_payment_method
  const noLiveJobs = openedJobs.value?.length === 0
  const billingPlanCompleted = Boolean(user.firm?.billing_plan)
  const paymentMethodCompleted = Boolean(user.firm?.payment_method)

  return {
    resumeJob,
    goToPayments,
    goToPlans,
    shouldAppear,
    paymentMethodRequired,
    paymentMethodCompleted,
    noLiveJobs,
    billingPlanCompleted,
  }
}

const BillingSetupDialog = (props: IBillingSetupDialogProps) => {
  const { open, onClose } = props

  const {
    resumeJob,
    goToPayments,
    goToPlans,
    shouldAppear,
    paymentMethodRequired,
    paymentMethodCompleted,
    noLiveJobs,
    billingPlanCompleted,
  } = useContainer(onClose)

  if (!open || !shouldAppear) {
    return null
  }

  return (
    <ResponsiveDialog open={open} data-cy="billing-setup-dialog">
      <DialogTitle>
        Set up your account
      </DialogTitle>

      <DialogContent>
        <div style={{ overflow: 'hidden' }}>
          <DialogContentText>
            Some Flexhire features will not be available until you finish setting up your account
            by choosing a billing plan and payment method, or by completing your first job posting.
          </DialogContentText>

          <List>
            {noLiveJobs && (
              <React.Fragment>
                <ListItem button onClick={resumeJob} data-cy="goto-jobs">
                  <ListItemIcon>
                    <Timer />
                  </ListItemIcon>

                  <ListItemText
                    primary="Publish your first Job Posting"
                    secondary={(billingPlanCompleted && paymentMethodCompleted) ? 'Completed' : 'Pending - click to resume'}
                  />
                </ListItem>

                <ListSubheader>Alternatively</ListSubheader>
              </React.Fragment>
            )}

            <ListItem button onClick={goToPlans} data-cy="choose-billing-plan">
              <ListItemIcon>
                {billingPlanCompleted ? <CheckCircle color="primary" /> : <Timer />}
              </ListItemIcon>

              <ListItemText
                primary="Choose a Billing Plan"
                secondary={billingPlanCompleted ? 'Completed' : 'Pending - click to resume'}
              />
            </ListItem>

            {paymentMethodRequired && (
              <ListItem button onClick={goToPayments} data-cy="choose-payment-method">
                <ListItemIcon>
                  {paymentMethodCompleted ? <CheckCircle color="primary" /> : <Timer />}
                </ListItemIcon>

                <ListItemText
                  primary="Choose a Payment Method"
                  secondary={paymentMethodCompleted ? 'Completed' : 'Pending - click to resume'}
                />
              </ListItem>
            )}
          </List>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} data-cy="dismiss-billing-setup">
          Later
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default React.memo(BillingSetupDialog)
