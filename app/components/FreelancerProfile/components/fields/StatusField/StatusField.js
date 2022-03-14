import React from 'react'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import UnverifiedUserIcon from '@material-ui/icons/Cancel'
import styles from './StatusField.module.css'

export default class StatusField extends React.Component {
  render() {
    const { editable, input } = this.props

    if (editable) {
      // Nothing the freelancer can do about verification on the profile directly.
      // Hide it to avoid confusion.
      return null
    }

    if (input.value === 'accepted') {
      return (
        <div className={styles.verified} data-cy="verification-badge-verified">
          <VerifiedUserIcon className={styles['status-icon']} /> Verified
        </div>
      )
    }

    if (input.value === 'pending') {
      return (
        <div className={styles.unverified} data-cy="verification-badge-pending">
          <VerifiedUserIcon className={styles['status-icon']} /> Pending
        </div>
      )
    }

    return (
      <div className={styles.unverified} data-cy="verification-badge-unverified">
        <UnverifiedUserIcon className={styles['status-icon']} /> Unverified
      </div>
    )
  }
}
