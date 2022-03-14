import React from 'react'
import { ListSubheader, InputAdornment, Collapse } from '@material-ui/core'
import { FormValueMeta, FormValueInput, Currency } from 'types'
import { getShortName } from 'services/form'
import { ThemedMUITextField } from '../ThemedInputBase'

type ValueType = number | string | boolean

interface ISelectFieldProps {
  input?: FormValueInput<ValueType>
  onChange?: (e: any) => void // TODO: the correct typing here for 'e' is 'React.ChangeEvent<HTMLInputElement | HTMLSelectElement>' but it breaks old code
  value?: ValueType
  name?: string
  meta?: FormValueMeta
  label?: string
  helperText?: React.ReactNode
  fullWidth?: boolean
  defaultValue?: ValueType
  children?: any
  startAdornment?: React.ReactNode
  disabled?: boolean
  error?: boolean
  style?: React.CSSProperties
}

function SelectField(props: ISelectFieldProps) {
  const {
    input,
    meta = {} as FormValueMeta,
    onChange,
    value,
    startAdornment,
    name,
    label,
    helperText,
    children,
    fullWidth,
    error,
    defaultValue = '',
    ...restProps
  } = props

  const errorText = meta.touched ? meta.error : undefined
  const hasError = error || !!errorText
  const actualHelperText = errorText ?? helperText
  const actualValue = (input ? input.value : value) ?? defaultValue
  const actualOnChange = input ? input.onChange : onChange
  const shortName = getShortName(input ? input.name : name)
  let inputProps = {
    'data-public': true,
  }
  if (shortName) inputProps['data-cy'] = `select-input-${shortName}`

  return (
    <ThemedMUITextField
      data-cy={shortName ? `select-${shortName}` : undefined}
      {...restProps}
      value={actualValue} // Avoid passing in undefined, which breaks between controlled/uncontrolled
      onChange={actualOnChange}
      onBlur={input?.onBlur}
      fullWidth={fullWidth}
      variant="outlined"
      label={label}
      error={hasError}
      helperText={(
        <Collapse in={!!actualHelperText} data-cy={shortName ? `selectfield-helper-${shortName}` : undefined}>
          {actualHelperText}{'\u00A0'}
        </Collapse>
      )}
      margin="dense"
      select
      inputProps={inputProps}
      InputProps={{
        startAdornment: startAdornment && (<InputAdornment position="start">{startAdornment}</InputAdornment>),
      }}
      FormHelperTextProps={{
        style: actualHelperText ? undefined : { marginTop: 0 }, // remove incorrect +4px spacing from the presence of empty helperText Collapse
        component: 'div', // default is 'p', this fixes invalid HTML by having the Collapse DIV in here
      } as any}
    >
      {label && (
        <ListSubheader>
          {label}
        </ListSubheader>
      )}

      {children}
    </ThemedMUITextField>
  )
}

export default React.memo(SelectField) as React.FunctionComponent<ISelectFieldProps>
