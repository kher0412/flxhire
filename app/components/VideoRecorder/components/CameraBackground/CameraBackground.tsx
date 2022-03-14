import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'
import { IAPIError } from 'types'
import { Autorenew } from '@material-ui/icons'
import UploadFileButton from '../UploadFileButton/UploadFileButton'
import styles from './CameraBackground.module.css'

interface ICameraBackgroundProps {
  isRecordingStarted: boolean
  maxDuration: number
  onFileAvailable: (file: File) => void
  onFileError: (error: string) => void
  onInitialized: (success: boolean) => void
}

interface ICameraBackgroundState {
  initializing: boolean
  showAccessPromptHint: boolean
  error?: IAPIError
  available: boolean
}

export default class CameraBackground extends React.Component<ICameraBackgroundProps, ICameraBackgroundState> {
  state = {
    initializing: true,
    showAccessPromptHint: false,
    error: undefined,
    available: false,
  }

  video: HTMLVideoElement

  coverVideo: HTMLVideoElement

  stream: MediaStream

  accessPromptHintShowTimeout: number

  componentDidMount() {
    this.acquireMediaStream()

    if (navigator.mediaDevices) {
      navigator.mediaDevices.ondevicechange = this.handleDeviceChange
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.accessPromptHintShowTimeout)

    if (this.video.srcObject) {
      // Stop recording.
      for (const track of (this.video.srcObject as MediaStream).getTracks()) {
        track.stop()
      }
    }

    this.video = undefined
    this.stream = undefined
  }

  render() {
    const { initializing } = this.state

    return (
      <div className={styles.container}>
        <video
          className={styles['cover-video']}
          style={initializing ? { opacity: 0 } : undefined}
          ref={video => this.coverVideo = video}
        />

        <video
          className={styles.video}
          style={initializing ? { opacity: 0 } : undefined}
          ref={video => this.video = video}
        />

        {this.renderAltContent()}
      </div>
    )
  }

  renderAltContent() {
    const { initializing, showAccessPromptHint, available, error } = this.state
    const { onFileAvailable, isRecordingStarted, onFileError, maxDuration } = this.props

    if (initializing) {
      return (
        <div className={styles['alt-content']}>
          <div className={styles['progress-wrapper']}>
            <CircularProgress
              variant="indeterminate"
              size={18}
              thickness={2}
            />
          </div>

          Initializing video & audio feed...

          {showAccessPromptHint && (
            <div className={styles['hint-text']}>
              If prompted, please enable access to your camera and microphone.
            </div>
          )}
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles['alt-content']}>
          Failed to initialize video & audio feed. {error}

          <div className={styles['hint-text']}>
            <Button variant="outlined" className={styles.button} onClick={this.handleRetryClick} style={{ marginRight: 12 }}>
              <Autorenew style={{ marginRight: 12 }} /> Retry
            </Button>

            <UploadFileButton
              big
              maxDuration={maxDuration}
              onFileAvailable={onFileAvailable}
              onFileError={onFileError}
              isRecordingStarted={isRecordingStarted}
            />
          </div>
        </div>
      )
    }

    if (!available) {
      const isSafariHack = (/^((?!chrome|android).)*safari/i).test(navigator.userAgent)

      return (
        <div className={styles['alt-content']}>
          {isSafariHack && (
            <React.Fragment>
              In-browser video recording is coming to Safari.
              In the meantime, you can upload an existing recording from your device, or use Chrome to record in your browser.
            </React.Fragment>
          )}

          {!isSafariHack && (
            <React.Fragment>
              Direct video recording not available on your environment.
            </React.Fragment>
          )}

          <div className={styles['hint-text']}>
            <UploadFileButton
              big
              maxDuration={maxDuration}
              onFileAvailable={onFileAvailable}
              onFileError={onFileError}
              isRecordingStarted={isRecordingStarted}
            />
          </div>
        </div>
      )
    }

    return null
  }

  handleRetryClick = () => {
    this.setState({
      available: false,
      initializing: true,
      error: undefined,
      showAccessPromptHint: false,
    })

    this.acquireMediaStream()
  }

  handleDeviceChange = () => {
    const { initializing } = this.state

    if (!initializing) {
      this.handleRetryClick()
    }
  }

  async acquireMediaStream() {
    const { onInitialized } = this.props

    if (typeof MediaRecorder !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        // Start a timeout to show a hint message to the user that video/audio input permission should be enabled.
        // This timeout is cleared once the stream has been acquired, so it only shows up if the user didn't allow (or disallow) the stream.
        this.accessPromptHintShowTimeout = window.setTimeout(() => {
          this.setState({
            showAccessPromptHint: true,
          })
        }, 3000)

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: {
              ideal: 1920 / 1080, // 16:9
            },
            width: {
              max: 1024,
            },
          },
          audio: true,
        })

        window.clearTimeout(this.accessPromptHintShowTimeout)

        this.stream = stream

        this.video.srcObject = stream
        this.video.muted = true
        this.video.play().catch(err => console.log(err))

        this.coverVideo.srcObject = stream
        this.coverVideo.muted = true
        this.coverVideo.play().catch(err => console.log(err))

        this.setState({
          error: undefined,
          initializing: false,
          available: true,
          showAccessPromptHint: false,
        })
      } catch (err) {
        console.error(err)

        this.setState({
          error: this.getUserFriendlyErrorMessage(err),
          initializing: false,
          available: true,
          showAccessPromptHint: false,
        })
      }
    } else {
      this.setState({
        initializing: false,
        available: false,
      })
    }

    if (onInitialized) {
      const { available, error } = this.state
      const success = available && !error

      onInitialized(success)
    }
  }

  getUserFriendlyErrorMessage(err) {
    switch (err.name) {
      case 'NotAllowedError':
        return 'Access denied. Please enable access to your camera and microphone to record your video answer.'

      case 'NotFoundError':
        return 'No camera or microphone was found. Please connect your devices to record your video answer.'
    }

    return err.message || err.name
  }
}
