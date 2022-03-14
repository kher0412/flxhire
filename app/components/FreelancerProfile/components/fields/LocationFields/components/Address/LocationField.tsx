import { InputBase } from '@material-ui/core'
import { forwardRef } from 'react'
import { FormValue } from 'types'

const LocationField = forwardRef(({ input, meta, ...props }: FormValue<string>, ref) => (
  <InputBase
    ref={ref}
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onBlur}
    onFocus={input.onFocus}
    {...props}
  />
))

export default LocationField
