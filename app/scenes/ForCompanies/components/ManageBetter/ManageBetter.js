import React from 'react'
import styles from './ManageBetter.module.css'

import { Button } from 'components/themed'
import { Link, Picture } from 'components'
import Grid from '@material-ui/core/Grid'

class ManageBetter extends React.Component {
  render() {
    return (
      <div className={styles['manage-better']}><a name="manage_better" />
        <div className={styles.title}>
          Manage Your On Demand Workforce with Flexhire
        </div>

        <div>
            <div style={{ paddingTop: 50 }}>
              <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                  <div className={styles.item}>
                    <div className={styles['item-wrapper-left']}>
                      <div className={styles['item-title-left']}>
                        Move faster than your competition with modern cloud based management of your on demand workforce
                      </div>
                      <div className={styles['item-text']}>
                        Join our existing fortune 500 and venture backed startup customers saving time and money and executing faster than their competition by managing their on-demand contractor/freelance workforce using our mobile first cloud based enterprise software.
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                  <Picture
                    src={require('assets/images/graphics/speed.png?webp')}
                    srcFallback={require('assets/images/graphics/speed.png')}
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                  <Picture
                    src={require('assets/images/graphics/sign.png?webp')}
                    srcFallback={require('assets/images/graphics/sign.png')}
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={styles.item}>
                    <div className={styles['item-wrapper-right']}>
                      <div className={styles['item-title-right']}>
                        Safe onboarding in seconds
                      </div>
                      <div className={styles['item-text']}>
                        Quick, simple and safe onboarding, background checks, enterprise contract management and 1099 taxation processing means we take away the headaches to getting your team working.
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={styles.item}>
                    <div className={styles['item-wrapper-left']}>
                      <div className={styles['item-title-left']}>
                        Build high performant agile teams with modern work reporting and structured feedback
                      </div>
                      <div className={styles['item-text']}>
                        Our streamlined, enterprise work report tracking and structured feedback system makes it easy to build, manage and scale agile high performant teams. Whether your team is local, fully distributed or hybrid, our software makes management simple and effective.
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                  <Picture
                    src={require('assets/images/graphics/reviews.png?webp')}
                    srcFallback={require('assets/images/graphics/reviews.png')}
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                  <Picture
                    src={require('assets/images/graphics/payment.png?webp')}
                    srcFallback={require('assets/images/graphics/payment.png')}
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={styles.item}>
                    <div className={styles['item-wrapper-right']}>
                      <div className={styles['item-title-right']}>
                        Simplify and automate payment processing for your team
                      </div>
                      <div className={styles['item-text']}>
                        Flexhire lets you automate payment processing for any or all of your team and massively simplifies your payroll process. Pay your whole team with a single click, no matter where they are in the world.
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>


        <div className={styles.bottom}>
          <Link href="/flexmanage" style={{ textDecoration: 'none' }}>
            <Button color="primary" className={styles.cta}>
              Signup to Help Manage My Team
            </Button>
          </Link>
        </div>
      </div>
    )
  }


  shouldComponentUpdate() {
    return false
  }
}

export default ManageBetter
