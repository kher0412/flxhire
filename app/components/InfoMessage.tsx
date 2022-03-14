import React, { ReactNode } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import styles from './InfoMessage.module.css'

interface IInfoMessageProps {
  children: ReactNode | string
  type?: 'custom' | 'warning' | 'error'
  style?: object
  icon?: ReactNode
}

const InfoMessage = (props: IInfoMessageProps) => {
  let { children, type, icon, style = {}, ...restProps } = props

  if (type !== 'custom') {
    icon = (<InfoIcon />)

    if (type === 'warning') {
      icon = (<WarningIcon />)
    } else if (type === 'error') {
      icon = (<ErrorIcon />)
      style = {
        color: 'rgb(235,0,0)',
        ...style,
      }
    }
  }

  return (
    <div className={styles.message} style={style} {...restProps}>
      <div className={styles['message-icon']}>
        {icon}
      </div>

      <div className={styles['message-text']} data-cy="info-message">
        {children}
      </div>
    </div>
  )
}

export default InfoMessage
