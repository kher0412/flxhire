import React from 'react'
import { Switch } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'

export interface ISwitchFieldProps {
  input: FormValueInput<boolean>
  meta: FormValueMeta
}

export default function SwitchField(props: ISwitchFieldProps) {
  const { input, meta } = props

  return (
    <Switch
      color="primary"
      checked={input.value}
      onChange={e => input.onChange(e.target.checked)}
    />
  )
}
