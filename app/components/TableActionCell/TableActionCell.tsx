import React from 'react'
import { TableCell } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './TableActionCell.module.css'

export interface ITableActionCellProps extends React.ComponentProps<typeof TableCell> {

}

/**
 * Renders a Material-UI TableCell component with reduced padding and width, intended for containing a single IconButton.
 * This should be the last cell of a TableRow.
 */
function TableActionCell(props: ITableActionCellProps) {
  const { className, ...restProps } = props

  return (
    <TableCell className={classList(styles.td, className)} {...restProps} />
  )
}

export default React.memo(TableActionCell)
