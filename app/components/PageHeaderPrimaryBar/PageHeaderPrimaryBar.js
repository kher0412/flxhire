import React from 'react'
import Card from '@material-ui/core/Card'
import styles from './PageHeaderPrimaryBar.module.css'

export default class PageHeaderPrimaryBar extends React.PureComponent {
  render() {
    const { children, styleName, ...restProps } = this.props

    return (
      <Card className={this.getStyleName()} raised {...restProps}>
        {children}
      </Card>
    )
  }

  getStyleName() {
    const { disablePadding, styleName } = this.props
    const styleList = [styles.card]

    if (disablePadding) {
      styleList.push(styles['no-pad'])
    }

    if (styleName) {
      styleList.push(styleName)
    }

    return styleList.join(' ')
  }
}
