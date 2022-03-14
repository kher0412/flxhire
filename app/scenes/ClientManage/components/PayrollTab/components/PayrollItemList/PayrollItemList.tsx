import React from 'react'
import { Card, Grid } from '@material-ui/core'
import { usePaginationFragment, graphql } from 'react-relay'
import { PayrollItemList_Firm$key, PayrollItemList_Firm$data } from '__generated__/PayrollItemList_Firm.graphql'
import { Condition } from 'components'
import { RelayPagination, Box } from 'components/themed'
import { useComponentBounds } from 'hooks/useComponentBounds'
import { IPayrollTabFilters } from '../../PayrollTab'
import PayrollItemRow from './components/PayrollItemRow'
import PayrollItemsTable from './components/PayrollItemsTable'
import PayrollItemCard from './components/PayrollItemCard'

export type PayrollItemType = PayrollItemList_Firm$data['payrollItems']['edges'][0]['node']

export interface IPayrollItemListProps {
  firmFragmentRef: PayrollItemList_Firm$key
  filterParams: IPayrollTabFilters
  selectedItems: Set<string>
  invoicingItems: Set<string>
  onSetItemSelection: (id: string, selected: boolean) => any
}

function PayrollItemList(props: IPayrollItemListProps) {
  const { firmFragmentRef, filterParams, selectedItems, invoicingItems, onSetItemSelection } = props
  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const isCompactMode = bounds.width < 720

  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment PayrollItemList_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 },
        cursor: { type: "String" },
        filters: { type: "PayrollItemsFilters" },
      )
      @refetchable(queryName: "PayrollItemList_payrollItems")
      {
        payrollItems(first: $count, after: $cursor, filters: $filters) @connection(key: "PayrollItemList_payrollItems") {
          __id
          totalCount
          edges {
            node {
              id
              ...PayrollItemRow_PayrollItem
              ...PayrollItemCard_PayrollItem
            }
          }
        }
      }
  `, firmFragmentRef)

  const payrollItems = data?.payrollItems?.edges?.map(edge => edge.node) || []

  return (
    <div ref={boundsRef}>
      <Condition condition={!isCompactMode}>
        <Card variant="outlined" elevation={0}>
          <PayrollItemsTable>
            {payrollItems.map(payrollItem => (
              <PayrollItemRow
                key={payrollItem.id}
                payrollItemFragmentRef={payrollItem}
                selected={selectedItems.has(payrollItem.id) || invoicingItems.has(payrollItem.id)}
                invoicing={invoicingItems.has(payrollItem.id)}
                onSelectToggle={onSetItemSelection}
              />
            ))}
          </PayrollItemsTable>
        </Card>
      </Condition>

      <Condition condition={isCompactMode}>
        <Grid container spacing={2}>
          {payrollItems.map(payrollItem => (
            <Grid item xs={12} key={payrollItem.id}>
              <PayrollItemCard
                payrollItemFragmentRef={payrollItem}
                selected={selectedItems.has(payrollItem.id) || invoicingItems.has(payrollItem.id)}
                invoicing={invoicingItems.has(payrollItem.id)}
                onSelectToggle={onSetItemSelection}
              />
            </Grid>
          ))}
        </Grid>
      </Condition>

      <Box>
        <RelayPagination
          perPage={10}
          currentCount={payrollItems?.length || 0}
          totalCount={data?.payrollItems?.totalCount}
          filters={filterParams}
          {...pagination}
        />
      </Box>
    </div>
  )
}

export default React.memo(PayrollItemList)
