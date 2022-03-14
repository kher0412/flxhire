import { Suspense, PagePlaceholder } from 'components'
import { useCurrentUser } from 'hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { Screening_Firm$key } from '__generated__/Screening_Firm.graphql'
import { Fragment } from 'react'
import { RelayPagination, Box } from 'components/themed'
import { Chip, Grid } from '@material-ui/core'
import Application from '../Application'
import styles from '../../Hire.module.css'
import FilteredOutInfo from '../FilteredOutInfo'
import { HireMembersFilters, prepareMembersFilters, isContractStatusFilterValid } from '../../Hire'

const prepareScreeningFilters: typeof prepareMembersFilters = (filters, userId) => prepareMembersFilters({
  ...filters,
  contractStatus: isContractStatusFilterValid(filters.contractStatus, 'screening') ? filters.contractStatus : null,
}, userId)

interface IScreeningProps {
  firm: Screening_Firm$key
  filters: HireMembersFilters
  selectedJob: { id: string }
  clearFilters: () => void
  adminMode?: boolean
}

const Screening = ({ firm, clearFilters, filters, selectedJob, adminMode }: IScreeningProps) => {
  const [user] = useCurrentUser()
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment Screening_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "CandidatesFilters" }
      )
      @refetchable(queryName: "Screening_applications")
      {
        screening(filters: $filters) {
          filteredOutIds
          filteredOutCount
          applications(first: $count, after: $cursor) @connection(key: "Screening_applications") {
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

  const results = data?.screening?.applications?.edges?.map(e => e.node) || []
  const hasContent = results?.length > 0
  const firstFilteredOutIndex = results?.findIndex(item => data?.screening?.filteredOutIds?.indexOf(item?.rawId) >= 0) ?? -1
  const matchesFilterList = firstFilteredOutIndex >= 0 ? results.slice(0, firstFilteredOutIndex) : results
  const filteredOutList = firstFilteredOutIndex >= 0 ? results.slice(firstFilteredOutIndex) : []
  const filteredOutCount = data?.screening?.filteredOutCount || 0

  return (
    <Fragment>
      <FilteredOutInfo
        clearFilters={clearFilters}
        totalCount={data?.screening?.applications?.totalCount}
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
                adminMode={adminMode}
                hideJob={Boolean(selectedJob)}
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
            {filteredOutList?.map(item => (
              <Suspense>
                <Grid item xs={12}>
                  <Application
                    contract={item}
                    filteredOut
                    filterParams={filters}
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
          title="No applicants in screening yet"
          subtitle="You can screen applicants from the Applications tab."
        />
      )}

      <Box>
        <RelayPagination
          perPage={25}
          currentCount={results?.length || 0}
          totalCount={data?.screening?.applications?.totalCount}
          filters={prepareScreeningFilters(filters, user?.id)}
          {...pagination}
        />
      </Box>
    </Fragment>
  )
}

export default Screening
