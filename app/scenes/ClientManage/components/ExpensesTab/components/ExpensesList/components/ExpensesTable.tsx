import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Condition } from 'components'

export interface IExpensesListProps {
  children: React.ReactNode
}

const ExpensesTable: React.FunctionComponent<IExpensesListProps> = (props: IExpensesListProps) => {
  const { children } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            #
          </TableCell>

          <TableCell>
            Name
          </TableCell>

          <TableCell>
            Date Submitted
          </TableCell>

          <TableCell>
            Approved on
          </TableCell>

          <TableCell>
            Manager
          </TableCell>

          <TableCell>
            Total
          </TableCell>

          <TableCell>
            Invoice #
          </TableCell>

          <TableCell>
            Status
          </TableCell>

          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {children}

        <Condition condition={React.Children.count(children) === 0}>
          <TableRow>
            <TableCell colSpan={10}>
              No expenses data to show
            </TableCell>
          </TableRow>
        </Condition>
      </TableBody>
    </Table>
  )
}

// no use memoing this, as children will always change
export default ExpensesTable
