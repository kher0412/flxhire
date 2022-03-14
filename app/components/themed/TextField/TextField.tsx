import React from 'react'
import { Collapse, InputAdornment } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { getShortName } from 'services/form'
import { ThemedMUITextField } from '../ThemedInputBase'

export interface ITextFieldProps {
  name?: string
  input?: FormValueInput<string>
  meta?: FormValueMeta
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => any
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => any
  label?: string
  placeholder?: string
  helperText?: React.ReactNode
  error?: boolean
  fullWidth?: boolean
  inputProps?: any
  InputProps?: any
  autoFocus?: boolean
  onKeyDown?: (e: React.KeyboardEvent) => void
  disabled?: boolean
  type?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode

  /** @deprecated */
  'data-cy'?: string
}

function TextField(props: ITextFieldProps) {
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
    ...restProps
  } = props

  const actualValue = input ? input.value : value
  const actualOnChange = input ? input.onChange : onChange
  const actualOnBlur = input ? input.onBlur : onBlur
  const errorText = meta.touched ? meta.error : undefined
  const hasError = error || !!errorText
  const actualHelperText = errorText ?? helperText as string
  const shortName = getShortName(input?.name || name)
  const obfuscate = shortName?.indexOf('password') || restProps?.type === 'password' // needed for analytics

  let inputProps = {}
  if (shortName) inputProps['data-cy'] = `textfield-input-${shortName}`
  if (obfuscate) {
    inputProps['data-private'] = true
  } else {
    inputProps['data-public'] = true
  }

  return (
    <ThemedMUITextField
      data-cy={shortName ? `textfield-${shortName}` : undefined}
      {...restProps}
      value={actualValue}
      onChange={actualOnChange}
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
      inputProps={inputProps}
      InputProps={{
        startAdornment: startAdornment && (<InputAdornment position="start">{startAdornment}</InputAdornment>),
        endAdornment: endAdornment && (<InputAdornment position="end">{endAdornment}</InputAdornment>),
      }}
      FormHelperTextProps={{
        style: actualHelperText ? undefined : { marginTop: 0 }, // remove incorrect +4px spacing from the presence of empty helperText Collapse
        component: 'div', // default is 'p', this fixes invalid HTML by having the Collapse DIV in here
      } as any}
    />
  )
}

export default React.memo(TextField) as React.FunctionComponent<ITextFieldProps>
