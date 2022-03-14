import React from 'react'
import { Grid } from '@material-ui/core'
import { IAPIError, IJob } from 'types'
import { Tags, Tag } from 'components'
import { InfoOutlined, Work } from '@material-ui/icons'
import DataCard from '../../../DataCard'
import ViewAllButton from '../../../ViewAllButton'
import styles from '../../HiringOverview.module.css'

export interface IJobsTabProps {
  jobs: IJob[]
  loading: boolean
  error?: IAPIError
}

export default class JobsTab extends React.Component<IJobsTabProps> {
  render() {
    const { jobs = [], loading, error } = this.props

    return (
      <Grid container spacing={2} className={styles.list}>
        {error && (
          <Grid item xs={12} md={4}>
            <DataCard error={error} />
          </Grid>
        )}

        {loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard loading />
          </Grid>
        )}

        {!error && jobs.slice(0, 2).map(job => (
          <Grid key={job.id} item xs={12} md={4}>
            <DataCard
              data-cy="job-item"
              title={job.title}
              text={(
                <React.Fragment>
                  <Tags>
                    <Tag>
                      <strong>{job.candidates_count}</strong> Candidate{job.candidates_count !== 1 && 's'}
                    </Tag>

                    <Tag>
                      <strong>{job.direct_applications_count}</strong> Application{job.direct_applications_count !== 1 && 's'}
                    </Tag>
                  </Tags>
                </React.Fragment>
              )}
              icon={<Work />}
              href="/[...slugs]"
              as={`/${job.firm_slug}/${job.slug}`}
            />
          </Grid>
        ))}

        {jobs.length === 0 && !loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No jobs yet"
              text="Create one to start hiring"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          {jobs.length === 0 && (
            <ViewAllButton
              href="/client/job/add_job/job"
              label="Post Job"
            />
          )}

          {jobs.length > 0 && (
            <ViewAllButton
              href="/client/hire"
              as="/client/hire?tab=jobs"
              data-cy="view-all-jobs"
            />
          )}
        </Grid>
      </Grid>
    )
  }
}
