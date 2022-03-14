import { reduxForm } from 'redux-form'
import { useCurrentUser, useSnackbar, useQuickCommit } from 'hooks'
import { useCallback } from 'react'
import { graphql } from 'react-relay'
import { TaxComplianceContainer_UpdateUserMutation } from '__generated__/TaxComplianceContainer_UpdateUserMutation.graphql'
import TaxCompliance, { ITaxComplianceProps } from './TaxCompliance'

const validate = (values) => {
  const errors: any = {}
  if (!values.first_name) { errors.first_name = 'Required' }
  if (!values.last_name) { errors.last_name = 'Required' }

  if (values.us_citizen === 'true') {
    if (!values.tax_id) { errors.tax_id = 'Required' }
    if (!values.address_recipient) { errors.address_recipient = 'Required' }
    if (!values.city_recipient) { errors.city_recipient = 'Required' }
    if (!values.country_recipient) { errors.country_recipient = 'Required' }
    if (!values.state_recipient) { errors.state_recipient = 'Required' }
    if (!values.zip) { errors.zip = 'Required' }
    if (!values.phone) { errors.phone = 'Required' }
  }

  return errors
}

const TaxComplianceReduxForm = reduxForm<any, ITaxComplianceProps>({
  form: 'TaxComplianceForm',
  validate,
  enableReinitialize: true,
})(TaxCompliance)

const TaxComplianceContainer = () => {
  const [user, refresh] = useCurrentUser()
  const showSnackbarMessage = useSnackbar()
  const profile = user?.profile

  const { execute: commit } = useQuickCommit<TaxComplianceContainer_UpdateUserMutation>(graphql`
    mutation TaxComplianceContainer_UpdateUserMutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user {
          id
        }
      }
    }
  `)

  const submitForm = useCallback(async (formData) => {
    const result = await commit({
      input: {
        firstName: formData.first_name,
        lastName: formData.last_name,
        phone: formData.phone,
        profile: {
          usCitizen: formData.us_citizen === 'true',
          taxId: formData.tax_id,
          addressRecipient: formData.address_recipient,
          cityRecipient: formData.city_recipient,
          stateRecipient: formData.state_recipient,
          countryRecipient: formData.country_recipient,
          zip: formData.zip,
        },
      },
    })

    if (result?.updateUser?.user?.id) {
      refresh()
      showSnackbarMessage('Tax info updated')
    }
  }, [commit])

  if (!profile) return null

  return (
    <TaxComplianceReduxForm
      profile={profile}
      initialValues={{
        first_name: user.first_name,
        last_name: user.last_name,
        city_recipient: profile.city_recipient,
        country_recipient: profile.country_recipient,
        state_recipient: profile.state_recipient,
        tax_id: profile.tax_id,
        address_recipient: profile.address_recipient,
        zip: profile.zip,
        slug: profile.slug,
        phone: user.phone,
        us_citizen: profile.us_citizen,
      }}
      submitForm={submitForm}
    />
  )
}

export default TaxComplianceContainer
