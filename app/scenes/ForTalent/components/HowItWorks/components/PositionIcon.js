import React from 'react'

export default class PositionIcon extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <svg width="60" height="60" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path d="M57.3813 5.83716H2.63627C1.9763 5.83716 1.34336 6.10118 0.876696 6.57116C0.410029 7.04113 0.147858 7.67854 0.147858 8.34318L0.147858 53.4516C0.147858 54.1162 0.410029 54.7536 0.876696 55.2236C1.34336 55.6936 1.9763 55.9576 2.63627 55.9576H57.3813C58.0412 55.9576 58.6742 55.6936 59.1409 55.2236C59.6075 54.7536 59.8697 54.1162 59.8697 53.4516V8.34318C59.8697 7.67854 59.6075 7.04113 59.1409 6.57116C58.6742 6.10118 58.0412 5.83716 57.3813 5.83716ZM30.0088 45.9335H10.1015V40.9215H30.0088V45.9335ZM49.916 33.4034H10.1015V28.3914H49.916V33.4034ZM49.916 20.8733H10.1015V15.8612H49.916V20.8733Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect x="0.147858" y="0.825195" width="59.7218" height="60.1445" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  }
}
