import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './LoadingPage.module.css'

const LoadingPage = ({ style }: { style?: React.CSSProperties }) => (
  <div className={styles.container} data-cy="loading-page">
    <div className={styles.content}>
      <CircularProgress size={90} thickness={2} style={style} />
    </div>
  </div>
)

export default LoadingPage
