import React from 'react'
import { Fade } from '@material-ui/core'
import { Suspense, SuspensePlaceholder } from 'components'
import { Box } from 'components/themed'
import { classList, getStandardWidth, StandardWidth } from 'services/styles'
import { PageLoadingIndicator } from '..'
import styles from './PageContent.module.css'

export interface IPageContentProps extends React.HTMLProps<HTMLDivElement> {
  maxWidth?: StandardWidth
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

const PageContent: React.FunctionComponent<IPageContentProps> = (props) => {
  const { children, className, maxWidth, style, ...restProps } = props

  return (
    <Suspense fallback={<PageLoadingIndicator />} ErrorFallbackComponent={errorProps => <SuspensePlaceholder {...errorProps} raised={false} flat />}>
      <Fade appear in>
        <div className={classList(styles.container, className)} style={getStyle(style, getStandardWidth(maxWidth))} {...restProps}>
          <Box className={styles.box}>
            {children}
          </Box>
        </div>
      </Fade>
    </Suspense>
  )
}

export default PageContent
