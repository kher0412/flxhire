import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { useDebouncedEffect } from 'hooks'
import { TextField, Button, AutoCompleteTextField, SelectField } from 'components/themed'
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, MenuItem } from '@material-ui/core'
import { IUserStatus, IContractStatus } from 'types'
import { getHumanizedStatusMap } from 'services/contract'
import { IMembersPipelineFilters } from '../MembersPipeline'

export interface IFiltersPanelProps {
  setFilter: (name: keyof IMembersPipelineFilters, value: any) => void
  clearFilters: () => void
  onClose?: () => void
  filters: Partial<IMembersPipelineFilters>
}

async function getJobSuggestions(name: string) {
  try {
    const jobs = await getAPIClient().getJobs({ search: name, page: 1, per_page: 5 })
    return jobs.map(j => `${j.title} | ${j.company_name}`)
  } catch (error) {
    trackError(error)
    return []
  }
}

function cleanJobTitle(title: string) {
  return title.split('|')[0].trim()
}

export type IContractStatusMembersPipeline = IContractStatus | 'screening_incomplete'

const statuses: IUserStatus[] = ['pending', 'unverified', 'applying', 'applied', 'interview', 'accepted', 'rejected']
const contractStatuses = {
  ...getHumanizedStatusMap(),
  screening_incomplete: 'Screening Incomplete',
}

const FiltersPanel = (props: IFiltersPanelProps) => {
  const { filters, setFilter, clearFilters, onClose } = props

  const [name, setName] = useState(filters.name || '')
  useDebouncedEffect(() => { setFilter('name', name) }, 400, [name])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          label="Name"
        />
      </Grid>
      <Grid item xs={12}>
        <SelectField
          value={filters.actionableOnly}
          onChange={event => setFilter('actionableOnly', event.target.value === 'true')}
          fullWidth
          label="Admin Actionability"
        >
          <MenuItem value="false" data-cy="no">All Profiles</MenuItem>
          <MenuItem value="true" data-cy="true">Only Actionable Profiles</MenuItem>
        </SelectField>
      </Grid>
      <Grid item xs={12}>
        <SelectField
          value={filters.status}
          onChange={event => setFilter('status', event.target.value)}
          fullWidth
          label="Status"
        >
          <MenuItem value={null} data-cy="all">Any</MenuItem>
          {statuses.map(status => <MenuItem value={status} data-cy={status}>{capitalize(status)}</MenuItem>)}
        </SelectField>
      </Grid>
      <Grid item xs={12}>
        <SelectField
          value={filters.contractStatus}
          onChange={event => setFilter('contractStatus', event.target.value)}
          fullWidth
          label="Contract Status"
        >
          <MenuItem value={null} data-cy="all">Any</MenuItem>
          {Object.keys(contractStatuses).map(status => <MenuItem value={status} data-cy={status}>{contractStatuses[status]}</MenuItem>)}
        </SelectField>
      </Grid>
      <Grid item xs={12}>
        <AutoCompleteTextField
          input={{
            name: 'jobTitle',
            value: filters.jobTitle,
            onChange: value => setFilter('jobTitle', cleanJobTitle(value)),
          }}
          meta={{ error: null, touched: false }}
          getSuggestions={getJobSuggestions}
          label="Job"
        />
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary="Hidden Only"
              secondary="Show only hidden Profiles"
              style={{ maxWidth: '80%' }}
            />

            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                edge="end"
                checked={filters.hiddenOnly || false}
                onChange={e => setFilter('hiddenOnly', e.target.checked)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        {onClose && <Button onClick={onClose}>Close</Button>}
        <Button onClick={clearFilters}>Clear</Button>
      </Grid>
    </Grid>
  )
}

export default FiltersPanel
