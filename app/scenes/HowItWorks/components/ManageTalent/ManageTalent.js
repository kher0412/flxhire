import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox, Accordion, HowToHireGraphic } from 'components'
import styles from './ManageTalent.module.css'

export default class ManageTalent extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlide>
                <div className={styles.heading}>
                  Find, Hire &amp; Manage Talent
                </div>

                <div>
                  <AnimBox heavySlide delay={300} offset={-10000}>
                    <Accordion title="Why should I hire through Flexhire?" defaultOpen>
                      Technology is an incredibly fast moving market, and hiring is expensive and complex.
                      Flexhire removes the complexity by pre-qualifying the right talent for your job from a large pool of candidates from all over the world.
                      For freelance talent, we simplify the contracting, billing, time-sheet management and other operational details so that you can focus on getting your technology team spun up as fast as possible with the minimum amount of hassle.
                    </Accordion>
                  </AnimBox>

                  <AnimBox heavySlide delay={450} offset={-10000}>
                    <Accordion title="How do freelance contracts work?">
                      Identification and screening of world class candidates is our core expertise, so you can rest assured that the shortlist of candidates you receive is truly qualified, pre-screened, and optimized for your specific project needs.
                      Once you have completed the vetting process and selected a candidate, for freelance positions our system handles the contracts, invoicing and payment concerns, so that you can focus on building great technology with your new team of experts.
                    </Accordion>
                  </AnimBox>

                  <AnimBox heavySlide delay={600} offset={-10000}>
                    <Accordion title="How much does it cost?">
                      Our members set their own rates.
                      Flexhire makes money by charging a small margin on our freelance candidates calculated dynamically via machine learning based on the demand and supply of the skill set and experience and the at the start of the contract. For permanent candidates we charge a percentage of the first year annual salary.
                      The end result is that you get the best available experts for hire at  highly competitive rates.
                    </Accordion>
                  </AnimBox>
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
