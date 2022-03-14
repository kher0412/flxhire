import React from 'react'
import { SwipeableDrawer } from '@material-ui/core'
import { ICurrentUser } from 'types'
import { NextRouter } from 'next/router'
import { isIOS } from 'services/browserAgent'
import { LayoutType } from 'components/Layout/LayoutDucks'
import ClientMobile from './ClientMobile'
import FreelancerMobile from './FreelancerMobile'
import GuestMobile from './GuestMobile'

export interface MobileNavigationProps {
  user: ICurrentUser
  router: NextRouter
  drawer: { desktop: boolean, mobile: boolean }
  type: LayoutType
  openDrawer: () => void
  closeDrawer: () => void
}

function MobileNavigationContent({ user, router, type }: { user: ICurrentUser, router: NextRouter, type: LayoutType }) {
  switch (type) {
    case 'member':
      return <FreelancerMobile user={user} />

    case 'client':
      return <ClientMobile />

    default:
      return <GuestMobile router={router} />
  }
}

export default function MobileNavigation({ user, router, drawer, openDrawer, closeDrawer, type }: MobileNavigationProps) {
  const iOS = isIOS()
  return (
    <SwipeableDrawer
      // Using custom iOS settings as recommended by material-ui
      // https://material-ui.com/demos/drawers/#swipeable-temporary-drawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      swipeAreaWidth={20}
      open={drawer.mobile}
      onOpen={openDrawer}
      onClose={closeDrawer}
    >
      <MobileNavigationContent user={user} router={router} type={type} />
    </SwipeableDrawer>
  )
}
