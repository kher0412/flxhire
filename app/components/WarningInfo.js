import React from 'react'
import styles from './WarningInfo.module.css'
import Info from '@material-ui/icons/Info'

let WarningInfo = ({ message }) => {
  return (
    <div className={styles.notification}>
      <Info className={styles['info-icon']} />
      {message}
    </div>
  )
}

export default WarningInfo
