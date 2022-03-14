import React from 'react'
import styles from './AvailabilityChip.module.css'


class AvailabilityChip extends React.Component {
  constructor(props) {
    super(props)
    this.label = this.label.bind(this)
  }

  label(availability) {
    return {
      available_now: 'available now',
      available_soon: 'available soon',
      not_available: 'not available',
      working: 'working',
    }[availability]
  }

  render() {
    let { availability, current, onClick } = this.props
    onClick = onClick || function () {}
    const className = [
      styles.availability,
      styles[availability],
      current !== availability ? styles.disabled : null,
    ].filter(x => !!x).join(' ')

    return (
      <div
        className={className}
        onClick={() => onClick(availability)}
        data-cy="availability-chip"
        role="button"
      >
        {this.label(availability)}
      </div>
    )
  }
}

export default AvailabilityChip
