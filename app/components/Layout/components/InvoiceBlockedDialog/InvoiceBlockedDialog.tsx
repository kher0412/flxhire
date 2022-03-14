import React from 'react'
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Link, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { useCurrentUser } from 'hooks'
import { formatAsDateTime } from 'services/formatting'
import moment from 'moment'

export interface IInvoiceBlockedDialogProps {
  open: boolean
  onClose: () => void
}

const InvoiceBlockedDialog = (props: IInvoiceBlockedDialogProps) => {
  const { open, onClose } = props
  const [user] = useCurrentUser()
  const deadline = formatAsDateTime(user?.block_platform_access_due_to_unpaid_invoices_date)
  const isDeadlinePast = moment(user?.block_platform_access_due_to_unpaid_invoices_date).isBefore(moment())

  return (
    <ResponsiveDialog open={open} data-cy="invoice-blocked-dialog">
      <DialogTitle>
        Overdue Invoices
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {isDeadlinePast ? (
            <React.Fragment>
              Some platform features such as publishing jobs and approving work reports have been disabled
              due to one or more invoices having been overdue for too long.
              You can restore functionality by viewing and pay your overdue invoices from the
            </React.Fragment>
          ) : (
            <React.Fragment>
              By failing to pay your overdue invoices before {deadline} some platform features such
              as publishing jobs and approving work reports will be disabled.
              You can view and pay your invoices from the
            </React.Fragment>
          )}
          {' '}
          <Link href="/client/manage" as="/client/manage?tab=invoices" style={{ color: 'rgb(46,203,128)' }}>Payment</Link>
          {' '}
          page.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} data-cy="dismiss-overdue-invoices">
          Dismiss
        </Button>

        <Button
          onMouseUp={onClose}
          color="secondary"
          muiComponent={Link}
          href="/client/manage?tab=invoices"
          as="/client/manage?tab=invoices"
          data-cy="view-invoices"
        >
          View Invoices
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default React.memo(InvoiceBlockedDialog)
