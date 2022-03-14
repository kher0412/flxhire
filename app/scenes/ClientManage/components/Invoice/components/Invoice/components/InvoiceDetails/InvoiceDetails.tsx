import React from 'react'
import { List, ListItem, ListItemText, Table, TableHead, TableRow, TableCell, TableBody, Grid, Tooltip, TableFooter } from '@material-ui/core'
import { formatAsCurrency } from 'services/formatting'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { InvoiceDetails_Invoice, InvoiceDetails_Invoice$key } from '__generated__/InvoiceDetails_Invoice.graphql'
import { Tags, Tag, Condition } from 'components'
import { useComponentBounds } from 'hooks/useComponentBounds'
import MobileExpansionPanel from '../MobileExpansionPanel'

type InvoiceItem = InvoiceDetails_Invoice['invoiceItems'][0]

function getProjectCodes(item: InvoiceItem): React.ReactNode {
  // TODO: this shouldn't be done like this
  // instead, tables should handle wrapping, too long columns, etc. on their own
  // this is being worked on, but for now, this is a working approach
  if (item.projectCodesHumanized.length > 6) {
    return (
      <Tooltip title={item.projectCodesHumanized}>
        <span>
          {item.projectCodesHumanized.substring(0, 5)}...
        </span>
      </Tooltip>
    )
  }

  return item.projectCodesHumanized
}

function getAmountFormatted(amount: number, item: InvoiceItem): string {
  if (!amount) return '-'

  let amountFormatted = formatAsCurrency(amount, { currency: item.currency })

  if (amountFormatted && item.amountExchanged) {
    amountFormatted += '*'
  }

  return amountFormatted || '-'
}

const InvoiceDetails = ({ invoiceFragmentRef }: { invoiceFragmentRef: InvoiceDetails_Invoice$key }) => {
  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const invoice = useFragment(graphql`
    fragment InvoiceDetails_Invoice on Invoice {
      currency { code }
      client {
        name
      }
      capitalExpenditureSubtotal {
        currency {
          code
        }
        value
      }
      operatingExpenditureSubtotal {
        currency {
          code
        }
        value
      }
      totalToPayClient {
        currency {
          code
        }
        value
      }
      invoiceItems {
        id
        description
        amountExchanged
        currency {
          code
        }
        totalAmount {
          currency {
            code
          }
          value
        }
        itemTypeHumanized
        projectCodesHumanized
        associatedPeriodHumanized
        startDate
        endDate
        subjectName
        contract {
          client {
            name
          }
          purchaseOrderNumber
        }
        payrollItem {
          type
          itemNum
          timesheet {
            projectCodes
            totalCapitalExpenditure {
              currency {
                code
              }
              value
            }
            totalOperatingExpenditure {
              currency {
                code
              }
              value
            }
          }
        }
      }
    }
  `, invoiceFragmentRef)

  if (!invoice) return null

  const currency = invoice.currency
  const invoiceItems = invoice.invoiceItems || []
  const isSmallView = bounds.width < 850

  return (
    <div ref={boundsRef}>
      <Condition condition={!isSmallView}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                #
              </TableCell>

              <TableCell>
                Type
              </TableCell>

              <TableCell>
                Subject
              </TableCell>

              <TableCell>
                Approver
              </TableCell>

              <TableCell>
                Dates
              </TableCell>

              <TableCell>
                Description
              </TableCell>

              <TableCell>
                PO #
              </TableCell>

              <TableCell>
                Code
              </TableCell>

              <TableCell align="right">
                Cap-ex
              </TableCell>

              <TableCell align="right">
                Op-ex
              </TableCell>

              <TableCell align="right">
                Total
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoiceItems.map(item => (
              <TableRow key={item.id} hover data-cy="invoice-details-row">
                <TableCell data-cy="invoice-item-num">
                  {item.payrollItem?.itemNum || '-'}
                </TableCell>

                <TableCell data-cy="invoice-item-type">
                  {item.itemTypeHumanized}
                </TableCell>

                <TableCell data-cy="invoice-item-subject">
                  {item.subjectName || '-'}
                </TableCell>

                <TableCell data-cy="invoice-item-manager-name">
                  {item.contract?.client?.name || '-'}
                </TableCell>

                <TableCell data-cy="invoice-item-associated-period">
                  {item.associatedPeriodHumanized}
                </TableCell>

                <TableCell data-cy="invoice-item-description">
                  {item.description || '-'}
                </TableCell>

                <TableCell data-cy="invoice-item-po-number">
                  {item.contract?.purchaseOrderNumber || '-'}
                </TableCell>

                <TableCell data-cy="invoice-item-project-codes">
                  {getProjectCodes(item)}
                </TableCell>

                <TableCell align="right" data-cy="invoice-item-capex">
                  {getAmountFormatted(item.payrollItem?.timesheet?.totalCapitalExpenditure.value, item)}
                </TableCell>

                <TableCell align="right" data-cy="invoice-item-opex">
                  {getAmountFormatted(item.payrollItem?.timesheet?.totalOperatingExpenditure.value, item)}
                </TableCell>

                <TableCell align="right" data-cy="invoice-item-total">
                  {getAmountFormatted(item.totalAmount.value, item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} />

              <TableCell align="right" data-cy="invoice-capex">
                <strong>
                  {formatAsCurrency(invoice.capitalExpenditureSubtotal.value, { currency: currency }) || '-'}
                </strong>
              </TableCell>

              <TableCell align="right" data-cy="invoice-opex">
                <strong>
                  {formatAsCurrency(invoice.operatingExpenditureSubtotal.value, { currency: currency }) || '-'}
                </strong>
              </TableCell>

              <TableCell align="right" data-cy="invoice-total">
                <strong>
                  {formatAsCurrency(invoice.totalToPayClient.value, { currency: currency }) || '-'}
                </strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Condition>

      <Condition condition={isSmallView}>
        {invoiceItems.map(item => (
          <MobileExpansionPanel
            key={item.id}
            title={(
              <Tags>
                <Tag>
                  <div style={{ display: 'inline-block', maxWidth: 'calc(100vw - 144px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </div>
                </Tag>

                <Tag>
                  <strong>{formatAsCurrency(item.totalAmount.value, { currency: currency })}</strong>
                </Tag>
              </Tags>
            )}
          >
            <Grid container>
              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={item?.payrollItem?.itemNum ? `#${item.payrollItem?.itemNum}` : '-'}
                      secondary="Item number"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={item.itemTypeHumanized}
                      secondary="Type"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={item?.subjectName || '-'}
                      secondary="Subject"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={item.contract?.client?.name || '-'}
                      secondary="Approved by"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={item.associatedPeriodHumanized}
                      secondary="Dates"
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={item.contract?.purchaseOrderNumber || '-'}
                      secondary="PO #"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={getProjectCodes(item)}
                      secondary="Codes"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={formatAsCurrency(item?.payrollItem?.timesheet?.totalCapitalExpenditure.value, { currency: currency })}
                      secondary="Capex"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={formatAsCurrency(item?.payrollItem?.timesheet?.totalOperatingExpenditure.value, { currency: currency })}
                      secondary="Opex"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={formatAsCurrency(item.totalAmount.value, { currency: currency })}
                      secondary="Total"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </MobileExpansionPanel>
        ))}
      </Condition>
    </div>
  )
}

export default InvoiceDetails
