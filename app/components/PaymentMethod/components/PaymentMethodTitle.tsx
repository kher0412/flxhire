import { Fragment } from 'react'
import { useFragment, graphql } from 'react-relay'
import { PaymentMethodTitle_PaymentMethod$key } from '__generated__/PaymentMethodTitle_PaymentMethod.graphql'

function PaymentMethodTitle({ paymentMethod: paymentMethodProp }: { paymentMethod: PaymentMethodTitle_PaymentMethod$key }) {
  const paymentMethod = useFragment(graphql`
    fragment PaymentMethodTitle_PaymentMethod on PaymentMethod {
      paymentMethodType
      mask
      name
    }
  `, paymentMethodProp)
  switch (paymentMethod.paymentMethodType) {
    case 'card':
      return <Fragment>{`▪▪▪▪ ▪▪▪▪ ▪▪▪▪ ${paymentMethod.mask || '????'}`}</Fragment>

    case 'plaid_link':
      return <Fragment>{paymentMethod.name}</Fragment>

    case 'sepa_debit':
      return <Fragment>{paymentMethod.name}</Fragment>

    case 'ach_credit_transfer':
      return <Fragment>{paymentMethod.name}</Fragment>
  }

  return null
}

export default PaymentMethodTitle
