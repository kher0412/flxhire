import React from 'react'
import clsx from 'clsx'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useMediaQuery } from 'hooks/useMediaQuery'

import { isGuest } from 'services/user'
import { useCurrentUser, useDispatchAction, useSelector } from 'hooks'
import { toggleDesktopDrawer as toggleDesktopDrawerAction, toggleMobileDrawer as toggleMobileDrawerAction } from 'components/Layout/LayoutDucks'
import HeaderAvatar from '../HeaderAvatar'
import styles from './ClientHeader.module.css'

const ClientHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1200px)')
  const openDesktopDrawer = useDispatchAction(desktop => toggleDesktopDrawerAction({ desktop: true }), [])
  const openMobileDrawer = useDispatchAction(mobile => toggleMobileDrawerAction({ mobile: true }), [])
  const drawer = useSelector(state => state.layout.drawer)
  const [user] = useCurrentUser()

  const openDrawer = () => {
    if (isSmallScreen) {
      openMobileDrawer()
    } else {
      openDesktopDrawer()
    }
  }

  return (
    <React.Fragment>
      <AppBar
        className={clsx(styles.appBar, {
          [styles.appBarShift]: drawer.desktop && !isSmallScreen,
        })}
        position="static"
        elevation={0}
        data-cy="client-header"
      >
        <Toolbar>
          <div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
                edge="start"
                className={clsx(styles.menuButton, {
                  [styles.hide]: drawer.desktop && !isSmallScreen,
                })}
                data-cy="open-drawer"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
          {!isGuest(user) && <HeaderAvatar />}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default ClientHeader
