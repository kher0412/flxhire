import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './ActiveTeleprompter.module.css'

export default class ActiveTeleprompter extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isRecordingStarted } = this.props

    if (isRecordingStarted && !prevProps.isRecordingStarted) {
      this.forceUpdate()
    }
  }

  render() {
    const { isRecordingStarted, secondsPerLine = 4, text } = this.props

    if (!isRecordingStarted) {
      return false
    }

    const animDuration = this.contentDiv ? `${this.contentDiv.clientHeight / (48 / secondsPerLine)}s` : '60s'

    return (
      <div className={styles.container}>
        <div
          className={styles.content}
          style={{ animationDuration: animDuration }}
          ref={div => this.contentDiv = div}
        >
          {text && <ReactMarkdown source={text} />}
        </div>
      </div>
    )
  }
}
