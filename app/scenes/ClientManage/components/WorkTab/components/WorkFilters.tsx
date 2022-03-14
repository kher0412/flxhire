import React, { useCallback, useMemo } from 'react'
import { useFragment, graphql } from 'react-relay'
import { Grid, MenuItem, Typography } from '@material-ui/core'
import { Condition } from 'components'
import { Button, SelectField, TextField, Box } from 'components/themed'
import { ChevronLeft } from '@material-ui/icons'
import { TIMESHEET_CLIENT_STATUSES } from 'scenes/ClientManage/Manage'
import ManagerFilter from 'scenes/ClientManage/components/ManageFiltersPanel/components/ManagerFilter'
import TagFilter from 'scenes/ClientManage/components/ManageFiltersPanel/components/TagFilter'
import { ALL_TIMESHEETS_VALUE } from 'scenes/ClientManage/ManageDucks'
import InvoicesFilter from 'scenes/ClientManage/components/InvoicesFilter'
import { WorkFilters_Firm$key } from '__generated__/WorkFilters_Firm.graphql'
import DateFilter from 'scenes/ClientManage/components/ManageFiltersPanel/components/DateFilter'
import { DATE_FORMAT_INTERNAL } from 'services/formatting'
import moment from 'moment'
import { IWorkTabFilters } from '../WorkTab'

export interface IWorkFiltersProps {
  firmFragmentRef: WorkFilters_Firm$key
  filters: Partial<IWorkTabFilters>
  setFilter: (name: keyof IWorkTabFilters, value: IWorkTabFilters[keyof IWorkTabFilters]) => void
  setFilters: (values: Partial<IWorkTabFilters>) => void
  onClose?: () => void
}

function WorkFilters(props: IWorkFiltersProps) {
  const { firmFragmentRef, filters, setFilter, setFilters, onClose } = props

  const firm = useFragment(graphql`
    fragment WorkFilters_Firm on Firm {
      users {
        id
        name
      }
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
  `, firmFragmentRef)
  const tags = useMemo(() => firm?.tags?.map(t => ({ id: t.rawId, name: t.name })) || [], [firm?.tags])
  const setFiltersForDate = useCallback(({ fromDate, toDate }: { fromDate: Date, toDate: Date }) => setFilters({
    fromDate: fromDate ? moment(fromDate).format(DATE_FORMAT_INTERNAL) : null,
    toDate: toDate ? moment(toDate).format(DATE_FORMAT_INTERNAL) : null,
  }), [setFilters])
  const dateFilters = useMemo(() => (
    {
      fromDate: filters.fromDate ? moment(filters.fromDate).toDate() : null,
      toDate: filters.toDate ? moment(filters.toDate).toDate() : null,
    }
  ), [filters?.toDate, filters?.fromDate])

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
            value={filters.name}
            onChange={e => setFilter('name', e.target.value)}
          />
        </Grid>

        <DateFilter
          tab="work"
          setFilters={setFiltersForDate}
          filterParams={dateFilters}
        />

        <Grid item xs={12}>
          <SelectField
            fullWidth
            value={filters.clientStatus || ''}
            onChange={e => setFilter('clientStatus', e.target.value || null)}
            name="status"
            label="Status"
          >
            {[
              <MenuItem value="" data-cy="select-status-option-">All Work Reports</MenuItem>,
            ].concat(
              TIMESHEET_CLIENT_STATUSES.map(entry => (
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

        <ManagerFilter onChange={val => setFilter('clientRawId', val)} value={filters.clientRawId} firm={firm} />

        <TagFilter onChange={val => setFilter('tags', val)} value={filters.tags} tags={tags} />

        <Grid item xs={12}>
          <InvoicesFilter
            value={filters.invoiceNum || ALL_TIMESHEETS_VALUE}
            onChange={value => setFilter('invoiceNum', value)}
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

export default React.memo(WorkFilters)
