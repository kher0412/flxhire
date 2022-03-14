import { Suspense, PagePlaceholder, ExternalLink } from 'components'
import { useCurrentUser } from 'hooks'
import { graphql, useFragment, usePaginationFragment } from 'react-relay'
import { Candidates_Firm$key } from '__generated__/Candidates_Firm.graphql'
import { Candidates_Job$key } from '__generated__/Candidates_Job.graphql'
import { Fragment } from 'react'
import { Box, RelayPagination } from 'components/themed'
import { Info } from '@material-ui/icons'
import Freelancer from '../Freelancer'
import styles from '../../Hire.module.css'
import { HireMembersFilters, prepareMembersFilters } from '../../Hire'
import { Grid } from '@material-ui/core'

const prepareCandidatesFilters = (filters: HireMembersFilters, userId: number, adminMode: boolean) => prepareMembersFilters({
  ...filters,
  contractStatus: null,
  adminMode,
}, userId)

interface ICandidatesProps {
  firm: Candidates_Firm$key
  selectedJob: Candidates_Job$key
  filters: HireMembersFilters
  adminMode: boolean
}

const getItemKey = (contractId: string, freelancerId: string, jobId: string) => {
  if (contractId) return `contract_${contractId}`
  return `freelancer_${freelancerId}_${jobId || 'no_job'}`
}

const Candidates = ({ firm, selectedJob: selectedJobProp, filters, adminMode }: ICandidatesProps) => {
  const [user] = useCurrentUser()
  const selectedJob = useFragment(graphql`
    fragment Candidates_Job on Job {
      user {
        firm {
          slug
        }
      }
      slug
    }
  `, selectedJobProp)
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment Candidates_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "CandidatesFilters" }
      )
      @refetchable(queryName: "Candidates_candidates")
      {
        candidates(first: $count, after: $cursor, filters: $filters) @connection(key: "Candidates_candidates") {
          __id
          totalCount
          edges {
            node {
              id
              freelancer {
                id
                ...Freelancer_Freelancer
              }
              contract {
                id
                ...Freelancer_Contract
              }
              job {
                id
                user {
                  firm {
                    slug
                  }
                }
                ...Freelancer_Job
              }
            }
          }
        }
      }
  `, firm)

  const results = data?.candidates?.edges?.map(e => e.node) || []
  const hasContent = results?.length > 0
  const maxCandidates = user?.configuration?.max_candidates || 20

  return (
    <Fragment>
      <Grid container spacing={3} data-cy="result-list">
        {results?.map(item => (
          <Suspense key={getItemKey(item.contract?.id, item.freelancer?.id, item.job?.id)}>
            <Grid item xs={12}>
              <div className={styles.item}>
                <Freelancer
                  freelancer={item.freelancer}
                  contract={item.contract}
                  job={item.job}
                  filteredOut={false}
                  hideJob={Boolean(selectedJob)}
                  showFirm={item.job?.user?.firm?.slug !== user?.firm?.slug}
                  adminMode={adminMode}
                  connectionId={data?.candidates?.__id}
                />
              </div>
            </Grid>
          </Suspense>
        ))}
      </Grid>

      <Box>
        <RelayPagination
          perPage={25}
          currentCount={results?.length || 0}
          totalCount={data?.candidates?.totalCount}
          filters={prepareCandidatesFilters(filters, user?.id, adminMode)}
          {...pagination}
        />
      </Box>

      {!hasContent && (
        <PagePlaceholder
          raised
          title="No candidates available for this job at this time"
          subtitle={(
            <Fragment>
              We'll notify you when more candidates are available. Try adjusting your filters to see more results.
              <br />
              {selectedJob && (
                <Fragment>
                  <ExternalLink href={`${process.env.ROOT_URL}/${selectedJob.user?.firm?.slug || 'job'}/${selectedJob.slug}`} label="Share this job" /> to get more applicants.
                </Fragment>
              )}
            </Fragment>
          )}
        />
      )}

      <div className={styles.message}>
        <div className={styles['message-icon']}>
          <Info />
        </div>

        <div className={styles['message-text']}>
          Flexhire's intelligent candidate matching system optimizes the best candidates for your position from our thousands
          of profiles, based on current availability, skill set and experience. In order to streamline the hiring process and
          restrict over-loading our candidates with interview requests we limit all customers to viewing the top {maxCandidates} matches per week.
          If you don't want to interview a particular candidate above, choose Skip to see a new match next week.
        </div>
      </div>
    </Fragment>
  )
}

export default Candidates
