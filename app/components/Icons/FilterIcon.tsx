/* eslint-disable max-len */
import React from 'react'

export interface IFilterIconProps {
  width?: number
  height?: number
}

export interface IFilterIconState {
}

export default class FilterIcon extends React.PureComponent<IFilterIconProps, IFilterIconState> {
  render() {
    const { width = 72, height = 72 } = this.props

    return (
      <svg width={width} height={height} viewBox="0 0 81 76" fill="none" style={{ marginRight: 36 }}>
        <path d="M77.3462 14.7773L48.1378 47.7251V73.1281H32.8959V47.7251L3.6875 14.7773" stroke="#2ecb80" strokeWidth="4" strokeMiterlimit="10" />
        <path d="M40.5167 22.3224C61.5613 22.3224 78.6213 17.7731 78.6213 12.1612C78.6213 6.54933 61.5613 2 40.5167 2C19.4721 2 2.41211 6.54933 2.41211 12.1612C2.41211 17.7731 19.4721 22.3224 40.5167 22.3224Z" stroke="#2ecb80" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
      </svg>
    )
  }
}
