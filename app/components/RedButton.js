import React from 'react'
import Button from '@material-ui/core/Button'
import styles from './RedButton.module.css'

const ReduButton = ({ label, type, disabled, onClick, fullWidth }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={styles.button}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
    </Button>
  )
}

export default ReduButton
