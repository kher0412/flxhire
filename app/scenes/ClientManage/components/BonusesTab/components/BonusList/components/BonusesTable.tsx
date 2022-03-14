import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Condition } from 'components'

export interface IBonusesTableProps {
  children: React.ReactNode
}

function BonusesTable(props: IBonusesTableProps) {
  const { children } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Name
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
            Amount
          </TableCell>

          <TableCell>
            Invoice
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
              No bonuses to show
            </TableCell>
          </TableRow>
        </Condition>
      </TableBody>
    </Table>
  )
}

// no use memoing this, as children will always change
export default BonusesTable
