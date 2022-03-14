import React from 'react'
import { classList } from 'services/styles'
import { Info } from '@material-ui/icons'
import styles from './InfoMessage.module.css'

const InfoMessage = (props: React.HTMLProps<HTMLDivElement>) => {
  const { className, children, ...restProps } = props

  return (
    <div className={classList(styles.container, className)} {...restProps}>
      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          <Info />
        </div>
      </div>

      <div className={styles.content} data-cy="info-message">
        {children}
      </div>
    </div>
  )
}

export default InfoMessage
