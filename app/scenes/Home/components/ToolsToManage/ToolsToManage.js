import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { AnimBox, ToolsToManageGraphic } from 'components'
import styles from './ToolsToManage.module.css'
import HireExpansionPanel from './components/HireExpansionPanel'

export default class ToolsToManage extends React.PureComponent {
  state = {
    currentPanel: 2,
  }

  render() {
    const { currentPanel } = this.state

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Hidden smDown>
              <div className={styles.graphic}>
                <AnimBox grow delay={100} offset={-150}>
                  <ToolsToManageGraphic />
                </AnimBox>
              </div>
            </Hidden>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlideRight offset={-150}>
                <div className={styles.heading}>
                  Tools to Manage a Flexible Team
                </div>

                <div>
                  <AnimBox heavySlideRight delay={200} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 0}
                      title="Enterprise Contract management"
                      onOpen={() => this.handlePanelOpen(0)}
                    >
                      For freelance positions, Flexhire provides a rich set of tools post hiring to help you quickly build and manage an agile, high performant team. Our enterprise contract management solution allows you to simply manage distributed teams. Easily assign and switch managers, handle contract workflows (start and end dates, renewals and rates) and manage bulk communication.
                      Want to use our freelance management tools to take your existing distributed team to the next level? No problem, you don't have to hire on Flexhire to take advantage of our management platform. You can easily streamline the management of any existing freelance team just by inviting them to join your team on Flexhire.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={400} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 1}
                      title="Modern Work Report Tracking"
                      onOpen={() => this.handlePanelOpen(1)}
                    >
                      Build an agile, efficient, accountable high performing team with our modern, simple, mobile-friendly work report tracking with integrated expenses and approval. Remember, want to use our freelance management tools to take your existing distributed team to the next level? No problem, you don't have to hire on Flexhire to take advantage of our management platform. You can easily streamline the management of any existing freelance team just by inviting them to join your team on Flexhire.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlideRight delay={600} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 2}
                      title="One click global distributed payments"
                      onOpen={() => this.handlePanelOpen(2)}
                    >
                      Simply pay an aggregated, itemized team invoice online via credit card or secure bank transfer and we automatically pay your team members no matter where their location across 150 countries around the world.
                      We handle all 1099 taxation processing so you can concentrate on building your business headache free!
                      Remember, want to use our freelance management tools to take your existing distributed team to the next level? No problem, you don't have to hire on Flexhire to take advantage of our management platform. You can easily streamline the management of any existing freelance team just by inviting them to join your team on Flexhire.
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
