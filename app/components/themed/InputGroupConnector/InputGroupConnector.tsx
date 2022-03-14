import React from 'react'
import { classList } from 'services/styles'
import styles from './InputGroupConnector.module.css'

export interface IInputGroupConnectorProps {
  style?: React.CSSProperties
  className?: string
}

export interface IInputGroupConnectorState {
}

export default class InputGroupConnector extends React.Component<IInputGroupConnectorProps, IInputGroupConnectorState> {
  render() {
    return (
      <div className={classList(styles.container, this.props.className)} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}
