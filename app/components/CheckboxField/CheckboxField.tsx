import React from 'react'
import { Checkbox } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { getShortName } from 'services/form'

export interface ICheckboxFieldProps {
  input: FormValueInput<boolean>
  meta: FormValueMeta
}

export default function CheckboxField(props: ICheckboxFieldProps) {
  const { input, meta } = props

  const shortName = getShortName(input?.name)

  return (
    <Checkbox
      color="primary"
      checked={input.value}
      onChange={e => input.onChange(e.target.checked)}
      inputProps={{
        'data-cy': `checkbox-input-${shortName}`,
      } as any}
    />
  )
}
