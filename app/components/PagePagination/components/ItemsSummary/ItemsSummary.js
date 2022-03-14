import React from 'react'
import styles from './ItemsSummary.module.css'

export default class ItemsSummary extends React.PureComponent {
  render() {
    const { count = 0, rowsPerPage, page } = this.props
    const from = page * rowsPerPage + 1
    const to = Math.min((page + 1) * rowsPerPage, count)

    return (
      <div className={styles.container}>
        {from}-{to} of {count}
      </div>
    )
  }
}
