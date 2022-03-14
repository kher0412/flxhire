import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Typography } from '@material-ui/core'
import { PayrollAutoInvoiceDialog_Firm$key } from '__generated__/PayrollAutoInvoiceDialog_Firm.graphql'
import { useSnackbar } from 'hooks'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { PayrollAutoInvoiceDialog_FirmMutation } from '__generated__/PayrollAutoInvoiceDialog_FirmMutation.graphql'
import { LoadingIcon } from 'components'
import { formatAsDate } from 'services/formatting'
import { Button } from 'components/themed'
import { Edit } from '@material-ui/icons'
import AutoInvoiceEditDialog from './components/AutoInvoiceEditDialog'

export interface IPayrollAutoInvoiceDialogProps {
  firmFragmentRef: PayrollAutoInvoiceDialog_Firm$key
}

function PayrollAutoInvoiceDialog(props: IPayrollAutoInvoiceDialogProps) {
  const { firmFragmentRef } = props

  const showSnackbarMessage = useSnackbar()

  const firm = useFragment(graphql`
    fragment PayrollAutoInvoiceDialog_Firm on Firm {
      invoiceSchedule
      nextAutoInvoiceDate
      invoiceSalariesInAdvance
    }
  `, firmFragmentRef)

  const { execute, loading } = useQuickCommit<PayrollAutoInvoiceDialog_FirmMutation>(graphql`
    mutation PayrollAutoInvoiceDialog_FirmMutation($input: UpdateFirmInput!) {
      updateFirm(input: $input) {
        firm {
          invoiceSchedule
          nextAutoInvoiceDate
          invoiceSalariesInAdvance
        }
      }
    }
  `)

  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const handleInvoiceScheduleChange = (schedule: string, time: string, salaryInAdvance: boolean) => {
    execute({
      input: {
        invoiceSchedule: schedule,
        nextAutoInvoiceDate: time,
        invoiceSalariesInAdvance: salaryInAdvance,
      },
    }).then(() => showSnackbarMessage('Invoice schedule updated'))
  }

  return (
    <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
      <div style={{ marginRight: 12, paddingLeft: 12, opacity: loading ? 0.5 : 1 }} data-cy="auto-invoicing-info">
        <Typography variant="subtitle2">
          Next auto-invoice on: {formatAsDate(firm?.nextAutoInvoiceDate)}
        </Typography>
      </div>

      <div>
        <Button iconOnly disabled={loading} onClick={() => setEditDialogOpen(true)} data-cy="edit-auto-invoicing">
          {loading ? <LoadingIcon data-cy="loading-icon" /> : <Edit />}
        </Button>
      </div>

      <AutoInvoiceEditDialog
        open={editDialogOpen}
        defaultInvoiceSchedule={firm?.invoiceSchedule}
        defaultInvoiceTime={firm?.nextAutoInvoiceDate}
        defaultSalaryInAdvance={firm?.invoiceSalariesInAdvance}
        onChange={handleInvoiceScheduleChange}
        onClose={() => setEditDialogOpen(false)}
      />
    </div>
  )
}

export default React.memo(PayrollAutoInvoiceDialog)
