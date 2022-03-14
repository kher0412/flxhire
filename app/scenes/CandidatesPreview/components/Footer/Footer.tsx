import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeaderPrimaryButton } from 'components'
import styles from './Footer.module.css'

export interface IFooterProps {
  signupUrl: string
  freelancerTypeName: string
}

export default class Footer extends React.PureComponent<IFooterProps> {
  render() {
    const { signupUrl, freelancerTypeName } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.text}>
          Post your job on Flexhire today to hire {freelancerTypeName} experts like these
        </div>

        <Grid container spacing={3} style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={8} md={6}>
            <PageHeaderPrimaryButton to={signupUrl}>
              Post Your Job
            </PageHeaderPrimaryButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}
