import React from 'react'
import styles from './Alerts.module.css'

class Alerts extends React.PureComponent {
  render() {
    const message = this.getMessage()

    if (message) {
      return (
        <div className={styles.container}>
          {message}
        </div>
      )
    }

    return null
  }

  getMessage() {
    const { numInterviews, numJobOffers, hasJobOfferWithPaymentsDisabled } = this.props

    if (numInterviews > 0 && numJobOffers > 0) {
      return (
        <span data-cy="alert-interviews-and-offers">
          <a href="#dashboard-interview-requests" className={styles.link}>
            {this.getInterviewsCount(numInterviews)} and {this.getJobOffersCount(numJobOffers)}
          </a>
        </span>
      )
    }

    if (numInterviews > 0) {
      return (
        <span data-cy="alert-interviews">
          <a href="#dashboard-interview-requests" className={styles.link}>
            {this.getInterviewsCount(numInterviews)}
          </a>
        </span>
      )
    }

    if (numJobOffers > 0) {
      if (numJobOffers === 1 && hasJobOfferWithPaymentsDisabled) {
        return (
          <span data-cy="alert-invitation">
            <a href="#dashboard-job-offers" className={styles.link}>
              1 new team invitation
            </a>
          </span>
        )
      }

      return (
        <span data-cy="alert-job-offers">
          <a href="#dashboard-job-offers" className={styles.link}>
            {this.getJobOffersCount(numJobOffers)}
          </a>
        </span>
      )
    }

    return null
  }

  getInterviewsCount(count) {
    if (count === 1) {
      return '1 new interview'
    }

    return `${count} new interviews`
  }

  getJobOffersCount(count) {
    if (count === 1) {
      return '1 new job offer'
    }

    return `${count} new job offers`
  }
}

export default Alerts
