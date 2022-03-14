import React from 'react'
import moment from 'moment'
import { Button, Grid } from '@material-ui/core'
import { IVideo } from 'types'
import { trackError, trackEvent } from 'services/analytics'
import { CloudDone, Replay, Stop } from '@material-ui/icons'
import recompileWebmHeaders from './utils/recompileWebmHeaders'
import { ensureValidVideoFile } from './utils/ensureValidVideoFile'
import Oscilloscope from './components/Oscilloscope'
import CameraBackground from './components/CameraBackground'
import VideoBackground from './components/VideoBackground'
import EditTeleprompterButton from './components/EditTeleprompterButton'
import RecordButton from './components/RecordButton'
import Countdown from './components/Countdown'
import ActiveTeleprompter from './components/ActiveTeleprompter'
import CloseButton from './components/CloseButton'
import UploadFileButton from './components/UploadFileButton'
import SampleVideosButton from './components/SampleVideosButton'
import Title from './components/Title'
import styles from './VideoRecorder.module.css'
import DurationIndicator from './components/DurationIndicator'
import ReadySplash from './components/ReadySplash'
import NavigationPrompt from '../NavigationPrompt'
import { ContainerProps } from './VideoRecorderWrapper'

export type IVideoRecorderComponentProps = ContainerProps & React.HTMLAttributes<HTMLDivElement> & {
  title: string
  onClose: () => void
  onVideoAvailable?: (videoFile: File) => void
  defaultVideoURL?: string
  defaultTeleprompterText?: string
  sampleVideos?: IVideo[]
  maxDuration: number
}

interface IVideoRecorderComponentState {
  isRecordingStarted: boolean
  isRecordingProgress: boolean
  isRecordingProcessing: boolean
  isPlaybackProgress: boolean
  isNewRecordingAvailable: boolean
  teleprompterText: string
  isReady: boolean
  video: File
}

export default class VideoRecorder extends React.Component<IVideoRecorderComponentProps, IVideoRecorderComponentState> {
  static defaultProps = {
    maxDuration: 60,
  }

  cameraBackground: CameraBackground

  selfUpdateAnimFrameHandle: number

  readyTimeoutHandle: number

  videoObjectURL: string

  mediaRecorder: MediaRecorder

  autoStopTimeoutHandle: number

  dataChunks: any[]

  constructor(props, ctx) {
    super(props, ctx)

    this.dataChunks = []

    this.state = {
      isRecordingStarted: false,
      isRecordingProgress: false,
      isRecordingProcessing: false,
      isPlaybackProgress: false,
      isNewRecordingAvailable: false,
      teleprompterText: props.defaultTeleprompterText || '',
      isReady: false,
      video: null,
    }
  }

