import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Chip, Switch, FormControlLabel } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { PageHeaderStepper, PageHeaderStep, Link, WholeTeamSwitch, MoreButtonCard } from 'components'
import { IDashboardStateData } from 'scenes/ClientDashboard/ClientDashboardDucks'
import { Button } from 'components/themed'
import { Add, AddCircle } from '@material-ui/icons'
import JobsIcon from './components/JobsIcon'
import CandidatesIcon from './components/CandidatesIcon'
import ApplicationsIcon from './components/ApplicationsIcon'
import ScreeningIcon from './components/ScreeningIcon'
import InterviewsIcon from './components/InterviewsIcon'
import OffersIcon from './components/OffersIcon'
import ApplicationsTab from './components/ApplicationsTab'
import ScreeningTab from './components/ScreeningTab'
import JobsTab from './components/JobsTab'
import styles from './HiringOverview.module.css'
import CandidatesTab from './components/CandidatesTab'
import OffersTab from './components/OffersTab'
import InterviewsTab from './components/InterviewsTab'
import MobileExpansionPanel from '../MobileExpansionPanel'

export interface IHiringOverviewProps {
  dashboard: IDashboardStateData
  wholeTeam: boolean
  onWholeTeamChange: () => void
}

export interface IHiringOverviewState {
  currentStep: number
}

// pre-render icons for performance
const jobsIcon = (<JobsIcon />)
const candidatesIcon = (<CandidatesIcon />)
const applicationsIcon = (<ApplicationsIcon />)
const screeningIcon = (<ScreeningIcon />)
const interviewsIcon = (<InterviewsIcon />)
const offersIcon = (<OffersIcon />)

const BREAKPOINT = 800

export default class HiringOverview extends React.PureComponent<IHiringOverviewProps, IHiringOverviewState> {
  public state = {
    currentStep: 0,
  }

