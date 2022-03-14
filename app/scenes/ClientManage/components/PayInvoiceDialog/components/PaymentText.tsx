import { DialogContentText } from '@material-ui/core'
import { Link } from 'components'
import { useCurrentUser } from 'hooks'
import { formatAsCurrency } from 'services/formatting'
import { overSepaLimit } from 'services/stripe'
import { IClientInvoice } from 'types'

const PaymentText = ({ invoice }: { invoice: IClientInvoice }) => {
  const [user] = useCurrentUser()
  if (overSepaLimit(user.firm?.payment_method, invoice, user.configuration)) {
    return (
      <DialogContentText>
        Currently payments using direct debit from your bank account are limited to a maximum of {formatAsCurrency(user.configuration.sepa_limit, { currency: invoice.currency })} per transaction.
        {' '}
        To complete this payment, please contact us at info@flexhire.com
      </DialogContentText>
    )
  }

  if (user.firm?.payment_method) {
    return (
      <DialogContentText>
        Review and confirm payment of {formatAsCurrency(invoice.total_to_pay_client, { currency: invoice.currency })} for invoice #{invoice.invoice_num}:
      </DialogContentText>
    )
  }

  return (
    <DialogContentText>
      You need to first
      {' '}
      <Link to="/account/paying_us" data-cy="configure-default-payment-method">configure a default payment method</Link> in
      {' '}
      your Account Billing tab. You can securely pay with credit card or by connecting your bank account.
      If you are a US customer you can also pay via secure bank transfer. If you have any questions, contact us
      at info@flexhire.com
    </DialogContentText>
  )
}

export default PaymentText
