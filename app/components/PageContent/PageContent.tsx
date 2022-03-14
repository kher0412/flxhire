import React from 'react'
import { Card } from '@material-ui/core'
import { classList } from 'services/styles'
import PageContext from '../Page/context'
import styles from './PageContent.module.css'

export type MaxWidth = 'md' | 'lg' | 'xl'

export interface IPageContentProps extends React.HTMLProps<HTMLDivElement> {
  card?: boolean
  maxWidth?: MaxWidth
}

function getStyle(style: React.CSSProperties, width: number): React.CSSProperties {
  if (style) {
    return {
      ...style,
      maxWidth: width || '100vw',
    }
  }

  return {
    maxWidth: width || '100vw',
  }
}

function getWidth(maxWidth: MaxWidth): number {
  switch (maxWidth) {
    case 'xl':
      return 1200

    case 'lg':
      return 992

    case 'md':
      return 768

    default:
      return undefined
  }
}

const PageContent: React.FunctionComponent<IPageContentProps> = (props) => {
  const { children, className, card, maxWidth, style, ...restProps } = props
  const { sidebar, sidebarMode } = React.useContext(PageContext)
  const isColumnMode = (sidebar && sidebarMode === 'column')
  const containerClassName = classList(styles.container, isColumnMode && styles.column, className)
  const containerStyle = getStyle(style, getWidth(maxWidth))

  if (card) {
    return (
      <Card raised className={containerClassName} style={containerStyle} {...restProps as any}>
        {children}
      </Card>
    )
  }

  return (
    <div className={containerClassName} style={containerStyle} {...restProps}>
      {children}
    </div>
  )
}

export default PageContent
