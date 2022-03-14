import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { HowToHireGraphic, AnimBox } from 'components'
import styles from './CreateYourProfile.module.css'

export default class CreateYourProfile extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlide>
                <div className={styles.heading}>
                  Create your profile and build your brand
                </div>

                <div className={styles.text}>
                  At Flexhire we believe that the future of the resume is seeing you speak.
                  We know that our rich video profiles help companies hire faster.
                  We also know that careers are changing: sometimes you might work in a permanent role, sometimes a consultant role, sometimes in an office and sometimes remotely.<br /><br />
                  Flexhire is designed to support your flexible career in this changing world.
                  Help us help your career by creating your Flexhire video profile today.
                </div>
              </AnimBox>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Hidden smDown>
              <div className={styles.graphic}>
                <AnimBox grow delay={300}>
                  <HowToHireGraphic />
                </AnimBox>
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </div>
    )
  }
}
