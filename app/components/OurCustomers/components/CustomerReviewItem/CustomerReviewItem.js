import React from 'react'
import { Grid } from '@material-ui/core'
import styles from './CustomerReviewItem.module.css'

export default class CustomerReviewItem extends React.PureComponent {
  render() {
    const { authorName, authorPosition, authorCompany, authorCompanyLogo, children } = this.props

    return (
      <div className={styles.wrapper}>
        {/*
        <div className={styles.avatar}>
          TODO: add avatar somehow
        </div>
        */}
        <div className={styles.container}>
          <div className={styles.text}>
            {children}
          </div>

          <div className={styles.meta}>
            <div className={styles.author}>
              {authorName}

              <div>
                <span className={styles.position}>{authorPosition} at</span> <span className={styles.company}>{authorCompany}</span>
              </div>
            </div>

            {/* <img
              alt="Logo"
              className={styles.avatar}
              src={authorCompanyLogo}
            /> */}
          </div>
        </div>
      </div>
    )
  }
}
