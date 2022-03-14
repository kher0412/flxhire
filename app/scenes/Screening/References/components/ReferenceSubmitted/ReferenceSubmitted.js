import React from 'react'
import styles from './ReferenceSubmitted.module.css'
import { NotificationPage } from 'components'

let ReferenceSubmitted = () => {
  return (
    <div className={styles.container}>
      <NotificationPage
        notification='Reference Submitted'
        title='Thank you'
        body='Your reference was successfully submitted.'/>
    </div>
  )
}

export default ReferenceSubmitted
