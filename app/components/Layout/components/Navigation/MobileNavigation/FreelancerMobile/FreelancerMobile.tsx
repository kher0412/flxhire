import React from 'react'
import { DrawerLink } from 'components'
import styles from 'components/DrawerLink/DrawerLink.module.css'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { isFreelancerApplying } from 'services/freelancer'
import { ICurrentUser } from 'types'
import { unmasq } from 'services/masq'
import { canAccessAdminConsole, isClient, isMember, isRealAdmin } from 'services/user'
import { Dashboard, AccountCircle, LocalLibrary, ExitToApp, SupervisedUserCircle, Face, Build, People, Assignment, HowToVote, SupervisorAccount } from '@material-ui/icons'
import { ContainerProps } from './FreelancerMobileContainer'

interface IFreelancerMobileProps extends ContainerProps {
  user: ICurrentUser
}

const FreelancerMobile = ({ user, logout, goToAdmin, setLayoutType }: IFreelancerMobileProps) => {
  if (user.status === 'pending') {
    return (
      <div>
        {user.integration_name && (
        <DrawerLink to="/member/dashboard" data-cy="mobile-freelancer-navigation-dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </DrawerLink>
        )}
        <DrawerLink to="/profile" data-cy="mobile-freelancer-navigation-profile">
          <ListItemIcon><Face /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </DrawerLink>

        <MenuItem onClick={logout} className={styles['menu-item']} data-cy="mobile-logout">
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </div>
    )
  }
  const isApplying = isFreelancerApplying(user.status)
  const changeUserType = () => setLayoutType('client')
  return (
    <div>
      <DrawerLink to="/member/dashboard" data-cy="mobile-freelancer-navigation-dashboard">
        <ListItemIcon><Dashboard /></ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </DrawerLink>

      <DrawerLink to="/profile" data-cy="mobile-freelancer-navigation-profile">
        <ListItemIcon><Face /></ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </DrawerLink>

      {isApplying && (
        <DrawerLink to="/application" data-cy="mobile-freelancer-navigation-application">
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText>Application</ListItemText>
        </DrawerLink>
      )}

      <DrawerLink to="/member/work_reports" data-cy="mobile-freelancer-navigation-timesheets">
        <ListItemIcon><HowToVote /></ListItemIcon>
        <ListItemText>Work Reports</ListItemText>
      </DrawerLink>

      <DrawerLink to="/referrals" data-cy="mobile-freelancer-navigation-referrals">
        <ListItemIcon><SupervisorAccount /></ListItemIcon>
        <ListItemText>Referrals</ListItemText>
      </DrawerLink>

      <DrawerLink to="/account" data-cy="mobile-freelancer-navigation-account">
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText>Account</ListItemText>
      </DrawerLink>

      {process.env.FLEXHIRE_ENABLE_BLOG && (
        <DrawerLink to="/blog" data-cy="mobile-freelancer-navigation-blog">
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
      {isMember(user) && isClient(user) && (
        <MenuItem onClick={changeUserType} className={styles['menu-item']}>
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

export default FreelancerMobile
