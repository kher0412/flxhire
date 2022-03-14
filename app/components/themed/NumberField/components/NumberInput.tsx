import React from 'react'
import NumberFormat from 'react-number-format'
import { trackError } from 'services/analytics'

export interface INumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (value: number) => void
  onBlur: () => void
  name: string
}

export function NumberInput(props: INumberFormatCustomProps) {
  const { inputRef, onChange, onBlur, ...restProps } = props

  // make sure to pass no arguments to onBlur
  // otherwise, it will overwrite redux form field value with the formatted string from the native input
  return (
    <NumberFormat
      {...restProps}
      onBlur={() => onBlur()}
      getInputRef={inputRef}
      onValueChange={(values) => {
        try {
          onChange(values.floatValue)
        } catch (error) {
          // Sometimes onChange expects an event for some reason
          // in those cases, the call will crash. I could not figure out
          // the root cause but the component seems to work fine
          // even by swallowing the occasional error
          // A possible cause could be that onValueChange can be called on blur,
          // according to react-number-format docs
          trackError(error)
        }
      }}
      thousandSeparator
    />
  )
}
