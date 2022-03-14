import React from 'react'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { Suspense } from 'components'
import NewClientDesktop from '../Navigation/DesktopNavigation/NewClientDesktop'
import NewClientMobile from '../Navigation/MobileNavigation/NewClientMobile'
import ClientHeader from '../ClientHeader'

// screen size under which the mobile-drawer is used
// note: this is also used by the PageBody component
export const SIDEBAR_BREAKPOINT = 1200

const Sidebar: React.FunctionComponent = () => {
  const isSmallScreen = useMediaQuery(`(max-width: ${SIDEBAR_BREAKPOINT}px)`)

  return (
    <React.Fragment>
      <ClientHeader />

      <Suspense>
        {!isSmallScreen ? (
          <NewClientDesktop />
        ) : (
          <NewClientMobile />
        )}
      </Suspense>
    </React.Fragment>
  )
}

export default Sidebar
