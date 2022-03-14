import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Helmet } from 'react-helmet'
import { Field } from 'redux-form'
import { Grid, Hidden, Card } from '@material-ui/core'
import {
  PageContainer,
  PageWrapper,
  TermsOfServiceField,
  PageHeader,
  PageHeaderTitle,
  PageHeaderSubtitle,
  LoadingIcon,
} from 'components'
import { Button, TextField } from 'components/themed'
import { Send } from '@material-ui/icons'
import styles from './SignupTimesheets.module.css'
import { SignupTimesheetsContainerProps } from './SignupTimesheetsContainer'

export interface ISignupTimesheetsProps extends SignupTimesheetsContainerProps {

}

export default class SignupTimesheets extends React.Component<ISignupTimesheetsProps> {
  render() {
    const { handleSubmit, submitForm, loading } = this.props

    return (
      <div>
        <Helmet>
          <title>Signup for Work Report Management</title>
          <meta name="description" content="FlexManage - Your Distributed Team Management Platform from FlexHire. Build high performant remote teams with modern work reporting, structured feedback and simplified global payments by creating your account as a first step." />
          <meta property="og:title" content="FlexManage - Your Distributed Team Management Platform from FlexHire" />
          <meta property="og:description" content="FlexManage - Your Distributed Team Management Platform from FlexHire. Build high performant remote teams with modern work reporting, structured feedback and simplified global payments by creating your account as a first step." />
        </Helmet>

        <PageHeader alternative white>
          <PageHeaderTitle variant="center">
            Manage high performant remote teams
          </PageHeaderTitle>

          <PageHeaderSubtitle style={{ textAlign: 'center', marginBottom: 0, marginTop: 24 }}>
            Enterprise team management, simple work reporting with structured feedback & one click global payments.
            FlexManage - your distributed team management platform from FlexHire.
          </PageHeaderSubtitle>
        </PageHeader>

        <PageContainer>
          <PageWrapper style={{ position: 'relative', zIndex: 3 }} withoutCard>
            <div className={styles.container} style={{ marginTop: 48 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <div className={styles['section-heading']}>
                    <MediaQuery minWidth={540}>
                      Step 1: create your account
                    </MediaQuery>

                    <MediaQuery maxWidth={539}>
                      Create your account
                    </MediaQuery>
                  </div>

                  <div className={styles.copy}>
                    FlexManage from FlexHire is completely free.
                    Create your account, send out invitations to your team, and manage their work with FlexManage from FlexHire.
                    Setup takes less than 5 minutes.
                  </div>

                  <div className={styles.copy}>
                    Grow your team on demand, at any time, by hiring triple screened, top-quality workforce through FlexHire.
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Hidden mdDown>
                    <img
                      className={styles.screenshot}
                      src={require('assets/images/timesheet-management.png')} // eslint-disable-line global-require
                      alt="work report management"
                    />

                    <div className={styles['screenshot-subtitle']}>
                      Team management dashboard
                    </div>
                  </Hidden>
                </Grid>
              </Grid>
            </div>

            <Card raised>
              <div className={styles.container}>
                <form onSubmit={handleSubmit(formData => submitForm(formData))}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Field
                        name="email"
                        label="Email"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="password"
                        type="password"
                        label="Password"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="password_confirmation"
                        type="password"
                        label="Password Confirmation"
                        component={TextField}
                        fullWidth
                        data-cy="confirm-password"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="first_name"
                        label="First name"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="last_name"
                        label="Last name"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="phone"
                        label="Phone #"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        name="companyName"
                        label="Company name"
                        component={TextField}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field name="terms_of_service" component={TermsOfServiceField} />
                    </Grid>
                  </Grid>

                  <div className={styles['submit-container']}>
                    <Button color="primary" type="submit" data-cy="submit" disabled={loading} fullWidth>
                      {loading ? (<LoadingIcon />) : (<Send />)}

                      <MediaQuery minWidth={540}>
                        Step 1: Create your account
                      </MediaQuery>

                      <MediaQuery maxWidth={539}>
                        Invite your team
                      </MediaQuery>
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }
}
