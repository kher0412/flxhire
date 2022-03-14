import React from 'react'
import { annualCompensationToHourlyRate, hourlyRateToAnnualCompensation } from 'services/job'
import { RateMode } from 'types'
import RateField from './RateField'

export interface IRateFieldWrapperProps {
  minHourlyRate?: number
  maxHourlyRate?: number
  onMinHourlyRateChange?: (value: number) => void
  onMaxHourlyRateChange?: (value: number) => void
  minAnnualCompensation?: number
  maxAnnualCompensation?: number
  onMinAnnualCompensationChange?: (value: number) => void
  onMaxAnnualCompensationChange?: (value: number) => void
  rateMode?: RateMode
  onRateModeChange: (value: RateMode) => void
  label?: string
  errorText?: string
}

export interface IRateFieldWrapperState {
}

export default class RateFieldWrapper extends React.PureComponent<IRateFieldWrapperProps, IRateFieldWrapperState> {
  render() {
    const {
      minHourlyRate,
      maxHourlyRate,
      minAnnualCompensation,
      maxAnnualCompensation,
      rateMode,
      onRateModeChange,
      label,
      errorText,
    } = this.props

    const minHourlyRateValue = minHourlyRate ?? (annualCompensationToHourlyRate(minAnnualCompensation))
    const maxHourlyRateValue = maxHourlyRate ?? (annualCompensationToHourlyRate(maxAnnualCompensation))

    return (
      <RateField
        minHourlyRate={minHourlyRateValue}
        maxHourlyRate={maxHourlyRateValue}
        onMinHourlyRateChange={this.handleMinRateChange}
        onMaxHourlyRateChange={this.handleMaxRateChange}
        rateMode={rateMode}
        onRateModeChange={onRateModeChange}
        label={label}
        errorText={errorText}
      />
    )
  }

  handleMinRateChange = (value: number) => {
    const { onMinHourlyRateChange, onMinAnnualCompensationChange } = this.props

    if (onMinHourlyRateChange) {
      onMinHourlyRateChange(value)
    }

    if (onMinAnnualCompensationChange) {
      onMinAnnualCompensationChange(hourlyRateToAnnualCompensation(value))
    }
  }

  handleMaxRateChange = (value: number) => {
    const { onMaxHourlyRateChange, onMaxAnnualCompensationChange } = this.props

    if (onMaxHourlyRateChange) {
      onMaxHourlyRateChange(value)
    }

    if (onMaxAnnualCompensationChange) {
      onMaxAnnualCompensationChange(hourlyRateToAnnualCompensation(value))
    }
  }
}
