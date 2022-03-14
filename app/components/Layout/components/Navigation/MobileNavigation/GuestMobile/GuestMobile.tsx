import React from 'react'
import { DrawerLink } from 'components'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InfoIcon from '@material-ui/icons/Info'
import LoginIcon from '@material-ui/icons/AccountCircle'
import SignUpIcon from '@material-ui/icons/AddCircle'
import PersonIcon from '@material-ui/icons/Person'
import BusinessIcon from '@material-ui/icons/Business'
import WorkIcon from '@material-ui/icons/Work'
import BlogIcon from '@material-ui/icons/LocalLibrary'
import { goToLogin, goToSignup } from 'services/router'
import { NextRouter } from 'next/router'

const GuestMobile = ({ router }: { router: NextRouter}) => (
  <div>
    <DrawerLink to="/talent" data-cy="mobile-for-talent">
      <ListItemIcon><PersonIcon /></ListItemIcon>
      <ListItemText>For Talent</ListItemText>
    </DrawerLink>

    <DrawerLink to="/companies" data-cy="mobile-guest-navigation-for-companies">
      <ListItemIcon><BusinessIcon /></ListItemIcon>
      <ListItemText>For Companies</ListItemText>
    </DrawerLink>

    <DrawerLink to="/how_it_works" data-cy="mobile-guest-navigation-how-it-works">
      <ListItemIcon><InfoIcon /></ListItemIcon>
      <ListItemText>About Flexhire</ListItemText>
    </DrawerLink>

    <DrawerLink to="/faq" data-cy="mobile-guest-navigation-faq">
      <ListItemIcon><HelpIcon /></ListItemIcon>
      <ListItemText>FAQ</ListItemText>
    </DrawerLink>

    {process.env.FLEXHIRE_ENABLE_BLOG && (
      <DrawerLink to="/blog" data-cy="mobile-guest-navigation-blog">
        <ListItemIcon><BlogIcon /></ListItemIcon>
        <ListItemText>Blog</ListItemText>
      </DrawerLink>
    )}

    <DrawerLink href="/[...slugs]" as="/careers" data-cy="mobile-guest-navigation-careers">
      <ListItemIcon><WorkIcon /></ListItemIcon>
      <ListItemText>Careers</ListItemText>
    </DrawerLink>

    <DrawerLink onClick={() => goToLogin(router)} data-cy="mobile-guest-navigation-login">
      <ListItemIcon><LoginIcon /></ListItemIcon>
      <ListItemText>Login</ListItemText>
    </DrawerLink>

    <DrawerLink onClick={() => goToSignup(router)} data-cy="mobile-guest-navigation-signup">
      <ListItemIcon><SignUpIcon /></ListItemIcon>
      <ListItemText>Sign Up</ListItemText>
    </DrawerLink>
  </div>
)

export default GuestMobile
