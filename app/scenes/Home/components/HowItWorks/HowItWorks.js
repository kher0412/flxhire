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

        <AnimBox offset={-100}>
          <div className={styles.heading}>
            How it Works
          </div>

          <div className={styles.subheading}>
            From hire to manage in 4 easy steps
          </div>

          <div className={styles.items}>
            <Hidden smDown>
              <div className={styles.itemsConnector} />
            </Hidden>

            <div className={styles.itemsWrapper}>
              <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Post a Position" icon={<PositionIcon />} style={{ animationDelay: '400ms' }}>
                    Specify role details and we instantly match you with pre-screened available matching candidates
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Review Applications" icon={<MatchesIcon />} style={{ animationDelay: '550ms' }}>
                    Leverage research based hiring tools to review motivated, qualified candidate video applications at scale
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Interview & Hire" icon={<InterviewIcon />} style={{ animationDelay: '700ms' }}>
                    Simply schedule interviews and make offers with the candidates you like based on their rich applications
                  </HowItWorksItem>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <HowItWorksItem title="Manage All in the App" icon={<ManageIcon />} style={{ animationDelay: '850ms' }}>
                    All the tools you need to help manage an agile, high performant, distributed team.
                  </HowItWorksItem>
                </Grid>
              </Grid>
            </div>

          </div>
        </AnimBox>

        <div className={styles.divider} />
      </div>
    )
  }
}
