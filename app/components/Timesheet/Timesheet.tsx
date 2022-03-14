import React from 'react'
import { Field, Fields, FieldArray } from 'redux-form'
import { Grid, MenuItem, Card, Typography } from '@material-ui/core'
import { getTotalCostForExpenses, getTotalCostForHours } from 'services/timesheets'
import { getHourlyRate } from 'services/contract'
import { Currency, IContractForFreelancer } from 'types'
import { SelectField, Box } from 'components/themed'
import { formatAsCurrency } from 'services/formatting'
import TimeWorkedFields from './components/TimeWorkedFields'
import ExpensesFields from './components/ExpensesFields'
import WeekBreakdownFields from './components/WeekBreakdownFields'
import styles from './Timesheet.module.css'

export interface ITimesheetProps {
  contracts?: (Pick<IContractForFreelancer, 'freelancer_rate' | 'rate_mode'> & { client: Pick<IContractForFreelancer['client'], 'id' | 'name'> })[]
  clientId?: number
  editable?: boolean
  hourlyRate?: number
  currency?: Currency
  actions?: React.ReactNode
  disableCardBorders: boolean // TODO: this can be removed when the member-side is also on the V3 layout
}

// TODO: this wrapper component can be removed when the member-side is also on the V3 layout
// it's only used to reduce some code duplication
function SectionCard(props: { noBorder: boolean, children: React.ReactNode }) {
  const { noBorder, children } = props

  return (
    <Card variant={noBorder ? 'elevation' : 'outlined'} elevation={0}>
      {children}
    </Card>
  )
}

export default class Timesheet extends React.PureComponent<ITimesheetProps> {
  render() {
    const { editable, contracts = [], clientId, hourlyRate, currency, actions, disableCardBorders } = this.props

    const contract = clientId ? contracts.find(c => c.client.id === clientId) : null
    const rate = hourlyRate || getHourlyRate(contract?.freelancer_rate, contract?.rate_mode)

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SectionCard noBorder={disableCardBorders}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Field
                      name="client_id"
                      label="Associated Manager"
                      component={SelectField}
                      editable={editable}
                      disabled={!editable}
                      fullWidth
                    >
                      {contracts.map(c => (
                        <MenuItem key={c.client.id} value={c.client.id}>
                          {c.client.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
              </Box>
            </SectionCard>
          </Grid>

          <Grid item xs={12}>
            <SectionCard noBorder={disableCardBorders}>
              <FieldArray
                name="timesheet_entries"
                component={TimeWorkedFields}
                editable={editable}
                rate={rate}
                currency={currency}
              />
            </SectionCard>
          </Grid>

          <Grid item xs={12}>
            <SectionCard noBorder={disableCardBorders}>
              <FieldArray
                name="expenses"
                component={ExpensesFields}
                editable={editable}
              />
            </SectionCard>
          </Grid>

          <Grid item xs={12}>
            <SectionCard noBorder={disableCardBorders}>
              <Field
                name="timesheet_entries"
                component={WeekBreakdownFields}
                editable={editable}
                currency={currency}
              />
            </SectionCard>
          </Grid>

          <Grid item xs={12}>
            <SectionCard noBorder={disableCardBorders}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Fields
                      names={['expenses', 'timesheet_entries']}
                      component={this.renderGrandTotal}
                      rate={rate}
                      currency={currency}
                    />
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <div className={styles.actions}>
                      {actions}
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  renderGrandTotal = ({ expenses, timesheet_entries, rate, currency }) => {
    const total = getTotalCostForHours(timesheet_entries.input.value, rate) + getTotalCostForExpenses(expenses.input.value || [])

    return (
      <div data-cy="grand-total" className={styles.total}>
        <Typography variant="body1">
          Grand Total: <strong>{formatAsCurrency(total, { currency, removeEmptyCents: false })}</strong>
        </Typography>
      </div>
    )
  }
}
