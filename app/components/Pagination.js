import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  actions: {
    marginLeft: 5
  }
}

const disabledStyle = {
  opacity: 0.4,
  pointerEvents: 'none'
}

const Pagination = ({ classes, count, rowsPerPage, rowsPerPageOptions, page, onChangePage, onChangeRowsPerPage }) => {
  // Fade out if we have less rows total than the smallest rowsPerPage option.
  const smallestRowsPerPageOption = (rowsPerPageOptions || []).reduce((a, b) => Math.min(a, b), rowsPerPageOptions[0] || 0)
  const disabled = (count <= smallestRowsPerPageOption)

  return (
    <TableRow style={disabled ? disabledStyle : undefined}>
      <TablePagination
        classes={classes}
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableRow>
  )
}

export default withStyles(styles)(Pagination)
