import { Suspense, PagePlaceholder } from 'components'
import { useCurrentUser } from 'hooks'
import { graphql, useFragment, usePaginationFragment } from 'react-relay'
import { Applications_Firm$key } from '__generated__/Applications_Firm.graphql'
import { Applications_Job$key } from '__generated__/Applications_Job.graphql'
import { Fragment } from 'react'
import { RelayPagination, Box } from 'components/themed'
import { Chip, Grid } from '@material-ui/core'
import Application from '../Application'
import styles from '../../Hire.module.css'
import FilteredOutInfo from '../FilteredOutInfo'
import { HireMembersFilters, isContractStatusFilterValid, prepareMembersFilters } from '../../Hire'

const prepareApplicationsFilters: typeof prepareMembersFilters = (filters, userId) => prepareMembersFilters({
  ...filters,
  contractStatus: isContractStatusFilterValid(filters.contractStatus, 'applicants') ? filters.contractStatus : null,
}, userId)

interface IApplicationsProps {
  firm: Applications_Firm$key
  selectedJob: Applications_Job$key
  filters: HireMembersFilters
  clearFilters: () => void
  adminMode?: boolean
}

const Applications = ({ firm, selectedJob: selectedJobProp, filters, clearFilters, adminMode }: IApplicationsProps) => {
  const [user] = useCurrentUser()
  const selectedJob = useFragment(graphql`
    fragment Applications_Job on Job {
      autoSendScreeningRequests
    }
  `, selectedJobProp)
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment Applications_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "CandidatesFilters" }
      )
      @refetchable(queryName: "Applications_applications")
      {
        applications(filters: $filters) {
          filteredOutIds
          filteredOutCount
          applications(first: $count, after: $cursor) @connection(key: "Applications_applications") {
            __id
            totalCount
            edges {
              node {
                id
                rawId
                ...Application_Contract
              }
            }
          }
        }
      }
  `, firm)

  const results = data?.applications?.applications?.edges?.map(e => e.node) || []
  const hasContent = results?.length > 0
  const firstFilteredOutIndex = results?.findIndex(item => data?.applications?.filteredOutIds?.indexOf(item?.rawId) >= 0) ?? -1
  const matchesFilterList = firstFilteredOutIndex >= 0 ? results.slice(0, firstFilteredOutIndex) : results
  const filteredOutList = firstFilteredOutIndex >= 0 ? results.slice(firstFilteredOutIndex) : []
  const filteredOutCount = data?.applications?.filteredOutCount || 0

  return (
    <Fragment>
      <FilteredOutInfo
        clearFilters={clearFilters}
        totalCount={data?.applications?.applications?.totalCount}
        filteredOutCount={filteredOutCount}
      />

      <Grid container spacing={3} data-cy="result-list">
        {matchesFilterList?.map(item => (
          <Suspense key={item.id}>
            <Grid item xs={12}>
              <Application
                contract={item}
                filteredOut={false}
                filterParams={filters}
                connectionId={data?.applications?.applications?.__id}
                hideJob={Boolean(selectedJob)}
                adminMode={adminMode}
              />
            </Grid>
          </Suspense>
        ))}
      </Grid>

      {filteredOutList.length > 0 && (
        <Fragment>
          {matchesFilterList.length > 0 && (
            <div className={styles['divider-container']} data-cy="filter-divider">
              <div className={styles.divider} />
              <Chip label="The following applications don't match applied filters" />
              <div className={styles.divider} />
            </div>
          )}

          <Grid container spacing={3} data-cy="filtered-out-list">
            {filteredOutList.map(item => (
              <Suspense>
                <Grid item xs={12}>
                  <Application
                    contract={item}
                    filteredOut
                    filterParams={filters}
                    connectionId={data?.applications?.applications?.__id}
                    hideJob={Boolean(selectedJob)}
                  />
                </Grid>
              </Suspense>
            ))}
          </Grid>
        </Fragment>
      )}

      {!hasContent && (
        <PagePlaceholder
          raised
          title="No applicants to screen yet"
          subtitle={selectedJob?.autoSendScreeningRequests ?
            'Auto Screening is enabled for this position. New applicants will automatically be moved to the Screening tab.' :
            'You can notify candidates to invite them to apply.'}
        />
      )}

      <Box>
        <RelayPagination
          perPage={25}
          currentCount={results?.length || 0}
          totalCount={data?.applications?.applications?.totalCount}
          filters={prepareApplicationsFilters(filters, user?.id)}
          {...pagination}
        />
      </Box>
    </Fragment>
  )
}

export default Applications
