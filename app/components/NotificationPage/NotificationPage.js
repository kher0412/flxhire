import React from 'react'
import styles from './NotificationPage.module.css'
import { GreenCheck, PageWrapper } from 'components'

let NotificationPage = ({ notification, title, body }) => {
  return (
    <div className={styles.content}>
      <PageWrapper title={notification}>
        <div className={styles['inner-content']}>
          <div className={styles.title}>
            <GreenCheck/>
            <span className={styles['title-text']} data-cy='notification-title'>{title}</span>
          </div>
          <div className={styles.message} data-cy='notification-message'>{body}</div>
        </div>
      </PageWrapper>
    </div>
  )
}

export default NotificationPage
