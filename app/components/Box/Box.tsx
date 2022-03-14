import React from 'react'
import { classList } from 'services/styles'
import styles from './Box.module.css'

export interface IBoxProps {
  compact?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

/**
 * @deprecated use the Box component from themed folder instead
 */
const Box = (props: IBoxProps) => {
  const { compact, children, className, ...restProps } = props

  return (
    <div className={classList(styles.box, compact ? styles.compact : undefined, className)} {...restProps}>
      {children}
    </div>
  )
}

export default Box
