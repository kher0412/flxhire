import React from 'react'
import { InjectedFormProps, Field } from 'redux-form'
import { Grid, Divider, Typography } from '@material-ui/core'
import { Button, TextField, Box } from 'components/themed'
import { AnimBox, RadioButtons } from 'components'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IProfile } from 'types'
import { useOnMount, useSnackbar } from 'hooks'
import styles from './TaxCompliance.module.css'

const locationTypeOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
]

export interface ITaxComplianceProps {
  profile: IProfile
  submitForm: (formData: any) => void
}

const TaxCompliance = (props: InjectedFormProps<any> & ITaxComplianceProps) => {
  const {
    profile,
    handleSubmit,
    submitForm,
    submitting,
    valid,
    dirty,
    pristine,
    initialValues,
  } = props

  const [usCitizen, setUsCitizen] = React.useState(false)
  const showSnackbarMessage = useSnackbar()

  useOnMount(() => {
    setUsCitizen(initialValues.us_citizen === 'true')
  })

  const onUscitizenChange = val => setUsCitizen(val === 'true')

  const downloadPdf = async () => {
    try {
      await getAPIClient().downloadFreelancer1099PDF()
    } catch (error) {
      trackError(error)
      showSnackbarMessage(error.response || error.message)
    }
  }

  const downloadEnabled = usCitizen && profile.us_citizen && valid
  const showError = usCitizen && !downloadEnabled
  const canSubmit = dirty && !submitting && valid

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box>
        <AnimBox slide>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Tax Compliance
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Please confirm if you are a US Citizen or working in the US on visa.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                If you are a US Citizen or working in the US on visa and have earned more than $600
                on Flexhire during the previous calendar year, enter and save your data to then download your 1099-MISC form.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Field
                onFieldChange={onUscitizenChange}
                name="us_citizen"
                options={locationTypeOptions}
                component={RadioButtons}
                label="Are you a US Citizen or working in the US on a visa?"
              />
            </Grid>

            {usCitizen && (
              <React.Fragment>
                <Grid item xs={12} md={6}>
                  <Field name="first_name" label="First name" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="last_name" label="Last name" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="tax_id" label="SSN or TIN" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="address_recipient" label="Street address (including apt. no.)" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="city_recipient" label="City or Town" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="state_recipient" label="State or Province" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="zip" label="ZIP or Postal Code" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="country_recipient" label="Country" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field name="phone" label="Phone" component={TextField} fullWidth />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </AnimBox>
      </Box>

      <Divider />

      <Box style={{ textAlign: 'right' }}>
        <span style={{ marginLeft: 'auto', marginRight: '15px', color: '#f44336' }} data-cy="1099-error">
          {showError && 'Complete and save the form to download your 1099'}
        </span>

        <Button type="submit" color="primary" disabled={!canSubmit} data-cy="save">
          {dirty && 'Save'}
          {submitting && 'Saving'}
          {pristine && 'Saved'}
        </Button>

        {downloadEnabled && (
          <Button color="secondary" onClick={downloadPdf} data-cy="download-pdf" style={{ marginLeft: '12px' }}>
            Download my 1099
          </Button>
        )}
      </Box>
    </form>
  )
}

export default TaxCompliance
