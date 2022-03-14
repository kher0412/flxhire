import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import { isEmpty } from 'lodash'
import { FormValueMeta, FormValueInput } from 'types'

interface MyRadioGroupProps {
  required?: boolean
  label: string
  defaultSelected?: number
  input: FormValueInput<number>
  meta: FormValueMeta
  children: React.ReactNode
}

const MyRadioGroup = ({ required, label, defaultSelected, input: { onChange, name, value }, meta: { touched, error }, children }: MyRadioGroupProps) => {
  return (
    <FormControl
      component="fieldset"
      required={required}
      error={touched && !isEmpty(error)}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <FormLabel style={{ textAlign: 'center' }}>
        {label}
      </FormLabel>
      <RadioGroup
        name={name}
        onChange={onChange}
        value={value || defaultSelected}
        style={{ flexDirection: 'row', justifyContent: 'center' }}
      >
        {children}
      </RadioGroup>
    </FormControl>
  )
}

export default MyRadioGroup
