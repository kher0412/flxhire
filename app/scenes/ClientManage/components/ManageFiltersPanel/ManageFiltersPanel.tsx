import React, { Fragment, useCallback } from 'react'
import { MenuItem, Grid, Typography } from '@material-ui/core'
import { ResponsiveButton } from 'components'
import { SelectField, TextField, AutoCompleteChipInput, Box } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { ManageFiltersPanel_Firm$key } from '__generated__/ManageFiltersPanel_Firm.graphql'
import { ChevronLeft, ClearAll } from '@material-ui/icons'
import { INVOICE_STATUSES } from '../../Manage'
import { IManageFilterParams, IManageTab } from '../../ManageDucks'
import { ContainerProps } from './ManageFiltersPanelContainer'
import ManagerFilter from './components/ManagerFilter'
import TagFilter from './components/TagFilter'
import DateFilter from './components/DateFilter'

export interface IManageFiltersPanelProps {
  firm: ManageFiltersPanel_Firm$key
  onClose: () => void
  tab: IManageTab
  disableStatusFilter?: boolean
}

const ManageFiltersPanel = (props: IManageFiltersPanelProps & ContainerProps) => {
  const { firm: firmProp, clearFilterParams, onClose, tab, setFilter, filterParams, disableStatusFilter } = props

  const firm = useFragment(graphql`
    fragment ManageFiltersPanel_Firm on Firm {
      tags {
        rawId
        name
      }
      jobs(first: 20) {
        edges {
          node {
            id
            rawId
            title
          }
        }
      }
      skills {
        rawId
        name
      }
      ...ManagerFilter_Firm
    }
  `, firmProp)

  const tags = firm?.tags?.map(t => ({ id: t.rawId, name: t.name })) || []
  const jobs = firm?.jobs?.edges?.map(e => e.node) || []
  const skills = firm?.skills?.map(s => ({ id: s.rawId, name: s.name })) || []
  const setFilters = useCallback((values: IManageFilterParams) => (Object.keys(values) as (keyof IManageFilterParams)[]).map(k => setFilter(k, values[k])), [setFilter])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Filter by:
          </Typography>
        </Grid>

        {tab === 'team' && (
          <Fragment>
            <Grid item xs={12}>
              <SelectField
                fullWidth
                disabled={disableStatusFilter}
                value={filterParams.contractsStatus || undefined}
                onChange={e => setFilter('contractsStatus', e.target.value)}
                name="status"
                data-cy="select-status"
                label="Contract status"
              >
                <MenuItem value={null} data-cy="select-status-option-">
                  All contracts
                </MenuItem>

                <MenuItem value="active" data-cy="select-status-option-active">
                  Active contracts
                </MenuItem>

                <MenuItem value="paused" data-cy="select-status-option-paused">
                  Paused contracts
                </MenuItem>

                <MenuItem value="expired" data-cy="select-status-option-expired">
                  Expired contracts
                </MenuItem>
              </SelectField>
            </Grid>

            <ManagerFilter onChange={val => setFilter('clientId', val)} value={filterParams.clientId} firm={firm} />

            <Grid item xs={12}>
              <SelectField
                fullWidth
                value={filterParams.jobId || null}
                onChange={event => setFilter('jobId', event.target.value)}
                data-cy="select-filter-by-job"
                label="Job"
              >
                {[
                  <MenuItem value={undefined} data-cy="select-filter-by-job-option-">All jobs</MenuItem>,
                ].concat(jobs.map(job => (
                  <MenuItem
                    value={job.id}
                    key={job.id}
                    data-cy={`select-filter-by-job-option-${job.rawId}`}
                  >
                    {job.title}
                  </MenuItem>
                )))}
              </SelectField>
            </Grid>
            <TagFilter onChange={val => setFilter('tags', val)} value={filterParams.tags} tags={tags} />
            <Grid item xs={12}>
              <AutoCompleteChipInput
                input={{
                  name: 'filter-by-skill',
                  value: filterParams.skills,
                  onChange: value => setFilter('skills', value || []),
                }}
                suggestions={skills}
                label="Skills"
                fullWidth
              />
            </Grid>
          </Fragment>
        )}

        {tab === 'invoices' && (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={filterParams.name || ''}
                onChange={e => setFilter('name', e.target.value)}
                label="Name"
                name="filter-by-name"
              />
            </Grid>

            <DateFilter tab={tab} setFilters={setFilters} filterParams={filterParams} />
            <Grid item xs={12}>
              <SelectField
                fullWidth
                value={filterParams.invoicesStatus || ''}
                onChange={e => setFilter('invoicesStatus', e.target.value)}
                name="status"
                label="Status"
              >
                {[
                  <MenuItem value="" data-cy="select-status-option-">All invoices</MenuItem>,
                ].concat(
                  INVOICE_STATUSES.map(entry => (
                    <MenuItem
                      value={entry.value}
                      key={entry.value}
                      data-cy={`select-status-option-${entry.value}`}
                    >
                      {entry.display}
                    </MenuItem>
                  )),
                )}
              </SelectField>
            </Grid>

            <ManagerFilter onChange={val => setFilter('clientId', val)} value={filterParams.clientId} firm={firm} />

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Invoice No."
                name="invoiceNo"
                onChange={event => setFilter('invoiceNo', event.target.value)}
                value={`${filterParams.invoiceNo || ''}`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="total"
                label="Max. total"
                onChange={event => setFilter('total', event.target.value)}
                value={`${filterParams.total || ''}`}
              />
            </Grid>
          </Fragment>
        )}

        <Grid item xs={12}>
          {onClose && (
            <ResponsiveButton
              onClick={onClose}
              data-cy="close-filters"
              icon={<ChevronLeft />}
              iconSide="left"
              label="Close"
              mobileLabel="Close"
            />
          )}

          <ResponsiveButton
            onClick={clearFilterParams}
            data-cy="clear-filters"
            icon={<ClearAll />}
            label="Clear all filters"
            mobileLabel="Clear"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ManageFiltersPanel
