import React from 'react'
import styles from './Placeholder.module.css'

export default class Placeholder extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        You don't have any posts.
      </div>
    )
  }
}
