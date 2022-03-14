import React from 'react'
import { graphql } from 'react-relay'
import { Card, Grid, Divider } from '@material-ui/core'
import { fetchQuery } from 'api/graphql'
import { useSnackbar } from 'hooks'
import { Link, LoadingIcon, Suspense } from 'components'
import { Button, TextField } from 'components/themed'
import { ContractsFilters } from '__generated__/TeamList_contracts.graphql'
import { TeamHeader_SelectAllQuery } from '__generated__/TeamHeader_SelectAllQuery.graphql'
import { TeamTab_Firm } from '__generated__/TeamTab_Firm.graphql'
import { DoneAll, PersonAdd } from '@material-ui/icons'
import { SetManageFilter } from '../../../ManageFiltersPanel/ManageFiltersPanelContainer'
import { IManageFilterParams } from '../../../../ManageDucks'
import TeamHeaderTabs, { TeamHeaderTabsSuspenseFallback } from './components/TeamHeaderTabs'
import { TeamSubtabName } from '../../teamSubtabName'
import { PageSidebarButton } from 'components/Layouts/V3'

export interface ITeamHeaderProps {
  firm: TeamTab_Firm
  filterParams: IManageFilterParams
  filters: ContractsFilters
  innerTab: TeamSubtabName
  setInnerTab: (tab: TeamSubtabName) => void
  setFilter: SetManageFilter
  onSelectAll: (contractRawIds: number[]) => void
}

function TeamHeader(props: ITeamHeaderProps) {
  const { firm, filters, filterParams, innerTab, setInnerTab, setFilter, onSelectAll } = props
  const showSnackbarMessage = useSnackbar()
  const [selectingAll, setSelectingAll] = React.useState(false)

  const handleSelectAll = async () => {
    setSelectingAll(true)
    showSnackbarMessage('Selecting...')

    try {
      const selectAllData = await fetchQuery<TeamHeader_SelectAllQuery>(
        graphql`
          query TeamHeader_SelectAllQuery($filters: ContractsFilters) {
            currentUser {
              firm {
                contracts(filters: $filters) {
                  edges {
                    node {
                      rawId
                    }
                  }
                }
              }
            }
          }
        `,
        {
          filters: filters,
        },
      )

      const allContractRawIds = selectAllData?.currentUser?.firm?.contracts?.edges?.map(e => e.node?.rawId) || []
      onSelectAll(allContractRawIds)
    } finally {
      setSelectingAll(false)
      showSnackbarMessage('')
    }
  }

  return (
    <Card variant="outlined" elevation={0} style={{ marginBottom: 24, borderBottomColor: 'rgb(46, 203, 128)' }}>
      <div style={{ padding: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={filterParams.name || ''}
              onChange={e => setFilter('name', e.target.value)}
              label="Name"
              name="filter-by-name"
            />
          </Grid>

          <Grid item xs={12} md={2} />

          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'right' }}>
            <PageSidebarButton style={{ marginRight: 12 }}>
              Filters
            </PageSidebarButton>

            <Button
              muiComponent={Link}
              href="/client/invitation_team"
              style={{ marginRight: 12, textDecoration: 'none' }}
              data-cy="invite"
            >
              <PersonAdd /> Invite
            </Button>

            {innerTab === 'individuals' && (
              <Button data-cy="select-all" onClick={handleSelectAll} disabled={selectingAll}>
                {selectingAll ? <LoadingIcon /> : <DoneAll />} Select All
              </Button>
            )}
          </Grid>
        </Grid>
      </div>

      <Divider />

      <div style={{ padding: 0 }}>
        <Suspense fallback={<TeamHeaderTabsSuspenseFallback tabName={innerTab} onSetTabName={setInnerTab} />}>
          <TeamHeaderTabs filterParams={filterParams} firm={firm} tabName={innerTab} onSetTabName={setInnerTab} />
        </Suspense>
      </div>
    </Card>
  )
}

export default React.memo(TeamHeader)
