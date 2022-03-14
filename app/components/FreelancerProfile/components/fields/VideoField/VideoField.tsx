import React from 'react'
import { VideoCall, MissedVideoCall } from '@material-ui/icons'
import { Button } from 'components/themed'
import { trackError } from 'services/analytics'
import dynamic from 'services/dynamic'
import { getAPIClient } from 'api'
import { FormValueInput, FormValueMeta, IContractForFreelancer, IVideo } from 'types'
import { defaultTeleprompterText } from './utils/defaultTeleprompterText'
import styles from './VideoField.module.css'
import StoredVideo from './components/StoredVideo'
import { ContainerProps } from './VideoFieldContainer'

const VideoRecorder = dynamic(() => import(/* webpackChunkName: "VideoRecorder" */'components/VideoRecorder'), { ssr: false }) as any

interface IVideoFieldProps extends ContainerProps {
  editable: boolean
  required?: boolean
  currentVideo?: IVideo
  forceVisibility?: boolean
  input: FormValueInput<number>
  meta: FormValueMeta
  onUploadStart?: () => void
}

interface IVideoFieldState {
  video: IVideo
  recordingVideo: IVideo | boolean
  isUploading: boolean
  isUploaded: boolean
  error: string,
  isRequired: boolean
  sampleVideos: IVideo[]
  originX: string
  originY: string
}

export default class VideoField extends React.PureComponent<IVideoFieldProps, IVideoFieldState> {
  constructor(props) {
    super(props)
    this.state = {
      video: props.currentVideo,
      recordingVideo: false,
      isUploading: false,
      isUploaded: false,
      isRequired: props.required,
      error: null,
      sampleVideos: [],
      originX: null,
      originY: null,
    }
  }

  async componentDidMount() {
    const { getSampleVideos, getVideo, user, input, getContracts, editable, currentVideo, required } = this.props

    let isRequired = required
    // The Video should be required if:
    // the user has no offers and no job applications, OR the video has been explicitly requested.
    if (editable && !isRequired) {
      const contracts = await getContracts() as IContractForFreelancer[]
      const hasOffers = contracts.filter(c => c.status === 'offer_made').length > 0
      const hasJobApplications = user.job_applications_count > 0
      const videoRequested = contracts.filter(c => c.contract_requests.filter(r => r.request_type === 'video_introduction').length > 0).length > 0
      isRequired = Boolean(videoRequested || (!hasOffers && !hasJobApplications))
    }

    try {
      this.setState({
        sampleVideos: await getSampleVideos(),
        isRequired,
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
    const { user, editable, meta, forceVisibility } = this.props
    const { recordingVideo, isUploading, originX, originY, sampleVideos, video, isRequired, isUploaded, error } = this.state

    const showError = meta.error && meta.touched

    if (!video && !isRequired && !meta.error && !forceVisibility) {
      // The video field should not render at all if:
      // there is no validation error, the video is not required, and there is no video already.
      return null
    }

    if (!editable && !video) {
      // If we can't edit and there is no video, display nothing
      return null
    }

    return (
      <div>
        {recordingVideo && !isUploading && (
          <VideoRecorder
            title={(recordingVideo as IVideo)?.question_title || 'Your Video Introduction'}
            onClose={this.handleRecorderClose}
            onVideoAvailable={this.handleVideoAvailable}
            defaultVideoURL={(recordingVideo as IVideo)?.url}
            style={{ transformOrigin: `${originX} ${originY}` }}
            defaultTeleprompterText={defaultTeleprompterText}
            sampleVideos={(recordingVideo as IVideo)?.question_title ? null : sampleVideos}
            maxDuration={user?.configuration?.video_max_duration}
          />
        )}

        <div className={styles.container} style={editable ? undefined : { paddingBottom: 0 }}>
          <StoredVideo
            video={video}
            onFileDrop={this.handleVideoAvailable}
            isUploading={isUploading}
            editable={editable}
          />

          {editable && !isUploading && (
            <React.Fragment>
              <Button
                onClick={this.handleRecorderOpen(video)}
                data-cy="open-video-introduction"
              >
                {video ? <MissedVideoCall /> : <VideoCall />}
                {video ? 'Replace Video Introduction' : 'Record Video Introduction'}
              </Button>

              {!video && (
                <div className={styles['drop-helper-text']}>
                  {isRequired ? 'Please' : 'Optionally'} record a brief video introduction describing who you are, where you're from, your background, education and work experience etc. Good videos help hugely to work with top clients.
                  You can use our built in recorder and teleprompter and check out sample videos for inspiration or upload an an existing video if you prefer.
                </div>
              )}

              {isUploaded && (
                <div className={styles['drop-helper-text']}>
                  Your new video has been saved successfully.
                </div>
              )}

              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}
            </React.Fragment>
          )}

          {editable && showError && (
            <div className={styles.error}>{meta.error}</div>
          )}
        </div>
      </div>
    )
  }

  handleVideoAvailable = async (file) => {
    const { input, showSnackbarMessage, onUploadStart } = this.props

    this.setState({
      isUploading: true,
      recordingVideo: false,
      error: null,
    })

    if (onUploadStart) onUploadStart()

    let uploadError
    try {
      const videoFormData = new FormData()
      videoFormData.append('file', file)
      const video = await getAPIClient().postVideoUpload(videoFormData)
      if (video && typeof input?.onChange === 'function') input.onChange(video.id)
    } catch (error) {
      uploadError = error.response || error.message
      showSnackbarMessage(uploadError)
      trackError(error)
    }

    this.setState({
      isUploading: false,
      isUploaded: !uploadError,
      error: uploadError,
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
