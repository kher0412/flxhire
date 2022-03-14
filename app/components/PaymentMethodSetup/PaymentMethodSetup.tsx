import React from 'react'
import { Grid } from '@material-ui/core'
import { useCurrentUser } from 'hooks'
import CreditCardItem from './components/CreditCardItem'
import BankAccountItem from './components/BankAccountItem'
import WireTransferItem from './components/WireTransferItem'

export interface IPaymentMethodSetupProps {
  redirectUrl?: string
  onAdded?: () => void
}

function PaymentMethodSetup(props: IPaymentMethodSetupProps) {
  const { redirectUrl, onAdded } = props
  const [user] = useCurrentUser()
  const paymentMethodTypes = user?.firm?.payment_method_types || []
  const wireTransferAvailable = paymentMethodTypes.includes('ach_credit_transfer')
  const bankAvailable = paymentMethodTypes.includes('sepa_debit') || paymentMethodTypes.includes('plaid_link')
  const cardAvailable = paymentMethodTypes.includes('card')

  return (
    <Grid container spacing={3} style={{ justifyContent: 'center' }}>
      {cardAvailable && (
        <Grid item xs={12} md={4}>
          <CreditCardItem onAdded={onAdded} redirectUrl={redirectUrl} available={cardAvailable} />
        </Grid>
      )}

      {bankAvailable && (
        <Grid item xs={12} md={4}>
          <BankAccountItem onAdded={onAdded} redirectUrl={redirectUrl} available={bankAvailable} />
        </Grid>
      )}

      {wireTransferAvailable && (
        <Grid item xs={12} md={4}>
          <WireTransferItem onAdded={onAdded} available={wireTransferAvailable} />
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(PaymentMethodSetup)
