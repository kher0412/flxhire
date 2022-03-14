import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { TeamSubtabName } from 'scenes/ClientManage/components/TeamTab/teamSubtabName'

export interface ITeamHeaderTabsProps {
  tabName: TeamSubtabName
  individualCount?: number
  managerCount?: number
  adminCount?: number
  invitedCount?: number
  onSetTabName: (newTabName: TeamSubtabName) => void
}

function renderTabCount(count: number): string {
  if (count > 0) {
    return `(${count})`
  }

  return ''
}

function TeamHeaderTabs(props: ITeamHeaderTabsProps) {
  const { tabName, individualCount = 0, managerCount = 0, adminCount = 0, invitedCount = 0, onSetTabName } = props
  const isSmallScreen = useMediaQuery('(max-width: 700px)')

  return (
    <Tabs
      value={tabName}
      onChange={(_, newTabName) => onSetTabName(newTabName)}
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons={isSmallScreen ? 'on' : 'off'}
    >
      <Tab label={`Individuals ${renderTabCount(individualCount)}`} value="individuals" data-cy="team-tab-individuals" />
      <Tab label={`Managers ${renderTabCount(managerCount)}`} value="managers" data-cy="team-tab-managers" />
      <Tab label={`Admins ${renderTabCount(adminCount)}`} value="admins" data-cy="team-tab-admins" />
      <Tab label={`Invited ${renderTabCount(invitedCount)}`} value="invited" data-cy="team-tab-invited" />
    </Tabs>
  )
}

export default React.memo(TeamHeaderTabs)
