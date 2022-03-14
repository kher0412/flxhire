import React from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { ErrorOutline } from '@material-ui/icons'
import styles from './ErrorBadge.module.css'

export default class ErrorBadge extends React.PureComponent {
  render() {
    const { count = 0 } = this.props

    if (!count) {
      return null
    }

    return (
      <Chip
        title={(count === 1) ? '1 error' : `${count} errors`}
        color="primary"
        avatar={(
          <Avatar className={styles.avatar}>
            <ErrorOutline />
          </Avatar>
        )}
        className={styles.chip}
        label={count}
      />
    )
  }
}
