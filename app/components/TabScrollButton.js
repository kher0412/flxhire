import React from 'react'
import { Button } from '@material-ui/core'
import Left from '@material-ui/icons/ChevronLeft'
import Right from '@material-ui/icons/ChevronRight'

const TabScrollButton = ({ direction, onClick, visible }) => (
  visible ? (
    <Button size="small" onClick={onClick}>
      {direction === 'left' && <Left />}
      {direction === 'right' && <Right />}
    </Button>
  ) : null
)

export default TabScrollButton
