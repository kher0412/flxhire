import React from 'react'
import { CardContent } from '@material-ui/core'
import styles from './FreelancerCardContent.module.css'

export default class FreelancerCardContent extends React.PureComponent<{ children: React.ReactNode }> {
  render() {
    const { children } = this.props

    return (
      <CardContent style={{ paddingBottom: 0, paddingTop: 12 }}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </CardContent>
    )
  }
}
