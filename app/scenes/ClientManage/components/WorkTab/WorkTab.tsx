import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Card, Grid } from '@material-ui/core'
import { Tune } from '@material-ui/icons'
import { loadFilters, useCurrentUser, useFilters, useSaveFilters } from 'hooks'
import { WorkTab_Query } from '__generated__/WorkTab_Query.graphql'
import { TimesheetsFilters } from '__generated__/TimesheetList_timesheets.graphql'
import { PageContent, PageLoadingIndicator, PageSidebar, PageSidebarButton } from 'components/Layouts/V3'
import { Box } from 'components/themed'
import { Condition, Suspense } from 'components'
import { usePageState } from 'hooks/usePageState'
import WorkFilters from './components/WorkFilters'
import TimesheetsList from './components/TimesheetsList'

export type IWorkTabFilters = TimesheetsFilters

// IMPORTANT: Increase this if something has changed in the format of the filterParams.
const FILTER_FORMAT_VERSION = 1
const FILTER_STORAGE_NAME = 'client_manage_work_filter_params'

function WorkTab() {
  const data = useLazyLoadQuery<WorkTab_Query>(
    graphql`
      query WorkTab_Query {
        firm {
          ...WorkFilters_Firm
          ...TimesheetsList_Firm
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const firm = data?.firm
  const { filters, setFilters, setFilter, isEmpty: emptyFilters, replaceFilters } = useFilters<IWorkTabFilters>({})
  const sortBy = useCallback((sortByColumn: string, order: 'asc' | 'desc') => setFilters({ sortBy: sortByColumn, order }), [setFilters, filters])
  const { pageSidebarHidden } = usePageState()
  const [user] = useCurrentUser()

  const filterOptions = {
    user,
    version: FILTER_FORMAT_VERSION,
    storageName: FILTER_STORAGE_NAME,
  }

  useEffect(() => {
    const loadedFilters = loadFilters(filterOptions)
    if (loadedFilters) {
      replaceFilters(loadedFilters)
    } else {
      replaceFilters({})
    }
  }, [])

  useSaveFilters<IWorkTabFilters>(filters, filterOptions)

  return (
    <Fragment>
      <PageSidebar sticky>
        <WorkFilters
          firmFragmentRef={data?.firm}
          filters={filters}
          setFilter={setFilter}
          setFilters={setFilters}
          onClose={undefined}
        />
      </PageSidebar>

      <PageContent maxWidth="xl">
        <Grid container spacing={1}>
          <Condition condition={pageSidebarHidden}>
            <Grid item xs={12}>
              <Card variant="outlined" elevation={0}>
                <Box variant="compact">
                  <PageSidebarButton>
                    <Tune /> Filters
                  </PageSidebarButton>
                </Box>
              </Card>
            </Grid>
          </Condition>

          <Grid item xs={12}>
            <Suspense fallback={<PageLoadingIndicator />}>
              <TimesheetsList
                firmFragmentRef={firm}
                sortBy={sortBy}
                filters={filters}
                emptyFilters={emptyFilters}
              />
            </Suspense>
          </Grid>
        </Grid>
      </PageContent>
    </Fragment>
  )
}

export default memo(WorkTab)
