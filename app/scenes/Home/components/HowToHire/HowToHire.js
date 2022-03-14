import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { ExternalLink, AnimBox, HowToHireGraphic } from 'components'
import styles from './HowToHire.module.css'
import HireExpansionPanel from './components/HireExpansionPanel'

export default class HowToHire extends React.PureComponent {
  state = {
    currentPanel: 2,
  }

  render() {
    const { currentPanel } = this.state

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.content}>
              <AnimBox heavySlide offset={-150}>
                <div className={styles.heading}>
                  Hire Better With Flexhire
                </div>

                <div>
                  <AnimBox heavySlide delay={200} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 0}
                      title="Structured Interview Questions"
                      onOpen={() => this.handlePanelOpen(0)}
                    >
                      A "structured interview" refers to the method of asking the same questions to all candidates during an interview process. Mulitiple seminal academic studies such as
                      {' '}<ExternalLink href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.172.1733&rep=rep1&type=pdf" label="Schmidt, Hunter" />{' '}
                      and <ExternalLink href="https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1744-6570.2000.tb00204.x" label="Cortina, Goldstein et al" />{' '}
                      have proven this approach correlates with job performance success. The world's best companies also know and <ExternalLink href="https://www.wired.com/2015/04/hire-like-google/" label="use this approach" />.
                      Flexhire makes it simple to automatically ask top motivated candidates the same role related questions and easily review their answers via video.
                      In addition to your own specific questions you can also choose from our extensive database of the top role related questions asked at the world's best companies.
                      This is research based hiring made simple at startup speed.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlide delay={350} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 1}
                      title="Skill Based Assessment"
                      onOpen={() => this.handlePanelOpen(1)}
                    >
                      An <ExternalLink href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.172.1733&rep=rep1&type=pdf" label="analysis of 85 years of research" /> across 19 different variables concluded that the best predictor of how someone will perform in a job is a work sample test.
                      For software development roles, Flexhire makes it easy to test the ability to write quality code. Simply integrate code tests into your hiring process with one click. We make it easy to control how rigorous you want the application process to be by either providing your own code test, selecting one of our code tests or allowing candidates to share an existing project.
                      You can also choose to add a code test to the first application step, or later in the hiring process.
                      This easily allows you to build a customized pipeline that works for you, whether it's attracting lots of candidates by lowering the initial barrier to apply or making that initial first filter more rigorous.
                    </HireExpansionPanel>
                  </AnimBox>

                  <AnimBox heavySlide delay={500} offset={-10000}>
                    <HireExpansionPanel
                      open={currentPanel === 2}
                      title="Video Profiles and Answers"
                      onOpen={() => this.handlePanelOpen(2)}
                    >
                      Hire faster and better by virtually meeting top pre-screened talent with Flexhire's video first profiles and video answers to your questions. Our video first approach allows you to optimize the early stage of your hiring funnel, getting to know pre-screened, professional, motivated and qualified candidates at scale to find the perfect fit for your project or role.
                      Not sure what are the best questions to ask for your role? Easily select questions that the best companies in the world ask for the same roles.
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
