import React, { useMemo } from 'react'
import { useFragment, graphql } from 'react-relay'
import { Card, CardContent, CardHeader, Checkbox, Grid, List, ListItem, ListItemText, Divider, Collapse } from '@material-ui/core'
import { PayrollItemCard_PayrollItem$key } from '__generated__/PayrollItemCard_PayrollItem.graphql'
import { Tags, Tag, GridExpandable } from 'components'
import { Button } from 'components/themed'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { getFormattedApprovalDate } from 'services/payrollItem'

import { browserHistory } from 'services/router'
import { useRouter } from 'next/router'
import { ArrowDropDown } from '@material-ui/icons'
import { STATUS } from '../payrollItemStatus'
import { TYPE } from '../payrollItemType'

export interface IPayrollItemCardProps {
  payrollItemFragmentRef: PayrollItemCard_PayrollItem$key
  selected: boolean
  invoicing: boolean
  onSelectToggle: (id: string, selected: boolean) => void
}

function PayrollItemCard(props: IPayrollItemCardProps) {
  const { payrollItemFragmentRef, selected, invoicing, onSelectToggle } = props

  const payrollItem = useFragment(graphql`
    fragment PayrollItemCard_PayrollItem on PayrollItem {
      id
      itemNum
      status
      totalToPayClient {
        currency {
          code
        }
        value
      }
      currency {
        code
      }
      type
      startDate
      endDate
      approvedAt
      autoApproved
      invoiceItem {
        invoice {
          invoiceNum
          rawId
          token
        }
      }
      timesheet {
        rawId
      }
      invoiceable
      contract {
        freelancer {
          name
        }
        client {
          name
        }
      }
    }
  `, payrollItemFragmentRef)

  const invoiceNum = payrollItem.invoiceItem?.invoice?.invoiceNum
  const beingInvoiced = payrollItem.status === 'pending' && invoicing
  const router = useRouter()

  const [detailsOpen, setDetailsOpen] = React.useState(false)

  const viewInvoice = useMemo(() => {
    if (payrollItem?.invoiceItem?.invoice?.rawId) {
      return () => router.push('/client/invoices/[token]', `/client/invoices/${payrollItem?.invoiceItem?.invoice?.token}`)
    }
  }, [payrollItem?.invoiceItem?.invoice?.rawId])

  const viewItem = useMemo(() => {
    if (payrollItem?.timesheet?.rawId) {
      return () => router.push('/client/work_reports/[id]', `/client/work_reports/${payrollItem?.timesheet?.rawId}`)
    }
  }, [payrollItem?.timesheet?.rawId])

  return (
    <Card variant="outlined" elevation={0} data-cy="payroll-item">
      <CardHeader
        title={(
          <Tags>
            <Tag>
              {payrollItem?.itemNum}
            </Tag>

            <Tag>
              {payrollItem?.contract?.freelancer?.name}
            </Tag>

            <Tag>
              {formatAsCurrency(payrollItem.totalToPayClient.value, { currency: payrollItem.currency?.code })}
            </Tag>
          </Tags>
        )}
        subheader={(
          <Tags>
            <Tag>
              {TYPE[payrollItem.type] || payrollItem.type}
            </Tag>

            <Tag>
              {beingInvoiced ? 'Generating invoice...' : (STATUS[payrollItem.status] || payrollItem.status)}
            </Tag>
          </Tags>
        )}
        action={(
          <Checkbox
            data-cy="payroll-item-checkbox"
            disabled={payrollItem.status !== 'pending' || beingInvoiced || !payrollItem.invoiceable}
            checked={selected}
            onChange={e => onSelectToggle(payrollItem.id, e.target.checked)}
          />
        )}
      />

      <Collapse in={detailsOpen}>
        <Divider />
      </Collapse>

      <CardContent>
        <Grid container spacing={2}>
          <GridExpandable item xs={12} expand={detailsOpen}>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText
                  primary={(
                    <React.Fragment>
                      {formatAsDate(payrollItem.startDate)} - {formatAsDate(payrollItem.endDate)}
                    </React.Fragment>
                  )}
                  secondary="Dates"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={getFormattedApprovalDate(payrollItem.autoApproved, payrollItem.approvedAt)}
                  secondary="Approval"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={payrollItem.contract?.client?.name}
                  secondary="Manager"
                />
              </ListItem>

              <ListItem disableGutters button={Boolean(viewInvoice) as any /* needed because the typing is "true" instead of "boolean" */} onClick={viewInvoice}>
                <ListItemText
                  primary={invoiceNum ? `#${invoiceNum}` : '-'}
                  secondary="Invoice #"
                />
              </ListItem>
            </List>
          </GridExpandable>

          <Grid item xs={12}>
            <Button fullWidth onClick={() => setDetailsOpen(!detailsOpen)}>
              {!detailsOpen && (
                <React.Fragment>
                  <ArrowDropDown style={{ opacity: 0 }} /> Expand Details <ArrowDropDown style={{ marginLeft: 12 }} />
                </React.Fragment>
              )}

              {detailsOpen && (
                <React.Fragment>
                  <ArrowDropDown style={{ opacity: 0 }} /> Hide Details <ArrowDropDown style={{ marginLeft: 12, transform: 'rotate(180deg)' }} />
                </React.Fragment>
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(PayrollItemCard)
