import React, { useState } from 'react'
import { Card, CardHeader, Grid } from '@material-ui/core'
import { usePaginationFragment, graphql } from 'react-relay'
import { BonusList_Firm$key, BonusList_Firm$data } from '__generated__/BonusList_Firm.graphql'
import { Condition } from 'components'
import { RelayPagination, Box } from 'components/themed'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { useSnackbar } from 'hooks'
import { BonusList_DeleteBonusMutation } from '__generated__/BonusList_DeleteBonusMutation.graphql'
import { BonusList_ApproveBonusMutation } from '__generated__/BonusList_ApproveBonusMutation.graphql'
import { useComponentBounds } from 'hooks/useComponentBounds'
import { IBonusesTabFilters } from '../../BonusesTab'
import BonusRow from './components/BonusRow'
import BonusesTable from './components/BonusesTable'
import BonusCard from './components/BonusCard'

export type BonusType = BonusList_Firm$data['bonuses']['edges'][0]['node']

export interface IBonusListProps {
  firmFragmentRef: BonusList_Firm$key
  filterParams: IBonusesTabFilters
}

function BonusList(props: IBonusListProps) {
  const { firmFragmentRef, filterParams } = props

  const showSnackbar = useSnackbar()
  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const isCompactView = bounds.width < 640

  const [loadingId, setLoadingId] = useState(undefined)

  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment BonusList_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "BonusesFilters" },
      )
      @refetchable(queryName: "BonusList_bonuses")
      {
        bonuses(first: $count, after: $cursor, filters: $filters) @connection(key: "BonusList_bonuses") {
          __id
          totalCount
          edges {
            node {
              id
              ...BonusRow_Bonus
              ...BonusCard_Bonus
            }
          }
        }
      }
  `, firmFragmentRef)

  const bonuses = data?.bonuses?.edges?.map(edge => edge.node) || []

  const { execute: executeApproveBonus, loading: approvingBonus } = useQuickCommit<BonusList_ApproveBonusMutation>(graphql`
    mutation BonusList_ApproveBonusMutation($input: ApproveBonusInput!) {
      approveBonus(input: $input) {
        bonus {
          id
          ...BonusRow_Bonus
          ...BonusCard_Bonus
        }
      }
    }
  `)

  const { execute: executeDeleteBonus } = useQuickCommit<BonusList_DeleteBonusMutation>(graphql`
    mutation BonusList_DeleteBonusMutation($input: RejectBonusInput!, $connections: [ID!]!) {
      rejectBonus(input: $input) {
        bonus {
          id @deleteEdge(connections: $connections)
        }
      }
    }
  `)

  const approveBonus = async (bonusId: string) => {
    setLoadingId(bonusId)
    await executeApproveBonus({ input: { bonusId: bonusId } })
    showSnackbar('Bonus approved')
    setLoadingId('')
  }

  const deleteBonus = async (bonusId: string) => {
    await executeDeleteBonus({ input: { bonusId: bonusId }, connections: [data?.bonuses?.__id] })
    showSnackbar('Bonus rejected and deleted')
  }

  return (
    <div ref={boundsRef}>
      <Condition condition={!isCompactView}>
        <Card variant="outlined" elevation={0}>
          <BonusesTable>
            {bonuses.map(bonus => (
              <BonusRow
                key={bonus.id}
                bonusFragmentRef={bonus}
                loading={approvingBonus && bonus.id === loadingId}
                onApprove={() => approveBonus(bonus.id)}
                onDelete={() => deleteBonus(bonus.id)}
              />
            ))}
          </BonusesTable>
        </Card>
      </Condition>

      <Condition condition={isCompactView}>
        <Grid container spacing={3}>
          <Condition condition={bonuses.length === 0}>
            <Grid item xs={12}>
              <Card elevation={0} data-cy="bonus-placeholder">
                <CardHeader subheader="No bonuses to show" />
              </Card>
            </Grid>
          </Condition>

          {bonuses.map(bonus => (
            <Grid key={bonus.id} item xs={12}>
              <BonusCard
                bonusFragmentRef={bonus}
                loading={approvingBonus && bonus.id === loadingId}
                onApprove={() => approveBonus(bonus.id)}
                onDelete={() => deleteBonus(bonus.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Condition>

      <Box>
        <RelayPagination
          perPage={5}
          currentCount={bonuses?.length || 0}
          totalCount={data?.bonuses?.totalCount}
          filters={filterParams}
          {...pagination}
        />
      </Box>
    </div>
  )
}

export default React.memo(BonusList)
