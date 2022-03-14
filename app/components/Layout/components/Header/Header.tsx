import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import NavigationMenu from '@material-ui/icons/Menu'
import dynamic from 'services/dynamic'
import { Logo } from 'components'
import { NextRouter } from 'next/router'
import { ICurrentUser } from 'types'
import { useCurrentUser, useDispatchAction } from 'hooks'
import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { toggleMobileDrawer as toggleMobileDrawerAction } from 'components/Layout/LayoutDucks'
import { ContainerProps } from './HeaderContainer'
import styles from './Header.module.css'
import DesktopNavigation from '../Navigation/DesktopNavigation'

const MobileNavigation = dynamic(() => import(/* webpackChunkName: "MobileNavigation" */'../Navigation/MobileNavigation')) as any

interface IHeaderProps extends ContainerProps {
  variant: 'primary' | 'default'
  router: NextRouter
}

const Header = ({ variant = 'primary', router, type }: IHeaderProps) => {
  const [user] = useCurrentUser()
  const drawer = useSelector((state: RootState) => state.layout.drawer)
  const openDrawer = useDispatchAction(mobile => toggleMobileDrawerAction({ mobile: true }), [])
  const closeDrawer = useDispatchAction(mobile => toggleMobileDrawerAction({ mobile: false }), [])

  return (
    <React.Fragment>
      <AppBar
        className={styles.bar}
        id="top-bar"
        position="static"
        style={{ backgroundColor: (variant === 'primary') ? '#0057FF' : '#fff' }}
        color={variant === 'primary' ? 'primary' : undefined}
      >
        <Toolbar>
          <IconButton
            className={styles.sandwich}
            onClick={openDrawer}
            data-cy="mobile-navigation"
            style={(variant === 'primary') ? undefined : { filter: 'invert(100%)' }}
          >
            <NavigationMenu />
          </IconButton>

          <div className={styles.logo} style={(variant === 'primary') ? undefined : { filter: 'invert(100%)' }}>
            <Logo user={user} />
          </div>

          <div className={(variant === 'primary') ? styles.navigation : [styles.navigation, styles.alternative].join(' ')}>
            <DesktopNavigation user={user} type={type} router={router} />
          </div>

          <div id="mobile-sidebar-button-container" className={styles.sidebarButtonContainer} />
        </Toolbar>
      </AppBar>

      <MobileNavigation
        user={user}
        router={router}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        drawer={drawer}
        type={type}
      />
    </React.Fragment>
  )
}

export default Header
