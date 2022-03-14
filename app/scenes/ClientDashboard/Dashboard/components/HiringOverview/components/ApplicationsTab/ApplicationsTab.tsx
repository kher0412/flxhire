import React from 'react'
import { Grid } from '@material-ui/core'
import { getContractStatus } from 'services/contract'
import { UserAvatar } from 'components'
import { IAPIError, IContractForClient } from 'types'
import { buildQueryParams } from 'services/router'
import { InfoOutlined } from '@material-ui/icons'
import DataCard from '../../../DataCard'
import ViewAllButton from '../../../ViewAllButton'
import styles from '../../HiringOverview.module.css'

export interface IApplicationsTabProps {
  applications: IContractForClient[]
  loading: boolean
  error?: IAPIError
}

export default class ApplicationsTab extends React.Component<IApplicationsTabProps> {
  render() {
    const { applications = [], loading, error } = this.props

    return (
      <Grid container spacing={2} className={styles.list}>
        {loading && (
          <Grid item xs={12} md={4}>
            <DataCard error={error} />
          </Grid>
        )}

        {loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard loading />
          </Grid>
        )}

        {!error && applications.slice(0, 3).map(application => (
          <Grid key={application.id} item xs={12} md={3}>
            <DataCard
              data-cy="application-item"
              title={application.freelancer_first_name}
              text={getContractStatus(application)}
              highlighted={application.status === 'job_application_sent' && (!application.requests_status || application.requests_status === 'completed')}
              icon={(
                <UserAvatar
                  name={application.freelancer_first_name}
                  url={application.freelancer.avatar_url}
                />
              )}
              href={`/client/hire?${buildQueryParams({ focus: application.freelancer.profile.slug, tab: 'applicants', job: application.job_slug })}`}
            />
          </Grid>
        ))}

        {!error && applications.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No applications yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton href="/client/hire?tab=applicants" />
        </Grid>
      </Grid>
    )
  }
}
