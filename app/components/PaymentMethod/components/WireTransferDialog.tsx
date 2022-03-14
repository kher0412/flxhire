import React from 'react'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { formatAsCurrency } from 'services/formatting'
import { useCurrentUser } from 'hooks'
import { useFragment, graphql } from 'react-relay'
import { WireTransferDialog_PaymentMethod$key } from '__generated__/WireTransferDialog_PaymentMethod.graphql'
import { Currency } from 'types'
import { AccountBalance } from '@material-ui/icons'

export interface IWireTransferDialogProps {
  paymentMethod: WireTransferDialog_PaymentMethod$key
  open: boolean
  onClose: () => void
}

function WireTransferDialog(props: IWireTransferDialogProps) {
  const { paymentMethod: paymentMethodProp, open, onClose } = props
  const paymentMethod = useFragment(graphql`
    fragment WireTransferDialog_PaymentMethod on PaymentMethod {
      institutionName
      achAccountNumber
      achRoutingNumber
      swiftCode
      amountAvailable {
        currency {
          code
        }
        value
      }
      currency {
        code
      }
    }
  `, paymentMethodProp)
  const [user] = useCurrentUser()
  const autoPay = user?.firm?.allow_invoice_auto_charge
  const companyName = user?.firm?.name

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>
        Wire Transfer Details
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Easily pay by bank transfer to the Flexhire account details below.
        </DialogContentText>

        {paymentMethod && (
          <React.Fragment>
            <DialogContentText>
              <div data-cy="existing-wire-transfer">
                <strong>Send funds to:</strong>

                <ul>
                  <li>Institution Name: {paymentMethod.institutionName}</li>
                  <li><strong>Account Number</strong>: {paymentMethod.achAccountNumber}</li>
                  <li><strong>Routing Number</strong>: {paymentMethod.achRoutingNumber}</li>
                  <li>Swift Code: {paymentMethod.swiftCode}</li>
                </ul>
              </div>
            </DialogContentText>

            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountBalance />
                </ListItemIcon>

                <ListItemText
                  primary={formatAsCurrency(paymentMethod.amountAvailable.value, { currency: paymentMethod.currency as Currency })}
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default React.memo(WireTransferDialog)
