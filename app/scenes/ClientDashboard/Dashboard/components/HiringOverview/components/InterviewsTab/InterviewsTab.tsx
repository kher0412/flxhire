import React from 'react'
import { Grid } from '@material-ui/core'
import { IAPIError, IContractForClient } from 'types'
import { getContractStatus } from 'services/contract'
import { UserAvatar } from 'components'
import { InfoOutlined } from '@material-ui/icons'
import DataCard from '../../../DataCard'
import ViewAllButton from '../../../ViewAllButton'
import styles from '../../HiringOverview.module.css'

export interface IInterviewsTabProps {
  interviews: IContractForClient[]
  loading: boolean
  error?: IAPIError
}

export default class InterviewsTab extends React.PureComponent<IInterviewsTabProps> {
  render() {
    const { interviews = [], loading, error } = this.props

    return (
      <Grid key="interviews" container spacing={2} className={styles.list}>
        {error && (
          <Grid item xs={12} md={4}>
            <DataCard error={error} />
          </Grid>
        )}

        {loading && (
          <Grid item xs={12} md={4}>
            <DataCard loading />
          </Grid>
        )}

        {interviews.slice(0, 3).map(interview => (
          <Grid key={interview.id} item xs={12} md={3}>
            <DataCard
              data-cy="interview-item"
              title={`${interview.freelancer_first_name} ${interview.freelancer_last_name || ''}`.trim()}
              text={getContractStatus(interview)}
              highlighted={interview.status === 'interview_rejected' || interview.status === 'interview_accepted'}
              href={`/client/hire?tab=interviews&job=${interview.job_slug}&focus=${interview.freelancer?.profile?.slug}`}
              icon={(
                <UserAvatar
                  name={interview.freelancer_first_name}
                  url={interview.freelancer?.avatar_url}
                />
              )}
            />
          </Grid>
        ))}

        {interviews.length === 0 && !loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No interviews yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton
            data-cy="view-all-interviews"
            href="/client/hire"
            as="/client/hire?tab=interviews"
          />
        </Grid>
      </Grid>
    )
  }
}
