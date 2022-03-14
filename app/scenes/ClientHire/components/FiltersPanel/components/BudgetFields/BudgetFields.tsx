import React from 'react'
import { NumberField, SelectField } from 'components/themed'
import { MenuItem, Grid } from '@material-ui/core'
import { HireMembersFilters } from 'scenes/ClientHire/Hire'

export interface IBudgetFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void
  disabled?: boolean
}

const BudgetFields = (props: IBudgetFieldsProps) => {
  const { filterParams = {}, setFilterParam, disabled } = props
  const freelanceOnly = filterParams?.positionTypes === 'freelancer'
  const permOnly = filterParams?.positionTypes === 'permanent'

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectField
          label="Position Types"
          fullWidth
          value={filterParams.positionTypes || 'both'}
          disabled={disabled}
          onChange={e => setFilterParam('positionTypes', e.target.value)}
          data-cy="select-position_types"
        >
          <MenuItem value="both" data-cy="both">
            Freelance & Permanent
          </MenuItem>

          <MenuItem value="freelancer" data-cy="freelancer">
            Freelance Only
          </MenuItem>

          <MenuItem value="permanent" data-cy="permanent">
            Permanent Only
          </MenuItem>
        </SelectField>
      </Grid>

      {!permOnly && (
        <Grid item xs={12}>
          <NumberField
            name="max_rate"
            numDecimals={0}
            disabled={disabled}
            label="Freelance Rate Max"
            startAdornment="$"
            endAdornment="/hr"
            fullWidth
            value={filterParams.maxClientRate}
            onChange={value => setFilterParam('maxClientRate', value)}
          />
        </Grid>
      )}

      {!freelanceOnly && (
        <Grid item xs={12}>
          <NumberField
            name="max_annual_compensation"
            numDecimals={0}
            disabled={disabled}
            label="Permanent Salary Max"
            startAdornment="$"
            endAdornment="/yr"
            fullWidth
            value={filterParams.maxAnnualCompensation}
            onChange={value => setFilterParam('maxAnnualCompensation', value)}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default BudgetFields
