import React from 'react'
import { AnimBox, AvailabilityChip } from 'components'
import styles from './AvailabilityOptions.module.css'

export default class AvailabilityOptions extends React.Component {
  render() {
    return (
      <div className={styles['availability-options']}>
        {this.renderContent()}
      </div>
    )
  }

  renderContent() {
    const { input: { value, onChange }, meta: { touched, error } } = this.props

    if (value === 'working') {
      return (
        <div className={styles['availability-chip']}>
          <AvailabilityChip availability="working" current="working" />
        </div>
      )
    }

    return ['available_now', 'available_soon', 'not_available'].map((availability, index) => (
      <AnimBox grow delay={index * 200} key={availability}>
        <div className={styles['availability-chip']}>
          <AvailabilityChip
            availability={availability}
            current={value}
            onClick={() => onChange(availability)}
            key={availability}
          />
        </div>
      </AnimBox>
    ))
  }
}
