import React from 'react'
import { Field, Fields } from 'redux-form'
import { DialogTitle, DialogActions, DialogContent, Grid, MenuItem } from '@material-ui/core'
import { ExpenseTypeHint, ResponsiveDialog } from 'components'
import { Button, TextField, TextArea, SelectField, InputGroup, InputGroupHelpButton } from 'components/themed'
import { ContainerProps } from './EditWorkItemDialogContainer'
import TimeFields from './components/TimeFields'

interface IEditWorkItemDialogProps extends ContainerProps {
  fieldName: string
  open: boolean
  onSave: () => void
  onCancel: () => void
}

export default class EditWorkItemDialog extends React.Component<IEditWorkItemDialogProps> {
  render() {
    const { fieldName, open, onSave, onCancel } = this.props

    if (!fieldName || !open) {
      return null
    }

    return (
      <ResponsiveDialog open={open} onClose={onSave}>
        <DialogTitle>
          Add/Edit Work Item
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Fields
              names={[
                `${fieldName}.start_time`,
                `${fieldName}.end_time`,
              ]}
              component={TimeFields}
            />

            <Grid item xs={12} md={12}>
              <Field
                name={`${fieldName}.description`}
                component={TextArea}
                label="Description"
                placeholder="Write a short description of the activites you performed (Required)"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Field
                name={`${fieldName}.project_code`}
                label="Project code"
                helperText="Optional"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <InputGroup>
                <Field
                  name={`${fieldName}.expense_type`}
                  component={SelectField}
                  label="Financial Allocation"
                  helperText="Optional - defaults to Unassigned"
                  fullWidth
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
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} data-cy="cancel-item">
            Remove
          </Button>

          <Button onClick={onSave} data-cy="save-item" color="primary">
            Save
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}
