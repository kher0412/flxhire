import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Grid, MenuItem, Typography, Divider } from '@material-ui/core'
import { Condition } from 'components'
import { Button, NumberField, SelectField, TextField, Box } from 'components/themed'
import { ExpensesFilters_Firm$key } from '__generated__/ExpensesFilters_Firm.graphql'
import { IExpensesFilters } from '../ExpensesTab'
import { ChevronLeft } from '@material-ui/icons'

export interface IExpensesFiltersProps {
  firmFragmentRef: ExpensesFilters_Firm$key
  filterParams: IExpensesFilters
  setFilterParams: (params: Partial<IExpensesFilters>) => void
  onClose: () => void
}

const ExpensesFilters: React.FunctionComponent<IExpensesFiltersProps> = (props: IExpensesFiltersProps) => {
  const { firmFragmentRef, filterParams, setFilterParams, onClose } = props

  const firm = useFragment(graphql`
    fragment ExpensesFilters_Firm on Firm {
      users {
        id
        name
      }
    }
  `, firmFragmentRef)

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
            value={filterParams.name || null}
            onChange={e => setFilterParams({ name: e.target.value || undefined })}
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

            <MenuItem value="approved" data-cy="select-status-option-approved">
              Approved
            </MenuItem>

            <MenuItem value="submitted" data-cy="select-status-option-submitted">
              Submitted
            </MenuItem>

            <MenuItem value="paid" data-cy="select-status-option-paid">
              Paid
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
            name="invoice"
            label="Invoice #"
            fullWidth
            nullable
            value={filterParams.invoiceNum || null}
            onChange={value => setFilterParams({ invoiceNum: value || undefined })}
          />
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

export default ExpensesFilters
