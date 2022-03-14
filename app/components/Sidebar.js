import React from 'react'
import styles from './Sidebar.module.css'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        {this.props.children}
      </div>
    )
  }
}
