import React from 'react'
import { useCurrentUser } from 'hooks'
import { IClientInvoice } from 'types'
import { formatAsCurrency } from 'services/formatting'
import { hasInsufficientFunds } from 'services/stripe'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountBalance, CreditCard, DateRange, Info } from '@material-ui/icons'

const PaymentSourceListItems = ({ invoice }: { invoice: IClientInvoice }) => {
  const [user] = useCurrentUser()

  if (!user.firm?.payment_method) return null

  const paymentMethod = user.firm.payment_method
  let icon = null
  let name = ''
  let title = ''
  let expiration = null
  let balanceInsufficient = false

  if (paymentMethod.payment_method_type === 'card') {
    icon = <CreditCard />
    name = `xxxx xxxx xxxx ${paymentMethod.mask}`
    title = 'Card number'
    expiration = `${paymentMethod.exp_month} / ${paymentMethod.exp_year}`
  } else {
    icon = <AccountBalance />
    if (paymentMethod.payment_method_type === 'ach_credit_transfer') {
      name = `${formatAsCurrency(paymentMethod.amount_available, { currency: paymentMethod.currency })} Available to spend`
      title = 'Funds sent via Bank Transfer'
      balanceInsufficient = hasInsufficientFunds(paymentMethod, invoice)
    } else {
      name = paymentMethod.institution_name || `Ends with ${paymentMethod.mask}`
      title = 'Bank account'
    }
  }

  return (
    <React.Fragment>
      <ListItem>
        {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        )}

        <ListItemText
          primary={name}
          secondary={title}
        />
      </ListItem>

      {expiration && (
      <ListItem>
        <ListItemIcon>
          <DateRange />
        </ListItemIcon>

        <ListItemText
          primary={expiration}
          secondary="Card expiration"
        />
      </ListItem>
      )}

      {balanceInsufficient && (
      <ListItem>
        <ListItemIcon>
          <Info />
        </ListItemIcon>

        <ListItemText
          primary="Insufficient Funds"
          secondary="Your available funds are insufficient to cover this invoice's total. Review your payment methods or download the Invoice for instructions on transferring more funds. Alternatively, connect your bank account to automatically transfer the funds on invoice payment."
        />
      </ListItem>
      )}
    </React.Fragment>
  )
}

export default PaymentSourceListItems
