import React from 'react'
import styles from './LoadingIndicator.module.css'
import { LoadingPage } from 'components'

class LoadingIndicator extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles['loading-indicator']}>
          <LoadingPage />
        </div>
      </div>
    )
  }
}

export default LoadingIndicator
