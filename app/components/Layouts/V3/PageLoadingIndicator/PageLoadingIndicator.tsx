import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useComponentBounds } from 'hooks/useComponentBounds'
import { useWindowSize } from 'hooks/useWindowSize'
import styles from './PageLoadingIndicator.module.css'

const PageLoadingIndicator = ({ style }: { style?: React.CSSProperties }) => {
  const { bounds, boundsRef } = useComponentBounds<HTMLDivElement>()
  const { innerHeight } = useWindowSize()
  const minHeight = 96
  const maxHeight = Math.min(innerHeight * 0.8, 480)

  return (
    <div
      ref={boundsRef}
      className={styles.container}
      style={{ height: Math.max(minHeight, Math.min(bounds.width, maxHeight)) }}
      data-cy="loading-page"
    >
      <CircularProgress size={90} thickness={2} style={style} />
    </div>
  )
}

export default React.memo(PageLoadingIndicator)
