import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import { Moment } from 'moment'
import { FormValueInput, FormValueMeta } from 'types'
import { ensureMoment, ensureDateTimeAsString, DateLike, DATE_TIME_FORMAT } from 'services/formatting'
import TextField from '../TextField'

export interface IDateTimePickerProps {
  value?: DateLike
  onChange?: (value: DateLike) => any
  input?: FormValueInput<DateLike>
  meta?: FormValueMeta
  label?: string
  helperText?: string
  disablePast?: boolean
  labelRenderer?: (day: Moment, invalidLabel: string) => string
  name?: string
  fullWidth?: boolean
  'data-cy'?: string
}

export default React.memo((props: IDateTimePickerProps) => {
  const { input, meta = {} as FormValueMeta, value, onChange, label, helperText, labelRenderer, disablePast, fullWidth, ...restProps } = props

  const error = meta.touched ? meta.error : undefined
  const actualHelperText = error ?? helperText as string
  const actualValue = ensureMoment(input ? input.value : value)
  const actualOnChange = val => input ? input.onChange(ensureDateTimeAsString(val)) : onChange(ensureDateTimeAsString(val))

  return (
    <DateTimePicker
      {...restProps}
      TextFieldComponent={TextField}
      format={DATE_TIME_FORMAT}
      label={label}
      fullWidth={fullWidth ?? true}
      autoOk
      ampm
      inputVariant="outlined"
      disablePast={disablePast}
      onChange={actualOnChange}
      labelFunc={labelRenderer}
      value={actualValue || null}
      helperText={actualHelperText}
      error={!!error}
    />
  )
})
