import React from 'react'
import { Link, Picture } from 'components'
import { getHomeLink } from 'services/router'
import { ICurrentUser } from 'types'
import styles from './Logo.module.css'

const Logo = ({ user, dark, sidebar = false }: { user: ICurrentUser, dark?: boolean, sidebar?: boolean }) => (
  <div className={styles.container}>
    <Link {...getHomeLink(user)}>
      <React.Fragment>
        <Picture
          className={sidebar ? styles.sidebarLogo : styles.logo}
          src={dark ? require('assets/images/logos/flexhhire-logo-black.png?webp') : require('assets/images/logos/flexhire-logo-white.png?webp')}
          srcFallback={dark ? require('assets/images/logos/flexhhire-logo-black.png') : require('assets/images/logos/flexhire-logo-white.png')}
        />
      </React.Fragment>
    </Link>
  </div>
)

export default Logo
