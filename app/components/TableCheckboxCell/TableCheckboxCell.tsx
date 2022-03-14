import React from 'react'
import { TableCell } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './TableCheckboxCell.module.css'

export interface ITableCheckboxCellProps extends React.ComponentProps<typeof TableCell> {

}

/**
 * Renders a Material-UI TableCell component with reduced padding and width, intended for containing a single Checkbox.
 * This should be the first cell of a TableRow.
 */
function TableCheckboxCell(props: ITableCheckboxCellProps) {
  const { className, ...restProps } = props

  return (
    <TableCell className={classList(styles.td, className)} {...restProps} />
  )
}

export default React.memo(TableCheckboxCell)
