import React from 'react'
import { DatePicker as MUIDatePicker } from '@material-ui/pickers'
import { Moment } from 'moment'
import { FormValueInput, FormValueMeta } from 'types'
import { DateLike, DATE_FORMAT, ensureDateAsString, ensureMoment } from 'services/formatting'
import TextField from '../TextField'

export interface IDatePickerProps extends Omit<React.ComponentProps<typeof MUIDatePicker>, 'value' | 'onChange'> {
  value?: DateLike
  onChange?: (value: DateLike) => any
  input?: FormValueInput<DateLike>
  meta?: FormValueMeta
  label?: string
  helperText?: string
  disablePast?: boolean
  fullWidth?: boolean
  labelRenderer?: (day: Moment, invalidLabel: string) => string
  'data-cy'?: string
}

export default React.memo((props: IDatePickerProps) => {
  const { input, meta = {} as FormValueMeta, value, onChange, fullWidth = true, label, helperText, labelRenderer, disablePast, ...restProps } = props

  const error = meta.touched ? meta.error : undefined
  const actualHelperText = error ?? helperText as string
  const actualValue = ensureMoment(input ? input.value : value)
  const actualOnChange = val => input ? input.onChange(ensureDateAsString(val)) : onChange(ensureDateAsString(val))

  return (
    <MUIDatePicker
      {...restProps}
      TextFieldComponent={TextField}
      label={label}
      fullWidth={fullWidth}
      format={DATE_FORMAT}
      autoOk
      disablePast={disablePast}
      inputVariant="outlined"
      onChange={actualOnChange}
      labelFunc={labelRenderer}
      value={actualValue || null}
      helperText={actualHelperText}
      error={!!error}
    />
  )
})
