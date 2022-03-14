import React from 'react'
import { Collapse, InputAdornment } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { getShortName } from 'services/form'
import { ThemedMUITextField } from '../ThemedInputBase'
import { NumberInput } from './components/NumberInput'

export interface INumberFieldProps {
  name?: string
  input?: FormValueInput<number>
  meta?: FormValueMeta
  value?: number
  onChange?: (value: number) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => any
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => any
  onKeyDown?: (e: React.KeyboardEvent) => void
  label?: string
  placeholder?: string
  helperText?: React.ReactNode
  error?: boolean
  fullWidth?: boolean
  inputProps?: any
  InputProps?: any
  autoFocus?: boolean
  disabled?: boolean
  nullable?: boolean
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  numDecimals?: number

  /** @deprecated */
  'data-cy'?: string
}

function NumberField(props: INumberFieldProps) {
  const {
    input,
    meta = {} as FormValueMeta,
    onChange,
    onBlur,
    name,
    value,
    label,
    helperText,
    startAdornment,
    endAdornment,
    error,
    numDecimals,
    nullable,
    ...restProps
  } = props

  let actualValue = input ? input.value : value
  let actualOnChange = input ? input.onChange : onChange
  let actualOnBlur = input ? input.onBlur : onBlur
  let errorText = meta.touched ? meta.error : undefined
  let hasError = error || !!errorText
  let actualHelperText = errorText ?? helperText as string
  let shortName = getShortName(input ? input.name : name)

  const handleChange = (newValue: number) => {
    if (nullable && (newValue as any) === '') newValue = undefined

    if (typeof numDecimals === 'number' && numDecimals >= 0 && newValue !== undefined) {
      let roundingFactor = Math.pow(10, Math.round(numDecimals))
      newValue = Math.round(newValue * roundingFactor) / roundingFactor
    }

    if (actualOnChange) {
      actualOnChange(newValue)
    }
  }

  if (nullable) {
    actualValue = actualValue ?? '' as any
  }

  return (
    <ThemedMUITextField
      data-cy={shortName ? `textfield-${shortName}` : undefined}
      {...restProps}
      type={undefined}
      value={actualValue ?? ''}
      onChange={handleChange as any}
      onBlur={actualOnBlur}
      variant="outlined"
      label={label}
      margin="dense"
      multiline={false}
      error={hasError}
      helperText={(
        <Collapse in={!!actualHelperText} data-cy={shortName ? `textfield-helper-${shortName}` : undefined}>
          {actualHelperText}{'\u00A0'}
        </Collapse>
      )}
      inputProps={shortName ? { 'data-cy': `textfield-input-${shortName}` } : undefined}
      InputProps={{
        startAdornment: startAdornment && (<InputAdornment position="start">{startAdornment}</InputAdornment>),
        endAdornment: endAdornment && (<InputAdornment position="end">{endAdornment}</InputAdornment>),
        inputComponent: NumberInput as any,
      }}
      FormHelperTextProps={{
        style: actualHelperText ? undefined : { marginTop: 0 }, // remove incorrect +4px spacing from the presence of empty helperText Collapse
        component: 'div', // default is 'p', this fixes invalid HTML by having the Collapse DIV in here
      } as any}
    />
  )
}

export default React.memo(NumberField) as React.FunctionComponent<INumberFieldProps>
