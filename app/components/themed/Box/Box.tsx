import React from 'react'
import { conditionalClassList } from 'services/styles'
import styles from './Box.module.css'

export interface IBoxProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  variant?: 'default' | 'wide' | 'compact'
  disableTopPadding?: boolean
  disableBottomPadding?: boolean
}

const Box = (props: IBoxProps) => {
  const { children, className, variant, disableBottomPadding, disableTopPadding, ...restProps } = props

  return (
    <div
      className={conditionalClassList({
        [styles.box]: true,
        [styles.noPadTop]: disableTopPadding,
        [styles.noPadBottom]: disableBottomPadding,
        [styles[variant]]: Boolean(variant),
        [className]: true,
      })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default Box
