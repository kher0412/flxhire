import React from 'react'
import styles from './PageSubheaderIcon.module.css'

export default class PageSubheaderIcon extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className={styles.icon}>
        {children}
      </div>
    )
  }
}
