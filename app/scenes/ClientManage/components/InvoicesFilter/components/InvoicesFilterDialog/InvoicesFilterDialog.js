import React from 'react'
import { DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@material-ui/core'
import { LoadingPage, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'

export default class InvoicesFilterDialog extends React.Component {
  state = {
    invoiceIds: [],
    invoicesReceived: false,
  }

  componentDidMount() {
    const { getClientInvoices, clientId } = this.props

    getClientInvoices({
      client_id: clientId,
    }).then((invoices) => {
      this.setState({
        invoiceIds: invoices.map(invoice => invoice.invoice_num),
        invoicesReceived: true,
      })
    })
  }

  render() {
    const { onClose, open } = this.props

    return (
      <ResponsiveDialog open={open} onClose={onClose} scroll="paper">
        <DialogTitle>
          Select invoice
        </DialogTitle>

        <DialogContent>
          <div style={{ minWidth: 280, minHeight: 48 * 5 }}>
            {this.renderDialogContent()}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderDialogContent() {
    const { onChange } = this.props
    const { invoiceIds = [], invoicesReceived } = this.state

    if (invoicesReceived) {
      return (
        <List>
          {invoiceIds.map(invoiceNum => (
            <ListItem button onClick={() => onChange(invoiceNum)}>
              <ListItemText primary={`Invoice #${invoiceNum}`} />
            </ListItem>
          ))}
        </List>
      )
    }

    return (
      <LoadingPage />
    )
  }
}
