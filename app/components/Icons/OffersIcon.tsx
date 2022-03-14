/* eslint-disable max-len */
import React from 'react'

export interface IOffersIconProps {
  width?: number
  height?: number
}

export interface IOffersIconState {
}

export default class OffersIcon extends React.PureComponent<IOffersIconProps, IOffersIconState> {
  render() {
    const { width = 69, height = 52 } = this.props

    return (
      <svg width={width} height={height} viewBox="0 0 69 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.1828 43.7063H60.5841V43.305V8.91646V8.51514H60.1828H8.60006H8.19874V8.91646V43.305V43.7063H8.60006H60.1828ZM4.30149 0.720658H64.4814C65.6797 0.720658 66.6472 1.11836 67.3141 1.78522C67.9809 2.45207 68.3786 3.41953 68.3786 4.6179V47.6035C68.3786 48.8019 67.9809 49.7694 67.3141 50.4362C66.6472 51.1031 65.6797 51.5008 64.4814 51.5008H4.30149C3.10312 51.5008 2.13567 51.1031 1.46881 50.4362C0.801956 49.7694 0.404251 48.8019 0.404251 47.6035V4.6179C0.404251 3.41953 0.801956 2.45207 1.46881 1.78522C2.13567 1.11836 3.10312 0.720658 4.30149 0.720658Z" fill="white" stroke="#0167FF" strokeWidth="0.802643" />
        <path d="M34.3913 34.7079C39.1394 34.7079 42.9884 30.8589 42.9884 26.1108C42.9884 21.3627 39.1394 17.5137 34.3913 17.5137C29.6433 17.5137 25.7942 21.3627 25.7942 26.1108C25.7942 30.8589 29.6433 34.7079 34.3913 34.7079Z" fill="white" />
      </svg>
    )
  }
}
