import React, { useCallback } from 'react'
import { CheckCircle, CloudDownload, CreditCard } from '@material-ui/icons'
import dynamic from 'services/dynamic'
import { PageContainer, PagePlaceholder, Condition } from 'components'
import { PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderBreadcrumbs, Page, PageBody, PageContent, PageActionBar } from 'components/Layouts/V3'
import { Box, Button } from 'components/themed'
import { PreloadedQuery, usePreloadedQuery, graphql } from 'react-relay'
import { Invoice_Query } from '__generated__/Invoice_Query.graphql'
import { useErrorDisplayer } from 'hooks'
import { getAPIClient } from 'api'
import { Card } from '@material-ui/core'
import { IClientInvoice } from 'types'
import InvoiceView from './components/Invoice'

export const InvoiceQuery = graphql`
  query Invoice_Query($token: String!) {
    invoice(token: $token) {
      rawId
      pdfUrl
      clientPaidAt
      clientStatus
      invoiceNum
      token
      ...Invoice_Invoice
    }
  }
`

const PayInvoiceDialog = dynamic(() => import(/* webpackChunkName: "PayInvoiceDialog" */'../PayInvoiceDialog'), { ssr: false }) as any

export interface IInvoiceProps {
  preloadedQuery: PreloadedQuery<Invoice_Query>
}

const Invoice = (props: IInvoiceProps) => {
  const { preloadedQuery } = props
  const data = usePreloadedQuery<Invoice_Query>(InvoiceQuery, preloadedQuery)
  const invoice = data?.invoice
  const invoiceReceived = Boolean(invoice)
  const isPaid = Boolean(invoice?.clientPaidAt)
  const isPaymentProcessing = invoice?.clientStatus === 'payment_processing'
  const disablePayment = isPaid || isPaymentProcessing

  const errorDisplayer = useErrorDisplayer()

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [dialogInvoice, setDialogInvoice] = React.useState<IClientInvoice>(null)

  const onDialogOpen = useCallback(async () => {
    try {
      const oldApiInvoice = await getAPIClient().getClientInvoice(invoice.rawId)
      setIsDialogOpen(true)
      setDialogInvoice(oldApiInvoice)
    } catch (error) {
      errorDisplayer.displayError(error)
    }
  }, [invoice?.rawId])

  const breadcrumbsProps = React.useMemo(() => [
    { id: 1, name: 'Team Management', href: '/client/manage' },
    { id: 2, name: 'Invoices', href: '/client/manage?tab=invoices' },
    { id: 3, name: `Invoice #${invoice?.invoiceNum}`, href: 'client/invoices/[token]', as: `client/invoices/${invoice?.token}` },
  ], [invoice?.invoiceNum, invoice?.token])

  const onDialogClose = () => {
    setIsDialogOpen(false)
  }

  if (!invoiceReceived) {
    return (
      <React.Fragment>
        <PageContainer>
          <PagePlaceholder
            title="Not found"
            subtitle="The requested invoice does not exist or you might not be authorized to access it."
          />
        </PageContainer>
      </React.Fragment>
    )
  }

  let payButtonLabel = 'Pay Invoice'
  let payButtonIcon = <CreditCard />

  if (!isPaid && isPaymentProcessing) {
    payButtonLabel = 'Payment Processing'
  } else if (isPaid) {
    payButtonLabel = 'Invoice Paid'
    payButtonIcon = <CheckCircle />
  }

  return (
    <React.Fragment>
      <Page>
        <PageHeader>
          <PageHeaderTitle>Invoice #{invoice?.invoiceNum}</PageHeaderTitle>
          <PageHeaderDescription>View and pay invoice.</PageHeaderDescription>
          <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
        </PageHeader>

        <PageActionBar>
          <Button disabled={disablePayment} color="primary" onClick={onDialogOpen} data-cy="pay-invoice">
            {payButtonIcon} {payButtonLabel}
          </Button>

          <Button color="secondary" onClick={() => window.open(invoice.pdfUrl)}>
            <CloudDownload /> Download PDF
          </Button>

          <Condition condition={isDialogOpen}>
            <PayInvoiceDialog invoice={dialogInvoice} />
          </Condition>
        </PageActionBar>

        <PageBody>
          <PageContent maxWidth="xl">
            <Card variant="outlined" elevation={0} style={{ border: '1px solid #E0E9F2', borderRadius: 6 }}>
              <InvoiceView invoiceFragmentRef={invoice} />

              <Box>
                <div style={{ textAlign: 'right', marginTop: 24 }}>
                  <Button color="secondary" onClick={() => window.open(invoice.pdfUrl)} style={{ marginRight: 12 }}>
                    <CloudDownload /> Download PDF
                  </Button>

                  <Button disabled={disablePayment} color="primary" onClick={onDialogOpen} data-cy="pay-invoice">
                    {payButtonIcon} {payButtonLabel}
                  </Button>

                  <Condition condition={Boolean(dialogInvoice)}>
                    <PayInvoiceDialog
                      invoice={dialogInvoice}
                      isOpen={isDialogOpen}
                      onDialogClose={onDialogClose}
                    />
                  </Condition>
                </div>
              </Box>
            </Card>
          </PageContent>
        </PageBody>
      </Page>
    </React.Fragment>
  )
}

export default Invoice
