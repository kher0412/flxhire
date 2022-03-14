import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import styles from './SelectField.module.css'

const SelectField = ({ id, input: { onChange, onBlur, value, name }, meta: { touched, error }, children, placeholder, helperText, ...others }) => (
  <Select
    id={id}
    value={value ?? '_'}
    helperText={touched && error}
    onChange={onChange}
    onBlur={onBlur}
    className={styles['select-field']}
    data-cy={`select-${name}`}
    {...others}
  >
    {placeholder && (
      <MenuItem value="_" disabled>
        {placeholder}
      </MenuItem>
    )}

    {children}
  </Select>
)

export default SelectField
