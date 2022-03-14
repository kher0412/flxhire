import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { getShortName } from 'services/form'
import styles from './Select.module.css'

export default class MySelectField extends React.PureComponent {
  render() {
    const {
      id,
      label,
      input: { onChange, onBlur, name, value },
      meta,
      children,
      defaultValue,
      autoWidth = true,
      helperText,
      InputLabelProps = {},
      ...otherProps
    } = this.props

    const shortName = getShortName(name)

    const hasError = meta?.error && meta?.touched

    let _value = value

    if (defaultValue !== undefined) {
      if (value === undefined || value === null || value === '') {
        _value = defaultValue
      }
    }

    return (
      <FormControl className={styles.select} error={hasError}>
        <InputLabel {...InputLabelProps}>
          {label}
        </InputLabel>

        <Select
          value={_value}
          onChange={(event, index) => onChange(event, index)}
          onBlur={onBlur}
          autoWidth={autoWidth}
          inputProps={{
            name: shortName,
            id: id,
          }}
          data-cy={`select-${shortName}`}
          {...otherProps}
        >
          {children}
        </Select>

        {!hasError && helperText && (<FormHelperText>{helperText}</FormHelperText>)}
        {hasError && (<FormHelperText data-cy={`select-error-${shortName}`}>{meta?.error}</FormHelperText>)}
      </FormControl>
    )
  }
}
