import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit'
import Grid from '@material-ui/core/Grid'
import { Picture } from 'components'
import Radio from '@material-ui/core/Radio'
import { useAPIRead, useCurrentUser, useOnMount, useSnackbar } from 'hooks'
import { creditCardFeeText } from 'services/invoice'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { useRouter } from 'next/router'
import styles from './StripeForm.module.css'
import StripeCardSetupButton from './StripeCardSetupButton'

export interface IStripeFormProps {
  checked: boolean
  redirectUrl?: string
  handleChange?: () => any
}

const StripeForm = (props: IStripeFormProps) => {
  const { handleChange, checked, redirectUrl } = props
  const router = useRouter()
  const showSnackbarMessage = useSnackbar()
  const [user] = useCurrentUser()
  const autoCharge = user?.firm?.allow_invoice_auto_charge !== false // default auto charge to on
  const creditCardFees = creditCardFeeText(user.configuration)
  const creditCards = useAPIRead(() => getAPIClient().getPaymentMethods({ cards_only: true }), { defaultValue: [] })
  useOnMount(() => {
    const stripeSessionId = router?.query?.stripe_session_id
    const stripeSessionType = router?.query?.stripe_session_type
    if (stripeSessionId && stripeSessionType === 'card') {
      getAPIClient().createPaymentMethod({ payment_method_type: 'card', session_id: stripeSessionId })
        .then(() => {
          showSnackbarMessage('Credit card connected successfully')
          creditCards.refresh()
        })
        .catch((error) => {
          trackError(error)
          showSnackbarMessage('Could not connect credit card')
        })
    } else {
      creditCards.refresh()
    }
  })
  const firstCreditCard = creditCards.value?.filter(cc => cc.payment_method_type === 'card')?.[0]

  return (
    <div className={styles['stripe-container']}>
      <div className={styles.radio}>
        <Radio
          checked={checked}
          onChange={handleChange}
          value="credit_card"
          name="default-payment-method-credit-card"
        />

        Pay with credit card
      </div>

      {!firstCreditCard && (
        <div>
          {!autoCharge && (
            <p>
              Auto payments are disabled.
              You can use your card to pay invoices manually.
              Your card will not be charged otherwise.

              {user?.configuration?.allow_changing_auto_invoice_charge && (
                <React.Fragment>
                  {' '}Enable the <em>auto-pay due invoices</em> setting to enable auto payments.
                </React.Fragment>
              )}
            </p>
          )}

          {autoCharge && (
            <p>
              Auto payments are enabled.
              Your card will be charged automatically for new invoices.
              Your card will not be charged otherwise.

              {user?.configuration?.allow_changing_auto_invoice_charge && (
                <React.Fragment>
                  {' '}Disable the <em>auto-pay due invoices</em> setting to disable auto payments.
                </React.Fragment>
              )}
            </p>
          )}

          {creditCardFees && (
            <p><b>Note:</b> by paying with credit card, you will be charged an extra {creditCardFees} to cover credit card payment processing fees.</p>
          )}
        </div>
      )}

      {firstCreditCard && (
        <div data-cy="card-status">
          <h2>Payments by Credit Card</h2>
          <p>
            We have one credit card ending with {firstCreditCard.mask} saved for you
            with expiration date {firstCreditCard.exp_month}/{firstCreditCard.exp_year}
          </p>
          {!autoCharge && <p>You will only be charged after you specifically pay an invoice</p>}
          {creditCardFees && (
            <p><b>Note:</b> by paying with credit card, you will be charged an extra {creditCardFees} to cover credit card payment processing fees.</p>
          )}
        </div>
      )}

      <div data-cy="stripe-checkout">
        {!firstCreditCard && (
          <StripeCardSetupButton
            disabled={creditCards.loading}
            redirectUrl={redirectUrl}
          />
        )}

        <Grid container spacing={8} style={{ marginTop: '10px' }}>
          <Grid item xs={6} sm={3} className={styles['credit-card']}>
            <Picture
              src={require('assets/images/stripe-cards/mastercard.png?webp')}
              srcFallback={require('assets/images/stripe-cards/mastercard.png')}
            />
          </Grid>
          <Grid item xs={6} sm={3} className={styles['credit-card']}>
            <Picture
              src={require('assets/images/stripe-cards/visa.png?webp')}
              srcFallback={require('assets/images/stripe-cards/visa.png')}
            />
          </Grid>
          <Grid item xs={6} sm={3} className={styles['credit-card']}>
            <Picture
              src={require('assets/images/stripe-cards/amex.png?webp')}
              srcFallback={require('assets/images/stripe-cards/amex.png')}
            />
          </Grid>
          <Grid item xs={6} sm={3} className={styles['credit-card']}>
            <Picture
              src={require('assets/images/stripe-cards/discover.png?webp')}
              srcFallback={require('assets/images/stripe-cards/discover.png')}
            />
          </Grid>
        </Grid>

        <List>
          <ListItem>
            <ListItemIcon>
              <HorizontalSplitIcon />
            </ListItemIcon>

            <ListItemText primary="All major credit cards supported" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>

            <ListItemText primary="Sensitive data encrypted & secure" />
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default StripeForm
