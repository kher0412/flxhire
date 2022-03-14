import React from 'react'
import styles from './DialogFooter.module.css'
import DialogActions from '@material-ui/core/DialogActions'

const DialogFooter = ({ children }) => {
  return (
    <DialogActions className={styles.footer} style={{ margin: 0 }}>
      {children}
    </DialogActions>
  )
}

export default DialogFooter