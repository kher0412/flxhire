import React from 'react'
import { Chip } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import styles from './CompletionBadge.module.css'

export default class CompletionBadge extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Chip
          label="Completed"
          color="primary"
          icon={<Done />}
        />
      </div>
    )
  }
}
