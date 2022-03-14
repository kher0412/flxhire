import React from 'react'
import PropTypes from 'prop-types'
import storage from 'services/localStorage'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import Stop from '@material-ui/icons/Stop'
import { Fab } from 'components/themed'
import Slider from '@material-ui/core/Slider'
import styles from './Teleprompter.module.css'

class Teleprompter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      playSpeed: 1,
    }
    this.displayText = React.createRef()
    this.scrollTimerId = null
  }

  componentWillUnmount() {
    this.stop()
  }

  play = () => {
    this.setState({ isPlaying: true })
    this.scrollTimerId = setInterval(() => {
      if (this.displayText && this.displayText.current) {
        const containerHeight = this.displayText.current.scrollHeight - this.displayText.current.offsetHeight
        const scrollPosition = this.displayText.current.scrollTop + 10
        if (containerHeight <= scrollPosition) {
          this.stop()
        }
        this.displayText.current.scrollTop += this.state.playSpeed
      }
    }, 30)
  }

  pause = () => {
    clearInterval(this.scrollTimerId)
    this.scrollTimerId = null
    this.setState({ isPlaying: false })
  }

  stop = () => {
    this.pause()
    // CSS `scroll-behavior:smooth` needs time to finish scrolling before we scroll back to top.
    setTimeout(() => {
      if (this.displayText && this.displayText.current) this.displayText.current.scrollTop = 0
    }, 500)
  }

  handlePlayPauseClick = () => {
    if (this.state.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  handleStopClick = () => {
    this.stop()
  }

  handleSpeedChange = (event, value) => {
    this.setState({ playSpeed: value })
  }

  handleTextInput = () => {
    const { localStorageKey } = this.props
    if (localStorageKey) {
      storage.setItem(localStorageKey, this.displayText.current.innerHTML)
    }
  }

  loadFromLocalStorage = () => {
    const { localStorageKey, defaultText = '' } = this.props
    if (localStorageKey && storage.getItem(localStorageKey)) {
      return { __html: storage.getItem(localStorageKey) }
    }
    return { __html: defaultText }
  }

  render() {
    const { isPlaying, playSpeed } = this.state
    return (
      <div className={styles.teleprompter}>
        <div className={styles.display}>
          <div
            className={styles.text}
            ref={this.displayText}
            contentEditable
            dangerouslySetInnerHTML={this.loadFromLocalStorage()}
            onInput={this.handleTextInput}
            suppressContentEditableWarning
          />
          {isPlaying && (
            <div className={styles.overlay}>
              <div className={styles.top} />
              <div className={styles.needle}>
                <PlayArrow />
              </div>
              <div className={styles.bottom} />
            </div>
          )}
        </div>
        <div className={styles.controls}>
          <span className={styles.label}>Speed: </span>
          <div className={styles.slider}>
            <Slider value={playSpeed} onChange={this.handleSpeedChange} min={0.5} max={4} step={0.5} />
          </div>
          <Fab className={styles.btn} mini color="primary" aria-label="Play" onClick={this.handlePlayPauseClick}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </Fab>
          <Fab className={styles.btn} mini color="primary" onClick={this.handleStopClick}>
            <Stop />
          </Fab>
        </div>
      </div>
    )
  }
}

Teleprompter.propTypes = {
  localStorageKey: PropTypes.string,
}

export default Teleprompter
