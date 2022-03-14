import React from 'react'
import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import NavigationMenu from '../../NavigationMenu'
import styles from '../DesktopNavigation.module.css'

const NewClientDesktop: React.FunctionComponent = () => {
  const drawer = useSelector((state: RootState) => state.layout.drawer)

  return (
    <Drawer
      className={styles.drawer}
      variant="persistent"
      anchor="left"
      open={drawer.desktop}
      classes={{
        paper: styles.drawerPaper,
      }}
      data-cy="new-client-desktop"
    >
      <NavigationMenu />
    </Drawer>
  )
}

export default NewClientDesktop
