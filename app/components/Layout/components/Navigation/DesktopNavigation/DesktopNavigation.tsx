import React from 'react'
import { ICurrentUser } from 'types'
import { NextRouter } from 'next/router'
import { LayoutType } from 'components/Layout/LayoutDucks'
import { isGuest } from 'services/user'
import styles from './DesktopNavigation.module.css'
import HeaderAvatar from '../../HeaderAvatar'
import ClientDesktop from './ClientDesktop'
import FreelancerDesktop from './FreelancerDesktop'
import GuestDesktop from './GuestDesktop'

export interface NavigationProps {
  user: ICurrentUser
  router: NextRouter
}

function DesktopNavigationContent({ user, router, type }: { user: ICurrentUser, router: NextRouter, type: LayoutType }) {
  switch (type) {
    case 'member':
      return <FreelancerDesktop user={user} />

    case 'client':
      return <ClientDesktop router={router} />

    default:
      return <GuestDesktop router={router} />
  }
}

function NavigationContainer({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>{children}</div>
    </div>
  )
}

export default function DesktopNavigation({ user, router, type }: NavigationProps & { type: LayoutType }) {
  return (
    <NavigationContainer>
      <DesktopNavigationContent user={user} router={router} type={type} />
      {!isGuest(user) && <HeaderAvatar />}
    </NavigationContainer>
  )
}
