import Link from 'components/Link'
import { Button } from 'components/themed'
import React from 'react'
import { classList } from 'services/styles'
import styles from './NavLinkSubmenuLink.module.css'

export interface INavLinkSubmenuLinkProps {
  to: string
}

export interface INavLinkSubmenuLinkState {
}

export default class NavLinkSubmenuLink extends React.PureComponent<INavLinkSubmenuLinkProps, INavLinkSubmenuLinkState> {
  render() {
    const { to, children } = this.props

    return (
      <Button muiComponent={Link} href={to} className={classList(styles.button, styles.q)}>
        {children}
      </Button>
    )
  }
}
