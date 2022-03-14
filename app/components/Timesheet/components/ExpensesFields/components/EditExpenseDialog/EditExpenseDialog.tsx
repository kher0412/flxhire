import React, { useCallback, useState } from 'react'
import { Field } from 'redux-form'
import { DialogTitle, DialogActions, DialogContent, Grid, MenuItem } from '@material-ui/core'
import { ResponsiveDialog, ExpenseTypeHint } from 'components'
import { TextField, TextArea, SelectField, Button, NumberField, DatePicker, InputGroup, InputGroupHelpButton } from 'components/themed'
import { currencyToSymbol } from 'services/formatting'
import { Currency } from 'types'
import DocumentUploadField from './components/DocumentUploadField'

interface IEditExpenseDialogProps {
  fieldName: string
  open: boolean
  onSave: () => void
  onCancel: () => void
  currency: Currency
}

const EditExpenseDialog = (props: IEditExpenseDialogProps) => {
  const { fieldName, open, onSave, onCancel, currency } = props
  const [uploadingReceipt, changeUploadingReceipt] = useState(false)
  const setUploadingReceipt = useCallback(() => changeUploadingReceipt(true), [])
  const unsetUploadingReceipt = useCallback(() => changeUploadingReceipt(false), [])

  if (!fieldName || !open) {
    return null
  }

  // Needed because if the dialog is visible it blocks some interactions with the filepicker
  const style = uploadingReceipt ? { display: 'none' } : undefined

  return (
    <ResponsiveDialog open={open} onClose={onSave} style={style}>
      <DialogTitle>
        Add/Edit Expense
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Field
              component={NumberField}
              numDecimals={2}
              name={`${fieldName}.amount`}
              label="Amount"
              fullWidth
              endAdornment={currencyToSymbol(currency)}
            />
          </Grid>

          <Grid item xs={12} md={8} style={{ display: 'flex' }}>
            <Field
              component={DatePicker}
              name={`${fieldName}.expense_date`}
              label="Expense Date"
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Field
              name={`${fieldName}.description`}
              label="Description"
              component={TextArea}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Field
              name={`${fieldName}.project_code`}
              label="Project code"
              component={TextField}
              fullWidth
              helperText="Optional"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputGroup>
              <Field
                name={`${fieldName}.expense_type`}
                component={SelectField}
                label="Financial Allocation"
                fullWidth
                helperText="Optional - defaults to Unassigned"
              >
                <MenuItem value={null}>
                  Unassigned
                </MenuItem>

                <MenuItem value="capex">
                  Capital Expense
                </MenuItem>

                <MenuItem value="opex">
                  Operating Expense
                </MenuItem>
              </Field>

              <InputGroupHelpButton title="Financial Allocation">
                <ExpenseTypeHint />
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>

          <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Field
              name={`${fieldName}.receipt_url`}
              component={DocumentUploadField}
              onReceiptUploadOpen={setUploadingReceipt}
              onReceiptUploadClose={unsetUploadingReceipt}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} data-cy="cancel-item">
          Remove
        </Button>

        <Button color="primary" onClick={onSave} data-cy="save-item">
          Save
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default EditExpenseDialog
