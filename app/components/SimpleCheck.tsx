import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { FormValueInput, FormValueMeta } from 'types'

export interface ISimpleCheckProps {
  input: FormValueInput<boolean>
  meta: FormValueMeta
  label?: string
  disabled?: boolean
  style?: React.CSSProperties
}

const SimpleCheck = (props: ISimpleCheckProps) => {
  const { input: { name, value, onChange }, meta: { touched, error }, label, style, disabled } = props

  return (
    <div>
      <FormControlLabel
        style={style}
        control={(
          <Checkbox
            color="primary"
            checked={value ? true : false}
            onChange={e => onChange(e)}
            disabled={disabled}
            data-cy={`simplecheck-${name}`}
          />
          )}
        label={label}
      />

      <div>
        {touched && error}
      </div>
    </div>
  )
}

export default SimpleCheck
