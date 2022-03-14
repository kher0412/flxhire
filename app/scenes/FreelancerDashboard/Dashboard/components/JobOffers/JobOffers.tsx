import React from 'react'
import Link from 'components/Link'
import { Card, Typography } from '@material-ui/core'
import { AssignmentTurnedIn } from '@material-ui/icons'
import styles from './JobOffers.module.css'
import JobOffer from './components/JobOffer'
import AcceptJobOfferDialog from './components/AcceptJobOfferDialog'
import DeclineJobOfferDialog from './components/DeclineJobOfferDialog'
import { ContainerProps } from './JobOffersContainer'

class JobOffers extends React.Component<ContainerProps> {
  shouldComponentUpdate(nextProps) {
    const { jobOffers } = this.props
    return (jobOffers.length > 0 || nextProps.jobOffers.length > 0)
  }

  render() {
    return (
      <div className={styles.container} data-cy="job-offers-container" id="dashboard-job-offers">
        <AcceptJobOfferDialog />
        <DeclineJobOfferDialog />
        {this.renderPlaceholderIfEmpty()}
        {this.renderJobOffersIfNotEmpty()}
      </div>
    )
  }

  renderJobOffersIfNotEmpty() {
    const { jobOffers } = this.props

    if (jobOffers.length > 0) {
      return jobOffers.map(jobOffer => <JobOffer key={jobOffer.id} jobOffer={jobOffer} />)
    }

    return null
  }

  renderPlaceholderIfEmpty() {
    const { user = {}, jobOffers } = this.props

    if (jobOffers.length === 0) {
      const profileUrl = (user.profile && user.profile.slug) || 'freelancer/profile'

      return (
        <Card className={styles.placeholder} raised>
          <div className={styles['placeholder-text']}>
            <div className={styles['placeholder-title']}>
              <AssignmentTurnedIn style={{ marginRight: 6 }} /> 0
            </div>

            <Typography variant="body2">
              No job offers at the moment.
              When a client is interested in working with you, you'll see job offers here.

              <br />
              <br />

              <Link href="/[...slugs]" as={`/${profileUrl}`} className={styles.link}>
                Share your profile to get more clients
              </Link>
            </Typography>
          </div>
        </Card>
      )
    }

    return null
  }
}

export default JobOffers
