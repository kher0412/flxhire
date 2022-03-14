import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import { Button } from 'components/themed'
import moment from 'moment'
import { Avatar, Card, CardHeader, Tooltip } from '@material-ui/core'
import { getOwnProfileUrl } from 'services/freelancer'
import { IProfileAvailability } from 'types'
import { Block, CheckCircle, Create, Update, Visibility } from '@material-ui/icons'
import styles from './Summary.module.css'
import InfoCircle from './components/InfoCircle'
import { ContainerProps } from './SummaryContainer'

const AVAILABILITY_NAME_TO_LABEL = {
  available_now: <Tooltip title="Available now" placement="top"><CheckCircle className={styles['availability-icon']} /></Tooltip>,
  available_soon: <Tooltip title="Available soon" placement="top"><Update className={styles['availability-icon']} /></Tooltip>,
  not_available: <Tooltip title="Not available" placement="top"><Block className={styles['availability-icon']} /></Tooltip>,
} as { [key in IProfileAvailability]: React.ReactElement }

class Summary extends React.Component<ContainerProps> {
  render() {
    const { user } = this.props
    const profile = user?.profile

    return (
      <Card className={styles.container} raised data-cy="dashboard-summary">
        <CardHeader title="Compensation & availability" />

        <div className={styles['info-circle-row']}>
          <InfoCircle
            title={profile?.rate ? `$${profile?.rate}/hr` : 'N/A'}
            label="Freelance"
          />

          <InfoCircle
            title={profile?.annual_compensation ? `$${profile?.annual_compensation}/yr` : 'N/A'}
            label="Permanent"
          />

          <InfoCircle
            title={AVAILABILITY_NAME_TO_LABEL[profile?.availability] || 'N/A'}
            label="Availability"
          />

          <InfoCircle
            title={this.renderAvailabilityType()}
            label="Type"
          />
        </div>

        <div className={styles.actions}>
          <Link {...getOwnProfileUrl(user)} className={styles.link} style={{ marginRight: 12 }}>
            <Button color="secondary">
              <MediaQuery minWidth={800}>
                <Visibility />
              </MediaQuery>

              <MediaQuery minWidth={800}>View full profile</MediaQuery>
              <MediaQuery maxWidth={799}>View profile</MediaQuery>
            </Button>
          </Link>

          <Link href="/profile" className={styles.link}>
            <Button color="secondary">
              <MediaQuery minWidth={800}>
                <Create />
              </MediaQuery>

              Edit Profile
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  renderProfileAvatar() {
    const { user } = this.props

    if (user?.avatar_url) {
      return (
        <Avatar className={styles.avatar} src={user?.avatar_url} />
      )
    }

    if (user?.first_name) {
      return (
        <Avatar className={styles.avatar}>
          {user.first_name[0]}
        </Avatar>
      )
    }

    return (
      <Avatar className={styles.avatar}>
        ?
      </Avatar>
    )
  }

  renderAvailabilityType() {
    const { user } = this.props

    if (user?.profile?.availability_type?.length === 2) {
      return 'All'
    }

    if (user?.profile?.availability_type?.[0] === 'part_time') {
      return 'Part time'
    }

    if (user?.profile?.availability_type?.[0] === 'full_time') {
      return 'Full time'
    }

    return 'N/A'
  }

  componentDidMount() {
    const { getTimesheets, getTimesheetStats } = this.props

    getTimesheets()
    getTimesheetStats()
  }
}

export default Summary
