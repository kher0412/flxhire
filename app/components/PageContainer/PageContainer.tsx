import React from 'react'
import { isIframe } from 'services/iframe'
import { classList } from 'services/styles'
import styles from './PageContainer.module.css'

interface IPageContainerProps {
  wide?: boolean
  style?: React.CSSProperties
  className?: string
  contentStyle?: React.CSSProperties
  children?: any
  disableAlignContentToCenter?: boolean
}

/**
 * @deprecated Use the Page and Page* components from components instead for old/centralized layouts, and the Page* components from components/Layouts/V3 for sidebar based layouts instead.
 */
const PageContainer = (props: IPageContainerProps) => {
  let style = {
    ...(props.style || {}),
  }

  if (props.disableAlignContentToCenter) {
    style.alignItems = 'flex-start'
  }

  return (
    <div
      className={classList(styles.container, props.wide && styles.wide, props.className, isIframe() && styles.iframe)}
      style={style}
    >
      <div className={styles.content} style={props.contentStyle}>
        {props.children}
      </div>
    </div>
  )
}

export default PageContainer
