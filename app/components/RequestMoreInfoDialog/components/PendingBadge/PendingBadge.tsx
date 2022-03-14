import React from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { Timer } from '@material-ui/icons'
import styles from './PendingBadge.module.css'

export default class PendingBadge extends React.PureComponent<{ count: number, multiple?: boolean }> {
  render() {
    const { count = 0, multiple } = this.props

    if (count === 0) {
      return null
    }

    if (count === 1 && !multiple) {
      return (
        <Timer
          className={styles.icon}
          style={{ transform: 'translate(0, -1px)' }}
        />
      )
    }

    return (
      <Chip
        title={`${count} requests pending`}
        color="primary"
        avatar={(
          <Avatar className={styles.avatar}>
            <Timer style={{ transform: 'translate(0, -1px)' }} />
          </Avatar>
        )}
        className={styles.chip}
        label={count}
      />
    )
  }
}
