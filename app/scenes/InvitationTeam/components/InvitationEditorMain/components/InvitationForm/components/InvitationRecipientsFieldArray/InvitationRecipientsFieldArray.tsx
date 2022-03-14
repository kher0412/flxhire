import React from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { Field, FieldArrayFieldsProps } from 'redux-form'
import { FormValueMeta } from 'types'
import { normalizeEmail } from 'services/formatting'
import { TextField, SelectField, Button, InfoMessage } from 'components/themed'
import { ConfirmButton, Condition } from 'components'
import { IRecipientEntry } from 'scenes/InvitationTeam/RecipientEntry'
import { AddCircle, Delete } from '@material-ui/icons'

export interface IInvitationRecipientsFieldArrayProps {
  fields: FieldArrayFieldsProps<Partial<IRecipientEntry>>
  meta: FormValueMeta
}

function InvitationRecipientsFieldArray(props: IInvitationRecipientsFieldArrayProps) {
  const { fields, meta } = props

  return (
    <div data-cy="recipients-fields">
      <Grid container spacing={3}>
        <Condition condition={Boolean(meta.error)}>
          <Grid item xs={12}>
            <InfoMessage>
              {meta.error}
            </InfoMessage>
          </Grid>
        </Condition>

        {fields.map((entry, entryIndex) => (
          <React.Fragment>
            <Grid item xs={12} md={3}>
              <Field name={`${entry}.first_name`} label="First name" component={TextField} fullWidth />
            </Grid>

            <Grid item xs={12} md={3}>
              <Field name={`${entry}.last_name`} label="Last name" component={TextField} fullWidth />
            </Grid>

            <Grid item xs={12} md={3}>
              <Field name={`${entry}.email`} label="Email" component={TextField} fullWidth normalize={normalizeEmail} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Field name={`${fields.name}[0].invitation_type`} label="Role" component={SelectField} fullWidth disabled={entryIndex > 0}>
                <MenuItem value="individual" data-cy="individual">
                  Individual
                </MenuItem>

                <MenuItem value="manager" data-cy="manager">
                  Manager
                </MenuItem>

                <MenuItem value="admin" data-cy="admin">
                  Admin
                </MenuItem>
              </Field>
            </Grid>

            <Grid item xs={12} md={1}>
              <ConfirmButton
                iconOnly
                tooltip="Delete recipient"
                dialogTitle="Delete Recipient"
                dialogMessage="Remove this recipient from the invitation list?"
                dialogConfirmLabel="Remove"
                color="delete"
                critical
                onClick={() => fields.remove(entryIndex)}
              >
                <Delete />
              </ConfirmButton>
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Button color="secondary" onClick={() => fields.push({})}>
            <AddCircle /> {fields.length === 0 ? 'Add invitee' : 'Add another invitee'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(InvitationRecipientsFieldArray)
