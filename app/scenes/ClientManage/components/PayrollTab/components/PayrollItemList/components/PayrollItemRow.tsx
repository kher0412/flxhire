import React from 'react'
import { TableRow, TableCell, Checkbox } from '@material-ui/core'
import { Condition, ConditionSwitch, Link, TableCheckboxCell } from 'components'
import { graphql, useFragment } from 'react-relay'
import { formatAsDate, formatAsCurrency } from 'services/formatting'
import { getFormattedApprovalDate } from 'services/payrollItem'
import { PayrollItemRow_PayrollItem$key } from '__generated__/PayrollItemRow_PayrollItem.graphql'
import { STATUS } from '../payrollItemStatus'
import { TYPE } from '../payrollItemType'

export interface IPayrollItemRowProps {
  payrollItemFragmentRef: PayrollItemRow_PayrollItem$key
  selected: boolean
  invoicing: boolean
  onSelectToggle: (id: string, selected: boolean) => void
}

function PayrollItemRow(props: IPayrollItemRowProps) {
  const { payrollItemFragmentRef, selected, invoicing, onSelectToggle } = props

  const payrollItem = useFragment(graphql`
    fragment PayrollItemRow_PayrollItem on PayrollItem {
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
          rawId
          invoiceNum
          token
        }
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
      timesheet {
        rawId
      }
    }
  `, payrollItemFragmentRef)

  const invoiceNum = payrollItem.invoiceItem?.invoice?.invoiceNum
  const invoiceNumPresent = Boolean(invoiceNum)
  const beingInvoiced = payrollItem.status === 'pending' && invoicing
  const typeText = TYPE[payrollItem.type] || payrollItem.type || 'N/A'
  const disabled = !payrollItem.invoiceable || payrollItem.status !== 'pending' || beingInvoiced

  return (
    <TableRow
      key={payrollItem.id}
      style={{ opacity: beingInvoiced ? 0.5 : 1, cursor: disabled ? undefined : 'pointer' }}
      data-cy="payroll-item"
      hover={!disabled}
      selected={selected}
      onClick={() => disabled ? undefined : onSelectToggle(payrollItem.id, !selected)}
    >
      <TableCheckboxCell>
        <Checkbox
          data-cy="payroll-item-checkbox"
          disabled={disabled}
          checked={selected}
          onChange={e => onSelectToggle(payrollItem.id, e.target.checked)}
        />
      </TableCheckboxCell>

      <TableCell>
        {payrollItem.itemNum}
      </TableCell>

      <TableCell>
        {payrollItem.contract?.freelancer?.name}
      </TableCell>

      <TableCell>
        <ConditionSwitch>
          <Condition condition={Boolean(payrollItem?.timesheet?.rawId)}>
            <Link to="/client/work_reports/[id]" as={`/client/work_reports/${payrollItem.timesheet?.rawId}`}>
              {typeText}
            </Link>
          </Condition>
          <Condition condition>
            {typeText}
          </Condition>
        </ConditionSwitch>
      </TableCell>

      <TableCell>
        {formatAsDate(payrollItem.startDate)} - {formatAsDate(payrollItem.endDate)}
      </TableCell>

      <TableCell>
        {getFormattedApprovalDate(payrollItem.autoApproved, payrollItem.approvedAt)}
      </TableCell>

      <TableCell>
        {payrollItem.contract?.client?.name}
      </TableCell>

      <TableCell>
        {formatAsCurrency(payrollItem.totalToPayClient.value, { currency: payrollItem.currency?.code })}
      </TableCell>

      <TableCell>
        <Condition condition={invoiceNumPresent}>
          <Link to="/client/invoices/[token]" as={`/client/invoices/${payrollItem.invoiceItem?.invoice?.token}`}>
            #{invoiceNum}
          </Link>
        </Condition>

        <Condition condition={!invoiceNumPresent}>
          -
        </Condition>
      </TableCell>

      <TableCell>
        {beingInvoiced ? 'Generating invoice...' : (STATUS[payrollItem.status] || payrollItem.status)}
      </TableCell>
    </TableRow>
  )
}

export default React.memo(PayrollItemRow)
