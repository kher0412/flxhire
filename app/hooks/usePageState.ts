import React from 'react'
import { DRAWER_MODE_BREAKPOINT } from 'components/Layouts/V3/PageSidebar/PageSidebar'
import PageContext from 'components/Layouts/V3/context'
import { useMediaQuery } from './useMediaQuery'

export interface IPageStateHookResult {
  pageSidebarHidden: boolean
  pageSidebarOpen: boolean
  setPageSidebarOpen: (value: boolean) => void
}

/**
 * React hook to read and alter the state of the current Page layout.
 */
export function usePageState(): IPageStateHookResult {
  const isSmallScreen = useMediaQuery(`(max-width:${DRAWER_MODE_BREAKPOINT}px)`)
  const { secondarySidebarOpen, setSecondarySidebarOpen } = React.useContext(PageContext)

  return {
    pageSidebarHidden: isSmallScreen,
    pageSidebarOpen: secondarySidebarOpen,
    setPageSidebarOpen: setSecondarySidebarOpen,
  }
}
