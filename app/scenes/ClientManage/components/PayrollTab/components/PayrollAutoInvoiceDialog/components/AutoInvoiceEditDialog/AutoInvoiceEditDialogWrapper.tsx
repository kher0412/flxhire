import React from 'react'
import AutoInvoiceEditDialog, { IAutoInvoiceEditDialogProps } from './AutoInvoiceEditDialog'

function AutoInvoiceEditDialogWrapper(props: IAutoInvoiceEditDialogProps) {
  const { open, ...restProps } = props

  if (!open) return null

  return (
    <AutoInvoiceEditDialog open {...restProps} />
  )
}

export default React.memo(AutoInvoiceEditDialogWrapper)
