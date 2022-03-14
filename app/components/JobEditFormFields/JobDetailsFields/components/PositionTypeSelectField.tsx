import React from 'react'
import { MenuItem } from '@material-ui/core'
import { FormValue, RateMode } from 'types'
import { SelectField } from 'components/themed'

export interface IPositionTypeSelectFieldProps {
  position_types: FormValue<string[]>
  rate_mode: FormValue<RateMode>
  label?: string
}

export interface IPositionTypeSelectFieldState {
}

export default class PositionTypeSelectField extends React.PureComponent<IPositionTypeSelectFieldProps, IPositionTypeSelectFieldState> {
  render() {
    const { position_types, label } = this.props

    return (
      <SelectField
        value={this.getSingleValue()}
        onChange={this.handleChange}
        meta={position_types.meta}
        fullWidth
        data-cy="select-type"
        label={label}
      >
        <MenuItem value="freelancer" data-cy="select-type-freelancer">
          Freelance
        </MenuItem>

        <MenuItem value="permanent">
          Permanent
        </MenuItem>

        <MenuItem value="both">
          Both
        </MenuItem>
      </SelectField>
    )
  }

  getSingleValue() {
    const { position_types: { input: { value } } } = this.props

    if (value.includes('permanent') && value.includes('freelancer')) {
      return 'both'
    }

    return value[0] || undefined
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { position_types, rate_mode } = this.props
    const value = e.target.value as string

    if (value === 'both') {
      position_types.input.onChange(['permanent', 'freelancer'])
    } else {
      position_types.input.onChange([value])
    }

    switch (value) {
      case 'both':
        rate_mode.input.onChange('month')
        break

      case 'freelancer':
        rate_mode.input.onChange('hour')
        break

      case 'permanent':
        rate_mode.input.onChange('year')
        break
    }
  }
}