  public render() {
    const { dashboard, wholeTeam, onWholeTeamChange } = this.props
    const { currentStep } = this.state

    const numJobs = wholeTeam ? dashboard.jobCount.wholeTeam : dashboard.jobCount.managedByMe
    const numCandidates = wholeTeam ? dashboard.candidatesCount.wholeTeam : dashboard.candidatesCount.managedByMe
    const numApplications = wholeTeam ? dashboard.applicationsCount.totalCount : dashboard.applicationsCount.totalCountMyTeam
    const numScreening = wholeTeam ? dashboard.screeningCount.totalCount : dashboard.screeningCount.totalCountMyTeam
    const numInterviews = wholeTeam ? dashboard.contractStats.whole_team.interviews_total_count : dashboard.contractStats.managed_by_me.interviews_total_count
    const numOffers = wholeTeam ? dashboard.contractStats.whole_team.offers_total_count : dashboard.contractStats.managed_by_me.offers_total_count

    const numActionableApplications = wholeTeam ? dashboard.applicationsCount.highlightCount : dashboard.applicationsCount.highlightCountMyTeam
    const numActionableScreening = wholeTeam ? dashboard.screeningCount.highlightCount : dashboard.screeningCount.highlightCountMyTeam
    const numActionableInterviews = wholeTeam ? dashboard.contractStats.whole_team.interviews_actionable_count : dashboard.contractStats.managed_by_me.interviews_actionable_count
    const numActionableOffers = wholeTeam ? dashboard.contractStats.whole_team.offers_actionable_count : dashboard.contractStats.managed_by_me.offers_actionable_count

    return (
      <div>
        <MediaQuery maxWidth={BREAKPOINT}>
          <div className={styles.header}>
            <div className={styles.title}>
              FlexHire

              <MoreButtonCard
                component={props => (
                  <Button {...props} iconOnly color="primary" style={{ marginLeft: 12 }}>
                    <Add />
                  </Button>
                )}
              >
                <Button
                  muiComponent={Link}
                  href="/client/job/add_job/job"
                  className={styles.button}
                >
                  <AddCircle /> Create New Job
                </Button>
              </MoreButtonCard>
            </div>

            <div className={styles.switch}>
              <FormControlLabel
                label="Whole team"
                labelPlacement="start"
                control={(
                  <Switch
                    checked={wholeTeam}
                    onChange={onWholeTeamChange}
                    name="hire-whole-team"
                    color="primary"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <MobileExpansionPanel
              icon={jobsIcon}
              title="Jobs"
              count={numJobs}
              highlightCount={0}
              defaultOpen={(wholeTeam ? dashboard.jobs.wholeTeam : dashboard.jobs.managedByMe).length === 0}
            >
              <JobsTab
                jobs={wholeTeam ? dashboard.jobs.wholeTeam : dashboard.jobs.managedByMe}
                error={dashboard.jobs.error}
                loading={!dashboard.jobsReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={candidatesIcon}
              title="Candidates"
              count={numCandidates}
              highlightCount={0}
            >
              <CandidatesTab
                candidates={wholeTeam ? dashboard.candidates.wholeTeam : dashboard.candidates.managedByMe}
                error={dashboard.candidates.error}
                loading={!dashboard.candidatesReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={applicationsIcon}
              title="Applications"
              count={numApplications}
              highlightCount={numActionableApplications}
            >
              <ApplicationsTab
                applications={wholeTeam ? dashboard.applications.wholeTeam : dashboard.applications.managedByMe}
                error={dashboard.applications.error}
                loading={!dashboard.applicationsReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={screeningIcon}
              title="Screening"
              count={numScreening}
              highlightCount={numActionableScreening}
            >
              <ScreeningTab
                applications={wholeTeam ? dashboard.screening.wholeTeam : dashboard.screening.managedByMe}
                error={dashboard.screening.error}
                loading={!dashboard.screeningReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={interviewsIcon}
              title="Interviews"
              count={numInterviews}
              highlightCount={numActionableInterviews}
            >
              <InterviewsTab
                interviews={wholeTeam ? dashboard.interviews.wholeTeam : dashboard.interviews.managedByMe}
                error={dashboard.interviews.error}
                loading={!dashboard.interviewsReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={offersIcon}
              title="Offers"
              count={numOffers}
              highlightCount={numActionableOffers}
            >
              <OffersTab
                offers={wholeTeam ? dashboard.offers?.wholeTeam : dashboard.offers?.managedByMe}
                error={dashboard.offers.error}
                loading={!dashboard.offersReceived}
              />
            </MobileExpansionPanel>
          </div>
        </MediaQuery>

        <MediaQuery minWidth={BREAKPOINT + 1}>
          <div className={styles.header}>
            <div className={styles.title}>
              FlexHire
            </div>

            <div className={styles.actions}>
              <WholeTeamSwitch
                wholeTeam={wholeTeam}
                toggleWholeTeam={onWholeTeamChange}
                style={{ paddingTop: 0 }}
              />

              <Button
                color="primary"
                muiComponent={Link}
                href="/client/job/add_job/job"
                data-cy="create-a-job"
              >
                <Add /> Post job
              </Button>
            </div>
          </div>

          <PageHeaderStepper>
            <PageHeaderStep
              light
              icon={jobsIcon}
              active={currentStep === 0}
              onClick={() => this.handleStepClick(0)}
              data-cy="tab-jobs"
              data-tour="client-dashboard-jobs"
            >
              Jobs {this.renderTabBadge(numJobs, currentStep === 0)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={candidatesIcon}
              active={currentStep === 1}
              onClick={() => this.handleStepClick(1)}
              data-cy="tab-candidates"
              data-tour="client-dashboard-candidates"
            >
              Candidates {this.renderTabBadge(numCandidates, currentStep === 1)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={applicationsIcon}
              active={currentStep === 2}
              onClick={() => this.handleStepClick(2)}
              data-cy="tab-applications"
              data-tour="client-dashboard-applications"
              badge={wholeTeam ? dashboard.applicationsCount.highlightCount : dashboard.applicationsCount.highlightCountMyTeam}
            >
              Applications {this.renderTabBadge(numApplications, currentStep === 2)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={screeningIcon}
              active={currentStep === 3}
              onClick={() => this.handleStepClick(3)}
              data-cy="tab-screening"
              data-tour="client-dashboard-screening"
              badge={wholeTeam ? dashboard.screeningCount.highlightCount : dashboard.screeningCount.highlightCountMyTeam}
            >
              Screening {this.renderTabBadge(numScreening, currentStep === 2)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={interviewsIcon}
              active={currentStep === 4}
              onClick={() => this.handleStepClick(4)}
              data-cy="tab-interviews"
              data-tour="client-dashboard-interviews"
              badge={wholeTeam ? (
                dashboard.contractStats.whole_team.interviews_actionable_count
              ) : (
                dashboard.contractStats.managed_by_me.interviews_actionable_count
              )}
            >
              Interviews {this.renderTabBadge(numInterviews, currentStep === 3)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={offersIcon}
              active={currentStep === 5}
              onClick={() => this.handleStepClick(5)}
              data-cy="tab-offers"
              data-tour="client-dashboard-offers"
              badge={wholeTeam ? dashboard.contractStats.whole_team.offers_actionable_count : dashboard.contractStats.managed_by_me.offers_actionable_count}
            >
              Offers {this.renderTabBadge(numOffers, currentStep === 4)}
            </PageHeaderStep>
          </PageHeaderStepper>

          <div className={styles.content}>
            {this.renderCurrentStepContent()}
          </div>
        </MediaQuery>
      </div>
    )
  }

  private renderCurrentStepContent() {
    const { dashboard, wholeTeam } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      // Jobs
      case 0:
        return (
          <JobsTab
            jobs={wholeTeam ? dashboard.jobs.wholeTeam : dashboard.jobs.managedByMe}
            error={dashboard.jobs.error}
            loading={!dashboard.jobsReceived}
          />
        )

      // Candidates
      case 1:
        return (
          <CandidatesTab
            candidates={wholeTeam ? dashboard.candidates.wholeTeam : dashboard.candidates.managedByMe}
            error={dashboard.candidates.error}
            loading={!dashboard.candidatesReceived}
          />
        )

      // Applications
      case 2:
        return (
          <ApplicationsTab
            applications={wholeTeam ? dashboard.applications.wholeTeam : dashboard.applications.managedByMe}
            error={dashboard.applications.error}
            loading={!dashboard.applicationsReceived}
          />
        )

      // Screening
      case 3:
        return (
          <ScreeningTab
            applications={wholeTeam ? dashboard.screening.wholeTeam : dashboard.screening.managedByMe}
            error={dashboard.screening.error}
            loading={!dashboard.screeningReceived}
          />
        )

      // Interviews
      case 4:
        return (
          <InterviewsTab
            interviews={wholeTeam ? dashboard.interviews.wholeTeam : dashboard.interviews.managedByMe}
            error={dashboard.interviews.error}
            loading={!dashboard.interviewsReceived}
          />
        )

      // Offers
      case 5:
        return (
          <OffersTab
            offers={wholeTeam ? dashboard.offers?.wholeTeam : dashboard.offers?.managedByMe}
            loading={!dashboard.offersReceived}
          />
        )
    }

    return null
  }

  private renderTabBadge(count: number, active: boolean) {
    if (!count) return ''

    return (
      <Chip
        label={count}
        className={styles.chip}
        style={{ background: active ? '#2ECB80' : '#B1C5DA' }}
      />
    )
  }

  private handleStepClick = (stepIndex: number) => {
    if (this.state.currentStep === stepIndex) {
      // facilitate "double-click" functionality
      switch (stepIndex) {
        case 0:
          browserHistory.push('/client/hire?tab=jobs')
          break

        case 1:
          browserHistory.push('/client/hire?tab=potential')
          break

        case 2:
          browserHistory.push('/client/hire?tab=applicants')
          break

        case 3:
          browserHistory.push('/client/hire?tab=screening')
          break

        case 4:
          browserHistory.push('/client/hire?tab=interviews')
          break

        case 5:
          browserHistory.push('/client/hire?tab=offers')
          break
      }
    } else {
      this.setState({
        currentStep: stepIndex,
      })
    }
  }
}
