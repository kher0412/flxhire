import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { Cancel, CheckCircle, PlayCircleFilled } from '@material-ui/icons'
import styles from './RecordButton.module.css'

export default class RecordButton extends React.PureComponent {
  render() {
    const { isRecordingStarted, isRecordingProgress, isRecordingProcessing, isRecordingDone, onStart, onStop, disabled } = this.props

    if (disabled) {
      if (isRecordingDone) {
        return (
          <Button color="primary" variant="contained" className={styles['disabled-button']} disabled>
            <PlayCircleFilled className={styles['button-icon']} /> Record again
          </Button>
        )
      }

      return (
        <Button color="primary" variant="contained" className={styles['disabled-button']} disabled data-cy="start-recording">
          <PlayCircleFilled className={styles['button-icon']} /> Start recording
        </Button>
      )
    }

    if (isRecordingProcessing) {
      return (
        <Button color="primary" variant="contained" className={styles['disabled-button']} disabled>
          <div className={styles['progress-wrapper']}>
            <CircularProgress
              variant="indeterminate"
              size={18}
              thickness={2}
            />
          </div> Processing...
        </Button>
      )
    }

    if (isRecordingProgress) {
      return (
        <Button color="primary" variant="contained" className={styles['end-button']} onClick={onStop} data-cy="end-recording">
          <CheckCircle className={styles['button-icon']} /> End recording [SPACE]
        </Button>
      )
    }

    if (isRecordingStarted) {
      return (
        <Button color="primary" variant="contained" className={styles['end-button']} onClick={onStop} data-cy="end-recording">
          <Cancel className={styles['button-icon']} /> End recording [SPACE]
        </Button>
      )
    }

    if (isRecordingDone) {
      return (
        <Button color="primary" variant="contained" className={styles['start-button']} onClick={onStart}>
          <PlayCircleFilled className={styles['button-icon']} /> Record again
        </Button>
      )
    }

    return (
      <Button color="primary" variant="contained" className={styles['start-button']} onClick={onStart} data-cy="start-recording">
        <PlayCircleFilled className={styles['button-icon']} /> Start recording
      </Button>
    )
  }
}
