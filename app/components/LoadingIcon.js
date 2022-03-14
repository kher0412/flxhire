import React from 'react'
import SyncIcon from '@material-ui/icons/Sync'
import styles from './LoadingIcon.module.css'

/**
 * Renders a loading spinner that can be used exactly like a Material-UI icon (e.g. on buttons and lists).
 */
class LoadingIcon extends React.PureComponent {
  render() {
    return (
      <SyncIcon {...this.props} className={styles.icon} />
    )
  }
}

export default LoadingIcon
