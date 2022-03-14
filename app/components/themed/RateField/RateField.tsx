import React from 'react'
import { MenuItem } from '@material-ui/core'
import { RateMode } from 'types'
import { hourlyRateToAnnualCompensation, hourlyRateToMonthlyRate, hourlyRateToDailyRate, getRateText, getComputedRate } from 'services/job'
import { roundCurrency } from 'services/formatting'
import InputGroup from '../InputGroup'
import InputGroupConnector from '../InputGroupConnector'
import SelectField from '../SelectField'
import NumberField from '../NumberField'

export interface IRateFieldProps {
  label?: string
  minHourlyRate: number
  maxHourlyRate: number
  onMinHourlyRateChange: (value: number) => void
  onMaxHourlyRateChange: (value: number) => void
  rateMode: RateMode
  onRateModeChange: (value: RateMode) => void
  errorText?: string
}

export interface IRateFieldState {
}

export default class RateField extends React.PureComponent<IRateFieldProps, IRateFieldState> {
  render() {
    const { minHourlyRate, maxHourlyRate, rateMode, label, errorText } = this.props
    const hasError = !!errorText
    const helperText = errorText || this.getConversionHintText(rateMode, minHourlyRate, maxHourlyRate)

    return (
      <InputGroup helperText={helperText} error={hasError}>
        <NumberField
          label={label}
          value={roundCurrency(getComputedRate(minHourlyRate, rateMode))}
          onChange={this.handleMinRateChange}
          startAdornment="$"
          name="min_client_rate"
          error={hasError}
        />

        <InputGroupConnector>
          To
        </InputGroupConnector>

        <NumberField
          value={roundCurrency(getComputedRate(maxHourlyRate, rateMode))}
          onChange={this.handleMaxRateChange}
          startAdornment="$"
          name="client_rate"
          error={hasError}
        />

        <InputGroupConnector>
          /
        </InputGroupConnector>

        <SelectField value={rateMode} onChange={this.handleModeChange} error={hasError}>
          <MenuItem value="hour">
            Hour
          </MenuItem>

          <MenuItem value="day">
            Day
          </MenuItem>

          <MenuItem value="month">
            Month
          </MenuItem>

          <MenuItem value="year">
            Year
          </MenuItem>
        </SelectField>
      </InputGroup>
    )
  }

  getConversionHintText(rateMode: RateMode, minHourlyRate: number, maxHourlyRate: number) {
    let parts = [] as string[]

    if (rateMode !== 'hour') {
      parts.push(getRateText(minHourlyRate, maxHourlyRate, 'hour'))
    }

    if (rateMode !== 'day') {
      parts.push(getRateText(minHourlyRate, maxHourlyRate, 'day'))
    }

    if (rateMode !== 'month') {
      parts.push(getRateText(minHourlyRate, maxHourlyRate, 'month'))
    }

    if (rateMode !== 'year') {
      parts.push(getRateText(minHourlyRate, maxHourlyRate, 'year'))
    }

    let hintText = parts.filter(part => !!part).join('; ')

    if (hintText) {
      return `Equals ${hintText}`.replace('/hour', '/hr').replace('/month', '/mth').replace('/year', '/yr')
    }

    return ''
  }

  getHourlyRateFromComputedRate(computedRate: number, rateMode: RateMode): number {
    if (!computedRate) {
      return computedRate
    }

    let roundingFactor = 100000

    switch (rateMode) {
      case 'year':
        return computedRate / (hourlyRateToAnnualCompensation(roundingFactor) / roundingFactor)

      case 'month':
        return computedRate / (hourlyRateToMonthlyRate(roundingFactor) / roundingFactor)

      case 'day':
        return computedRate / (hourlyRateToDailyRate(roundingFactor) / roundingFactor)

      default:
        // assume hourly
        return computedRate
    }
  }

  handleMinRateChange = (value: number) => {
    const { onMinHourlyRateChange, rateMode } = this.props

    if (onMinHourlyRateChange) {
      onMinHourlyRateChange(this.getHourlyRateFromComputedRate(value, rateMode))
    }
  }

  handleMaxRateChange = (value: number) => {
    const { onMaxHourlyRateChange, rateMode } = this.props

    if (onMaxHourlyRateChange) {
      onMaxHourlyRateChange(this.getHourlyRateFromComputedRate(value, rateMode))
    }
  }

  handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onRateModeChange, onMinHourlyRateChange, onMaxHourlyRateChange, rateMode, minHourlyRate, maxHourlyRate } = this.props
    const newRateMode = e.target.value as RateMode

    if (onRateModeChange) {
      let roundingFactor = 10000000
      let minRate = this.getHourlyRateFromComputedRate(minHourlyRate * roundingFactor, newRateMode)
      let maxRate = this.getHourlyRateFromComputedRate(maxHourlyRate * roundingFactor, newRateMode)

      minRate = getComputedRate(minRate, rateMode) / roundingFactor
      maxRate = getComputedRate(maxRate, rateMode) / roundingFactor

      onRateModeChange(newRateMode)
      onMinHourlyRateChange(minRate)
      onMaxHourlyRateChange(maxRate)
    }
  }
}
