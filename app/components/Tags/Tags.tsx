import React from 'react'
import styles from './Tags.module.css'

export interface ITagsProps extends React.HTMLProps<HTMLSpanElement> {
  separator?: 'default' | 'pipe'
  dense?: boolean
}

export interface ITagsState { }

export default class Tags extends React.Component<ITagsProps, ITagsState> {
  public render() {
    const { separator, children, className, dense, ...restProps } = this.props
    const baseClassName = this.getBaseClassName(separator, dense, className)

    return (
      <span {...restProps} className={baseClassName}>
        {children}
      </span>
    )
  }

  private getBaseClassName(separator: string, dense?: boolean, customClassName?: string) {
    let classList = [] as string[]

    if (separator === 'pipe') {
      classList.push(styles.tagspipe)
    } else {
      classList.push(styles.tags)
    }

    if (dense) {
      classList.push(styles.dense)
    }

    if (customClassName) {
      classList.push(customClassName)
    }

    return classList.join(' ')
  }
}
