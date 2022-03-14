import { useFragment, graphql } from 'react-relay'
import { PaymentMethodIcon_PaymentMethod$key } from '__generated__/PaymentMethodIcon_PaymentMethod.graphql'
import { AccountBalance, AttachMoney, CreditCard, SyncAlt } from '@material-ui/icons'

function PaymentMethodIcon({ paymentMethod: paymentMethodProp }: { paymentMethod: PaymentMethodIcon_PaymentMethod$key }) {
  const paymentMethod = useFragment(graphql`
    fragment PaymentMethodIcon_PaymentMethod on PaymentMethod {
      paymentMethodType
    }
  `, paymentMethodProp)
  switch (paymentMethod?.paymentMethodType) {
    case 'card':
      return (
        <CreditCard />
      )

    case 'plaid_link':
    case 'sepa_debit':
      return (
        <AccountBalance />
      )

    case 'ach_credit_transfer':
      return (
        <SyncAlt />
      )
  }

  return (
    <AttachMoney />
  )
}

export default PaymentMethodIcon
