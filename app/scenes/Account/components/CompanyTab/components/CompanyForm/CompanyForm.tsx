import React from 'react'
import { Field, Fields, InjectedFormProps } from 'redux-form'
import { Grid, Divider } from '@material-ui/core'
import { Button, TextField, TextArea, Box } from 'components/themed'
import { ServerError, FormErrorSummary } from 'components'
import { useFragment, graphql } from 'react-relay'
import CompanyLogoFields from 'components/CompanyLogoFields'
import { CompanyForm_User$key } from '__generated__/CompanyForm_User.graphql'
import { CheckCircle } from '@material-ui/icons'
import { FormValues } from './CompanyFormContainer'

export interface ICompanyFormProps {
  user: CompanyForm_User$key
}

const CompanyForm = (props: InjectedFormProps<FormValues> & ICompanyFormProps) => {
  const { handleSubmit, submitting, submitFailed, user: userProp, error } = props
  const user = useFragment(graphql`
    fragment CompanyForm_User on User {
      managerContract {
        isFirmAdmin
      }
    }
  `, userProp)
  const isFirmAdmin = user?.managerContract?.isFirmAdmin
  const disabled = !isFirmAdmin || submitting
  const permissionError = isFirmAdmin ? null : 'Only Admins can edit Company information'

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Fields
              names={['logo_url', 'alternative_background']}
              component={CompanyLogoFields}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="name" fullWidth label="Company Name" component={TextField} disabled={disabled} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="website" fullWidth label="Company Website" component={TextField} disabled={disabled} />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="description"
              fullWidth
              label="Description"
              component={TextArea}
              placeholder="Introduce your company in a few brief lines..."
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box style={{ textAlign: 'right' }}>
        <ServerError error={error || permissionError} />
        <FormErrorSummary show={submitFailed} />

        <Button type="submit" color="primary" disabled={disabled} data-cy="save-changes">
          <CheckCircle /> Save changes
        </Button>
      </Box>
    </form>
  )
}

export default CompanyForm
