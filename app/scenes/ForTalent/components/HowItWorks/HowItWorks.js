import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox } from 'components'
import PositionIcon from './components/PositionIcon'
import MatchesIcon from './components/MatchesIcon'
import InterviewIcon from './components/InterviewIcon'
import ManageIcon from './components/ManageIcon'
import HowItWorksItem from './components/HowItWorksItem'
import styles from './HowItWorks.module.css'

export default class HowItWorks extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.divider} />

        <AnimBox>
          <div className={styles.heading}>
            How it Works
          </div>

          {/* <div className={styles.subheading}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse<br />
            cillum dolore eu fugiat nulla pariatur.
          </div> */}

          <div className={styles.items}>
            <Hidden smDown>
              <div className={styles.itemsConnector} />
            </Hidden>

            <div className={styles.itemsWrapper}>
              <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Design your resume" icon={<MatchesIcon />} style={{ animationDelay: '500ms' }}>
                    Add your skills, interests and introduction to your resume through a rich visual editor experience.
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Record your introduction" icon={<MatchesIcon />} style={{ animationDelay: '733ms' }}>
                    Introduce yourself via video, the best way to convince companies of your skills and communication.
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Get featured to clients" icon={<InterviewIcon />} style={{ animationDelay: '1166ms' }}>
                    We highlight your profile to our clients looking for your skills, experience and work preferences.
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Get job offers" icon={<PositionIcon />} style={{ animationDelay: '1500ms' }}>
                    Clients reach out directly to you with exciting job offers.
                  </HowItWorksItem>
                </Grid>
              </Grid>
            </div>
          </div>
        </AnimBox>
      </div>
    )
  }
}
