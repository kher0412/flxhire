import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Card } from '@material-ui/core'
import { LoadingIcon, PageContent, PageSidebar, Suspense, SuspensePlaceholder, Box, LoadingPage } from 'components'
import { Button } from 'components/themed'
import { Tune } from '@material-ui/icons'
import { WorkTab_Query } from '__generated__/WorkTab_Query.graphql'
import { ExpensesTab_Query } from '__generated__/ExpensesTab_Query.graphql'
import ExpensesFilters from './components/ExpensesFilters'
import ExpensesList from './components/ExpensesList'

export interface IExpensesFilters {
  name?: string
  status?: string
  clientId?: string
  invoiceNum?: number
}

const ExpensesTab = () => {
  const data = useLazyLoadQuery<ExpensesTab_Query>(
    graphql`
      query ExpensesTab_Query {
        firm {
          ...ExpensesFilters_Firm
          ...ExpensesList_Firm
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  )
  const firm = data?.firm

  const [filterParams, setFilterParams] = React.useState<IExpensesFilters>({})

  const assignFilterParams = (params: Partial<IExpensesFilters>) => setFilterParams({ ...filterParams, ...params })

  return (
    <React.Fragment>
      <PageSidebar sticky mobile="button" mobileIcon={<Tune />}>
        {({ isDrawerOpen, closeDrawer }) => (
          <Suspense fallback={(<SuspensePlaceholder />)}>
            <Card raised>
              <ExpensesFilters
                firmFragmentRef={firm}
                filterParams={filterParams}
                setFilterParams={assignFilterParams}
                onClose={isDrawerOpen ? closeDrawer : undefined}
              />
            </Card>
          </Suspense>
        )}
      </PageSidebar>

      <PageContent maxWidth="lg">
        <Suspense
          fallback={(
            <Card raised>
              <Button disabled>
                <LoadingIcon /> Loading...
              </Button>
            </Card>
          )}
        >
          <Card raised>
            <Box compact>
              <Suspense fallback={(<LoadingPage />)}>
                <ExpensesList
                  firmFragmentRef={firm}
                  filterParams={filterParams}
                />
              </Suspense>
            </Box>
          </Card>
        </Suspense>
      </PageContent>
    </React.Fragment>
  )
}

export default ExpensesTab