  componentDidMount() {
    // MediaStream from CameraBackground ref is required for rendering the oscilloscope properly, but it's not available initially.
    // Additionally, the opening animation is slow if all contents are rendered immediately, a delay solves this issue.
    this.readyTimeoutHandle = window.setTimeout(() => this.setState({ isReady: true }), 500)

    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate() {
    if ((!this.cameraBackground || !this.cameraBackground.stream)) {
      // MediaStream from CameraBackground ref is required for rendering the oscilloscope properly, but it's not available directly after opening.
      window.cancelAnimationFrame(this.selfUpdateAnimFrameHandle)
      this.selfUpdateAnimFrameHandle = window.requestAnimationFrame(() => this.forceUpdate())
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.cancelAnimationFrame(this.selfUpdateAnimFrameHandle)
    window.clearTimeout(this.readyTimeoutHandle)

    if (this.videoObjectURL) {
      window.URL.revokeObjectURL(this.videoObjectURL)
    }
  }

  render() {
    const { onClose, onVideoAvailable, defaultVideoURL, title, defaultTeleprompterText, sampleVideos, maxDuration, ...restProps } = this.props
    const {
      isRecordingStarted,
      isRecordingProgress,
      isRecordingProcessing,
      isPlaybackProgress,
      isNewRecordingAvailable,
      teleprompterText,
      video,
      isReady,
    } = this.state

    return (
      <div className={styles.container} {...restProps}>
        {isReady && (
          <React.Fragment>
            {isNewRecordingAvailable && (
              <NavigationPrompt
                message="You have a new unsaved recording. Leaving now will discard it. Continue?"
              />
            )}

            <CameraBackground
              ref={cameraBackground => this.cameraBackground = cameraBackground}
              onInitialized={success => success ? this.forceUpdate() : undefined}
              isRecordingStarted={isRecordingStarted}
              maxDuration={maxDuration}
              onFileAvailable={this.handleUploadFile}
              onFileError={this.handleError}
            />

            <VideoBackground
              isPlaybackProgress={isPlaybackProgress}
              videoURL={this.videoObjectURL || defaultVideoURL}
              onEnded={this.handleStopClick}
            />

            <Title title={title} />

            <Countdown
              isRecordingStarted={isRecordingStarted}
              isRecordingProgress={isRecordingProgress}
              onCountdownFinished={this.handleRecordProgressStart}
            />

            <ActiveTeleprompter
              text={teleprompterText}
              isRecordingStarted={isRecordingStarted}
            />

            <CloseButton
              onClose={onClose}
              onSave={this.handleSaveClick}
              isNewRecordingAvailable={isNewRecordingAvailable}
            />

            {(!isPlaybackProgress && this.cameraBackground && this.cameraBackground.stream) && (
              <Oscilloscope
                stream={this.cameraBackground ? this.cameraBackground.stream : undefined}
              />
            )}

            <DurationIndicator isPlaying={isRecordingProgress} maxDuration={maxDuration} />

            <ReadySplash recordingFinished={!isRecordingStarted && isNewRecordingAvailable} />

            <div className={styles['bottom-area']}>
              <div className={styles['bottom-area-content']}>
                <Grid container>
                  <Grid item xs={12} sm={3} md={3} style={{ paddingTop: '4px' }}>
                    <EditTeleprompterButton
                      disabled={!this.cameraBackground || !this.cameraBackground.stream}
                      isRecordingStarted={isRecordingStarted}
                      text={teleprompterText}
                      onChange={this.handleTeleprompterTextChange}
                      maxDuration={maxDuration}
                    />

                    <UploadFileButton
                      isRecordingStarted={isRecordingStarted}
                      onFileAvailable={this.handleUploadFile}
                      onFileError={this.handleError}
                      style={{ marginLeft: '6px' }}
                      maxDuration={maxDuration}
                    />

                    <SampleVideosButton
                      sampleVideos={sampleVideos}
                      style={{ marginLeft: '6px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div className={styles['primary-actions']}>
                      <RecordButton
                        disabled={!this.cameraBackground || !this.cameraBackground.stream}
                        isRecordingStarted={isRecordingStarted}
                        isRecordingProgress={isRecordingProgress}
                        isRecordingProcessing={isRecordingProcessing}
                        isRecordingDone={(video || defaultVideoURL) ? true : false}
                        onStart={this.handleRecordStart}
                        onStop={this.handleRecordStop}
                      />

                      {(video || defaultVideoURL) && !isPlaybackProgress && (
                        <Button variant="contained" color="primary" className={styles['primary-action']} onClick={this.handlePlayClick}>
                          <Replay className={styles['button-icon']} /> Play current video
                        </Button>
                      )}

                      {(video || defaultVideoURL) && isPlaybackProgress && (
                        <Button variant="contained" color="primary" className={styles['primary-action']} onClick={this.handleStopClick}>
                          <Stop className={styles['button-icon']} /> Stop video
                        </Button>
                      )}

                      {video && isNewRecordingAvailable && (
                        <Button variant="contained" color="primary" className={styles['primary-action']} onClick={this.handleSaveClick} data-cy="save-video">
                          <CloudDone className={styles['button-icon']} /> Save & Upload Video
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }

  handleTeleprompterTextChange = (e: React.ChangeEvent<any>) => {
    this.setState({
      teleprompterText: e.target.value,
    })
  }

  handleRecordStart = () => {
    if (this.cameraBackground && this.cameraBackground.stream) {
      this.mediaRecorder = new MediaRecorder(this.cameraBackground.stream)
      this.mediaRecorder.ondataavailable = this.handleRecordedDataAvailable
      this.mediaRecorder.onstop = this.handleRecordCompleted

      this.setState({
        video: undefined,
        isRecordingStarted: true,
      })
    }
  }

  handleRecordProgressStart = () => {
    const { isRecordingStarted } = this.state

    this.mediaRecorder.start()

    if (isRecordingStarted) {
      this.setState({
        isRecordingProgress: true,
      })

      this.autoStopTimeoutHandle = window.setTimeout(this.handleRecordStop, this.props.maxDuration * 1000)
    }
  }

  handleRecordStop = () => {
    const { isRecordingProgress } = this.state

    window.clearTimeout(this.autoStopTimeoutHandle)

    if (isRecordingProgress) {
      try {
        this.mediaRecorder.stop()
      } catch (error) {
        // This try catch has been added to collect data on this error:
        // https://sentry.io/organizations/flexhire/issues/2044498711/?query=is%3Aunresolved
        trackError(error)
      }
    }

    this.setState({
      isRecordingProcessing: isRecordingProgress,
      isRecordingStarted: false,
      isRecordingProgress: false,
    })
  }

  handleRecordCompleted = async () => {
    await new Promise(resolve => window.setTimeout(resolve))

    let videoFile = new File(
      this.dataChunks,
      `video-${moment().format('YYYY-MM-DD-hh-mm-ss')}.webm`,
    )

    this.dataChunks = []

    if (this.videoObjectURL) {
      window.URL.revokeObjectURL(this.videoObjectURL)
    }

    videoFile = await recompileWebmHeaders(videoFile)

    this.videoObjectURL = window.URL.createObjectURL(videoFile)

    this.setState({
      isRecordingProcessing: false,
      isNewRecordingAvailable: true,
      video: videoFile,
    })
  }

  handleRecordedDataAvailable = (e: BlobEvent) => {
    this.dataChunks.push(e.data)
  }

  handleUploadFile = async (file: File) => {
    const { onVideoAvailable } = this.props

    try {
      if (this.videoObjectURL) {
        window.URL.revokeObjectURL(this.videoObjectURL)
      }

      await ensureValidVideoFile(file)

      this.videoObjectURL = window.URL.createObjectURL(file)

      this.setState({
        isRecordingProcessing: false,
        isNewRecordingAvailable: true,
        video: file,
      })

      if (file && onVideoAvailable) {
        window.setTimeout(() => onVideoAvailable(file), 100)
      }
    } catch (err) {
      this.handleError(err.message)
      trackEvent('Video Recorder Upload File Error')
    }
  }

  handlePlayClick = () => {
    this.setState({
      isPlaybackProgress: true,
    })
    trackEvent('Video Recorder Play')
  }

  handleStopClick = () => {
    this.setState({
      isPlaybackProgress: false,
    })
    trackEvent('Video Recorder Stop')
  }

  handleSaveClick = () => {
    const { onVideoAvailable } = this.props
    const { video } = this.state

    if (video && onVideoAvailable) {
      onVideoAvailable(video)
    }

    trackEvent('Video Recorder Save')
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.which === 32) {
      // SPACEBAR key was pressed
      if (this.state.isRecordingStarted) {
        this.handleRecordStop()
      } else if (this.state.isPlaybackProgress) {
        this.handleStopClick()
      } else {
        this.handleRecordStart()
      }
    }
  }

  handleError = (error: string) => {
    this.props.showSnackbarMessage(error)
    trackError(new Error(error))
  }
}
