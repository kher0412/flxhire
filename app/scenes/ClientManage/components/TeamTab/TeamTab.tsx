import React, { Fragment, useCallback } from 'react'
import { graphql, useFragment } from 'react-relay'
import { TeamTab_Firm$key } from '__generated__/TeamTab_Firm.graphql'
import { ContractsFilters } from '__generated__/TeamList_contracts.graphql'
import { Suspense } from 'components'
import { Card } from '@material-ui/core'
import { Button } from 'components/themed'
import { PageSidebar, PageContent, PageLoadingIndicator } from 'components/Layouts/V3'
import { useOnMount, useQueryParams } from 'hooks'
import { Tune } from '@material-ui/icons'
import BulkActions from '../BulkActions'
import TeamBulkActions from '../BulkActions/components/TeamBulkActions'
import TeamHeader from './components/TeamHeader'
import { IManageFilterParams, ManageState } from '../../ManageDucks'
import { SetManageFilter } from '../ManageFiltersPanel/ManageFiltersPanelContainer'
import TeamList from './components/TeamList'
import { getQueryFiltersForTab } from './getQueryFiltersForTab'
import { isValidTeamSubtabName, TeamSubtabName } from './teamSubtabName'
import ManageSidebar from '../ManageSidebar'

export interface ITeamTabProps {
  firm: TeamTab_Firm$key
  filterParams: IManageFilterParams
  innerTabName: TeamSubtabName
  graphFetchKey: number
  setFilter: SetManageFilter
  toggleBulkEdit: () => void
  toggleSelection: (id: number) => void
  setBulkActionParam: (key: string, value: any) => void
  setInnerTabName: (name: TeamSubtabName) => void
  bulkActions: ManageState['team']['bulkActions']
  performBulkAction: () => void
  performBulkEmail: () => void
  clearSelection: () => void
}

function TeamTab(props: ITeamTabProps) {
  const {
    firm: firmProp,
    toggleSelection,
    bulkActions,
    innerTabName,
    setBulkActionParam,
    performBulkAction,
    performBulkEmail,
    clearSelection,
    setInnerTabName,
    filterParams,
    graphFetchKey,
    setFilter,
    // TODO: remove the commented out props from **everywhere**
  } = props

  const query = useQueryParams()

  useOnMount(() => {
    // react to a changing 'subtab' query param
    if (query.subtab && query.subtab !== innerTabName && isValidTeamSubtabName(query.subtab)) {
      setInnerTabName(query.subtab)
    }
  })

  const isSelected = useCallback((id: number) => {
    const { invert, ids } = bulkActions
    return invert ? !ids.includes(id) : ids.includes(id)
  }, [bulkActions?.invert, bulkActions?.ids])

  const handleSelectAll = (contractRawIds) => {
    for (let contractRawId of contractRawIds) {
      if (!isSelected(contractRawId)) {
        toggleSelection(contractRawId)
      }
    }
  }

  const firm = useFragment(graphql`
    fragment TeamTab_Firm on Firm {
      ...TeamList_Firm
      ...ManageSidebar_Firm
      users {
        id
        rawId
      }
    }
  `, firmProp)

  const queryFilters: ContractsFilters = getQueryFiltersForTab(filterParams, innerTabName, firm)

  const selectionLabel = bulkActions.ids.length === 1 ? '1 contract selected' : `${bulkActions.ids.length} contracts selected`

  return (
    <Fragment>
      <PageSidebar sticky>
        <ManageSidebar
          firm={firm}
          tab="team"
          disableStatusFilter={innerTabName === 'invited'}
          onClose={undefined}
        />
      </PageSidebar>

      <PageContent maxWidth="xl">
        <TeamHeader
          firm={firm}
          filters={queryFilters}
          filterParams={filterParams}
          innerTab={innerTabName}
          setInnerTab={setInnerTabName}
          setFilter={setFilter}
          onSelectAll={handleSelectAll}
        />

        <Suspense fallback={<PageLoadingIndicator />}>
          <TeamList
            key={`${graphFetchKey}`}
            firm={firm}
            toggleSelection={toggleSelection}
            innerTabName={innerTabName}
            bulkActions={bulkActions}
            filters={queryFilters}
            filterParams={filterParams}
          />
        </Suspense>

        <BulkActions
          drawerOpen={bulkActions.show}
          selectionLabel={selectionLabel}
        >
          <TeamBulkActions
            // TODO: refactor BulkActions so it does not rely on redux anymore
            bulkActions={bulkActions}
            setBulkActionParam={setBulkActionParam}
            performBulkAction={performBulkAction}
            performBulkEmail={performBulkEmail}
            clearSelection={clearSelection}
          />
        </BulkActions>
      </PageContent>
    </Fragment>
  )
}

export default React.memo(TeamTab)
