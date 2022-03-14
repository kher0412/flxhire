import React from 'react'
import styles from './PageHeaderText.module.css'

export default class PageHeaderText extends React.PureComponent {
  render() {
    const { children, styleName, ...restProps } = this.props

    return (
      <div className={styleName ? `${styles.container} ${styleName}` : styles.container} {...restProps}>
        {children}
      </div>
    )
  }
}
