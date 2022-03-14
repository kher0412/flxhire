import React from 'react'
import { PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderPrimaryButton } from 'components'
import Grid from '@material-ui/core/Grid'

const SignupCTA = () => {
  return (
    <PageHeader alternative white style={{ marginBottom: 0, paddingBottom: 96 }}>
      <PageHeaderTitle variant="center" data-cy="main-cta">
        We help talented individuals find great work with top companies
      </PageHeaderTitle>

      <PageHeaderSubtitle variant="center">
        Find out how we help talented individuals who care about their careers find jobs they love
      </PageHeaderSubtitle>

      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={10} md={8}>
          <PageHeaderPrimaryButton to="/signup/[user_type]" as="/signup/member" data-cy="signup-today">
            Signup today
          </PageHeaderPrimaryButton>
        </Grid>
      </Grid>
    </PageHeader>
  )
}

export default SignupCTA
