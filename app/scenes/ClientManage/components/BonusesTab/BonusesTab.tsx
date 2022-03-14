import React from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { Card, Grid } from '@material-ui/core'
import { LoadingIcon, Suspense, SuspensePlaceholder, LoadingPage } from 'components'
import { Button, Box } from 'components/themed'
import { BonusesTab_Query } from '__generated__/BonusesTab_Query.graphql'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { AddCircle, Tune } from '@material-ui/icons'
import { PageContent, PageLoadingIndicator, PageSidebar, PageSidebarButton } from 'components/Layouts/V3'
import BonusFilters from './components/BonusFilters'
import BonusList from './components/BonusList'
import GrantBonusDialog from './components/GrantBonusDialog'
import { IGrantBonusFormPayload } from './components/GrantBonusDialog/components/GrantBonusForm'

export interface IBonusesTabProps {

}

export interface IBonusesTabFilters {
  name?: string
  date?: string
  stage?: string
  clientId?: string
  invoiceNum?: number
}

function BonusesTab(props: IBonusesTabProps) {
  const { } = props

  const [fetchKey, setFetchKey] = React.useState(1)
  const data = useLazyLoadQuery<BonusesTab_Query>(
    graphql`
      query BonusesTab_Query {
        firm {
          ...BonusFilters_Firm
          ...BonusList_Firm
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
      fetchKey: fetchKey,
    },
  )

  const { execute: executeGrantBonus, loading: grantingBonus } = useQuickCommit(graphql`
    mutation BonusesTab_GrantBonusMutation($input: GrantBonusInput!) {
      grantBonus(input: $input) {
        bonus {
          id
          ...BonusRow_Bonus
          ...BonusCard_Bonus
        }
      }
    }
  `)

  const grantBonus = async (bonusData: IGrantBonusFormPayload, currencyCode: string) => {
    const newBonusData = { ...bonusData, clientAmount: { value: bonusData.clientAmount, currencyCode } }
    await executeGrantBonus({ input: newBonusData })
    setFetchKey(fetchKey + 1)
  }

  const [grantDialogOpen, setGrantDialogOpen] = React.useState(false)
  const [filterParams, setFilterParams] = React.useState<IBonusesTabFilters>({})
  const assignFilterParams = (params: Partial<IBonusesTabFilters>) => setFilterParams({ ...filterParams, ...params })

  return (
    <React.Fragment>
      <GrantBonusDialog
        open={grantDialogOpen}
        onClose={() => setGrantDialogOpen(false)}
        onGrant={grantBonus}
      />

      <PageSidebar sticky>
        <BonusFilters
          firmFragmentRef={data?.firm}
          filterParams={filterParams}
          setFilterParams={assignFilterParams}
          onClose={undefined}
        />
      </PageSidebar>

      <PageContent maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined" elevation={0}>
              <Box variant="compact" style={{ textAlign: 'right' }}>
                <PageSidebarButton style={{ marginRight: 12 }}>
                  <Tune /> Filters
                </PageSidebarButton>

                <Button
                  disabled={grantingBonus}
                  data-cy="grant-bonus"
                  onClick={() => setGrantDialogOpen(true)}
                  color="secondary"
                >
                  {grantingBonus ? <LoadingIcon /> : <AddCircle />} Grant a one-time bonus
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Suspense fallback={<PageLoadingIndicator />}>
              <BonusList key={fetchKey} firmFragmentRef={data.firm} filterParams={filterParams} />
            </Suspense>
          </Grid>
        </Grid>
      </PageContent>
    </React.Fragment>
  )
}

export default React.memo(BonusesTab)
