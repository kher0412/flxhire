import React from 'react'
import PlaidLink from 'react-plaid-link'
import { Button, Collapse, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core'
import { useAPIRead, useAPIWrite, useCurrentUser, useOnMount, useSnackbar } from 'hooks'
import { Box, LoadingPage, ResponsiveDialog } from 'components'
import { getAPIClient } from 'api'
import { useRouter } from 'next/router'
import { trackError } from 'services/analytics'
import { AccountBalance } from '@material-ui/icons'
import StripeBankAccountSetupButton from './components/StripeBankAccountSetupButton'
import PaymentMethodItem from '../PaymentMethodItem'
import styles from './BankAccountItem.module.css'

export interface IBankAccountItemProps {
  redirectUrl?: string
  onAdded?: () => void
  available: boolean
}

function BankAccountItem(props: IBankAccountItemProps) {
  const { onAdded, redirectUrl, available = true } = props
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogWorking, setDialogWorking] = React.useState(false)

  const router = useRouter()
  const [user] = useCurrentUser()

  const enableSepaDebit = user?.configuration?.payment_method_types?.includes('sepa_debit')
  const enablePlaid = user?.configuration?.payment_method_types?.includes('plaid_link')

  const showSnackbarMessage = useSnackbar()
  const bankAccounts = useAPIRead(() => getAPIClient().getPaymentMethods({ except_cards: true }), { defaultValue: [] })
  const createBankAccount = useAPIWrite(params => (
    getAPIClient().createPaymentMethod(params).then(() => {
      showSnackbarMessage('Bank connected successfully')
      bankAccounts.refresh()
    })
  ))

  const closeDialog = React.useCallback(() => {
    setDialogWorking(false)
    setDialogOpen(false)
  }, [])

  const createPlaidBankAccount = React.useCallback(async (token, metadata) => {
    await createBankAccount.submit({
      payment_method_type: 'plaid_link',
      token: token,
      account_id: metadata.account_id,
      mask: metadata.account.mask,
      name: metadata.account.name,
      institution_name: metadata.institution.name,
    })

    setDialogWorking(false)
    setDialogOpen(false)

    showSnackbarMessage('Bank account added')

    if (onAdded) {
      onAdded()
    }
  }, [])

  useOnMount(async () => {
    const stripeSessionId = router?.query?.stripe_session_id
    const stripeSessionType = router?.query?.stripe_session_type
    if (stripeSessionId && stripeSessionType === 'sepa_debit') {
      try {
        await getAPIClient().createPaymentMethod({ payment_method_type: 'sepa_debit', session_id: stripeSessionId })
        showSnackbarMessage('Bank connected successfully')
        if (onAdded) onAdded()
      } catch (error) {
        trackError(error)
        showSnackbarMessage('Could not connect bank')
      }
    }
  })

  if (!available) return null

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={dialogOpen}
        onClose={closeDialog}

        // these need to be disabled, otherwise the Plaid overlay throws a fit
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle>
          Bank Account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Connect your bank once for the simplest solution - automatic invoice payment via direct debit.
            We support ACH debit in the US and SEPA debit in the EU.
          </DialogContentText>
        </DialogContent>

        <DialogContent>
          <Collapse in={dialogWorking} mountOnEnter unmountOnExit>
            <Box>
              <LoadingPage />
            </Box>
          </Collapse>

          <Collapse in={!dialogWorking} mountOnEnter unmountOnExit>
            <Grid container spacing={2}>
              {enablePlaid && (
                <Grid item xs={12}>
                  <div data-cy="plaid-link-container">
                    <PlaidLink
                      clientName="Flexhire"
                      env={process.env.PLAID_ENV}
                      product={['auth']}
                      publicKey={process.env.PLAID_KEY}
                      onSuccess={createPlaidBankAccount}
                      onClick={() => setDialogWorking(true)}
                      onExit={() => setDialogWorking(false)}
                      className={styles.plaidlink}
                    >
                      Add US Bank Account
                    </PlaidLink>
                  </div>
                </Grid>
              )}

              {enableSepaDebit && (
                <Grid item xs={12}>
                  <StripeBankAccountSetupButton redirectUrl={redirectUrl} />
                </Grid>
              )}
            </Grid>
          </Collapse>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>

      <PaymentMethodItem
        icon={<AccountBalance />}
        title="Bank Account"
        text={(
          <React.Fragment>
            Connect your bank once for the simplest solution - automatic invoice payment via direct debit.
            We support ACH debit in the US and SEPA debit in the EU.
          </React.Fragment>
        )}
        onClick={() => setDialogOpen(true)}
        available={available}
        data-cy="payment-setup-bank-account"
      />
    </React.Fragment>
  )
}

export default React.memo(BankAccountItem)
