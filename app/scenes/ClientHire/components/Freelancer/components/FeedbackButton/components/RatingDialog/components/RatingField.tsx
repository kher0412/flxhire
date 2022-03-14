import React from 'react'
import { getShortName } from 'services/form'
import { IconButton, FormHelperText } from '@material-ui/core'
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import { FormValueInput, FormValueMeta } from 'types'

export interface IRatingFieldProps extends Omit<React.HTMLProps<HTMLDivElement>, ('value' | 'onChange')> {
  input?: FormValueInput<boolean>
  meta?: FormValueMeta
  onChange?: (value: boolean) => void
  value?: boolean
  label?: string
  helperText?: string
  freelancer?: {
    firstName: string
  }
}

export interface IRatingFieldState { }

export default class RatingField extends React.PureComponent<IRatingFieldProps, IRatingFieldState> {
  render() {
    const { input, meta = {} as any, onChange, value, label, helperText, freelancer, ...restProps } = this.props
    const error = meta.touched ? meta.error : undefined
    const actualValue = input ? input.value : value
    const actualOnChange = input ? input.onChange : onChange
    const shortName = getShortName(input?.name)
    const positiveColor = actualValue === true ? 'primary' : undefined
    const negativeColor = actualValue === false ? 'secondary' : undefined

    return (
      <div data-cy={`rating-${shortName}`} {...restProps}>
        Do you like {freelancer?.firstName}?

        <IconButton
          style={{ marginLeft: 12 }}
          color={positiveColor}
          onClick={() => actualOnChange(true)}
          data-cy={`rating-${shortName}-positive`}
        >
          <ThumbUp />
        </IconButton>

        <IconButton
          color={negativeColor}
          onClick={() => actualOnChange(false)}
          data-cy={`rating-${shortName}-negative`}
        >
          <ThumbDown />
        </IconButton>

        {(error || helperText) && (
          <FormHelperText style={{ color: 'rgb(244, 67, 54)', marginTop: -12, marginBottom: 12 }}>
            {error || helperText}
          </FormHelperText>
        )}
      </div>
    )
  }
}
