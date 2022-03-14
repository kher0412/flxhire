import React from 'react'
import { TextField } from '@material-ui/core'
import { isUndefined } from 'lodash'
import { getShortName } from 'services/form'
import { FormValueMeta, FormValueInput } from 'types'
import styles from './TextField.module.css'

type ITextFieldProps = React.ComponentProps<typeof TextField> & {
  meta?: FormValueMeta
  input?: FormValueInput<string>
}

const MyTextField = (props: ITextFieldProps) => {
  const {
    type,
    fullWidth,
    rowsMax,
    disabled,
    id,
    label,
    placeholder,
    onKeyDown,
    rows,
    InputLabelProps,
    inputProps,
    FormHelperTextProps,
    input: { onChange, onBlur, value, name },
    meta,
    helperText,
    ...others
  } = props
  const shortName = getShortName(name)
  return (
    <TextField
      type={type}
      disabled={disabled}
      label={label}
      className={styles['text-field']}
      fullWidth={isUndefined(fullWidth) ? true : fullWidth}
      id={id}
      rowsMax={rowsMax}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      value={value}
      rows={rows}
      error={Boolean(meta?.touched && meta?.error)}
      helperText={(meta?.touched && meta?.error) || helperText}
      placeholder={placeholder}
      InputLabelProps={InputLabelProps}
      inputProps={{ 'data-cy': `textfield-input-${shortName}`, ...inputProps }}
      FormHelperTextProps={{ 'data-cy': `textfield-helper-${shortName}`, ...FormHelperTextProps } as any}
      data-cy={`textfield-${shortName || 'unnamed'}`}
      {...others}
    />
  )
}

export default MyTextField
