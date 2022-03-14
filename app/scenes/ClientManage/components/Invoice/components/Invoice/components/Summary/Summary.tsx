import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { dueDateText, dateRangeText } from 'services/invoice'
import { useFragment, graphql } from 'react-relay/hooks'
import { Summary_Invoice$key } from '__generated__/Summary_Invoice.graphql'

export interface ISummaryProps {
  invoiceFragmentRef: Summary_Invoice$key
}

const Summary = ({ invoiceFragmentRef }: ISummaryProps) => {
  const invoice = useFragment(graphql`
    fragment Summary_Invoice on Invoice {
      invoiceDate
      dueDate
      startDate
      endDate
      currency { code }
      totalToPayClient {
        currency {
          code
        }
        value
      }
    }
  `, invoiceFragmentRef)

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Date
            </TableCell>

            <TableCell>
              Associated Period
            </TableCell>

            <TableCell>
              Due Date
            </TableCell>

            <TableCell align="right">
              Amount
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              {formatAsDate(invoice.invoiceDate)}
            </TableCell>

            <TableCell>
              {dateRangeText(invoice.startDate, invoice.endDate)}
            </TableCell>

            <TableCell>
              {dueDateText(invoice.invoiceDate, invoice.dueDate)}
            </TableCell>

            <TableCell align="right">
              {formatAsCurrency(invoice.totalToPayClient.value, { currency: invoice.currency })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Summary
