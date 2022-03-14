import React from 'react'
import styles from './Tag.module.css'

export interface ITagProps extends React.HTMLProps<HTMLSpanElement> { }

export interface ITagState { }

export default class Tag extends React.Component<ITagProps, ITagState> {
  public render() {
    const { children, className, ...restProps } = this.props

    return (
      <span className={className ? `${className} ${styles.container}` : styles.container} {...restProps}>
        {children}
      </span>
    )
  }
}
