import React from 'react'
import { Done } from '@material-ui/icons'
import styles from './ReadySplash.module.css'

export default class ReadySplash extends React.Component {
  render() {
    const { recordingFinished } = this.props

    if (!recordingFinished) {
      return false
    }

    return (
      <div className={styles.container}>
        <Done className={styles.icon} />
      </div>
    )
  }
}
