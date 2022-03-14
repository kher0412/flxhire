import React from 'react'
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getAPIClient } from 'api'
import { LoadingIcon } from 'components'
import dynamic from 'services/dynamic'
import { goToLogin } from 'services/router'
import { trackError } from 'services/analytics'
import { defaultTeleprompterText } from 'components/FreelancerProfile/components/fields/VideoField/utils/defaultTeleprompterText'
import { IVideo } from 'types'
import { isGuest } from 'services/user'
import { CheckCircle, SwitchVideo } from '@material-ui/icons'
import styles from './RecordVideoButton.module.css'

const VideoRecorder = dynamic(() => import(/* webpackChunkName: "VideoRecorder" */'components/VideoRecorder'), { ssr: false }) as any

interface IRecordVideoButtonProps {
  question: any
  getSampleVideos: () => Promise<IVideo[]>
  enableCompletionBadge?: boolean
  maxDuration: number
  user: any
  onVideoReady: (any) => void
  router: any
  getCurrentUser: () => void
  video?: any
}

interface IRecordVideoButtonState {
  isRecorderOpen: boolean
  isUploading: boolean
  sampleVideos: IVideo[]
  originX: string
  originY: string
  error: Error | null
}

export default class RecordVideoButton extends React.PureComponent<IRecordVideoButtonProps, IRecordVideoButtonState> {
  state = {
    isRecorderOpen: false,
    isUploading: false,
    sampleVideos: null,
    originX: 'center',
    originY: 'center',
    error: null,
  }

  componentDidMount() {
    if (!this.props.question) this.refreshSampleVideos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question && !this.props.question) this.refreshSampleVideos()
  }

  async refreshSampleVideos() {
    try {
      this.setState({
        sampleVideos: await this.props.getSampleVideos(),
      })
    } catch (error) {
      trackError(error)
    }
  }

  render() {
    const { question, maxDuration } = this.props
    const { isRecorderOpen, originX, originY, sampleVideos } = this.state
    const video = this.getVideo()

    return (
      <React.Fragment>
        {this.renderCompletionBadge()}
        {this.renderAddRecordVideoButton()}
        {this.renderLabel()}

        {isRecorderOpen && (
          <VideoRecorder
            title={question ? question.title : 'Your Video Introduction'}
            onClose={this.handleClose}
            onVideoAvailable={this.handleVideoAvailable}
            defaultVideoURL={video?.url}
            sampleVideos={question ? null : sampleVideos}
            defaultTeleprompterText={question ? 'null' : defaultTeleprompterText}
            maxDuration={maxDuration}
            style={{ transformOrigin: `${originX} ${originY}` }}
          />
        )}
      </React.Fragment>
    )
  }

  renderCompletionBadge() {
    const { question, enableCompletionBadge = false } = this.props
    const video = this.getVideo()

    if (video && video.url && enableCompletionBadge) {
      return (
        <React.Fragment>
          <List disablePadding style={{ marginBottom: 12, marginTop: -12 }}>
            <ListItem data-cy="video-recorded-badge">
              <ListItemIcon>
                <CheckCircle />
              </ListItemIcon>

              <ListItemText
                primary={question ? 'Video Answer Recorded' : 'Video Introduction Recorded'}
              />
            </ListItem>
          </List>
        </React.Fragment>
      )
    }

    return null
  }

  renderAddRecordVideoButton() {
    const { question } = this.props
    const { isUploading } = this.state
    const icon = isUploading ? (<LoadingIcon style={{ marginRight: 12 }} />) : (<SwitchVideo className={styles['button-icon']} />)
    const dataCy = question ? `answer-question-${question.id}` : 'record-video-introduction'
    const video = this.getVideo()

    if (video && video.url) {
      return (
        <Button color="primary" variant="contained" disabled={isUploading} onClick={this.handleOpen} data-cy={dataCy}>
          {icon} View Or Replace Video {question ? 'Answer' : 'Introduction'}
        </Button>
      )
    }

    return (
      <Button color="primary" variant="contained" disabled={isUploading} onClick={this.handleOpen} data-cy={dataCy}>
        {icon} Record your Video {question ? 'Answer' : 'Introduction'}
      </Button>
    )
  }

  renderLabel() {
    const { isUploading, error } = this.state

    if (isUploading) {
      return (
        <div className={styles.label} data-cy="video-uploading-message">
          Uploading new video...
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles.label} data-cy="video-uploading-message">
          Error: {error.response || error.message}
        </div>
      )
    }

    return null
  }

  getVideo = () => {
    const { user, question, video: videoProp } = this.props
    // always prefer video prop if present
    if (videoProp) return videoProp
    // otherwise if this is a question, then use its answer
    if (question) return question.answer
    // otherwise this is the profile video introduction so use the user's video
    if (user) return user.video
    return null
  }

  handleOpen = (e) => {
    const { user, router } = this.props
    if (isGuest(user)) {
      goToLogin(router)
    } else {
      this.setState({
        isRecorderOpen: true,
        originX: `${e.clientX}px`,
        originY: `${e.clientY}px`,
      })
    }
  }

  handleClose = () => {
    this.setState({
      isRecorderOpen: false,
      originX: 'center',
      originY: 'center',
    })
  }

  handleVideoAvailable = async (file) => {
    const { onVideoReady, question, getCurrentUser } = this.props

    this.setState({
      isUploading: true,
      isRecorderOpen: false,
      error: undefined,
      originX: 'center',
      originY: 'center',
    })

    try {
      const videoFormData = new FormData()
      videoFormData.append('file', file)
      if (question) videoFormData.append('question_id', question.id)
      const video = await getAPIClient().postVideoUpload(videoFormData)

      if (onVideoReady) onVideoReady(video)
      if (!question) getCurrentUser()
    } catch (err) {
      trackError(err)
      this.setState({
        error: err,
      })
    }
    this.setState({ isUploading: false })
  }
}
