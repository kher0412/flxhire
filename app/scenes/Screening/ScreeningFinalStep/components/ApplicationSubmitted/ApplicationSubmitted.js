import React from 'react'
import styles from './ApplicationSubmitted.module.css'
import { NotificationPage } from 'components'

class ApplicationSubmitted extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <NotificationPage
          title="Thank you"
          style={{ color: 'white' }}
          body={this.body()}
        />
      </div>
    )
  }

  body() {
    return (
      <div>
        <p>
          We are currently reviewing your application and you will get notified as soon as the review is complete. Please contact us at
          <a href="mailto:info@flexhire.com" className={styles.email}>info@flexhire.com</a> if you have any questions.
        </p>
        <p>
          You can review your profile by clicking <a href="/profile">here</a>
        </p>
      </div>
    )
  }
}

export default ApplicationSubmitted
