import React from 'react'
import { useSelector } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { SIDEBAR_BREAKPOINT } from 'components/Layout/components/Sidebar/Sidebar'
import { Suspense, SuspensePlaceholder } from 'components'
import { PageLoadingIndicator } from '..'
import styles from './PageBody.module.css'

export interface IPageBodyProps {
  children?: React.ReactNode
}

function PageBody(props: IPageBodyProps) {
  const { children } = props
  const desktopDrawerOpen = useSelector(state => state.layout.drawer.desktop)
  const isSmallScreen = useMediaQuery(`(max-width: ${SIDEBAR_BREAKPOINT}px)`)
  const addSpaceForSideNav = desktopDrawerOpen && !isSmallScreen

  return (
    <div
      className={styles.container}
      style={addSpaceForSideNav ? { maxWidth: 'calc(100vw - 320px)' } : undefined}
    >
      <Suspense fallback={<PageLoadingIndicator />} ErrorFallbackComponent={errorProps => <SuspensePlaceholder {...errorProps} raised={false} flat />}>
        {children}
      </Suspense>
    </div>
  )
}

export default PageBody
