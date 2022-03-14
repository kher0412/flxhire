import React from 'react'
import { Grid } from '@material-ui/core'
import { ICandidate } from 'types/models/candidate'
import { UserAvatar } from 'components'
import { IAPIError } from 'types'
import { InfoOutlined } from '@material-ui/icons'
import DataCard from '../../../DataCard'
import ViewAllButton from '../../../ViewAllButton'
import styles from '../../HiringOverview.module.css'

export interface ICandidatesTabProps {
  candidates: ICandidate[]
  loading: boolean
  error?: IAPIError
}

export default class CandidatesTab extends React.Component<ICandidatesTabProps> {
  render() {
    const { candidates = [], loading, error } = this.props

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

        {!error && candidates.slice(0, 3).map(candidate => (
          <Grid key={`${candidate.id}-${candidate.job_id}`} item xs={12} md={3}>
            <DataCard
              title={candidate.first_name}
              text={candidate.job_title}
              icon={(
                <UserAvatar
                  name={candidate.first_name}
                  url={candidate.avatar_url}
                />
              )}
              href={`/client/hire?tab=potential&job=${candidate.job_slug}&focus=${candidate.profile.slug}`}
            />
          </Grid>
        ))}

        {candidates.length === 0 && !loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No candidates available"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton href="/client/hire?tab=potential" />
        </Grid>
      </Grid>
    )
  }
}
