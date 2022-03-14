import React from 'react'
import styles from './DialogHeader.module.css'
import DialogTitle from '@material-ui/core/DialogTitle'
import Close from '@material-ui/icons/Clear'

const DialogHeader = ({ title, closeDialog }) => {
  return (
    <DialogTitle className={styles.header}>
      <div className={styles.content}>
        {title} <Close className={styles['close-icon']} onClick={closeDialog} />
      </div>
    </DialogTitle>
  )
}

export default DialogHeader