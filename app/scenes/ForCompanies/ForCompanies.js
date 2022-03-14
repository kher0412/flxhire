import React from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { OurCustomers, PageHeaderPrimaryButton, TopFreelancers } from 'components'
import styles from './ForCompanies.module.css'
import { SignupCTA } from './components'
import HowToHire from './components/HowToHire'
import ToolsToManage from './components/ToolsToManage'

export default class ForCompanies extends React.PureComponent {
  componentDidMount() {
    this.props.getFreelancers()
  }

  render() {
    const { freelancers } = this.props

    return (
      <div >
        <Helmet>
          <title>Companies</title>
          <meta name="description" content="Hire and manage great teams better and faster with Flexhire." />
          <meta property="og:title" content="Companies - Flexhire" />
          <meta property="og:description" content="Hire and manage great teams better and faster with Flexhire." />
        </Helmet>

        <SignupCTA />
        <HowToHire />
        <TopFreelancers
          freelancers={freelancers}
          title="Supercharge Your Hiring Process"
          subtitle="VIRTUALLY MEET TALENT PRE INTERVIEW"
          description={(
            <React.Fragment>
              Our verified member video profiles are richer than any resume, saving you hiring time by rapidly checking qualities like communication skills, experience, cultural and personality fit.
              Flexhire job posts allow you to write custom structured interview questions that applicants can respond to by video, enabling you to find the perfect, motivated talent before you reach the interview stage and exponentially increasing the speed and effectiveness of your hiring process.
            </React.Fragment>
          )}
        />
        <OurCustomers />
        <ToolsToManage />

        <div className={styles.footer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PageHeaderPrimaryButton to="/signup/client?mode=job" data-cy="signup-job">
                Start hiring - post a job
              </PageHeaderPrimaryButton>
            </Grid>

            <Grid item xs={12} md={6}>
              <PageHeaderPrimaryButton to="/flexmanage" data-cy="signup-timesheets">
                Help manage my team
              </PageHeaderPrimaryButton>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
