import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Grid, Typography } from '@material-ui/core'
import { formatAsDate } from 'services/formatting'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Invoice_Invoice$key } from '__generated__/Invoice_Invoice.graphql'
import { Condition } from 'components'
import { Box } from 'components/themed'
import Summary from './components/Summary'
import InvoiceDetails from './components/InvoiceDetails'

export interface IInvoiceProps {
  invoiceFragmentRef: Invoice_Invoice$key
}

const Invoice = ({ invoiceFragmentRef }: IInvoiceProps) => {
  const invoice = useFragment(graphql`
    fragment Invoice_Invoice on Invoice {
      client {
        additionalInvoiceText
        firm {
          currency {
            code
          }
          name
          additionalInvoiceText
        }
      }
      expenses {
        id
      }
      currency { code }
      totalToPayClient {
        currency {
          code
        }
        value
      }
      invoiceItemsExchangeRates {
        fromCurrency { code }
        toCurrency { code }
        value
      }
      invoiceDate
      invoiceNum
      bankTransferDetails {
        swiftCode
        achAccountNumber
        achRoutingNumber
        institutionName
      }
      ...Summary_Invoice
      ...InvoiceDetails_Invoice
    }
  `, invoiceFragmentRef)

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              FLEXHIRE INVOICE - {invoice?.client?.firm?.name} #{invoice?.invoiceNum}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="subtitle2">
              Flexhire LLC<br />
              7809 Prospector Drive<br />
              Cottonwood Heights, UT 84121
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">
              <ReactMarkdown source={invoice?.client?.additionalInvoiceText || invoice?.client?.firm?.additionalInvoiceText} />
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box style={{ paddingBottom: 0 }}>
            <Typography variant="h5">
              Invoice Summary
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Summary invoiceFragmentRef={invoice} />
        </Grid>

        <Grid item xs={12}>
          <Box style={{ paddingBottom: 0 }}>
            <Typography variant="h5">
              Invoice Details
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <InvoiceDetails invoiceFragmentRef={invoice} />
        </Grid>

        <Grid item xs={12}>
          <Box style={{ paddingTop: 12 }}>
            <Typography variant="subtitle2">
              <Condition condition={invoice?.invoiceItemsExchangeRates?.length > 0}>
                <div data-cy="exchange-rate-hint">
                  * Based on the following exchange rates taken on {formatAsDate(invoice?.invoiceDate)}:
                  <ul>
                    {invoice?.invoiceItemsExchangeRates?.map((rateInfo, i) => (
                      // constructing a better key would be an overkill, index will do for this short list
                      // eslint-disable-next-line react/no-array-index-key
                      <li key={i}>
                        {rateInfo.fromCurrency.code} to {rateInfo.toCurrency.code}: 1:{Math.round(rateInfo.value * 10000) / 10000}
                      </li>
                    ))}
                  </ul>
                  <br />
                  <br />
                </div>
              </Condition>

              <Condition condition={invoice?.currency?.code === invoice?.client?.firm?.currency?.code}>
                You are receiving this invoice in {invoice?.client?.firm?.currency?.code} because you have chosen that currency
                as your company wide invoice currency in your invoice settings on Flexhire.
                <br />
                <br />
              </Condition>

              <Condition condition={Boolean(invoice?.bankTransferDetails)}>
                PAYMENT VIA BANK TRANSFER<br />
                You can pay by bank transfer using the account details below:<br />
                Flexhire LLC<br />
                <span data-cy="bank-transfer-details-institution-name">{invoice?.bankTransferDetails?.institutionName}</span><br />
                Account No. <span data-cy="bank-transfer-details-ach-account-number">{invoice?.bankTransferDetails?.achAccountNumber}</span><br />
                Routing No. <span data-cy="bank-transfer-details-ach-routing-number">{invoice?.bankTransferDetails?.achRoutingNumber}</span><br />
                Swift: <span data-cy="bank-transfer-details-swift-code">{invoice?.bankTransferDetails?.swiftCode}</span>
              </Condition>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Invoice
