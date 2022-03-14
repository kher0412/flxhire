import React from 'react'
import { Info } from '@material-ui/icons'
import styles from './ErrorPlaceholder.module.css'

export default class ErrorPlaceholder extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <Info />
        </div>

        <div className={styles.text}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
