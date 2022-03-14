import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { SIDEBAR_BREAKPOINT } from 'components/Layout/components/Sidebar/Sidebar'
import styles from './PageBody.module.css'

export interface IPageBodyProps {
  children?: React.ReactNode
  alignContentToCenter?: boolean
}

function PageBody(props: IPageBodyProps) {
  const { children, alignContentToCenter = true } = props
  const desktopDrawerOpen = useSelector(state => state.layout.drawer.desktop)
  const isSmallScreen = useMediaQuery(`(max-width: ${SIDEBAR_BREAKPOINT}px)`)
  const addSpaceForSideNav = desktopDrawerOpen && !isSmallScreen

  return (
    <div
      className={clsx(styles.container, {
        [styles.justifyCenter]: alignContentToCenter,
      })}
      style={addSpaceForSideNav ? { maxWidth: 'calc(100vw - 320px)' } : undefined}
    >
      {children}
    </div>
  )
}

export default PageBody
