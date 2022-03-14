import React from 'react'
import styles from './SliderStep.module.css'

const POSITION_ALPHA_OFFSET = 0.625 // radians

export default class SliderStep extends React.PureComponent {
  render() {
    const { selected, onClick, positionAlpha = 0, positionRadius = 0, children, style = {} } = this.props

    // Compute cartesian coordinates from polar coordinates (angle alpha and radius).
    const positionX = positionRadius + (positionRadius * Math.cos(Math.PI * 2 * (positionAlpha + POSITION_ALPHA_OFFSET)))
    const positionY = positionRadius + (positionRadius * Math.sin(Math.PI * 2 * (positionAlpha + POSITION_ALPHA_OFFSET)))

    return (
      <div
        className={selected ? `${styles.container} ${styles.selected}` : styles.container}
        onClick={onClick}
        role="button"
        style={{
          left: positionX,
          top: positionY,
          ...style,
        }}
      >
        {children}
      </div>
    )
  }
}
