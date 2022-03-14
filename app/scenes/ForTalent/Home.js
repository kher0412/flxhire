import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { PageHeaderPrimaryButton, TopFreelancers } from 'components'
import { SignupCTA } from './components'
import CreateYourProfile from './components/CreateYourProfile'
import HowItWorks from './components/HowItWorks'
import styles from './Home.module.css'

export default class Home extends React.PureComponent {
  render() {
    const { freelancers } = this.props

    return (
      <div className={styles.container}>
        <Helmet>
          <title>Talent</title>
          <meta name="description" content="We help talented individuals find great work with top companies. Create your profile and build your brand, then companies contact you directly so you get great job offers." />
          <meta property="og:title" content="Talent - Flexhire" />
          <meta property="og:description" content="We help talented individuals find great work with top companies. Create your profile and build your brand, then companies contact you directly so you get great job offers." />
        </Helmet>

        <SignupCTA />

        <TopFreelancers
          freelancers={freelancers}
          title="For people who care about their careers"
        />

        <CreateYourProfile />
        <HowItWorks />

        <Grid container spacing={3} style={{ justifyContent: 'center', marginBottom: 96 }}>
          <Grid item xs={12} sm={8} md={5}>
            <PageHeaderPrimaryButton to="/signup/[user_type]" as="/signup/member" data-cy="signup-today">
              <MediaQuery maxWidth={700}>
                Design your resume
              </MediaQuery>

              <MediaQuery minWidth={701}>
                Start designing your resume
              </MediaQuery>
            </PageHeaderPrimaryButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}
