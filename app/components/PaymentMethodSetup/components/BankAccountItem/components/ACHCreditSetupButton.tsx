import { DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { useCurrentUser } from 'hooks'
import React, { ComponentProps, useState } from 'react'
import { formatAsCurrency } from 'services/formatting'
import { IPaymentMethod } from 'types'
import { AccountBalance } from '@material-ui/icons'

type IACHCreditSetupButtonProps = Omit<ComponentProps<typeof Button>, 'onClick'> & { bank: IPaymentMethod }

const ACHCreditSetupButton = ({ bank, ...props }: IACHCreditSetupButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [user] = useCurrentUser()
  const companyName = user?.firm?.name
  const autoPay = user?.firm?.allow_invoice_auto_charge

  if (!bank) return null

  return (
    <React.Fragment>
      <Button color="primary" onClick={() => setDialogOpen(true)} {...props}>Bank Transfer (US Only)</Button>
      <ResponsiveDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Pay by Bank Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can pay by bank transfer using the account details below. Those details
            are specific to your company <strong>{companyName}</strong>.
          </DialogContentText>
          <DialogContentText>
            {autoPay && (
              <React.Fragment>
                When the transfer completes, the funds sent will be automatically used to pay
                any outstanding Flexhire Invoices addressed to <strong>{companyName}</strong>.
                If funds are insufficient, or no outstanding Flexhire Invoices are present, the funds
                will be automatically used for any new oustanding Flexhire Invoices.
              </React.Fragment>
            )}
            {!autoPay && (
              <React.Fragment>
                When the transfer completes, the funds
                sent will be available to pay Flexhire Invoices addressed to <strong>{companyName}</strong>.
              </React.Fragment>
            )}
          </DialogContentText>
          <DialogContentText>
            <strong>Send funds to:</strong>
            <ul>
              <li>Institution Name: {bank.institution_name}</li>
              <li><strong>Account Number</strong>: {bank.ach_account_number}</li>
              <li><strong>Routing Number</strong>: {bank.ach_routing_number}</li>
              <li>Swift Code: {bank.swift_code}</li>
            </ul>
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText
                primary={formatAsCurrency(bank.amount_available, { currency: bank.currency })}
                secondary="Available funds to spend"
              />
            </ListItem>
          </List>
          <DialogContentText>
            Note: funds can appear up to five business days after the transfer has been made
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button color="primary" muiComponent={Link} href="/client/manage" as="/client/manage?tab=invoices">
            View Invoices
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </React.Fragment>
  )
}

export default ACHCreditSetupButton
