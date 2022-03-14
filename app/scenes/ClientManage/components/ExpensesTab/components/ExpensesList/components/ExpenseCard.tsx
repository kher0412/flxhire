import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Divider, Collapse } from '@material-ui/core'
import { ExpenseCard_Expense$key } from '__generated__/ExpenseCard_Expense.graphql'
import { Tags, Tag, GridExpandable } from 'components'
import { Button } from 'components/themed'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { ArrowDropDown } from '@material-ui/icons'
import { STATUS } from '../ExpensesStatus'

export interface IExpensesCardProps {
  expenseFragmentRef: ExpenseCard_Expense$key
}

const ExpensesCard: React.FunctionComponent<IExpensesCardProps> = (props: IExpensesCardProps) => {
  const { expenseFragmentRef } = props

  const expense = useFragment(graphql`
    fragment ExpenseCard_Expense on Expense {
      id
      rawId
      timesheet {
        status
        approvedAt
        submittedAt
        payrollItem {
          invoiceItem {
            id
            rawId
            invoice {
              invoiceNum
            }
          }
        }
        client {
          name
        }
        freelancer {
          name
        }
      }
      amount {
        currency {
          code
        }
        value
      }
      currency {
        code
      }
    }
  `, expenseFragmentRef)

  const invoiceNum = expense.timesheet?.payrollItem?.invoiceItem?.invoice?.invoiceNum

  const [detailsOpen, setDetailsOpen] = React.useState(false)

  return (
    <Card variant="outlined" data-cy="expense-item">
      <CardHeader
        title={(
          <Tags>
            <Tag>
              {expense?.rawId}
            </Tag>

            <Tag>
              {expense.timesheet?.freelancer?.name}
            </Tag>

            <Tag>
              {formatAsCurrency(expense.amount.value, { currency: expense.currency?.code })}
            </Tag>
          </Tags>
        )}
        subheader={(
          <Tags>
            <Tag>
              {STATUS[expense.timesheet?.status] || expense.timesheet?.status}
            </Tag>
          </Tags>
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
                  primary={formatAsDate(expense.timesheet?.submittedAt) || '-'}
                  secondary="Submitted"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={formatAsDate(expense.timesheet?.approvedAt) || '-'}
                  secondary="Approval"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={expense.timesheet?.client?.name}
                  secondary="Manager"
                />
              </ListItem>

              <ListItem disableGutters>
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

export default React.memo(ExpensesCard)
