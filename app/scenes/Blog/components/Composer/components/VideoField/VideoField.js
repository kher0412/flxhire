import React from 'react'
import { VideoCall, MissedVideoCall } from '@material-ui/icons'
import { VideoRecorder, ResponsiveButton } from 'components'
import { trackError } from 'services/analytics'
import { defaultTeleprompterText } from './utils/defaultTeleprompterText'
import styles from './VideoField.module.css'
import StoredVideo from './components/StoredVideo'

export default class VideoField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      video: props.currentVideo,
      recordingVideo: false,
      isUploading: false,
      sampleVideos: [],
    }
  }

  async componentDidMount() {
    const { getSampleVideos, getVideo, input, currentVideo } = this.props

    try {
      this.setState({
        sampleVideos: await getSampleVideos(),
      })
    } catch (error) {
      trackError(error)
    }

    try {
      if (input.value) {
        const video = await getVideo(input.value)

        this.setState({
          video: video || currentVideo,
        })
      }
    } catch (error) {
      trackError(error)
    }
  }

  async componentDidUpdate(prevProps) {
    const { getVideo, input } = this.props

    if (input.value !== prevProps.input.value && input.value) {
      const videoId = input.value

      try {
        const video = await getVideo(videoId)

        if (videoId === input.value) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            video: video,
          })
        }
      } catch (error) {
        trackError(error)
      }
    }
  }

  render() {
    const { user, meta } = this.props
    const { recordingVideo, isUploading, originX, originY, sampleVideos, video } = this.state

    const showError = meta.error && meta.touched

    return (
      <div>
        {recordingVideo && !isUploading && (
          <VideoRecorder
            title={recordingVideo?.question_title || 'Your Video Introduction'}
            onClose={this.handleRecorderClose}
            onVideoAvailable={this.handleVideoAvailable}
            defaultVideoURL={recordingVideo?.url}
            style={{ transformOrigin: `${originX} ${originY}` }}
            defaultTeleprompterText={defaultTeleprompterText}
            sampleVideos={recordingVideo?.question_title ? null : sampleVideos}
            maxDuration={user?.configuration?.video_max_duration}
          />
        )}

        <div className={styles.container}>
          <StoredVideo
            video={video}
            onFileDrop={this.handleVideoAvailable}
            isUploading={isUploading}
            editable
          />

          <ResponsiveButton
            iconSide="left"
            color={video ? undefined : 'primary'}
            onClick={this.handleRecorderOpen(video)}
            data-cy="open-video-introduction"
            icon={video ? <MissedVideoCall /> : <VideoCall />}
            label={video ? 'Replace Article Intro Video' : 'Record Article Intro Video'}
            mobileLabel={video ? 'Replace' : 'Record'}
            style={{ marginBottom: -36, marginTop: -6 }}
          />

          {!video && (
            <div className={styles['drop-helper-text']}>
              Or drag-and-drop a video file here
            </div>
          )}

          {showError && (
            <div className={styles.error}>{meta.error}</div>
          )}
        </div>
      </div>
    )
  }

  handleVideoAvailable = async (file) => {
    const { input, showSnackbarMessage, uploadVideo } = this.props

    this.setState({
      isUploading: true,
      recordingVideo: false,
    })

    try {
      const video = await uploadVideo(file)
      if (video && typeof input?.onChange === 'function') input.onChange(video.id)
    } catch (error) {
      showSnackbarMessage(error.response || error.message)
      trackError(error)
    }

    this.setState({
      isUploading: false,
    })
  }

  handleRecorderOpen = video => (e) => {
    this.setState({
      recordingVideo: video || true,
      originX: `${e.clientX}px`,
      originY: `${e.clientY}px`,
    })
  }

  handleRecorderClose = () => {
    this.setState({
      recordingVideo: false,
      originX: 'center',
      originY: 'center',
    })
  }
}
