import React from 'react'
import { FormErrorSummary } from 'components'
import { Grid, Card } from '@material-ui/core'
import { Button, Box, TextField, TextArea } from 'components/themed'
import CompanyLogoFields from 'components/CompanyLogoFields'
import { Fields, Field } from 'redux-form'
import { CheckCircle } from '@material-ui/icons'
import { CompanyFormContainerProps } from './CompanyFormContainer'
import styles from './CompanyForm.module.css'

export interface ICompanyFormProps {
  firmSlug?: string
  status?: string
  onContinue: () => void
}

export default class CompanyForm extends React.Component<ICompanyFormProps & Partial<CompanyFormContainerProps>> {
  render() {
    const { handleSubmit, submitting, submitFailed } = this.props

    return (
      <Card variant="outlined" elevation={0}>
        <Box>
          <form onSubmit={handleSubmit(this.handleNextClickSubmit)} style={{ maxWidth: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Fields
                  names={['logo_url', 'avatar_url', 'alternative_background']}
                  component={CompanyLogoFields}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  name="name"
                  fullWidth
                  component={TextField}
                  label="Company name"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  name="website"
                  fullWidth
                  component={TextField}
                  label="Company URL"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Field
                  name="description"
                  placeholder="Write a few words about your company, your team and your culture..."
                  component={TextArea}
                  label="Company description"
                />
              </Grid>

              <Grid item xs={12} md={12} className={styles.buttonsContainer}>
                <Button
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  data-cy="submit-company"
                >
                  <CheckCircle /> Continue
                </Button>

                <div>
                  <FormErrorSummary show={submitFailed} />
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    )
  }

  handleSaveClickSubmit = (formData) => {
    const { submitForm } = this.props
    submitForm({ formData })
  }

  handleNextClickSubmit = (formData) => {
    const { submitForm, onContinue } = this.props
    submitForm({ formData })
    onContinue()
  }
}
