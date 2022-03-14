import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox, Accordion, ToolsToManageGraphic } from 'components'
import styles from './WorkWithBestCompanies.module.css'

export default class WorkWithBestCompanies extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.divider} />

        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Hidden smDown>
              <div className={styles.graphic}>
                <AnimBox grow delay={300}>
                  <ToolsToManageGraphic />
                </AnimBox>
              </div>
            </Hidden>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlideRight>
                <div className={styles.heading}>
                  Freelancers, Work with the Best Companies
                </div>

                <div>
                  <AnimBox heavySlideRight delay={400} offset={-10000}>
                    <Accordion title="Why should I work through Flexhire?" defaultOpen>
                      We take a rigorous science based approach to hiring, ensuring pre-screened candidates get matches to positions that best suit their skills.
                      As a result, our members work with top companies around the world.
                      We have a large network of clients, allowing you to find lucrative work that interests you with very little hassle.
                      The jobs that our clients offer include a mix of on-site and remote work, so you can choose the work-life balance that meets your specific needs.
                      Our members have worked with companies like Google, Facebook, and Apple.
                      Finally, for freelance positions, the Flexhire system automates all the elements required to get you paid for your work, saving you the hassle of chasing for payments and the complexity of work report management, invoicing, and international wire transfers.
                    </Accordion>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={600} offset={-10000}>
                    <Accordion title="How do freelance contracts work?">
                      Once you have completed the vetting process and are an approved member in the Flexhire network, you will begin to show up on all relevant job searches in the system. To allow you to focus on what you do best, for freelance positions our platform handles the contracts, invoicing and payment concerns, so that you can focus on building great technology for your clients.
                    </Accordion>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={800} offset={-10000}>
                    <Accordion title="How do I get paid for freelance work?">
                      All payment is automated through our platform. You submit timesheets to your clients at the end of every week you work, and you get paid every week through our automated payment platform no matter where you are based in the world.
                    </Accordion>
                  </AnimBox>
                </div>
              </AnimBox>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
