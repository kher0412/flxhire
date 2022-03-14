import { Typography } from '@material-ui/core'
import React from 'react'
import styles from './PageHeaderTitle.module.css'

export interface IPageHeaderTitleProps extends React.HTMLProps<HTMLDivElement> {
  variant?: 'center' | 'default'
}

export default class PageHeaderTitle extends React.Component<IPageHeaderTitleProps, {}> {
  render() {
    const { children, className, variant, ...other } = this.props

    return (
      <div className={this.getClassName(className, variant)} {...other}>
        <Typography variant="h1">
          {children}
        </Typography>
      </div>
    )
  }

  getClassName(className: string, variant: string): string {
    const classList = [styles['header-title']]

    if (className) {
      classList.push(className)
    }

    if (variant === 'center') {
      classList.push(styles.center)
    }

    return classList.join(' ')
  }
}
