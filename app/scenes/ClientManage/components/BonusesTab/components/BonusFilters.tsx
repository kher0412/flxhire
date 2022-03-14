import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Grid, MenuItem, Typography, Divider } from '@material-ui/core'
import { Condition } from 'components'
import { Button, DatePicker, NumberField, SelectField, TextField, Box } from 'components/themed'
import { BonusFilters_Firm$key } from '__generated__/BonusFilters_Firm.graphql'
import { ChevronLeft } from '@material-ui/icons'
import { IBonusesTabFilters } from '../BonusesTab'

export interface IBonusFiltersProps {
  firmFragmentRef: BonusFilters_Firm$key
  filterParams: IBonusesTabFilters
  setFilterParams: (params: Partial<IBonusesTabFilters>) => void
  onClose?: () => void
}

function BonusFilters(props: IBonusFiltersProps) {
  const { firmFragmentRef, filterParams, setFilterParams, onClose } = props

  const firm = useFragment(graphql`
    fragment BonusFilters_Firm on Firm {
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
            value={filterParams.name}
            onChange={e => setFilterParams({ name: e.target.value })}
          />
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
          <DatePicker
            label="Date"
            fullWidth
            value={filterParams.date || null}
            onChange={value => setFilterParams({ date: value as string })}
          />
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
            value={filterParams.stage || null}
            onChange={e => setFilterParams({ stage: e.target.value })}
          >
            <MenuItem value={null} data-cy="select-status-option-all">
              All
            </MenuItem>

            <Divider />

            <MenuItem value="pending" data-cy="select-status-option-pending">
              Pending
            </MenuItem>

            <MenuItem value="approved" data-cy="select-status-option-approved">
              Awaiting Payment
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

export default React.memo(BonusFilters)
