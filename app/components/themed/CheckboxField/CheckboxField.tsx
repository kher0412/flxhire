import React from 'react'
import { Checkbox, Collapse, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { conditionalClassList } from 'services/styles'
import styles from './CheckboxField.module.css'

export interface ICheckboxFieldProps {
  input: FormValueInput<boolean>
  meta: FormValueMeta
  disableBorder?: boolean
  label?: string
  helperText?: string
  disabled?: boolean
  fullWidth?: boolean
  style?: React.CSSProperties
}

export default function CheckboxField(props: ICheckboxFieldProps) {
  const { input: { name, value, onChange }, meta: { touched, error }, label, helperText, fullWidth, style, disabled, disableBorder } = props
  const hasError = (touched && error) ? true : false
  const actualHelperText = hasError ? error : helperText

  return (
    <div className={styles.wrapper}>
      <FormControl style={fullWidth ? { width: '100%' } : undefined}>
        <div
          className={conditionalClassList({
            [styles.container]: true,
            [styles.error]: hasError,
            [styles.noBorder]: disableBorder === true,
          })}
        >
          <FormControlLabel
            style={style}
            control={(
              <Checkbox
                className={styles.checkbox}
                color="primary"
                checked={value ? true : false}
                onChange={e => onChange(e)}
                disabled={disabled}
                data-cy={`checkbox-field-${name}`}
              />
            )}
            label={(
              <div className={styles.label} style={(disabled || !value) ? { opacity: 0.7 } : undefined}>
                {label}
              </div>
            )}
          />
        </div>

        <FormHelperText error={hasError} style={{ marginTop: actualHelperText ? 3 : 0 }}>
          <Collapse in={!!actualHelperText} data-cy={`checkbox-field-helper-${name}`}>
            <div className={styles.helperText}>
              {actualHelperText}{'\u00A0'}
            </div>
          </Collapse>
        </FormHelperText>
      </FormControl>
    </div>
  )
}
