import { memo, ComponentProps } from 'react'
import { TextField } from 'components/themed'
import { FormValueInput, FormValueMeta } from 'types'

const transformTimezoneRange = (value: any) => Math.min(Math.abs(parseInt((value || 0) as any, 10)), 24)

interface ITimezoneRangeFieldProps extends Omit<ComponentProps<typeof TextField>, 'input'> {
  input: FormValueInput<number>
  meta?: FormValueMeta
}

const SelectTimeZone = memo(({ input, meta, label = 'Timezone Range', ...props }: ITimezoneRangeFieldProps) => {
  const realInput: FormValueInput<number> = {
    ...input,
    value: (!input.value || input.value === 0 || (input.value as any) === '0' ? '' : input.value) as any,
    onChange: event => input.onChange(transformTimezoneRange(event.target.value)),
  }
  return (
    <TextField
      label={label}
      type="number"
      input={realInput as any}
      meta={meta}
      endAdornment="hours"
      {...props}
    />
  )
})

export default SelectTimeZone
