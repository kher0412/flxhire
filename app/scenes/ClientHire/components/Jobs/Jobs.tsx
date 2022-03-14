import { Card, Grid } from '@material-ui/core'
import { Link, PagePlaceholder, Suspense } from 'components'
import { usePaginationFragment, graphql } from 'react-relay'
import { Button, RelayPagination, Box } from 'components/themed'
import { Fragment } from 'react'
import { Jobs_Firm$key } from '__generated__/Jobs_Firm.graphql'
import { HireJobsPaginationQuery } from '__generated__/HireJobsPaginationQuery.graphql'
import { AddCircle } from '@material-ui/icons'
import { HireJobsFilters, IHireTab } from '../../Hire'
import styles from '../../Hire.module.css'
import Job from './Job'

interface IJobsProps {
  firm: Jobs_Firm$key
  filters: HireJobsFilters
  setSelectedJob: (slug: string) => void
  setTab: (tab: IHireTab) => void
}

const Jobs = ({ firm, setSelectedJob, setTab, filters }: IJobsProps) => {
  const { data, ...pagination } = usePaginationFragment<HireJobsPaginationQuery, Jobs_Firm$key>(graphql`
    fragment Jobs_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "JobsFilters" }
      )
      @refetchable(queryName: "HireJobsPaginationQuery")
      {
        jobs(first: $count, after: $cursor, filters: $filters) @connection(key: "Jobs_jobs") {
          totalCount
          edges {
            node {
              id
              ...Job_Job
            }
          }
        }
      }
  `, firm)
  const hasFirm = Boolean(firm)
  const jobs = data?.jobs?.edges?.map(e => e.node) || []

  return (
    <Fragment>
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Suspense key={job.id}>
            <Grid item xs={12}>
              <Card variant="outlined" elevation={0}>
                <div className={styles.item}>
                  <Job job={job} setTab={setTab} setSelectedJob={setSelectedJob} />
                </div>
              </Card>
            </Grid>
          </Suspense>
        ))}
      </Grid>

      {jobs.length === 0 && hasFirm && (
        <PagePlaceholder
          raised
          title="No jobs posted yet"
          subtitle="Create a job posting now and start hiring immediately."
          action={(
            <Button color="primary" muiComponent={Link} href="/client/job/add_job/job" style={{ textDecoration: 'none' }}>
              <AddCircle style={{ marginRight: 12 }} /> Post a job
            </Button>
            )}
        />
      )}

      {jobs.length === 0 && !hasFirm && (
        <PagePlaceholder
          raised
          title="No company selected"
          subtitle="Select a company to view jobs"
        />
      )}

      <Box>
        <RelayPagination
          totalCount={data?.jobs?.totalCount}
          currentCount={jobs.length}
          filters={filters}
          {...pagination}
        />
      </Box>
    </Fragment>
  )
}

export default Jobs
