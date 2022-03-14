import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Chip, FormControlLabel, Switch } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { PageHeaderStepper, PageHeaderStep, Link, WholeTeamSwitch } from 'components'
import { Button } from 'components/themed'
import { IDashboardStateData } from 'scenes/ClientDashboard/ClientDashboardDucks'
import { PersonAdd } from '@material-ui/icons'
import styles from './ManagementOverview.module.css'
import TeamIcon from './components/TeamIcon'
import WorkIcon from './components/WorkIcon'
import PaymentIcon from './components/PaymentIcon'
import WorkTab from './components/WorkTab'
import PaymentTab from './components/PaymentTab'
import TeamTab from './components/TeamTab'
import MobileExpansionPanel from '../MobileExpansionPanel'
import PayrollItemsTab from './components/PayrollItemsTab'
import BonusesTab from './components/BonusesTab'
import ApplicationsIcon from '../HiringOverview/components/ApplicationsIcon'

export interface IManagementOverviewProps {
  dashboard: IDashboardStateData
  wholeTeam: boolean
  onWholeTeamChange: () => void
}

export interface IManagementOverviewState {
  currentStep: number
}

// pre-render icons for performance
const teamIcon = (<TeamIcon />)
const workIcon = (<WorkIcon />)
const paymentsIcon = (<PaymentIcon />)
const bonusesIcon = (<ApplicationsIcon />)

const BREAKPOINT = 800

export default class ManagementOverview extends React.PureComponent<IManagementOverviewProps, IManagementOverviewState> {
  public state = {
    currentStep: 0,
  }

