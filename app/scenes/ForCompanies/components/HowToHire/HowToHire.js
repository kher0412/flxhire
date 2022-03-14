import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox, HowToHireGraphic } from 'components'
import styles from './HowToHire.module.css'
import HireExpansionPanel from './components/HireExpansionPanel'

export default class HowToHire extends React.PureComponent {
  state = {
    currentPanel: 0,
  }

  render() {
    const { currentPanel } = this.state

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlide>
                <div className={styles.heading}>
                  Hire Better and Faster with Flexhire
                </div>

                <div>
                  <AnimBox heavySlide delay={300} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 0}
                      title="A scientific approach to successful hiring"
                      onOpen={() => this.handlePanelOpen(0)}
                    >
                      Our approach to hiring is based on 25 years of academic research into the best predictors of successful hiring:
                      verified relevant experience, cognitive ability and structured interview questions
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlide delay={450} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 1}
                      title="Triple screened global talent pool"
                      onOpen={() => this.handlePanelOpen(1)}
                    >
                      Flexhire is a global marketplace, giving you the ability to hire the right talent for your team locally or from anywhere in the world.
                      Our system instantly matches you with triple-screened, highly qualified professionals, ensuring that you only see the best.
                      Every candidate has their communication skills, references and technical abilities verified before they are approved.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlide delay={600} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 2}
                      title="Powerful suite of tools"
                      onOpen={() => this.handlePanelOpen(2)}
                    >
                      Flexhire has powerful tools that allow you to hire however you want.
                      Filter according to budget, position type (contract or permanent) or job location (search within a given distance of your office, or set a timezone range).
                      If you want to hire remote and freelance, we also provides the tools to make that simple.
                      Contract management, work report tracking and approval, automated invoicing, tax compliance tools, global payment processing, reporting tools and more are all part of the platform at no extra cost.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlide delay={600} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 3}
                      title="All completely free until you make a hire"
                      onOpen={() => this.handlePanelOpen(3)}
                    >
                      Our entire system is free until you make a hire.
                      Once you’ve found someone you like, our fees are built into the hourly rates you see, so there are no surprise costs to you or your talent.
                    </HireExpansionPanel>
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

  handlePanelOpen = (panelIndex) => {
    this.setState(state => ({
      currentPanel: state.currentPanel === panelIndex ? -1 : panelIndex,
    }))
  }
}
