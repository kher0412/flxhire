import React from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { CheckCircle, Done } from '@material-ui/icons'
import styles from './CompletionBadge.module.css'

export default class CompletionBadge extends React.PureComponent<{ count: number, multiple?: boolean }> {
  render() {
    const { count = 0, multiple } = this.props

    if (count === 0) {
      return null
    }

    if (count === 1 && !multiple) {
      return (
        <CheckCircle className={styles.icon} />
      )
    }

    return (
      <Chip
        title={`${count} completed`}
        color="primary"
        avatar={(
          <Avatar className={styles.avatar}>
            <Done />
          </Avatar>
        )}
        className={styles.chip}
        label={count}
      />
    )
  }
}
