import React from 'react'
import styles from './PageSubheaderTitle.module.css'

export default class PageSubheaderTitle extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className={styles.title}>
        {children}
      </div>
    )
  }
}
