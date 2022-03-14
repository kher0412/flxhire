import React, { PureComponent } from 'react'
import styles from './Row.module.css'

class Row extends PureComponent {
  render() {
    const { children, ...otherProps } = this.props
    return (
      <div className={styles.row} {...otherProps}>
        {children}
      </div>
    )
  }
}

export default Row
