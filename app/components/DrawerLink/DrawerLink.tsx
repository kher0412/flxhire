import React from 'react'
import Link from 'components/Link'
import { MenuItem } from '@material-ui/core'
import styles from './DrawerLink.module.css'
import { ContainerProps } from './DrawerLinkContainer'

interface IDrawerLinkProps extends ContainerProps {
  href?: string
  to?: string
  as?: string
  onClick?: () => void
  children?: any
  label?: string
}

export default class DrawerLink extends React.Component<IDrawerLinkProps> {
  handleTouchTap = () => {
    const { closeDrawer, onClick } = this.props
    closeDrawer()
    onClick()
  }

  render() {
    const { label, to, href, as, onClick, closeDrawer, children } = this.props

    if (href || to) {
      return (
        <Link className={styles.link} href={href || to} as={as}>
          <MenuItem onClick={closeDrawer} className={styles['menu-item']} data-cy={this.props['data-cy']}>{children || label}</MenuItem>
        </Link>
      )
    }
    if (onClick) {
      return <MenuItem onClick={this.handleTouchTap} className={styles['menu-item']} data-cy={this.props['data-cy']}>{children || label}</MenuItem>
    }
    return null
  }
}
