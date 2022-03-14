import React from 'react'
import styles from './Placeholder.module.css'

export default class Placeholder extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        No posts in this category
      </div>
    )
  }
}
