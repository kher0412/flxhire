import React from 'react'
import { Field } from 'redux-form'
import { TextField } from 'components/themed'
import { IconButton } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { ContainerProps } from './ContactFormContainer'

const ContactForm = ({ handleSubmit, submitting, invalid }: ContainerProps) => (
  <Field
    name="email"
    label="Email"
    component={TextField}
    endAdornment={(
      <IconButton onClick={handleSubmit} disabled={submitting || invalid}>
        <Save />
      </IconButton>
    )}
  />
)

export default ContactForm
