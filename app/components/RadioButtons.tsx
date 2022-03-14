import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import { ServerError } from 'components'
import { FormValueInput, FormValueMeta } from 'types'
import styles from './RadioButtons.module.css'

interface IRadioButtonsProps {
  disabled?: boolean
  options: { value: string, label: string }[]
  input: FormValueInput<string>
  meta: FormValueMeta
  onFieldChange?: (value: string) => void
  label?: string
}

const RadioButtons = ({ disabled, options, label, onFieldChange, input: { onChange, name, value }, meta: { touched, error } }: IRadioButtonsProps) => (
  <div>
    <ServerError error={touched && error} data-cy={`radio-error-${name}`} />

    <FormControl>
      {label && (
        <FormLabel component="legend">
          {label}
        </FormLabel>
      )}

      <RadioGroup
        name={name}
        onChange={(_, _value: any) => {
          if (typeof value === 'boolean') {
            // boolean support, see https://github.com/erikras/redux-form-material-ui/issues/72
            _value = (_value === 'true')
          }

          if (onChange) onChange(_value)
          if (onFieldChange) onFieldChange(_value)
        }}
        value={value}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        {options.map((option, index) => (
          <FormControlLabel
            className={styles.option}
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={disabled}
            control={<Radio data-cy={`radio-${name}-${index}`} color="primary" className={`cy-radio-${name}-${index}`} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  </div>
)

export default RadioButtons
