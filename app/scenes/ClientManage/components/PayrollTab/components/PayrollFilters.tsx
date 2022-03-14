import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Grid, MenuItem, Typography, Divider } from '@material-ui/core'
import { Condition } from 'components'
import { Button, NumberField, SelectField, TextField, Box } from 'components/themed'
import { PayrollFilters_Firm$key } from '__generated__/PayrollFilters_Firm.graphql'
import { ChevronLeft } from '@material-ui/icons'
import { IPayrollTabFilters } from '../PayrollTab'

export interface IPayrollFiltersProps {
  firmFragmentRef: PayrollFilters_Firm$key
  filterParams: IPayrollTabFilters
  setFilterParams: (params: Partial<IPayrollTabFilters>) => void
  onClose?: () => void
}

function PayrollFilters(props: IPayrollFiltersProps) {
  const { firmFragmentRef, filterParams, setFilterParams, onClose } = props

  const firm = useFragment(graphql`
    fragment PayrollFilters_Firm on Firm {
      users {
        id
        name
      }
    }
  `, firmFragmentRef)

  // this component kinda kicks off a new trend, where instead of having a single god-component,
  // with all filters mashed into an unfathomable mess, instead each tab takes care of its own filters panel
  // this should work nicely with the new double stacked sidebar layout in the future too
  // for now, the only downside is that mobile drawer UI logic has to be somewhat duplicated, although it's very little code
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Filter by:
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={filterParams.name}
            onChange={e => setFilterParams({ name: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectField
            name="type"
            label="Payroll Type"
            fullWidth
            value={filterParams.type || null}
            onChange={e => setFilterParams({ type: e.target.value })}
          >
            <MenuItem value={null} data-cy="select-type-option-all">
              All Types
            </MenuItem>

            <MenuItem value="timesheet" data-cy="select-type-option-timesheet">
              Work Report
            </MenuItem>

            <MenuItem value="salary" data-cy="select-type-option-salary">
              Monthly Salary
            </MenuItem>

            <MenuItem value="bonus" data-cy="select-type-option-bonus">
              Bonus Grant
            </MenuItem>
          </SelectField>
        </Grid>

        <Grid item xs={12}>
          <SelectField
            label="Manager"
            fullWidth
            value={filterParams.clientId || null}
            onChange={e => setFilterParams({ clientId: e.target.value })}
          >
            <MenuItem value={null}>
              Everyone
            </MenuItem>

            {firm?.users?.map(u => (
              <MenuItem key={u.id} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>

        <Grid item xs={12}>
          <NumberField
            label="Invoice #"
            fullWidth
            nullable
            value={filterParams.invoiceNum || null}
            onChange={value => setFilterParams({ invoiceNum: value || undefined })}
          />
        </Grid>

        <Grid item xs={12}>
          <SelectField
            name="status"
            label="Status"
            fullWidth
            value={filterParams.status || null}
            onChange={e => setFilterParams({ status: e.target.value })}
          >
            <MenuItem value={null} data-cy="select-status-option-all">
              All
            </MenuItem>

            <Divider />

            <MenuItem value="pending" data-cy="select-status-option-pending">
              Pending Invoicing
            </MenuItem>

            <MenuItem value="waiting" data-cy="select-status-option-waiting">
              Awaiting Payment
            </MenuItem>

            <MenuItem value="processing" data-cy="select-status-option-processing">
              Payment Processing
            </MenuItem>

            <MenuItem value="paid" data-cy="select-status-option-paid">
              Paid
            </MenuItem>
          </SelectField>
        </Grid>

        <Condition condition={Boolean(onClose)}>
          <Grid item xs={12}>
            <Button onClick={onClose} data-cy="close-filters">
              <ChevronLeft /> Close
            </Button>
          </Grid>
        </Condition>
      </Grid>
    </Box>
  )
}

export default React.memo(PayrollFilters)
