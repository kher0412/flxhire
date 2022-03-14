import React from 'react'
import styles from './Reference.module.css'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const Reference = ({ reference }) => {
  return (
    <TableRow data-cy="row">
      <TableCell data-cy="name">{reference.name}</TableCell>
      <TableCell data-cy="email">{reference.email}</TableCell>
      <TableCell data-cy="status" className={styles[reference.status]}>{reference.status}</TableCell>
    </TableRow>
  )
}

export default Reference
