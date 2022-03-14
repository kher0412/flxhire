import React from 'react'
import styles from './PageHeaderDivider.module.css'

export default class PageHeaderDivider extends React.PureComponent {
  render() {
    const { children, styleName, ...restProps } = this.props

    return (
      <div className={styleName ? `${styles.divider} ${styleName}` : styles.divider} {...restProps} />
    )
  }
}
