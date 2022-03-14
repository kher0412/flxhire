import React from 'react'
import { Grid } from '@material-ui/core'
import { AnimBox } from 'components'
import styles from './FeaturesSlider.module.css'
import Slider from './components/Slider'

export default class FeaturesSlider extends React.Component {
  state = {
    currentStep: 0,
  }

  componentDidMount() {
    this.autoSlideIntervalHandle = window.setInterval(() => {
      this.setState(state => ({
        currentStep: (state.currentStep + 1) % 4,
      }))
    }, 9000)
  }

  componentWillUnmount() {
    window.clearInterval(this.autoSlideIntervalHandle)
  }

  render() {
    const { currentStep } = this.state

    return (
      <div className={styles.container}>
        <Grid
          container
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} md={6}>
            <div className={styles.slider}>
              <div className={styles.sliderWrapper}>
                <AnimBox grow delay={400} offset={-200}>
                  <Slider currentStep={currentStep} onStepChange={this.handleStepChange} />
                </AnimBox>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimBox offset={-200}>
              {this.renderStepContent()}
            </AnimBox>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderStepContent() {
    const { currentStep } = this.state

    switch (currentStep) {
      case 0:
        return (
          <div key={0} className={styles.content}>
            <div className={styles.heading}>
              Meet real experts
            </div>

            <div className={styles.text}>
              Video based profiles allow you to meet top prescreened candidates before you interview.<br />
              Rich filters allow you to match on location, skills, experience and budget.
            </div>
          </div>
        )

      case 1:
        return (
          <div key={1} className={styles.content}>
            <div className={styles.heading}>
              Manage better
            </div>

            <div className={styles.text}>
              All the tools to manage modern distributed teams.<br />
              Enterprise contract management, work tracking &amp; feedback, distributed global payments.
            </div>
          </div>
        )

      case 2:
        return (
          <div key={2} className={styles.content}>
            <div className={styles.heading}>
              Hire faster
            </div>

            <div className={styles.text}>
              Automate, optimize &amp; customize your early stage hiring filter.<br />
              Meet motivated, qualified candidates before you decide to interview.
            </div>
          </div>
        )

      case 3:
        return (
          <div key={3} className={styles.content}>
            <div className={styles.heading}>
              Hire better
            </div>

            <div className={styles.text}>
              Hire like top companies using what research says works, structured interview questions &amp; skill tests<br />
              Not sure what to ask? Pick suggested questions by expert area asked at the world's best companies.
            </div>
          </div>
        )
    }

    return null
  }

  handleStepChange = (stepIndex) => {
    this.setState({
      currentStep: stepIndex,
    })
  }
}
