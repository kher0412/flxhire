import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core'
import { ServerError } from 'components'
import { Button } from 'components/themed'
import { getDefaultPath } from 'services/auth'
import { browserHistory } from 'services/router'

class ApplicationStatus extends React.PureComponent {
  render() {
    const { user } = this.props

    if (user) {
      if (user.status === 'unverified') {
        return this.renderStartApplication()
      }

      if (user.status === 'accepted') {
        return this.renderAccepted()
      }

      return this.renderInProgress()
    }

    return null
  }

  renderStartApplication() {
    const { startApplication, startApplicationError } = this.props

    return (
      <Card raised style={{ marginBottom: 36 }}>
        <CardHeader
          title="Start Your Profile Verification Process"
          subheader="Make Your Profile Verified"
        />

        <CardContent>
          <Typography>
            On Flexhire, Verified Profiles have much better chances of being picked by Clients for a Job.
            Apply to verify your profile and be automatically recommended to clients.
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            onClick={startApplication}
            color="primary"
            data-cy="start-application"
          >
            Start
          </Button>

          <ServerError error={startApplicationError} />
        </CardActions>
      </Card>
    )
  }

  renderInProgress() {
    return (
      <Card raised style={{ marginBottom: 36 }}>
        <CardHeader
          title="Resume Profile Verification Application"
          subheader="Your application to have your Profile verified is in progress"
        />

        <CardActions>
          <Button
            onClick={this.viewApplication}
            color="primary"
            data-cy="resume-application"
          >
            Resume
          </Button>
        </CardActions>
      </Card>
    )
  }

  renderAccepted() {
    return (
      <Card raised style={{ marginBottom: 36 }}>
        <CardHeader
          title="Verified Member"
          subheader="Your application has been accepted and you are a verified freelancer"
        />

        <CardActions>
          <Button
            onClick={this.viewHome}
            color="primary"
          >
            OK
          </Button>
        </CardActions>
      </Card>
    )
  }

  viewApplication = () => browserHistory.push('/application')

  viewHome = () => browserHistory.push(getDefaultPath(this.props.user))
}

export default ApplicationStatus
