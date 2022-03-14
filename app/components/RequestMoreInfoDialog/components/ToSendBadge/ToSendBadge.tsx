import React from 'react'
import { Chip, Avatar } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import styles from './ToSendBadge.module.css'

export default class ToSendBadge extends React.PureComponent<{ count: number, multiple?: boolean }> {
  render() {
    const { count = 0, multiple } = this.props

    if (count === 0) {
      return null
    }

    if (count === 1 && !multiple) {
      return (
        <Send
          className={styles.icon}
          style={{ transform: 'translate(0, -1px)' }}
        />
      )
    }

    return (
      <Chip
        title={`sending ${count} requests`}
        color="primary"
        avatar={(
          <Avatar className={styles.avatar}>
            <Send style={{ transform: 'translate(0, -1px)', paddingLeft: 6 }} />
          </Avatar>
        )}
        className={styles.chip}
        label={count}
      />
    )
  }
}
