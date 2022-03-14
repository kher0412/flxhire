import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Condition } from 'components'

export interface IPayrollItemsTableProps {
  children: React.ReactNode
}

function PayrollItemsTable(props: IPayrollItemsTableProps) {
  const { children } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />

          <TableCell>
            #
          </TableCell>

          <TableCell>
            Name
          </TableCell>

          <TableCell>
            Type
          </TableCell>

          <TableCell>
            Dates
          </TableCell>

          <TableCell>
            Approval
          </TableCell>

          <TableCell>
            Manager
          </TableCell>

          <TableCell>
            Total
          </TableCell>

          <TableCell>
            Invoice
          </TableCell>

          <TableCell>
            Status
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {children}

        <Condition condition={React.Children.count(children) === 0}>
          <TableRow>
            <TableCell colSpan={10}>
              No payroll items to show
            </TableCell>
          </TableRow>
        </Condition>
      </TableBody>
    </Table>
  )
}

// no use memoing this, as children will always change
export default PayrollItemsTable
