import React from 'react'
import { plotDArc } from './utils/plot-d-arc'
import styles from './ProfileCompletion.module.css'

export default class ProfileCompletion extends React.PureComponent {
  static defaultProps = {
    completion: 0,
  }

  state = {
    currentCompletion: 0,
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.progressCurrentCompletion()
    }, 600)
  }

  componentWillReceiveProps(nextProps) {
    const { completion } = this.props

    if (nextProps.completion < completion) {
      this.setState({
        currentCompletion: nextProps.completion,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { completion } = this.props

    if (completion > prevProps.completion) {
      this.progressCurrentCompletion()
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <svg viewBox="0 0 100 100" className={styles.svg}>
          {this.renderArc()}
        </svg>
      </div>
    )
  }

  renderArc() {
    const { currentCompletion } = this.state

    if (currentCompletion >= 1) {
      return (
        <circle cx="50" cy="50" r="47" stroke="#45ffaf" fill="none" strokeWidth={6} />
      )
    }

    return (
      <path d={plotDArc(50, 50, 47, 0, 360 * currentCompletion)} stroke="#45ffaf" fill="none" strokeWidth={6} />
    )
  }

  progressCurrentCompletion() {
    const { completion } = this.props
    const { currentCompletion } = this.state

    if (currentCompletion < completion) {
      this.setState({
        currentCompletion: Math.min(completion, currentCompletion + Math.max(0.0006, 0.08 * (completion - currentCompletion))),
      })

      window.requestAnimationFrame(() => this.progressCurrentCompletion())
    }
  }
}
