import React from 'react'
import PropTypes from 'prop-types'
import { plotDArc } from './utils/plot-d-arc'
import styles from './Countdown.module.css'

const COUNTDOWN_DURATION = 3

export default class Countdown extends React.Component {
  static propTypes = {
    isRecordingStarted: PropTypes.bool,
    isRecordingProgress: PropTypes.bool,
    onCountdownFinished: PropTypes.func,
  }

  state = {
    isCountdownProgress: false,
    countdownStartTime: 0,
  }

  componentWillReceiveProps(nextProps) {
    const { isCountdownProgress } = this.state
    const { onCountdownFinished } = this.props

    if (nextProps.isRecordingStarted && !nextProps.isRecordingProgress && !isCountdownProgress) {
      this.setState({
        isCountdownProgress: true,
        countdownStartTime: performance.now(),
      })

      this.countdownFinishTimeoutHandle = window.setTimeout(() => {
        if (onCountdownFinished) {
          onCountdownFinished()
        }
      }, COUNTDOWN_DURATION * 1000)
    } else if (!nextProps.isRecordingStarted && isCountdownProgress) {
      this.setState({
        isCountdownProgress: false,
      })

      window.clearTimeout(this.countdownFinishTimeoutHandle)
    }
  }

  componentDidUpdate() {
    const { isRecordingStarted, isRecordingProgress, onCountdownFinished } = this.props
    const { isCountdownProgress } = this.state

    if (isRecordingStarted && !isRecordingProgress && !isCountdownProgress) {
      this.countdownFinishTimeoutHandle = window.setTimeout(() => {
        if (onCountdownFinished) {
          onCountdownFinished()
        }
      }, COUNTDOWN_DURATION * 1000)

      this.selfUpdateAnimFrameHandle = window.requestAnimationFrame(() => {
        this.setState({
          isCountdownProgress: true,
          countdownStartTime: performance.now(),
        })
      })
    } else if (!isRecordingStarted && isCountdownProgress) {
      this.selfUpdateAnimFrameHandle = window.requestAnimationFrame(() => {
        this.setState({
          isCountdownProgress: false,
        })
      })

      window.clearTimeout(this.countdownFinishTimeoutHandle)
    } else if (isCountdownProgress) {
      this.selfUpdateAnimFrameHandle = window.requestAnimationFrame(() => this.forceUpdate())
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.countdownFinishTimeoutHandle)
    window.cancelAnimationFrame(this.selfUpdateAnimFrameHandle)
  }

  render() {
    const { isRecordingStarted, isRecordingProgress } = this.props
    const { isCountdownProgress, countdownStartTime } = this.state

    if (!isRecordingStarted || isRecordingProgress || !isCountdownProgress) {
      return false
    }

    const remainingTime = Math.max(0, COUNTDOWN_DURATION - (performance.now() - countdownStartTime) / 1000)
    const secondsRemaining = Math.ceil(remainingTime)
    const secondFractionRemaining = Math.max(0, remainingTime % 1)

    if (secondsRemaining <= 0) {
      return false
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <svg viewBox="0 0 100 100" className={styles.circle}>
            {this.renderArc(secondFractionRemaining)}
          </svg>

          <div className={styles.count} data-cy="countdown">
            {secondsRemaining}
          </div>
        </div>
      </div>
    )
  }

  renderArc(fillPercent) {
    if (fillPercent >= 1) {
      return (
        <circle cx="50" cy="50" r="47" stroke="rgb(0, 205, 0)" fill="none" strokeWidth={12} />
      )
    }

    if (fillPercent <= 0) {
      return null
    }

    return (
      <path d={plotDArc(50, 50, 47, 0, 360 * fillPercent)} stroke="rgb(0, 195, 0)" fill="none" strokeWidth={12} />
    )
  }
}
