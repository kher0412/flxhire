import React from 'react'
import { Grid } from '@material-ui/core'
import { usePaginationFragment, graphql } from 'react-relay'
import { useComponentBounds } from 'hooks/useComponentBounds'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { Condition } from 'components'
import { ExpensesList_Firm$key } from '__generated__/ExpensesList_Firm.graphql'
import { RelayPagination } from 'components/themed'
import ExpensesTable from './components/ExpensesTable'
import ExpenseRow from './components/ExpenseRow'
import ExpenseCard from './components/ExpenseCard'
import { IExpensesFilters } from '../../ExpensesTab'

export interface IExpensesListProps {
  firmFragmentRef: ExpensesList_Firm$key
  filterParams: IExpensesFilters
}

const ExpensesList: React.FunctionComponent<IExpensesListProps> = (props: IExpensesListProps) => {
  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const isCompactView = bounds.width < 640
  const { firmFragmentRef, filterParams } = props

  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment ExpensesList_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "ExpensesFilters" },
      )
      @refetchable(queryName: "ExpensesList_expenses")
      {
        expenses(first: $count, after: $cursor, filters: $filters) @connection(key: "ExpensesList_expenses") {
          __id
          totalCount
          edges {
            node {
              id
              ...ExpenseRow_Expense
              ...ExpenseCard_Expense
            }
          }
        }
      }
  `, firmFragmentRef)

  const expenses = data?.expenses?.edges?.map(edge => edge.node) || []

  return (
    <Grid ref={boundsRef} container spacing={3}>
      <Condition condition={!isCompactView}>
        <Grid item xs={12}>
          <ExpensesTable>
            {expenses.map(expense => (
              <ExpenseRow
                key={expense.id}
                expenseFragmentRef={expense}
              />
            ))}
          </ExpensesTable>
        </Grid>
      </Condition>

      <Condition condition={isCompactView}>
        {expenses.map(expense => (
          <Grid item xs={12} key={expense.id}>
            <ExpenseCard
              expenseFragmentRef={expense}
            />
          </Grid>
        ))}
      </Condition>

      <Grid item xs={12}>
        <RelayPagination
          perPage={5}
          currentCount={expenses?.length || 0}
          totalCount={data?.expenses?.totalCount}
          filters={filterParams}
          {...pagination}
        />
      </Grid>
    </Grid>
  )
}

export default ExpensesList
