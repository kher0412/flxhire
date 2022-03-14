import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { isIOS } from 'services/browserAgent'
import { useDispatchAction } from 'hooks'
import { toggleMobileDrawer as toggleMobileDrawerAction } from 'components/Layout/LayoutDucks'
import NavigationMenu from '../../NavigationMenu'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  drawer: {
    width: 288,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 288,
    display: 'block',
    background: 'linear-gradient(180deg, #0057FF 0%, #0085FF 100%)',
  },
})

const NewClientMobile: React.FunctionComponent = () => {
  const classes = useStyles()
  const iOS = isIOS()
  const drawer = useSelector((state: RootState) => state.layout.drawer)
  const openMobileDrawer = useDispatchAction(mobile => toggleMobileDrawerAction({ mobile: true }), [])
  const closeMobileDrawer = useDispatchAction(mobile => toggleMobileDrawerAction({ mobile: false }), [])

  return (
    <SwipeableDrawer
      // Using custom iOS settings as recommended by material-ui
      // https://material-ui.com/demos/drawers/#swipeable-temporary-drawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      swipeAreaWidth={20}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={drawer.mobile}
      onOpen={openMobileDrawer}
      onClose={closeMobileDrawer}
      data-cy="new-client-mobile"
    >
      <NavigationMenu />
    </SwipeableDrawer>
  )
}

export default NewClientMobile
