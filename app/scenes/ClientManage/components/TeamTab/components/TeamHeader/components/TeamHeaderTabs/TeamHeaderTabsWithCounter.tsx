import React from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { useDebouncedData } from 'hooks'
import { Suspense } from 'components'
import { getQueryFiltersForTab } from 'scenes/ClientManage/components/TeamTab/getQueryFiltersForTab'
import { IManageFilterParams } from 'scenes/ClientManage/ManageDucks'
import { TeamTab_Firm } from '__generated__/TeamTab_Firm.graphql'
import { TeamHeaderTabsWithCounter_Query } from '__generated__/TeamHeaderTabsWithCounter_Query.graphql'
import { TeamSubtabName } from 'scenes/ClientManage/components/TeamTab/teamSubtabName'
import TeamHeaderTabs from './TeamHeaderTabs'

export interface ITeamHeaderTabsProps {
  filterParams: IManageFilterParams
  firm: TeamTab_Firm
  tabName: TeamSubtabName
  onSetTabName: (newTabName: TeamSubtabName) => void
}

function TeamHeaderTabsWithCounter(props: ITeamHeaderTabsProps) {
  const { firm, filterParams, tabName, onSetTabName } = props

  const filters = useDebouncedData(filterParams, 400)

  const tabData = useLazyLoadQuery<TeamHeaderTabsWithCounter_Query>(
    graphql`
      query TeamHeaderTabsWithCounter_Query($individualFilters: ContractsFilters, $managerFilters: ContractsFilters, $adminFilters: ContractsFilters, $invitedFilters: ContractsFilters) {
        currentUser {
          firm {
            individualContracts: contracts(filters: $individualFilters) {
              totalCount
            }
            managerContracts: contracts(filters: $managerFilters) {
              totalCount
            }
            adminContracts: contracts(filters: $adminFilters) {
              totalCount
            }
            invitedContracts: contracts(filters: $invitedFilters) {
              totalCount
            }
          }
        }
      }
    `,
    {
      individualFilters: getQueryFiltersForTab(filters, 'individuals', firm),
      managerFilters: getQueryFiltersForTab(filters, 'managers', firm),
      adminFilters: getQueryFiltersForTab(filters, 'admins', firm),
      invitedFilters: getQueryFiltersForTab(filters, 'invited', firm),
    },
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const tabCounts = tabData?.currentUser?.firm

  return (
    <Suspense>
      <TeamHeaderTabs
        tabName={tabName}
        individualCount={tabCounts?.individualContracts?.totalCount}
        managerCount={tabCounts?.managerContracts?.totalCount}
        adminCount={tabCounts?.adminContracts?.totalCount}
        invitedCount={tabCounts?.invitedContracts?.totalCount}
        onSetTabName={onSetTabName}
      />
    </Suspense>
  )
}

export default React.memo(TeamHeaderTabsWithCounter)
