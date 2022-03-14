import React from 'react'
import { Collapse } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { WrappedFieldProps } from 'redux-form'
import { getShortName } from 'services/form'
import { ThemedMUITextField } from '../ThemedInputBase'

export interface ITextAreaProps {
  input?: FormValueInput<string>
  meta?: FormValueMeta
  label?: string
  placeholder?: string
  value?: string
  helperText?: React.ReactNode
  error?: boolean
  fullWidth?: boolean
  name?: string
  maxLength?: number
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => any
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => any
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => any

  // Only use this in special cases, otherwise let the default be used
  rows?: number

  /** @deprecated */
  style?: React.CSSProperties
}

export default class TextArea extends React.PureComponent<ITextAreaProps & Partial<WrappedFieldProps>> {
  static defaultProps: Partial<ITextAreaProps> = {
    fullWidth: true,
  }

  render() {
    let {
      label,
      input,
      meta = {} as FormValueMeta,
      value,
      onChange,
      onBlur,
      helperText,
      name,
      maxLength,
      ...restProps
    } = this.props

    const error = meta.touched ? meta.error : undefined
    const actualValue = input ? input.value : value
    const actualOnChange = input ? input.onChange : onChange
    const actualOnBlur = input ? input.onBlur : onBlur
    const actualHelperText = error ?? helperText
    const shortName = getShortName(input ? input.name : name)

    return (
      <ThemedMUITextField
        value={actualValue}
        onChange={actualOnChange}
        onBlur={actualOnBlur}
        variant="outlined"
        label={label}
        margin="dense"
        error={!!error}
        helperText={(
          <Collapse in={!!actualHelperText} data-cy={shortName ? `textarea-helper-${shortName}` : undefined}>
            {actualHelperText}{'\u00A0'}
          </Collapse>
        )}
        rows={4}
        {...restProps}
        style={undefined} // override deprecated style prop from outside
        fullWidth
        multiline
        rowsMax={1000}
        inputProps={{
          'data-cy': shortName ? `textarea-${shortName}` : undefined,
          maxlength: maxLength,
        }}
        FormHelperTextProps={{
          style: actualHelperText ? undefined : { marginTop: 0 }, // remove incorrect +4px spacing from the presence of empty helperText Collapse
          component: 'div', // default is 'p', this fixes invalid HTML by having the Collapse DIV in here
        } as any}
      />
    )
  }
}
