import React from 'react'
import { classList } from 'services/styles'
import styles from './IndustryTile.module.css'

export interface IIndustryTileProps {
  icon: React.ReactNode
  name: string
  shortName: string
  selected?: boolean
  onClick?: () => void
}

export interface IIndustryTileState {
}

export default class IndustryTile extends React.PureComponent<IIndustryTileProps, IIndustryTileState> {
  render() {
    return (
      <div
        className={classList(styles.container, this.props.selected && styles.selected)}
        onClick={this.props.onClick}
        role="button"
        data-cy={`tile-${this.props.shortName}`}
      >
        <div className={styles.icon}>
          {this.props.icon}
        </div>

        <div className={styles.name}>
          {this.props.name}
        </div>
      </div>
    )
  }
}
