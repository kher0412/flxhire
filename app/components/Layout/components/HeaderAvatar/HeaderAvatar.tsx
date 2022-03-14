import React, { useState } from 'react'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Menu, MenuItem } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { unmasq } from 'services/masq'
import { trackError } from 'services/analytics'
import { canAccessAdminConsole, canAccessMembersPipeline, getRealUser, isRealAdmin, isGuest, isMember, isClient, canAccessHireAdminTools } from 'services/user'
import { useCurrentUser, useDispatchAction, useSnackbar } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { setLayoutType as setLayoutTypeAction } from 'components/Layout/LayoutDucks'
import { openMaskDialog as openMaskDialogAction } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { GOTO_ADMIN, LOGOUT } from 'reducers/Auth'
import { UserAvatar } from 'components'
import styles from './HeaderAvatar.module.css'

const useContainer = () => {
  const [user] = useCurrentUser()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverAnchor, setPopoverAnchor] = useState(null)
  const showSnackbarMessage = useSnackbar()
  const variant = useSelector((state: RootState) => state.layout.header.variant || 'primary')
  const layoutType = useSelector((state: RootState) => state.layout.type)
  const setLayoutType = useDispatchAction(type => setLayoutTypeAction({ type }), [])
  const openMaskDialog = useDispatchAction(openMaskDialogAction, [])
  const dispatch = useDispatch()

  const openPopover = (event) => {
    setPopoverOpen(true)
    setPopoverAnchor(event.currentTarget)
  }

  const closePopover = () => setPopoverOpen(false)

  const logout = () => {
    closePopover()
    dispatch(createAction(LOGOUT)())
  }

  const changeUserType = async () => {
    try {
      if (layoutType === 'client') setLayoutType('member')
      if (layoutType === 'member') setLayoutType('client')
    } catch (error) {
      showSnackbarMessage(error.response || error.message)
      trackError(error)
    }
  }

  const goToAdmin = () => {
    closePopover()
    dispatch(createAction(GOTO_ADMIN)())
  }

  const goToMembersPipeline = () => {
    closePopover()
    browserHistory.push('/members_pipeline')
  }

  const goToHirePipeline = () => {
    closePopover()
    browserHistory.push('/client/hire')
  }

  return {
    user,
    logout,
    openMaskDialog,
    variant,
    goToAdmin,
    goToMembersPipeline,
    goToHirePipeline,
    closePopover,
    openPopover,
    popoverOpen,
    popoverAnchor,
    changeUserType,
  }
}

const HeaderAvatar = () => {
  const {
    user,
    goToAdmin,
    goToMembersPipeline,
    goToHirePipeline,
    closePopover,
    openPopover,
    variant,
    popoverOpen,
    popoverAnchor,
    logout,
    changeUserType,
    openMaskDialog,
  } = useContainer()

  if (!user || isGuest(user)) return null

  return (
    <div className={styles.container}>
      <UserAvatar url={user.avatar_url} name={user.first_name} style={{ marginRight: 12 }} />

      {isClient(user) ? (
        <div style={{ marginLeft: '6px' }}>
          <div className={styles.clientName} data-cy="logged-in-name" style={variant !== 'primary' ? { color: '#04041E' } : undefined}>
            WELCOME, {user.first_name}!
          </div>
          {/* <div className={styles.logout} data-cy="logout" onClick={logout}>
            Log out
          </div> */}
        </div>
      ) : (
        <div className={styles.name} data-cy="logged-in-name" style={variant !== 'primary' ? { color: 'rgba(0, 0, 0, 0.6)' } : undefined}>
          {user.first_name}
        </div>
      )}

      <React.Fragment>
        <ExpandMore className={isClient(user) ? styles['expand-more-black'] : styles['expand-more']} onClick={openPopover} data-cy="avatar-header-more" />
        <Menu
          open={popoverOpen}
          anchorEl={popoverAnchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          onClose={closePopover}
          className={styles.popover}
        >
          <MenuItem onClick={logout} data-cy="logout">LOGOUT</MenuItem>
          {isRealAdmin(user) && <MenuItem onClick={openMaskDialog} data-cy="mask">Quick Mask...</MenuItem>}
          {user.real_user && <MenuItem onClick={unmasq} data-cy="unmask">Unmask</MenuItem>}
          {isMember(user) && isClient(user) && <MenuItem onClick={changeUserType}>Toggle User Type</MenuItem>}
          {canAccessAdminConsole(getRealUser(user)) && <MenuItem onClick={goToAdmin}>Admin Console</MenuItem>}
          {canAccessMembersPipeline(getRealUser(user)) && <MenuItem onClick={goToMembersPipeline}>Members Pipeline</MenuItem>}
          {canAccessHireAdminTools(getRealUser(user)) && <MenuItem onClick={goToHirePipeline}>Hire Pipeline</MenuItem>}
        </Menu>
      </React.Fragment>
    </div>
  )
}

export default HeaderAvatar
