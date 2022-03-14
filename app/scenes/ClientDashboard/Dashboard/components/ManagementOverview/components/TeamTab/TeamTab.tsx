import React from 'react'
import { Grid } from '@material-ui/core'
import { IAPIError, IContractForClient } from 'types'
import { UserAvatar } from 'components'
import { InfoOutlined } from '@material-ui/icons'
import ViewAllButton from '../../../ViewAllButton'
import DataCard from '../../../DataCard'
import styles from '../../ManagementOverview.module.css'

export interface ITeamTabProps {
  teamMembers: IContractForClient[]
  loading: boolean
  error?: IAPIError
}

export default class TeamTab extends React.PureComponent<ITeamTabProps> {
  public render() {
    const { teamMembers = [], loading, error } = this.props

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

        {!error && teamMembers.slice(0, 3).map(teamMember => (
          <Grid key={teamMember.id} item xs={12} md={3}>
            <DataCard
              title={`${teamMember.freelancer_first_name} ${teamMember.freelancer_last_name}`}
              text={teamMember.job_title}
              icon={(
                <UserAvatar
                  name={teamMember.freelancer_first_name}
                  url={teamMember.freelancer?.avatar_url}
                />
              )}
              href={this.generateTeamMemberUrl(teamMember)}
              data-cy="team-item"
            />
          </Grid>
        ))}

        {!error && teamMembers.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No team yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton href="/client/manage" data-cy="team-view-all" />
        </Grid>
      </Grid>
    )
  }

  private generateTeamMemberUrl(teamMember: IContractForClient): string {
    if (teamMember.freelancer_first_name) {
      return `/client/manage?filters=clear&name=${encodeURIComponent(teamMember.freelancer_first_name)}`
    }

    return undefined
  }
}
