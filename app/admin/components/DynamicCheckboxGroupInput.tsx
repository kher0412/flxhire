import React from 'react'
import { CheckboxGroupInput } from 'react-admin'

interface IDynamicCheckboxGroupInputProps {
  label?: string
  record?: any
  source: string
  choicesSource: string
  optionValue?: any
  optionText?: string
  options?: any
}

const DynamicCheckboxGroupInput = ({ source, choicesSource, label, optionValue, optionText, options, record }: IDynamicCheckboxGroupInputProps) => (
  <CheckboxGroupInput
    source={source}
    label={label}
    choices={record?.[choicesSource] || []}
    optionText={optionText}
    optionValue={optionValue}
    options={options}
  />
)

export default DynamicCheckboxGroupInput
