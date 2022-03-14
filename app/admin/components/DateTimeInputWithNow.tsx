import React from 'react'
import { Button } from '@material-ui/core'
import { DateTimeInput } from 'react-admin'
import { Field } from 'react-final-form'

const SetToNowButton = ({ input: { onChange } }) => (
  <Button onClick={() => onChange(new Date())} variant="outlined" style={{ marginLeft: '10px' }}>Now</Button>
)

const ClearButton = ({ input: { onChange } }) => (
  <Button onClick={() => onChange(null)} variant="outlined" style={{ marginLeft: '10px' }}>Clear</Button>
)

const DateTimeInputWithNow: any = ({ source, ...props }) => (
  <React.Fragment>
    <DateTimeInput source={source} {...props} />
    <Field
      name={source}
      component={SetToNowButton}
    />
    <Field
      name={source}
      component={ClearButton}
    />
  </React.Fragment>
)

export default DateTimeInputWithNow
