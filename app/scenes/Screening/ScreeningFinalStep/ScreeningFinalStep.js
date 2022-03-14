import React from 'react'
import { PageWrapper, LoadingPage } from 'components'
import { ApplicationSubmitted } from './components/ApplicationSubmitted'
import { ScheduleInterview } from './components/ScheduleInterview'
import ApplicationStatus from './components/ApplicationStatus'
import { SubmitApplication } from './components/SubmitApplication'

class ScreeningFinalStep extends React.Component {
  componentDidMount() {
    const { getCurrentUser } = this.props

    // Needed to refresh screening status
    getCurrentUser()
  }

  render() {
    const { profile } = this.props

    if (profile) {
      return (
        <PageWrapper withoutCard>
          {this.renderContent()}
        </PageWrapper>
      )
    }

    return (
      <LoadingPage />
    )
  }

  renderContent() {
    const { user, submitApplication, project } = this.props

    switch (user.status) {
      case 'applying':
        return (
          <SubmitApplication
            user={user}
            submitApplication={submitApplication}
            project={project}
          />
        )

      case 'applied':
        return (
          <ApplicationSubmitted />
        )

      case 'interview':
        return (
          <ScheduleInterview user={user} />
        )

      default:
        return (
          <ApplicationStatus />
        )
    }
  }
}

export default ScreeningFinalStep
