import { memo, ComponentProps, useMemo } from 'react'
import { flatten, uniq } from 'lodash'
import { getCountryName, getCountryCodes, getCountryGroupNames, getCountryGroup } from 'services/location'
import { FormValueInput } from 'types'
import AutoCompleteChipInput from './themed/AutoCompleteChipInput'
import { IAutoCompleteChipInputProps } from './themed/AutoCompleteChipInput/AutoCompleteChipInput'

const getAllCountrySuggestions = () => (
  getCountryGroupNames().map(name => ({ value: name, text: `${name} (${getCountryGroup(name).length} countries)` })).concat(
    ...getCountryCodes().map(code => ({ value: code.toLowerCase(), text: getCountryName(code) })),
  )
)
const cleanValue = (value: string[]) => (value || []).filter(v => Boolean(v)).map(v => ({ text: getCountryName(v), value: v }))
const handleOnChange = (values: { text: string, value: string }[]) => {
  const groupNames = getCountryGroupNames()
  return uniq(flatten(values.filter(v => Boolean(v && v.value)).map(v => (
    groupNames.indexOf(v.value) >= 0 ? getCountryGroup(v.value) : v.value
  ))))
}

interface ICountrySelectorProps extends IAutoCompleteChipInputProps<string> {
  label?: string
  input: FormValueInput<string[]>
}

const CountrySelector = memo((props: ICountrySelectorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label = 'Countries', input: { value, onChange, name, ...inputProps }, value: valueProp, onChange: onChangeProp, ...otherProps } = props
  const suggestions = useMemo(() => getAllCountrySuggestions(), [])
  const cleanedValue = useMemo(() => cleanValue(value), [value])

  return (
    <AutoCompleteChipInput
      input={{
        value: cleanedValue,
        onChange: values => onChange(handleOnChange(values)),
        name: name || 'countries',
        ...inputProps,
      }}
      label={label}
      suggestions={suggestions}
      suggestionsFormat={{ text: 'text', value: 'value' }}
      {...otherProps}
    />
  )
})

export default CountrySelector
