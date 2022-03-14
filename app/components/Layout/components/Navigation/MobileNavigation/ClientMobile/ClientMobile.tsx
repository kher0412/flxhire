import React from 'react'
import { DrawerLink } from 'components'
import styles from 'components/DrawerLink/DrawerLink.module.css'
import {
  MenuItem, ListSubheader, ListItemIcon, ListItemText,
} from '@material-ui/core'
import { unmasq } from 'services/masq'
import { canAccessAdminConsole, isClient, isMember, isRealAdmin } from 'services/user'
import { Dashboard, GroupAdd, Group, AccountCircle, LocalLibrary, ExitToApp, SupervisedUserCircle, Face, Build, People } from '@material-ui/icons'
import { ContainerProps } from './ClientMobileContainer'

export default class ClientMobile extends React.Component<ContainerProps> {
  componentDidMount() {
    this.props.getBadgeData()
  }

  render() {
    const {
      user, logout, goToAdmin,
    } = this.props
    return (
      <div>
        <DrawerLink to="/client/dashboard" data-cy="mobile-client-navigation-dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </DrawerLink>
        <DrawerLink to="/client/hire" data-cy="mobile-client-navigation-hire">
          <ListItemIcon><GroupAdd /></ListItemIcon>
          <ListItemText>Hire</ListItemText>
        </DrawerLink>
        <DrawerLink to="/client/manage" data-cy="mobile-client-navigation-manage">
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText>Manage</ListItemText>
        </DrawerLink>
        <ListSubheader>Account</ListSubheader>
        <DrawerLink to="/account" data-cy="mobile-client-navigation-account">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText>Account</ListItemText>
        </DrawerLink>
        {process.env.FLEXHIRE_ENABLE_BLOG && (
          <DrawerLink to="/blog" data-cy="mobile-client-navigation-blog">
            <ListItemIcon><LocalLibrary /></ListItemIcon>
            <ListItemText>Blog</ListItemText>
          </DrawerLink>
        )}
        <MenuItem onClick={logout} className={styles['menu-item']} data-cy="mobile-logout">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
        {user.real_user && (
          <MenuItem onClick={unmasq} className={styles['menu-item']} data-cy="mobile-unmask">
            <ListItemIcon><Face /></ListItemIcon>
            <ListItemText>Unmask</ListItemText>
          </MenuItem>
        )}
        {isClient(user) && isMember(user) && (
          <MenuItem onClick={this.changeUserType} className={styles['menu-item']}>
            <ListItemIcon><SupervisedUserCircle /></ListItemIcon>
            <ListItemText>Toggle User Type</ListItemText>
          </MenuItem>
        )}
        {canAccessAdminConsole(user) && (
          <MenuItem onClick={goToAdmin} className={styles['menu-item']}>
            <ListItemIcon><Build /></ListItemIcon>
            <ListItemText>Admin Console</ListItemText>
          </MenuItem>
        )}
        {isRealAdmin(user) && (
        <DrawerLink to="/members_pipeline">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText>Members Pipeline</ListItemText>
        </DrawerLink>
        )}
      </div>
    )
  }

  changeUserType = () => this.props.setLayoutType('member')
}
