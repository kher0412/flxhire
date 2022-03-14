import React from 'react'
import { Collapse, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Box, LoadingPage, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IPaymentMethod } from 'types'
import { useAPIRead, useCurrentUser, useSnackbar } from 'hooks'
import { formatAsCurrency } from 'services/formatting'
import { AccountBalance, SyncAlt } from '@material-ui/icons'
import PaymentMethodItem from './PaymentMethodItem'

export interface IWireTransferItemProps {
  onAdded?: () => void
  available: boolean
}

async function createACHCreditIfMissing(paymentMethods: IPaymentMethod[]): Promise<boolean> {
  let achCreditMethod = paymentMethods.find(p => p.payment_method_type === 'ach_credit_transfer')

  if (!achCreditMethod) {
    await getAPIClient().createPaymentMethod({
      payment_method_type: 'ach_credit_transfer',
    })

    return true
  }

  return false
}

function WireTransferItem(props: IWireTransferItemProps) {
  const { onAdded, available = true } = props
  const [user, refreshUser] = useCurrentUser()
  const showSnackbarMessage = useSnackbar()

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogWorking, setDialogWorking] = React.useState(false)

  const bankAccounts = useAPIRead(() => getAPIClient().getPaymentMethods({ except_cards: true }), { defaultValue: [] })
  const achCreditBank = bankAccounts.value.find(b => b.payment_method_type === 'ach_credit_transfer')

  let isLoading = dialogWorking || bankAccounts.loading

  const onContinue = React.useCallback(async () => {
    setDialogWorking(true)

    try {
      let created = await createACHCreditIfMissing(bankAccounts.value)
      await bankAccounts.refresh()

      if (created) {
        showSnackbarMessage('Wire transfer configured successfully')
        refreshUser()
      }

      if (onAdded) {
        onAdded()
      }
    } catch (err) {
      trackError(err)
      showSnackbarMessage(`Could not set up wire transfer: ${err.response || err.message || err}`)
    }

    setDialogWorking(false)
  }, [])

  const companyName = user?.firm?.name
  const autoPay = user?.firm?.allow_invoice_auto_charge

  return (
    <React.Fragment>
      <ResponsiveDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Wire Transfer
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 9999 }} />

          <Collapse mountOnEnter unmountOnExit in={isLoading}>
            <Box>
              <div data-cy="wire-transfer-dialog-loading">
                <LoadingPage />
              </div>
            </Box>
          </Collapse>

          <Collapse mountOnEnter unmountOnExit in={!isLoading && !achCreditBank}>
            <DialogContentText>
              Pay your invoices from your bank via ACH Credit (US Only).
              SEPA Credit (EU Only) coming soon.
              Continuing will generate a virtual bank number for your company, where you can send funds to pay invoices.
            </DialogContentText>
          </Collapse>

          <Collapse mountOnEnter unmountOnExit in={!isLoading && !!achCreditBank}>
            <DialogContentText>
              Easily pay by bank transfer to the Flexhire account details below.
            </DialogContentText>

            {achCreditBank && (
              <React.Fragment>
                <DialogContentText>
                  <div data-cy="existing-wire-transfer">
                    <strong>Send funds to:</strong>

                    <ul>
                      <li>Institution Name: {achCreditBank.institution_name}</li>
                      <li><strong>Account Number</strong>: {achCreditBank.ach_account_number}</li>
                      <li><strong>Routing Number</strong>: {achCreditBank.ach_routing_number}</li>
                      <li>Swift Code: {achCreditBank.swift_code}</li>
                    </ul>
                  </div>
                </DialogContentText>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AccountBalance />
                    </ListItemIcon>

                    <ListItemText
                      primary={formatAsCurrency(achCreditBank.amount_available, { currency: achCreditBank.currency })}
                      secondary="Available funds to spend"
                    />
                  </ListItem>
                </List>
              </React.Fragment>
            )}

            <DialogContentText>
              {autoPay && (
                <React.Fragment>
                  Note: Funds can appear up to five business days to complete. On receipt, funds will be automatically used to pay
                  any outstanding <strong>{companyName}</strong> invoices.
                  If no outstanding invoices are present, the funds will be automatically used for any new oustanding invoices as they arrive.
                </React.Fragment>
              )}

              {!autoPay && (
                <React.Fragment>
                  Note: funds can appear up to five business days to complete.
                  On receipt, funds will be available to pay <strong>{companyName}</strong> invoices.
                </React.Fragment>
              )}
            </DialogContentText>
          </Collapse>
        </DialogContent>

        <DialogActions data-cy="wire-transfer-dialog-actions">
          <Button onClick={() => setDialogOpen(false)} data-cy="close-wire-transfer">
            {achCreditBank ? 'Close' : 'Cancel'}
          </Button>

          {!achCreditBank && (
            <Button color="secondary" onClick={onContinue} data-cy="add-wire-transfer">
              Continue
            </Button>
          )}
        </DialogActions>
      </ResponsiveDialog>

      <PaymentMethodItem
        icon={<SyncAlt />}
        title="Wire Transfer"
        text="Pay your invoices from your bank via ACH Credit (US Only). SEPA Credit (EU Only) coming soon."
        available={available}
        onClick={() => setDialogOpen(true)}
        data-cy="payment-setup-wire-transfer"
      />
    </React.Fragment>
  )
}

export default React.memo(WireTransferItem)
