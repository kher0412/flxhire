import React from 'react'
import styles from './DurationIndicator.module.css'

export default class DurationIndicator extends React.PureComponent {
  componentDidMount() {
    if (this.props.isPlaying) {
      this.animateFill()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isPlaying && this.props.isPlaying) {
      this.animateFill()
    }
  }

  render() {
    if (!this.props.isPlaying) {
      return false
    }

    return (
      <div className={styles.container}>
        <div className={styles.track}>
          <div className={styles.wrapper} ref={div => this.wrapper = div}>
            <div className={styles.fill} ref={div => this.fill = div} />
          </div>
        </div>
      </div>
    )
  }

  animateFill() {
    const { maxDuration } = this.props

    if (this.fill.animate) {
      // Grow indicator from empty to full, linearly.
      this.wrapper.animate(
        [
          { transform: 'scaleX(0)' },
          { transform: 'scaleX(1)' },
        ],
        {
          duration: maxDuration * 1000,
          easing: 'linear',
        },
      )

      // Start transitioning to red color, from half duration to 90% duration.
      this.fill.animate(
        [
          { background: 'rgb(255, 255, 255)' },
          { background: 'rgb(255, 15,  0)' },
        ],
        {
          delay: maxDuration * 0.5 * 1000,
          duration: maxDuration * 0.4 * 1000,
          easing: 'linear',
        },
      )

      // Flash between white and red during the last 10% of the duration.
      this.fill.animate(
        [
          { background: 'rgb(255, 15,  0)' },
          { background: 'rgb(255, 15,  0)' },
          { background: 'rgb(255, 205, 190)' },
          { background: 'rgb(255, 205, 190)' },
          { background: 'rgb(255, 205, 190)' },
          { background: 'rgb(255, 15,  0)' },
          { background: 'rgb(255, 15,  0)' },
        ],
        {
          delay: maxDuration * 0.9 * 1000,
          duration: 700,
          iterations: Infinity,
          easing: 'linear',
        },
      )
    }
  }
}
