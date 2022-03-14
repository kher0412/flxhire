import { Fragment, useCallback, memo } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import { Condition, Suspense } from 'components'
import { RelayPagination, Box } from 'components/themed'
import { TeamList_Firm$key } from '__generated__/TeamList_Firm.graphql'
import { ContractsFilters } from '__generated__/TeamList_contracts.graphql'
import { Grid } from '@material-ui/core'
import TeamMember from '../../../TeamMember'
import { IManageFilterParams, ManageState } from '../../../../ManageDucks'
import styles from './TeamList.module.css'
import TeamListPlaceholder from './components/TeamListPlaceholder'
import { TeamSubtabName } from '../../teamSubtabName'

export interface ITeamListProps {
  firm: TeamList_Firm$key
  filters: ContractsFilters
  filterParams: IManageFilterParams
  innerTabName: TeamSubtabName
  toggleSelection: (id: number) => void
  bulkActions: ManageState['team']['bulkActions']
}

function TeamList(props: ITeamListProps) {
  const {
    firm: firmProp,
    toggleSelection,
    bulkActions,
    filters,
    filterParams,
    innerTabName,
  } = props

  const isSelected = useCallback((id: number) => {
    const { invert, ids } = bulkActions
    return invert ? !ids.includes(id) : ids.includes(id)
  }, [bulkActions?.invert, bulkActions?.ids])

  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment TeamList_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "ContractsFilters" },
      )
      @refetchable(queryName: "TeamList_contracts")
      {
        contracts(first: $count, after: $cursor, filters: $filters) @connection(key: "TeamList_contracts") {
          __id
          totalCount
          edges {
            node {
              rawId
              ...TeamMember_Contract
            }
          }
        }
      }
  `, firmProp)

  const contracts = data?.contracts?.edges?.map(e => e.node) || []
  const empty = contracts.length === 0
  const isFiltering = Boolean(filterParams.contractsStatus || filterParams.clientId || filterParams.jobId || filterParams.name || filterParams.tags?.length > 0)

  return (
    <Fragment>
      <Condition condition={empty}>
        <TeamListPlaceholder innerTab={innerTabName} filtering={isFiltering} />
      </Condition>

      <Condition condition={!empty}>
        <div data-cy="freelancer-list">
          <Grid container spacing={3}>
            {contracts.map(contract => (
              <Grid key={contract.rawId} item xs={12}>
                <div className={styles.item}>
                  <Suspense>
                    <TeamMember
                      contract={contract}
                      toggleSelection={toggleSelection}
                      selected={isSelected(contract.rawId)}
                    />
                  </Suspense>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Condition>

      <Box>
        <RelayPagination
          perPage={5}
          currentCount={contracts?.length || 0}
          totalCount={data?.contracts?.totalCount}
          filters={filters}
          {...pagination}
        />
      </Box>
    </Fragment>
  )
}

export default memo(TeamList)
