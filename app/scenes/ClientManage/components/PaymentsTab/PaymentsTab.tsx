import React, { Fragment, memo } from 'react'
import { Avatar, Card, CardHeader, Grid } from '@material-ui/core'
import { PagePlaceholder, Condition, Link, PagePagination } from 'components'
import { formatAsCurrency } from 'services/formatting'
import { Currency, IClientInvoice } from 'types'
import { Box, Button } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { PaymentsTab_Firm$key } from '__generated__/PaymentsTab_Firm.graphql'
import { PaymentsTab_User$key } from '__generated__/PaymentsTab_User.graphql'
import { CheckCircle, HowToVote, Tune, WatchLater, Error } from '@material-ui/icons'
import { useComponentBounds } from 'hooks/useComponentBounds'
import { PageContent, PageLoadingIndicator, PageSidebar, PageSidebarButton } from 'components/Layouts/V3'
import { usePageState } from 'hooks/usePageState'
import InvoicesTable from './components/InvoicesTable'
import PayInvoiceDialog from '../PayInvoiceDialog'
import styles from './PaymentsTab.module.css'
import ManageSidebar from '../ManageSidebar'

export interface IPaymentsTabProps {
  userFragmentRef: PaymentsTab_User$key
  firmFragmentRef: PaymentsTab_Firm$key
  invoicesTotalUnpaid: number
  invoicesTotalOverdue: number
  invoicesTotalCurrency: Currency
  invoices: IClientInvoice[]
  invoicesReceived: boolean
  invoicesExist: boolean
  invoicesPagination: any
  sortBy: (order: any) => void
  onChangePage: (value: number) => void
  onChangeRowsPerPage: (value: number) => void
}

function PaymentsTab(props: IPaymentsTabProps) {
  const {
    userFragmentRef,
    firmFragmentRef,
    invoicesTotalUnpaid,
    invoicesTotalOverdue,
    invoicesTotalCurrency,
    invoices,
    invoicesReceived,
    invoicesExist,
    invoicesPagination,
    onChangePage,
    onChangeRowsPerPage,
    sortBy,
  } = props

  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const isCompactView = bounds.width < 740

  const user = useFragment(graphql`
    fragment PaymentsTab_User on User {
      hasInvoiceAccess
      managerContract {
        client {
          name
        }
        isFirmAdmin
      }
    }
  `, userFragmentRef)

  const firm = useFragment(graphql`
    fragment PaymentsTab_Firm on Firm {
      ...ManageSidebar_Firm
    }
  `, firmFragmentRef)

  const invoiceManagerName = user?.managerContract?.client?.name || 'someone else'

  const { pageSidebarHidden } = usePageState()
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [dialogInvoice, setDialogInvoice] = React.useState<IClientInvoice>(null)

  const onDialogOpen = (invoice: IClientInvoice) => {
    setIsDialogOpen(true)
    setDialogInvoice(invoice)
  }

  const onDialogClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <Fragment>
      <PageSidebar sticky>
        <ManageSidebar
          firm={firm}
          tab="invoices"
          onClose={undefined}
        />
      </PageSidebar>

      <PageContent maxWidth="xl">
        <div ref={boundsRef}>
          <Condition condition={!user?.hasInvoiceAccess}>
            <PagePlaceholder
              raised
              title="Your account has no Invoice access"
              subtitle={`Your company administrators have chosen ${invoiceManagerName} to manage invoicing for your contracts.`}
              action={(
                <Button color="primary" muiComponent={Link} href="/client/work_reports" style={{ textDecoration: 'none' }}>
                  <HowToVote style={{ marginRight: 12 }} /> Work Reports
                </Button>
              )}
            />
          </Condition>

          <Condition condition={user?.hasInvoiceAccess}>
            <Condition condition={!invoicesReceived}>
              <PageLoadingIndicator />
            </Condition>

            <Condition condition={invoicesReceived && invoices.length === 0}>
              <Condition condition={user?.managerContract?.isFirmAdmin}>
                <PagePlaceholder
                  raised
                  title={invoicesExist ? 'No invoices match filter criteria' : 'No invoices due for payment'}
                  subtitle="Approved work reports from your team are combined into a single invoice weekly or monthly depending on your billing settings."
                  action={(
                    <Button color="primary" muiComponent={Link} href="/client/work_reports" style={{ textDecoration: 'none' }}>
                      <HowToVote style={{ marginRight: 12 }} /> Work Reports
                    </Button>
                  )}
                />
              </Condition>

              <Condition condition={!user?.managerContract?.isFirmAdmin}>
                <PagePlaceholder
                  raised
                  title={invoicesExist ? 'No invoices match filter criteria' : 'You have no outstanding invoices'}
                  subtitle="Other managers of your team may have invoices, but only administrators can see other managers' invoices."
                  action={(
                    <Button color="primary" muiComponent={Link} href="/client/work_reports" style={{ textDecoration: 'none' }}>
                      <HowToVote style={{ marginRight: 12 }} /> Work Reports
                    </Button>
                  )}
                />
              </Condition>
            </Condition>

            <Grid container spacing={3}>
              <Condition condition={pageSidebarHidden}>
                <Grid item xs={12}>
                  <Card variant="outlined" elevation={0}>
                    <Box variant="compact">
                      <PageSidebarButton>
                        <Tune /> Filters
                      </PageSidebarButton>
                    </Box>
                  </Card>
                </Grid>
              </Condition>

              <Condition condition={invoices.length > 0}>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" elevation={0} style={{ height: '100%' }}>
                    <CardHeader
                      title={formatAsCurrency(invoicesTotalUnpaid + invoicesTotalOverdue, { currency: invoicesTotalCurrency })}
                      subheader="Total unpaid"
                      avatar={(
                        <Avatar className={invoicesTotalUnpaid + invoicesTotalOverdue > 0 ? styles.avatarActive : undefined}>
                          <WatchLater />
                        </Avatar>
                      )}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" elevation={0} style={{ height: '100%' }}>
                    <CardHeader
                      title={formatAsCurrency(invoicesTotalUnpaid, { currency: invoicesTotalCurrency })}
                      subheader="Total requested"
                      avatar={(
                        <Avatar className={invoicesTotalUnpaid > 0 ? styles.avatarActive : undefined}>
                          <CheckCircle />
                        </Avatar>
                      )}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card variant="outlined" elevation={0} style={{ height: '100%' }}>
                    <CardHeader
                      title={formatAsCurrency(invoicesTotalOverdue, { currency: invoicesTotalCurrency })}
                      subheader="Total overdue"
                      avatar={(
                        <Avatar className={invoicesTotalOverdue > 0 ? styles.avatarActiveWarning : undefined}>
                          <Error />
                        </Avatar>
                      )}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <InvoicesTable
                    isCompactView={isCompactView}
                    invoices={invoices}
                    showInvoicePdf={invoice => window.open(invoice.pdf_url)}
                    pagination={invoicesPagination}
                    sortBy={sortBy}
                    onOpenPaymentDialog={onDialogOpen}
                  />

                  <PayInvoiceDialog
                    invoice={dialogInvoice}
                    isOpen={isDialogOpen}
                    onDialogClose={onDialogClose}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <PagePagination
                    count={invoicesPagination.count}
                    rowsPerPage={invoicesPagination.rowsPerPage}
                    page={invoicesPagination.page}
                    onPageChange={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                  />
                </Grid>
              </Condition>
            </Grid>
          </Condition>
        </div>
      </PageContent>
    </Fragment>
  )
}

export default memo(PaymentsTab)
