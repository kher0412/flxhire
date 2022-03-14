import React from 'react'
import styles from './PageHeaderSubtitle.module.css'

export default class PageHeaderSubtitle extends React.PureComponent {
  render() {
    const { className, children, variant, ...restProps } = this.props

    return (
      <div className={this.getClassName()} {...restProps}>
        {children}
      </div>
    )
  }

  getClassName() {
    const { className, variant } = this.props
    const classList = [styles.container]

    if (className) {
      classList.push(className)
    }

    if (variant === 'center') {
      classList.push(styles.center)
    }

    return classList.join(' ')
  }
}
