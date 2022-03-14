import React, { useCallback, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { Condition, PageContainer, Suspense } from 'components'
import { PageHeader, PageHeaderTitle, PageHeaderDescription } from 'components/Layouts/V3'
import { isClient } from 'services/user'
import { Help } from '@material-ui/icons'
import { useCurrentUser, useDispatch, useDispatchAction, useOnMount, useSelector } from 'hooks'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Dashboard_Query } from '__generated__/Dashboard_Query.graphql'
import { RESET_CLOSED_SNACBKARS } from '../ClientDashboardDucks'
import HiringOverview from './components/HiringOverview'
import ManagementOverview from './components/ManagementOverview'
import DashboardTour from './components/DashboardTour'
import styles from './Dashboard.module.css'
import TeamCostBreakdown from './components/TeamCostBreakdown'
import { getDashboardData as getDashboardDataAction } from './DashboardContainer'

interface IShowWholeTeamState {
    analytics: boolean,
    hiring: boolean,
    team: boolean,
}

const Dashboard = () => {
  const [user] = useCurrentUser()
  // TODO: it would be cool to use SSR preloaded query here, but we can't due to conflict with rest-api preloaded data.
  const data = useLazyLoadQuery<Dashboard_Query>(graphql`
    query Dashboard_Query {
      currentUser {
        managerContract {
          allowHireAccess
          allowManageAccess
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-or-network',
  })
  const allowHireAccess = data?.currentUser?.managerContract?.allowHireAccess
  const allowManageAccess = data?.currentUser?.managerContract?.allowManageAccess

  const dashboard = useSelector(state => state.clientDashboard.data)

  const dispatch = useDispatch()
  const resetClosedSnackbars = useDispatchAction(() => createAction(RESET_CLOSED_SNACBKARS)(), [])
  const getDashboardData = useCallback(() => getDashboardDataAction(dispatch, user, getAPIClient()), [dispatch, user])

  const [showWholeTeam, setShowWholeTeam] = useState<IShowWholeTeamState>({
    analytics: true,
    hiring: true,
    team: true,
  })

  const refresh = useCallback(() => {
    if (!isClient(user)) return
    if (user.is_firm_admin) {
      setShowWholeTeam({
        analytics: true,
        hiring: true,
        team: true,
      })
      getDashboardData()
    } else {
      getDashboardData()
    }
  }, [user])

  const toggleFilter = useCallback((section: keyof IShowWholeTeamState) => {
    setShowWholeTeam({
      ...showWholeTeam,
      [section]: !showWholeTeam[section],
    })
  }, [showWholeTeam])

  useOnMount(() => refresh())

  return (
    <div className={styles.container}>
      <PageHeader>
        <PageHeaderTitle>Recruitment Pipeline Overview</PageHeaderTitle>
        <PageHeaderDescription>This is your recruitment pipeline overview page where you can quickly view and progress people across the application process for each of your jobs.</PageHeaderDescription>
      </PageHeader>

      <div className={styles.wrapper}>
        <PageContainer wide>
          <div className={styles['snackbar-reset']}>
            <IconButton onClick={resetClosedSnackbars} data-tour="client-dashboard-help">
              <Help className={styles.helpicon} />
            </IconButton>
          </div>

          <DashboardTour />

          <Condition condition={allowHireAccess}>
            <div className={styles.hiring} data-tour="client-dashboard-hire">
              <HiringOverview wholeTeam={showWholeTeam.hiring} onWholeTeamChange={() => toggleFilter('hiring')} />
            </div>
          </Condition>

          <Condition condition={allowManageAccess}>
            <div data-tour="client-dashboard-manage">
              <ManagementOverview wholeTeam={showWholeTeam.team} onWholeTeamChange={() => toggleFilter('team')} />
            </div>
            <div>
              <Suspense>
                <TeamCostBreakdown
                  timesheets={dashboard.timesheets.wholeTeam}
                  timesheetsManagedByMe={dashboard.timesheets.managedByMe}
                  wholeTeam={showWholeTeam.analytics}
                  loading={false}
                />
              </Suspense>
            </div>
          </Condition>
        </PageContainer>
      </div>
    </div>
  )
}

export default Dashboard
