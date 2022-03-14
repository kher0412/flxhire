import React from 'react'
import { Checkbox } from '@material-ui/core'
import styles from './CardHeaderAction.module.css'

interface ICardHeaderActionProps {
  toggleSelection: () => void
  selected: boolean
  disabled?: boolean
}

const CardHeaderAction = (props: ICardHeaderActionProps) => {
  const { toggleSelection, selected, disabled } = props

  let checkbox: React.ReactNode

  if (toggleSelection) {
    checkbox = (
      <Checkbox
        color="primary"
        checked={selected}
        onChange={toggleSelection}
        disabled={disabled}
      />
    )
  }

  return (
    <div className={styles.actions}>
      {checkbox}
    </div>
  )
}

export default CardHeaderAction
