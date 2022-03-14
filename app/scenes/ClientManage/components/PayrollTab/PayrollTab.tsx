import React from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { fetchQuery } from 'api/graphql'
import { Card, Grid } from '@material-ui/core'
import { LoadingIcon, Suspense, SuspensePlaceholder, LoadingPage } from 'components'
import { PageContent, PageSidebar, PageSidebarButton } from 'components/Layouts/V3'
import { Button, Box } from 'components/themed'
import { PayrollTab_Query } from '__generated__/PayrollTab_Query.graphql'
import { useSnackbar, useQuickCommit } from 'hooks'
import { browserHistory } from 'services/router'
import { PayrollTab_InvoicePayrollItemsMutation } from '__generated__/PayrollTab_InvoicePayrollItemsMutation.graphql'
import { PayrollTab_SelectAllQuery } from '__generated__/PayrollTab_SelectAllQuery.graphql'
import { trackError } from 'services/analytics'
import { DoneAll, Tune } from '@material-ui/icons'
import PayrollFilters from './components/PayrollFilters'
import PayrollAutoInvoiceDialog from './components/PayrollAutoInvoiceDialog'
import PayrollItemList from './components/PayrollItemList'
import BulkActions from '../BulkActions'
import PayrollBulkActions from '../BulkActions/components/PayrollBulkActions'

export interface IPayrollTabFilters {
  name?: string
  type?: string
  status?: string
  clientId?: string
  invoiceNum?: number
}

export interface IPayrollTab {
  refresh: () => void
}

function PayrollTab(props: IPayrollTab) {
  const { refresh } = props
  const showSnackbar = useSnackbar()

  const data = useLazyLoadQuery<PayrollTab_Query>(
    graphql`
      query PayrollTab_Query {
        currentUser {
          id
        }
        firm {
          ...PayrollAutoInvoiceDialog_Firm
          ...PayrollFilters_Firm
          ...PayrollItemList_Firm
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const { execute: invoicePayrollItems } = useQuickCommit<PayrollTab_InvoicePayrollItemsMutation>(
    graphql`
      mutation PayrollTab_InvoicePayrollItemsMutation($input: InvoicePayrollItemsInput!) {
        invoicePayrollItems(input: $input) {
          invoices {
            rawId
            token
          }
          payrollItems {
            status
            invoiceItem {
              invoice {
                invoiceNum
                token
              }
            }
          }
        }
      }
    `,
  )

  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [itemsBeingInvoiced, setItemsBeingInvoiced] = React.useState<string[]>([])
  const [filterParams, setFilterParams] = React.useState<IPayrollTabFilters>({})
  const [selectingAll, setSelectingAll] = React.useState(false)

  const invoicingProgress = itemsBeingInvoiced.length > 0

  const assignFilterParams = (params: Partial<IPayrollTabFilters>) => setFilterParams({ ...filterParams, ...params })

  const setItemSelection = (id: string, selected: boolean) => {
    let selectedItemsSet = new Set(selectedItems)

    if (selected) {
      selectedItemsSet.add(id)
    } else {
      selectedItemsSet.delete(id)
    }

    setSelectedItems(Array.from(selectedItemsSet))
  }

  const isSelected = React.useCallback((id: string) => {
    return selectedItems.includes(id)
  }, [selectedItems])

  const setSelectAll = (ids: string[]) => {
    let selectedItemsSet = new Set(selectedItems)

    ids.forEach((id) => {
      if (!isSelected(id)) {
        selectedItemsSet.add(id)
      }
    })

    setSelectedItems(Array.from(selectedItemsSet))
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const invoiceSelectedItems = async ({ managerId }: { managerId: string }) => {
    setItemsBeingInvoiced(selectedItems)
    setSelectedItems([])
    showSnackbar('Generating invoice...')

    try {
      const result = await invoicePayrollItems({
        input: {
          payrollItemIds: Array.from(selectedItems),
          forceAutoPay: false,
          managerId: managerId,
        },
      })

      if (result?.invoicePayrollItems?.invoices?.length === 1) {
        browserHistory.push('/client/invoices/[token]/', `/client/invoices/${result.invoicePayrollItems?.invoices[0].token}`)
      } else {
        showSnackbar('New invoices created')
        refresh()
      }
    } catch (error) {
      trackError(error)
    } finally {
      setItemsBeingInvoiced([])
    }
  }

  const handleSelectAll = async () => {
    setSelectingAll(true)
    showSnackbar('Selecting...')

    try {
      const selectAllData = await fetchQuery<PayrollTab_SelectAllQuery>(
        graphql`
          query PayrollTab_SelectAllQuery($filters: PayrollItemsFilters) {
            currentUser {
              firm {
                payrollItems(filters: $filters) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
        {
          filters: {
            status: 'pending',
          },
        },
      )

      const allPayrollItemsIds = selectAllData?.currentUser?.firm?.payrollItems?.edges?.map(e => e.node?.id) || []
      setSelectAll(allPayrollItemsIds)
    } finally {
      setSelectingAll(false)
      showSnackbar('')
    }
  }

  const selectionLabel = selectedItems.length === 1 ? '1 payroll item selected' : `${selectedItems.length} payroll items selected`

  return (
    <React.Fragment>
      <PageSidebar sticky>
        <PayrollFilters
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
              <Box variant="compact">
                <Suspense
                  fallback={(
                    <Button disabled>
                      <LoadingIcon /> Loading...
                    </Button>
                  )}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <PayrollAutoInvoiceDialog firmFragmentRef={data?.firm} />
                    </Grid>

                    <Grid item xs={12} md={8} style={{ textAlign: 'right' }}>
                      <PageSidebarButton>
                        <Tune /> Filters
                      </PageSidebarButton>

                      <Button data-cy="select-all" onClick={handleSelectAll} disabled={selectingAll} style={{ marginLeft: 12 }}>
                        {selectingAll ? <LoadingIcon /> : <DoneAll />} Select All
                      </Button>
                    </Grid>
                  </Grid>
                </Suspense>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <PayrollItemList
              firmFragmentRef={data?.firm}
              filterParams={filterParams}
              selectedItems={new Set(selectedItems)}
              invoicingItems={new Set(itemsBeingInvoiced)}
              onSetItemSelection={setItemSelection}
            />
          </Grid>
        </Grid>

        <BulkActions
          drawerOpen={selectedItems?.length > 0}
          selectionLabel={selectionLabel}
        >
          <PayrollBulkActions
            currentUserId={data?.currentUser?.id}
            selectedItemIds={selectedItems}
            clearSelection={clearSelection}
            invoiceSelectedItems={invoiceSelectedItems}
            invoicingProgress={invoicingProgress}
          />
        </BulkActions>
      </PageContent>
    </React.Fragment>
  )
}

export default React.memo(PayrollTab)
