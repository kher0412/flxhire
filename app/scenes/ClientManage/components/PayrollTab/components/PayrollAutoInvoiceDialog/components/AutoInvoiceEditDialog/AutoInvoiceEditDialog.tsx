import React from 'react'
import moment from 'moment'
import { DialogTitle, DialogContent, Grid, DialogContentText, MenuItem, DialogActions } from '@material-ui/core'
import { ResponsiveDialog, Condition, GridExpandable } from 'components'
import { DatePicker, Button, SelectField, InfoMessage, InputGroup, InputGroupConnector, CheckboxField, InputGroupHelpButton } from 'components/themed'
import { formatAsDate } from 'services/formatting'

export interface IAutoInvoiceEditDialogProps {
  open: boolean
  defaultInvoiceSchedule: string
  defaultInvoiceTime: string
  defaultSalaryInAdvance: boolean
  onChange: (schedule: string, time: string, salaryInAdvance: boolean) => void
  onClose: () => void
}

function AutoInvoiceEditDialog(props: IAutoInvoiceEditDialogProps) {
  const { open, defaultInvoiceSchedule, defaultInvoiceTime, defaultSalaryInAdvance, onChange, onClose } = props
  const [invoiceSchedule, setInvoiceSchedule] = React.useState(defaultInvoiceSchedule)
  const [invoiceTime, setInvoiceTime] = React.useState(defaultInvoiceTime)
  const [salaryInAdvance, setSalaryInAdvance] = React.useState(defaultSalaryInAdvance)
  const invoiceTimeDayOfWeek = new Date(invoiceTime).getDay()

  const handleSave = () => {
    onChange(invoiceSchedule, invoiceTime, salaryInAdvance)
    onClose()
  }

  const handleSetDayOfWeek = (dayOfWeek: number) => {
    // convert day-of-week to a proper date
    setInvoiceTime(moment().startOf('week').add(dayOfWeek, 'days').toISOString())
  }

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>
        Edit the date you get auto invoiced for payroll
      </DialogTitle>

      <DialogContent>
        <div style={{ paddingBottom: 12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogContentText style={{ margin: 0 }}>
                The auto invoice date is the date on which Flexhire automatically generates an invoice, including all approved payroll items, which you can then pay.
                It normally takes 3 to 5 days for us to receive the funds and pay your team.
                Choose between weekly, bi-weekly or monthly auto invoicing.
              </DialogContentText>
            </Grid>

            <Grid item xs={12}>
              <InputGroup>
                <SelectField
                  label="Schedule"
                  name="schedule"
                  value={invoiceSchedule}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInvoiceSchedule(e.target.value)}
                >
                  <MenuItem value="weekly" data-cy="weekly">
                    Weekly
                  </MenuItem>

                  <MenuItem value="biweekly" data-cy="biweekly">
                    Bi-Weekly
                  </MenuItem>

                  <MenuItem value="monthly" data-cy="monthly">
                    Monthly
                  </MenuItem>
                </SelectField>

                <InputGroupConnector>
                  <Condition condition={invoiceSchedule !== 'monthly'}>
                    on every
                  </Condition>

                  <Condition condition={invoiceSchedule === 'monthly'}>
                    starting with
                  </Condition>
                </InputGroupConnector>

                <Condition condition={invoiceSchedule !== 'monthly'}>
                  <SelectField
                    value={invoiceTimeDayOfWeek}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSetDayOfWeek(e.target.value as unknown as number)}
                    name="day-of-week"
                  >
                    <MenuItem value={1}>
                      Monday
                    </MenuItem>

                    <MenuItem value={2}>
                      Tuesday
                    </MenuItem>

                    <MenuItem value={3}>
                      Wednesday
                    </MenuItem>

                    <MenuItem value={4}>
                      Thursday
                    </MenuItem>

                    <MenuItem value={5}>
                      Friday
                    </MenuItem>
                  </SelectField>
                </Condition>

                <Condition condition={invoiceSchedule === 'monthly'}>
                  <DatePicker
                    disablePast
                    fullWidth={false}
                    value={invoiceTime}
                    onChange={newTime => setInvoiceTime(newTime as string)}
                  />
                </Condition>
              </InputGroup>
            </Grid>

            <GridExpandable item xs={12} expand={invoiceSchedule === 'monthly'}>
              <InputGroup>
                <CheckboxField
                  fullWidth
                  label="Include any fixed monthly salaries before month end"
                  input={{
                    name: 'salary-in-advance',
                    value: salaryInAdvance,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSalaryInAdvance(e.target.checked),
                  }}
                  meta={{}}
                />

                <InputGroupHelpButton title="Monthly salaries before month end">
                  If this field is enabled, any monthly salaries associated with the current month will be included in your invoice.
                  This can be helpful if you want to ensure any team members on fixed monthly salary get paid by the end of the month as it normally takes 3-5 days for us to receive bank transfers from you.
                  For example, if you selected your auto invoicing to run on the 23th of every month, all fixed monthly salaries would be included in the invoice and if you paid it immediately your team members should receive payment by the month end.
                </InputGroupHelpButton>
              </InputGroup>
            </GridExpandable>

            <Grid item xs={12}>
              <InfoMessage data-cy="settings-explanation">
                Based on your settings, the next auto invoice date is {formatAsDate(invoiceTime)}, and then repeated {invoiceSchedule}
              </InfoMessage>
            </Grid>
          </Grid>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleSave} color="secondary" data-cy="save">
          Save
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default React.memo(AutoInvoiceEditDialog)
