import React from 'react'
import { classList } from 'services/styles'
import styles from './PageHeaderStepper.module.css'

export interface IPageHeaderStepperProps extends React.HTMLProps<HTMLDivElement> {
  icon?: React.ReactNode
}

export interface IPageHeaderStepperState { }

export default class PageHeaderStepper extends React.Component<IPageHeaderStepperProps, IPageHeaderStepperState> {
  render() {
    const { icon, children, className, ...restProps } = this.props

    return (
      <div className={classList(className, styles.container)} {...restProps}>
        {children}
      </div>
    )
  }
}
