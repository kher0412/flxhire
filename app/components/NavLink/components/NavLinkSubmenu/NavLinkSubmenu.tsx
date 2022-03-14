import { CardActions } from '@material-ui/core'
import React from 'react'
import { classList } from 'services/styles'
import styles from './NavLinkSubmenu.module.css'

export interface INavLinkSubmenuProps {
  style?: React.CSSProperties
  className?: string
}

export interface INavLinkSubmenuState {
}

export default class NavLinkSubmenu extends React.PureComponent<INavLinkSubmenuProps, INavLinkSubmenuState> {
  render() {
    return (
      <CardActions className={classList(styles.container, this.props.className)} style={this.props.style}>
        {this.props.children}
      </CardActions>
    )
  }
}
