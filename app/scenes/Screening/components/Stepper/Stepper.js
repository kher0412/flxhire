import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Stepper as MuiStepper, Step, StepButton } from '@material-ui/core'
import { Link } from 'components'
import styles from './Stepper.module.css'

class Stepper extends React.Component {
  state = {
    maxStep: 0,
  }

  static getDerivedStateFromProps(props, state) {
    return {
      maxStep: Math.max(props.stepNum || 0, state.maxStep),
    }
  }

  renderStep = (step, i) => {
    const { maxStep } = this.state
    const { linear } = this.props
    const navigable = (i <= maxStep || !linear)

    return (
      <Step key={i} style={navigable ? undefined : { cursor: 'not-allowed' }}>
        <StepButton
          component={navigable ? Link : undefined}
          href={navigable ? step.href : undefined}
          as={navigable ? step.as : undefined}
          data-cy={`step-button-${i}`}
          className={this.getStepStyleName(i)}
          style={navigable ? undefined : { pointerEvents: 'none' }}
        >
          <span className={styles['step-label-text']}>
            <MediaQuery maxWidth={600}>
              {isMobile => isMobile && step.shortName ? step.shortName : step.name}
            </MediaQuery>
          </span>
        </StepButton>
      </Step>
    )
  }

  render() {
    const { steps, stepNum } = this.props

    return (
      <MuiStepper
        alternativeLabel
        nonLinear
        activeStep={stepNum}
        className={styles.stepper}
        style={{ width: '100%', background: 'none', boxSizing: 'border-box' }}
      >
        {steps.map(this.renderStep)}
      </MuiStepper>
    )
  }

  getStepStyleName(step) {
    const { stepNum } = this.props

    if (step === stepNum) {
      return [styles['step-label'], styles.current].join(' ')
    }

    if (stepNum > step) {
      return [styles['step-label'], styles.completed].join(' ')
    }

    return styles['step-label']
  }
}

export default Stepper
