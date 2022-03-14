import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { ConditionSwitch, Condition, Link } from 'components'
import { graphql, useFragment } from 'react-relay'
import { formatAsDate, formatAsCurrency } from 'services/formatting'
import { ExpenseRow_Expense$key } from '__generated__/ExpenseRow_Expense.graphql'
import { STATUS } from '../ExpensesStatus'

export interface IExpensesRowProps {
  expenseFragmentRef: ExpenseRow_Expense$key
}

const ExpenseRow: React.FunctionComponent<IExpensesRowProps> = (props: IExpensesRowProps) => {
  const { expenseFragmentRef } = props

  const expense = useFragment(graphql`
    fragment ExpenseRow_Expense on Expense {
      id
      itemNum
      timesheet {
        status
        approvedAt
        submittedAt
        payrollItem {
          invoiceItem {
            id
            rawId
            invoice {
              rawId
              invoiceNum
              token
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
  const invoiceRawId = expense.timesheet?.payrollItem?.invoiceItem?.invoice?.rawId
  const invoiceNumPresent = Boolean(invoiceNum)
  const invoiceRawIdPresent = Boolean(invoiceRawId)

  return (
    <TableRow key={expense.id} data-cy="expense-item">
      <TableCell>
        {expense.itemNum}
      </TableCell>

      <TableCell>
        {expense.timesheet?.freelancer?.name}
      </TableCell>

      <TableCell>
        {formatAsDate(expense.timesheet?.submittedAt)}
      </TableCell>

      <TableCell>
        {formatAsDate(expense.timesheet?.approvedAt)}
      </TableCell>

      <TableCell>
        {expense.timesheet?.client?.name}
      </TableCell>

      <TableCell>
        {formatAsCurrency(expense.amount.value, { currency: expense.currency?.code })}
      </TableCell>

      <TableCell>
        <ConditionSwitch>
          <Condition condition={invoiceNumPresent && invoiceRawIdPresent}>
            <Link to="/client/invoices/[token]" as={`/client/invoices/${expense.timesheet?.payrollItem?.invoiceItem?.invoice?.token}`}>
              #{invoiceNum}
            </Link>
          </Condition>

          <Condition condition>
            -
          </Condition>
        </ConditionSwitch>
      </TableCell>

      <TableCell>
        {STATUS[expense.timesheet?.status] || expense.timesheet?.status}
      </TableCell>
    </TableRow>
  )
}

export default React.memo(ExpenseRow)
