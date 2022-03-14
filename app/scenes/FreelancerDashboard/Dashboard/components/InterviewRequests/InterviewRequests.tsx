import React from 'react'
import Link from 'components/Link'
import { Card, Typography } from '@material-ui/core'
import { MeetingRoom } from '@material-ui/icons'
import styles from './InterviewRequests.module.css'
import InterviewRequest from './components/InterviewRequest'
import AcceptInterviewDialog from './components/AcceptInterviewDialog'
import SkipInterviewDialog from './components/SkipInterviewDialog'
import { ContainerProps } from './InterviewRequestsContainer'

class InterviewRequests extends React.Component<ContainerProps> {
  shouldComponentUpdate(nextProps) {
    const { interviews } = this.props
    return (interviews.length > 0 || nextProps.interviews.length > 0)
  }

  render() {
    return (
      <div className={styles.container} data-cy="interview-requests-container" id="dashboard-interview-requests">
        <AcceptInterviewDialog />
        <SkipInterviewDialog />
        {this.renderPlaceholderIfEmpty()}
        {this.renderInterviewRequestsIfNotEmpty()}
      </div>
    )
  }

  renderInterviewRequestsIfNotEmpty() {
    const { interviews } = this.props

    if (interviews.length > 0) {
      return interviews.map(interview => (
        <InterviewRequest
          key={interview.id}
          interview={interview}
        />
      ))
    }

    return null
  }

  renderPlaceholderIfEmpty() {
    const { user, interviews } = this.props

    if (interviews.length === 0) {
      const profileUrl = (user?.profile?.slug) || 'freelancer/profile'

      return (
        <Card className={styles.placeholder} raised>
          <div className={styles['placeholder-text']}>
            <div className={styles['placeholder-title']}>
              <MeetingRoom style={{ marginRight: 6 }} /> 0
            </div>

            <Typography variant="body2">
              No interviews at the moment.
              When a client is interested in working with you, you'll see interview requests here.

              <br />
              <br />

              <Link href="/[...slugs]" as={`/${profileUrl}`} className={styles.link}>
                Share your profile to get more clients
              </Link>
            </Typography>
          </div>
        </Card>
      )
    }

    return null
  }
}

export default InterviewRequests
