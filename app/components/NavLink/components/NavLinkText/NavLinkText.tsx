import React from 'react'
import { CardContent } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './NavLinkText.module.css'

export interface INavLinkTextProps {
  style?: React.CSSProperties
  className?: string
}

export interface INavLinkTextState {
}

export default class NavLinkText extends React.Component<INavLinkTextProps, INavLinkTextState> {
  render() {
    return (
      <CardContent className={classList(styles.container, this.props.className)} style={this.props.style}>
        {this.props.children}
      </CardContent>
    )
  }
}