  public render() {
    const { dashboard, wholeTeam, onWholeTeamChange } = this.props
    const { currentStep } = this.state

    const teamCount = wholeTeam ? dashboard.teamCount.wholeTeam : dashboard.teamCount.managedByMe
    const timesheetCount = wholeTeam ? dashboard.timesheetStats.toApprove.count : dashboard.timesheetStats.toApproveManagedByMe.count
    const allTimesheetCount = wholeTeam ? dashboard.timesheetStats.all.count : dashboard.timesheetStats.allManagedByMe.count

    return (
      <div>
        <MediaQuery maxWidth={BREAKPOINT}>
          <div className={styles.header}>
            <div className={styles.title}>
              FlexManage

              <Button
                muiComponent={Link}
                style={{ marginLeft: 12 }}
                iconOnly
                href="/client/invitation_team"
                color="primary"
                data-cy="invite"
              >
                <PersonAdd />
              </Button>
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
              icon={teamIcon}
              title="Team"
              count={teamCount}
              highlightCount={0}
            >
              <TeamTab
                teamMembers={wholeTeam ? dashboard.team : dashboard.myTeam}
                loading={!dashboard.teamReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={workIcon}
              title="Work"
              count={allTimesheetCount}
              highlightCount={timesheetCount}
            >
              <WorkTab
                timesheets={wholeTeam ? dashboard.timesheets.wholeTeam : dashboard.timesheets.managedByMe}
                error={dashboard.timesheets.error}
                loading={!dashboard.timesheetsReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={bonusesIcon}
              title="Bonuses"
              count={dashboard.bonuses.count}
              highlightCount={0}
            >
              <BonusesTab
                bonuses={dashboard.bonuses.data}
                error={dashboard.bonuses.error}
                loading={!dashboard.bonusesReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={paymentsIcon}
              title="Payroll"
              count={dashboard.payrollItems.count}
              highlightCount={0}
            >
              <PayrollItemsTab
                payrollItems={dashboard.payrollItems.data}
                error={dashboard.payrollItems.error}
                loading={!dashboard.payrollItemsReceived}
              />
            </MobileExpansionPanel>

            <MobileExpansionPanel
              icon={paymentsIcon}
              title="Invoices"
              count={dashboard.invoiceCount}
              highlightCount={dashboard?.invoiceStats?.overdueCount + dashboard?.invoiceStats?.unpaidCount}
            >
              <PaymentTab
                invoices={wholeTeam ? dashboard.invoices.wholeTeam : dashboard.invoices.managedByMe}
                error={dashboard.invoices.error}
                loading={!dashboard.invoicesReceived}
              />
            </MobileExpansionPanel>
          </div>
        </MediaQuery>

        <MediaQuery minWidth={BREAKPOINT + 1}>
          <div className={styles.header}>
            <div className={styles.title}>
              FlexManage
            </div>

            <div className={styles.actions}>
              <WholeTeamSwitch
                wholeTeam={wholeTeam}
                toggleWholeTeam={onWholeTeamChange}
                style={{ paddingTop: 0 }}
              />

              <Button
                muiComponent={Link}
                color="primary"
                href="/client/invitation_team"
                data-cy="invite"
              >
                <PersonAdd /> Invite Someone
              </Button>
            </div>
          </div>

          <PageHeaderStepper>
            <PageHeaderStep
              light
              icon={teamIcon}
              active={currentStep === 0}
              onClick={() => this.handleStepClick(0)}
              data-cy="dashboard-team"
              data-tour="client-dashboard-team"
            >
              Team {this.renderTabBadge(teamCount, currentStep === 0)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={workIcon}
              active={currentStep === 1}
              onClick={() => this.handleStepClick(1)}
              badge={timesheetCount || 0}
              badgeTitle="Number of timesheets requiring attention"
              data-cy="dashboard-timesheets"
              data-tour="client-dashboard-timesheets"
            >
              Work {this.renderTabBadge(allTimesheetCount, currentStep === 1)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={bonusesIcon}
              active={currentStep === 2}
              onClick={() => this.handleStepClick(2)}
              data-cy="dashboard-bonuses"
              data-tour="client-dashboard-bonuses"
            >
              Bonuses {this.renderTabBadge(dashboard.bonuses.count, currentStep === 2)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={paymentsIcon}
              active={currentStep === 3}
              onClick={() => this.handleStepClick(3)}
              data-cy="dashboard-payroll"
              data-tour="client-dashboard-payroll"
            >
              Payroll {this.renderTabBadge(dashboard.payrollItems.count, currentStep === 3)}
            </PageHeaderStep>

            <PageHeaderStep
              light
              icon={paymentsIcon}
              active={currentStep === 4}
              onClick={() => this.handleStepClick(4)}
              badge={dashboard?.invoiceStats?.overdueCount + dashboard?.invoiceStats?.unpaidCount}
              badgeTitle="Number of invoices requiring attention"
              data-cy="dashboard-invoices"
              data-tour="client-dashboard-invoices"
            >
              Invoices {this.renderTabBadge(dashboard?.invoiceCount, currentStep === 4)}
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
      // Team
      case 0:
        return (
          <TeamTab
            teamMembers={wholeTeam ? dashboard.team : dashboard.myTeam}
            loading={!dashboard.teamReceived}
            error={dashboard.timesheets.error}
          />
        )

      // Work
      case 1:
        return (
          <WorkTab
            timesheets={wholeTeam ? dashboard.timesheets.wholeTeam : dashboard.timesheets.managedByMe}
            error={dashboard.timesheets.error}
            loading={!dashboard.timesheetsReceived}
          />
        )

      // Bonuses
      case 2:
        return (
          <BonusesTab
            bonuses={dashboard.bonuses.data}
            error={dashboard.bonuses.error}
            loading={!dashboard.bonusesReceived}
          />
        )

      // Payroll
      case 3:
        return (
          <PayrollItemsTab
            payrollItems={dashboard.payrollItems.data}
            error={dashboard.payrollItems.error}
            loading={!dashboard.payrollItemsReceived}
          />
        )

      // Invoices
      case 4:
        return (
          <PaymentTab
            invoices={wholeTeam ? dashboard.invoices.wholeTeam : dashboard.invoices.managedByMe}
            loading={!dashboard.invoicesReceived}
            error={dashboard.timesheets.error}
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
          browserHistory.push('/client/manage')
          break

        case 1:
          browserHistory.push('/client/manage?tab=work')
          break

        case 2:
          browserHistory.push('/client/manage?tab=bonuses')
          break

        case 3:
          browserHistory.push('/client/manage?tab=payroll')
          break

        case 4:
          browserHistory.push('/client/manage?tab=invoices')
          break
      }
    } else {
      this.setState({
        currentStep: stepIndex,
      })
    }
  }
}
