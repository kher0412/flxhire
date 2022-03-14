import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox, ToolsToManageGraphic } from 'components'
import styles from './ToolsToManage.module.css'
import HireExpansionPanel from './components/HireExpansionPanel'

export default class ToolsToManage extends React.PureComponent {
  state = {
    currentPanel: 0,
  }

  render() {
    const { currentPanel } = this.state

    return (
      <div className={styles.container}>
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
                  Manage Your On Demand Workforce with Flexhire
                </div>

                <div>
                  <AnimBox heavySlideRight delay={400} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 0}
                      title="Move faster than your competition with modern cloud based management of your on demand workforce"
                      onOpen={() => this.handlePanelOpen(0)}
                    >
                      Join our existing fortune 500 and venture backed startup customers saving time and money and executing faster than their competition by managing their on-demand contractor/freelance workforce using our mobile first cloud based enterprise software.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={600} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 1}
                      title="Safe onboarding in seconds"
                      onOpen={() => this.handlePanelOpen(1)}
                    >
                      Quick, simple and safe onboarding, background checks, enterprise contract management and 1099 taxation processing means we take away the headaches to getting your team working.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={800} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 2}
                      title="High performant agile teams with modern work report tracking and structured feedback"
                      onOpen={() => this.handlePanelOpen(2)}
                    >
                      Our streamlined, enterprise work report tracking and structured feedback system makes it easy to build, manage and scale agile high performant teams. Whether your team is local, fully distributed or hybrid, our software makes management simple and effective.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={800} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 3}
                      title="Simplify and automate payment processing for your team"
                      onOpen={() => this.handlePanelOpen(3)}
                    >
                      Flexhire lets you automate payment processing for any or all of your team and massively simplifies your payroll process.
                      Pay your whole team with a single click, no matter where they are in the world.
                    </HireExpansionPanel>
                  </AnimBox>
                </div>
              </AnimBox>
            </div>
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
