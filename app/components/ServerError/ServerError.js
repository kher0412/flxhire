import React from 'react'
import styles from './ServerError.module.css'

const ServerError = (props) => {
  const { error } = props
  if (error) {
    return (
      <div className={styles['server-error']} data-cy={props['data-cy'] || 'server-error'}>
        {error}
      </div>
    )
  }
  return null
}

export default ServerError
