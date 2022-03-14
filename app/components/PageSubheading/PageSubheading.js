import React from 'react'
import styles from './PageSubheading.module.css'

export default class PageSubheading extends React.Component {
  render() {
    return (
      <h3 className={styles.subheading} {...this.props}>
        {this.props.children}
      </h3>
    )
  }
}
