import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { getAPIClient } from 'api'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { Button } from 'components/themed'
import { useCurrentUser, useSnackbar } from 'hooks'
import React, { useCallback, useState } from 'react'
import { trackError } from 'services/analytics'

const CancelPlan = () => {
  const [user, refreshUser] = useCurrentUser()
  const [dialogOpen, setDialogOpen] = useState(false)
  const canCancel = Boolean(!user?.firm?.legacy_billing && user?.firm?.billing_plan?.id)
  const isCustomPlan = Boolean(user?.firm?.billing_plan?.hidden)
  const showSnackbarMessage = useSnackbar()
  const cancelPlan = useCallback(() => {
    getAPIClient().updateFirm({ billing_plan_id: null })
      .catch((error) => {
        trackError(error)
        showSnackbarMessage('Something went wrong')
      })
      .then(() => {
        refreshUser()
        setDialogOpen(false)
        showSnackbarMessage('Your plan has been cancelled. Thank your for using Flexhire')
      })
  }, [])

  if (!canCancel) return null

  return (
    <React.Fragment>
      <Button color="secondary" onClick={() => setDialogOpen(true)} data-cy="cancel-plan" style={{ marginTop: 12 }}>
        Cancel my Plan
      </Button>
      {dialogOpen && (
        <ResponsiveDialog open={dialogOpen} onClose={() => setDialogOpen(false)} data-cy="cancel-dialog">
          <DialogTitle>Cancel Plan</DialogTitle>
          <DialogContent>
            By cancelling your plan your will lose access to most of the platform's features.
            <br />
            <br />
            After cancellation, you will receive one final invoice for the usage of the platform up
            until the moment of cancellation. You will also receive additional invoices for Work Reports
            that you have approved (if any).
            <br />
            <br />
            Any open positions will be automatically closed.
            <br />
            <br />
            {isCustomPlan && (
              <strong>
                You are currently on a custom plan. By cancelling, you will not be able to return to your current custom plan.
                However, you will be able to resume usage of the platform with one of our standard plans at any time.
              </strong>
            )}
            {!isCustomPlan && 'You will be able to restart your billing plan and resume usage of the platform at any time.'}
            <br />
            <br />
            Are you sure?
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelPlan} data-cy="confirm">Cancel my Plan</Button>
            <Button color="primary" onClick={() => setDialogOpen(false)} data-cy="cancel">Keep using Flexhire</Button>
          </DialogActions>
        </ResponsiveDialog>
      )}
    </React.Fragment>
  )
}

export default CancelPlan
