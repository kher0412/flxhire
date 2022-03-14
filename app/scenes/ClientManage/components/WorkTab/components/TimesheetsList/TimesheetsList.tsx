import React from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Card, Grid, Table, TableBody } from '@material-ui/core'
import { Condition, PagePlaceholder } from 'components'
import { Box, RelayPagination } from 'components/themed'
import { TimesheetsList_Firm$key } from '__generated__/TimesheetsList_Firm.graphql'
import { useComponentBounds } from 'hooks/useComponentBounds'
import TimesheetCard from '../TimesheetCard'
import TimesheetRow from '../TimesheetRow'
import styles from './TimesheetsList.module.css'
import { IWorkTabFilters } from '../../WorkTab'
import SortableColumn from '../SortableColumn'

interface ITimesheetsTabProps {
  firmFragmentRef: TimesheetsList_Firm$key
  sortBy: (orderBy: string, order: 'asc' | 'desc') => void
  filters: Partial<IWorkTabFilters>
  emptyFilters: boolean
}

const TimesheetsList = ({ firmFragmentRef, sortBy, filters, emptyFilters }: ITimesheetsTabProps) => {
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment TimesheetsList_Firm on Firm
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 10 },
      cursor: { type: "String" },
      filters: { type: "TimesheetsFilters" },
    )
    @refetchable(queryName: "TimesheetList_timesheets")
    {
      timesheets(first: $count, after: $cursor, filters: $filters) @connection(key: "TimesheetList_timesheets") {
        __id
        totalCount
        edges {
          node {
            id
            ...TimesheetCard_Timesheet
            ...TimesheetRow_Timesheet
          }
        }
      }
    }
  `, firmFragmentRef)

  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const totalCount = data?.timesheets?.totalCount || 0

  return (
    <React.Fragment>
      <Condition condition={!totalCount && emptyFilters}>
        <PagePlaceholder
          raised
          title="No work reports yet"
          subtitle="Once your team starts creating and submitting work reports, you'll see them here."
        />
      </Condition>

      <Condition condition={!totalCount && !emptyFilters}>
        <PagePlaceholder
          raised
          title="No work reports found"
          subtitle="Try clearing your filters."
        />
      </Condition>

      <div ref={boundsRef}>
        <Condition condition={totalCount > 0}>
          <Condition condition={bounds.width < 860}>
            <div className={styles.container} data-cy="timesheets-list">
              <Grid container spacing={1}>
                {data?.timesheets?.edges?.map(edge => (
                  <Grid key={edge?.node?.id} item xs={12}>
                    <TimesheetCard timesheetFragmentRef={edge?.node} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Condition>

          <Condition condition={bounds.width >= 860}>
            <Card variant="outlined" elevation={0}>
              <Table className={styles.table}>
                <TableHead>
                  <TableRow className={styles.hrow}>
                    <TableCell>
                      <SortableColumn
                        columnName="freelancer_name"
                        name="Name"
                        sortBy={sortBy}
                        orderBy={filters.sortBy}
                        order={filters.order}
                      />
                    </TableCell>

                    <TableCell>
                      <SortableColumn
                        columnName="start_date"
                        name="Dates"
                        sortBy={sortBy}
                        orderBy={filters.sortBy}
                        order={filters.order}
                      />
                    </TableCell>

                    <TableCell>
                      Submitted at
                    </TableCell>

                    <TableCell>
                      Hours
                    </TableCell>

                    <TableCell>
                      Total
                    </TableCell>

                    <TableCell>
                      <SortableColumn
                        columnName="invoice_num"
                        name="Invoice #"
                        sortBy={sortBy}
                        orderBy={filters.sortBy}
                        order={filters.order}
                      />
                    </TableCell>

                    <TableCell>
                      Status
                    </TableCell>

                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody data-cy="timesheets-table-body">
                  {data?.timesheets?.edges?.map(edge => (
                    <TimesheetRow key={edge?.node?.id} isMediumSmallMode={bounds.width < 950} timesheetFragmentRef={edge?.node} />
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Condition>
        </Condition>

        <Box>
          <RelayPagination
            {...pagination}
            totalCount={totalCount}
            currentCount={data?.timesheets?.edges?.length}
            filters={filters}
          />
        </Box>
      </div>
    </React.Fragment>
  )
}

export default TimesheetsList
