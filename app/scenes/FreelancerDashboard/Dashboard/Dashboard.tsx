import React from 'react'
import { PageContainer, PageWrapper, LoadingPage, PageHeader, PageHeaderTitle } from 'components'
import { Grid } from '@material-ui/core'
import styles from './Dashboard.module.css'
import Summary from './components/Summary'
import Alerts from './components/Alerts'
import IncomeBreakdown from './components/IncomeBreakdown'
import Clients from './components/Clients'
import InterviewRequests from './components/InterviewRequests'
import JobOffers from './components/JobOffers'
import JobApplications from './components/JobApplications'
import ProfileLevelStepper from './components/ProfileLevelStepper'
import ProfileAvatar from './components/ProfileAvatar'
import SuggestedQuestions from './components/SuggestedQuestions'
import { ContainerProps } from './DashboardContainer'

interface IDashboardState {
  alwaysShowProfileLevel: boolean
}

class Dashboard extends React.Component<ContainerProps, IDashboardState> {
  state = {
    alwaysShowProfileLevel: false,
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    const { getInterviews } = this.props
    getInterviews()
  }

  renderProfileLevelStepper() {
    const { user, jobOffers, clients, interviewsReceived } = this.props
    const { alwaysShowProfileLevel } = this.state
    const statuses = ['unverified', 'rejected', 'applying', 'applied', 'interview', 'accepted']
    const midApplicationStatuses = ['applying', 'applied', 'interview']
    const isMidApplication = midApplicationStatuses.includes(user.status)
    const hasContracts = jobOffers.length > 0 || clients.length > 0
    const displayStepper = statuses.includes(user.status) && (alwaysShowProfileLevel || interviewsReceived)
    const defaultShowContent = !hasContracts || user.status === 'rejected' || isMidApplication

    if (displayStepper) {
      return (
        <ProfileLevelStepper defaultShowContent={defaultShowContent} />
      )
    }

    return null
  }

  renderContent() {
    const { interviewsReceived } = this.props

    if (interviewsReceived) {
      return (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <JobApplications />
            </Grid>

            <Grid item xs={12} md={6}>
              <Summary />
            </Grid>

            <Grid item xs={12} md={6}>
              <IncomeBreakdown />
            </Grid>

            <Grid item xs={12} md={6}>
              <SuggestedQuestions />
            </Grid>

            <Grid item xs={12} md={6}>
              <InterviewRequests />
              <JobOffers />
            </Grid>

            <Grid item xs={12} md={12}>
              <Clients />
            </Grid>
          </Grid>
        </React.Fragment>
      )
    }

    return <LoadingPage />
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <PageHeader>
          <PageHeaderTitle style={{ marginBottom: 24 }} data-cy="dashboard-header">
            <div className={styles.mainTitle}>
              <ProfileAvatar user={user} />

              <div className={styles['title-wrapper']}>
                <div className={styles.title} data-cy="main-title">
                  Hi {user.first_name}, welcome to Flexhire
                </div>

                <div className={styles.subtitle} onClick={this.handleSubtitleClick} role="button" data-cy="subtitle">
                  your profile is {Math.round(this.getProfileLevelCompletion() * 100)}% completed ({this.getProfileLevelCompletionName()})
                </div>

                <Alerts />
              </div>
            </div>
          </PageHeaderTitle>

          <div data-cy="profile-level-stepper">
            {this.renderProfileLevelStepper()}
          </div>
        </PageHeader>

        <PageContainer>
          <div className={styles['clear-area']} />

          <PageWrapper withoutCard>
            {this.renderContent()}
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }

  handleSubtitleClick = () => {
    this.setState(state => ({
      alwaysShowProfileLevel: !state.alwaysShowProfileLevel,
    }))
  }

  getProfileLevelCompletion() {
    const { user } = this.props

    if (user.featured) {
      return 1
    }

    if (user.status === 'accepted') {
      return 0.66
    }

    return 0.33
  }

  getProfileLevelCompletionName() {
    const { user } = this.props

    if (user.featured) {
      return 'Full'
    }

    if (user.status === 'accepted') {
      return 'Verified'
    }

    return 'Basic'
  }
}

export default Dashboard
