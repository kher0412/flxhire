import React from 'react'
import styles from './Title.module.css'

export default class Title extends React.PureComponent {
  render() {
    const { title } = this.props

    if (!title) {
      return false
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {title}
        </div>
      </div>
    )
  }
}
