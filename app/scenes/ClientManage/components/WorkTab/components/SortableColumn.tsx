import TableSortLabel from '@material-ui/core/TableSortLabel'
import React from 'react'

interface ISortableColumnProps {
  name: string
  columnName: string
  orderBy: string
  order: 'asc' | 'desc'
  sortBy: (orderBy: string, order: 'asc' | 'desc') => void
}

const SortableColumn = ({ name, columnName, orderBy, order, sortBy }: ISortableColumnProps) => {
  const active = orderBy === columnName
  const onClick = () => {
    let direction: 'asc' | 'desc' = 'asc'
    if (active) direction = order === 'asc' ? 'desc' : 'asc'
    sortBy(columnName, direction)
  }
  return (
    <TableSortLabel
      active={active}
      direction={order}
      onClick={onClick}
    >
      {name}
    </TableSortLabel>
  )
}

export default SortableColumn
