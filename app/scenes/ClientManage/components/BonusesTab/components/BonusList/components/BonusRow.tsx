import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { TableRow, TableCell, MenuItem } from '@material-ui/core'
import { formatAsDate, formatAsCurrency } from 'services/formatting'
import { BonusRow_Bonus$key } from '__generated__/BonusRow_Bonus.graphql'
import { MoreButtonMenu, Condition, Link, LoadingIcon, TableActionCell } from 'components'
import { STATUS } from '../bonusStatus'

export interface IBonusRowProps {
  bonusFragmentRef: BonusRow_Bonus$key
  onApprove: () => void
  onDelete: () => void
  loading: boolean
}

function BonusRow(props: IBonusRowProps) {
  const { bonusFragmentRef, onApprove, onDelete, loading } = props

  const bonus = useFragment(graphql`
    fragment BonusRow_Bonus on Bonus {
      id
      stage
      totalToPayClient {
        currency {
          code
        }
        value
      }
      startDate
      endDate
      approvedAt
      currency {
        code
      }
      payrollItem {
        invoiceItem {
          invoice {
            rawId
            invoiceNum
            token
          }
        }
      }
      contract {
        freelancer {
          name
        }
        client {
          name
        }
      }
    }
  `, bonusFragmentRef)

  const invoiceNum = bonus?.payrollItem?.invoiceItem?.invoice?.invoiceNum
  const invoiceNumPresent = Boolean(invoiceNum)

  return (
    <TableRow key={bonus.id} data-cy="bonus" style={loading ? { opacity: 0.4 } : {}}>
      <TableCell>
        {bonus.contract?.freelancer?.name}
      </TableCell>

      <TableCell>
        {formatAsDate(bonus.startDate)} - {formatAsDate(bonus.endDate)}
      </TableCell>

      <TableCell>
        {formatAsDate(bonus.approvedAt)}
      </TableCell>

      <TableCell>
        {bonus.contract?.client?.name}
      </TableCell>

      <TableCell>
        {formatAsCurrency(bonus.totalToPayClient.value, { currency: bonus.currency })}
      </TableCell>

      <TableCell>
        <Condition condition={invoiceNumPresent}>
          <Link to="/client/invoices/[token]" as={`/client/invoices/${bonus?.payrollItem?.invoiceItem?.invoice?.token}`}>
            #{invoiceNum}
          </Link>
        </Condition>

        <Condition condition={!invoiceNumPresent}>
          -
        </Condition>
      </TableCell>

      <TableCell>
        {STATUS[bonus.stage] || bonus.stage}
      </TableCell>

      <TableActionCell>
        <MoreButtonMenu disabled={bonus.stage !== 'pending' || loading} data-cy="bonus-row-menu" icon={(loading) ? <LoadingIcon /> : null}>
          <MenuItem onClick={onApprove} data-cy="approve-bonus">
            Approve
          </MenuItem>

          <MenuItem onClick={onDelete} data-cy="delete-bonus">
            Reject &amp; Delete
          </MenuItem>
        </MoreButtonMenu>
      </TableActionCell>
    </TableRow>
  )
}

export default React.memo(BonusRow)
