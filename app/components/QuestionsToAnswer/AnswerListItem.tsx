import React from 'react'
import { ListItem, ListItemAvatar, ListItemIcon, ListItemText, Avatar, DialogTitle, DialogContent, DialogActions, ListItemSecondaryAction, Grid, Tooltip, Card, Divider } from '@material-ui/core'
import { trackError } from 'services/analytics'
import dynamic from 'services/dynamic'
import { ConfirmButton, LoadingIcon, ResponsiveDialog } from 'components'
import { getAPIClient } from 'api'
import { IQuestionForFreelancer, IVideo } from 'types'
import { defaultTeleprompterText } from 'components/FreelancerProfile/components/fields/VideoField/utils/defaultTeleprompterText'
import { Button, InfoMessage, TextArea } from 'components/themed'
import { getErrorText } from 'services/error'
import ReactMarkdown from 'react-markdown'
import { classList } from 'services/styles'
import { Delete, DescriptionTwoTone, LibraryBooks, Videocam, VideocamTwoTone } from '@material-ui/icons'
import styles from '../themed/MarkdownTextArea/MarkdownTextArea.module.css'

const VideoRecorder = dynamic(() => import(/* webpackChunkName: "VideoRecorder" */'components/VideoRecorder'), { ssr: false }) as any

interface IAnswerListItemProps {
  onAnswerSaved?: (video?: IVideo) => void
  onError?: (error?: any) => void
  onDeleted?: () => void
  onRecorderOpen?: () => void
  onRecorderClose?: () => void
  question?: IQuestionForFreelancer
  video?: IVideo
  title?: string
  sampleVideos?: IVideo[]
  index: number
  maxDuration: number
  allowTextualAnswer?: boolean
  style?: React.CSSProperties
}

interface IAnswerListItemState {
  originX: string | number
  originY: string | number
  isRecorderOpen: boolean
  isUploading: boolean
  isDeleting: boolean
  dialogOpen: boolean
  textualAnswer: string
  error: string
}

export default class AnswerListItem extends React.PureComponent<IAnswerListItemProps, IAnswerListItemState> {
  state = {
    originX: 'center',
    originY: 'center',
    isRecorderOpen: false,
    isUploading: false,
    isDeleting: false,
    dialogOpen: false,
    textualAnswer: null,
    error: null,
  }

  componentDidMount() {
    const defaultAnswer = this.props.question?.textual_answer

    if (defaultAnswer) {
      this.setState({
        textualAnswer: defaultAnswer,
      })
    }
  }

  componentDidUpdate(prevProps: IAnswerListItemProps) {
    const { textualAnswer } = this.state

    const defaultAnswer = this.props.question?.textual_answer
    const prevDefaultAnswer = defaultAnswer !== prevProps.question?.textual_answer

    if (prevDefaultAnswer && defaultAnswer !== textualAnswer) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        textualAnswer: defaultAnswer,
      })
    }
  }

  render() {
    const { question, video, title: titleProp, sampleVideos, allowTextualAnswer, style = {}, maxDuration, onDeleted, onRecorderOpen, onRecorderClose, ...others } = this.props
    const { isRecorderOpen, originX, originY, isUploading, isDeleting, error, dialogOpen, textualAnswer } = this.state
    const answer = video || question?.answer
    let secondaryText: any = null

    if (isUploading) secondaryText = 'Uploading - Please Wait'
    if (error) secondaryText = <span style={{ color: 'rgb(244, 67, 54)' }}>Error: {error || 'Unknown Error'}</span>

    const title = question?.title || titleProp || 'Record a Video'
    const hasAnswer = (answer || question?.textual_answer) ? true : false
    const canDelete = hasAnswer

    return (
      <React.Fragment>
        <ListItem
          disabled={isUploading || isDeleting}
          style={{ paddingRight: hasAnswer ? 192 : 144, minHeight: 64, ...style }}
          {...others}
        >
          {this.renderQuestionIcon()}

          <ListItemText
            primary={(
              <div style={{ color: canDelete ? '#666F80' : '#04041E', fontWeight: hasAnswer ? 400 : 500 }}>
                {title}
              </div>
            )}
            secondary={secondaryText}
          />

          <ListItemSecondaryAction>
            {canDelete && (
              <Tooltip title="Delete answer">
                <ConfirmButton
                  onClick={this.handleAnswerDelete}
                  color="delete"
                  iconOnly
                  disabled={isUploading}
                  critical
                  dialogTitle="Delete Answer"
                  dialogMessage={`Delete your answer for the question "${title}"? This cannot be undone.`}
                  dialogConfirmLabel="Delete"
                  style={{ marginRight: 12 }}
                >
                  <Delete />
                </ConfirmButton>
              </Tooltip>
            )}

            {allowTextualAnswer && (
              <Tooltip title="Add text answer">
                <Button
                  onClick={this.handleTextAnswerClick}
                  iconOnly
                  disabled={(isUploading || !question || question?.answer) ? true : false}
                  data-cy={`answer-question-text-${question?.id}`}
                  style={{ marginRight: 12 }}
                >
                  <LibraryBooks />
                </Button>
              </Tooltip>
            )}

            <Tooltip title="Add video answer">
              <Button
                onClick={this.handleVideoAnswerClick}
                iconOnly
                disabled={(isUploading || question?.textual_answer) ? true : false}
                data-cy={question ? `answer-question-video-${question.id}` : 'answer-video-introduction'}
                data-uploading={isUploading}
              >
                <Videocam />
              </Button>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>

        {isRecorderOpen && (
          <VideoRecorder
            title={title}
            onClose={this.handleRecorderClose}
            onVideoAvailable={this.handleVideoAvailable}
            defaultVideoURL={answer?.url}
            sampleVideos={sampleVideos}
            maxDuration={maxDuration}
            defaultTeleprompterText={question ? null : defaultTeleprompterText}
            style={{ transformOrigin: `${originX}px ${originY}px` }}
          />
        )}

        {dialogOpen && (
          <ResponsiveDialog open fullWidth onClose={this.handleRecorderClose}>
            <DialogTitle>
              {title}
            </DialogTitle>

            <DialogContent>
              <div style={{ padding: '6px 0' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextArea
                      name="textual_answer"
                      label="Your text answer"
                      placeholder={title}
                      value={textualAnswer || ''}
                      onChange={e => this.setState({ textualAnswer: e.target.value })}
                      maxLength={1500}
                    />
                  </Grid>
                  {this.state.textualAnswer && (
                  <div className={styles.previewCardContent}>
                    Markdown Preview:
                    <ReactMarkdown
                      source={this.state.textualAnswer}
                    />
                  </div>
                  )}

                  <Grid item xs={12}>
                    <InfoMessage>
                      You can also provide a video answer to this question via camera or video file upload.
                      Video answers are often more convincing and preferred over text-based answers.
                    </InfoMessage>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleRecorderClose}>
                Cancel
              </Button>

              <Button color="primary" onClick={this.handleDialogSubmit}>
                Answer
              </Button>
            </DialogActions>
          </ResponsiveDialog>
        )}
      </React.Fragment>
    )
  }

  renderQuestionIcon() {
    const { question, video, index } = this.props
    const { isUploading, isDeleting } = this.state
    const videoAnswer = video || question?.answer
    const textAnswer = question?.textual_answer

    if (isUploading || isDeleting) {
      return (
        <ListItemIcon style={{ minWidth: 42 }}>
          <LoadingIcon />
        </ListItemIcon>
      )
    }

    if (videoAnswer) {
      return (
        <ListItemIcon style={{ minWidth: 42 }}>
          <VideocamTwoTone color="primary" />
        </ListItemIcon>
      )
    }

    if (textAnswer) {
      return (
        <ListItemIcon style={{ minWidth: 42 }}>
          <DescriptionTwoTone color="primary" />
        </ListItemIcon>
      )
    }

    return (
      <ListItemAvatar style={{ minWidth: 42 }}>
        <Avatar style={{ width: 30, height: 30, fontSize: 12, margin: 2, fontWeight: 500, marginLeft: -3, background: '#8CA4BA' }}>
          {index}
        </Avatar>
      </ListItemAvatar>
    )
  }

  handleTextAnswerClick = () => {
    const { question } = this.props
    const { isUploading } = this.state

    if (!isUploading && question && !question?.answer) {
      this.setState({
        dialogOpen: true,
        isRecorderOpen: false,
      })
      if (this.props.onRecorderClose) {
        this.props.onRecorderClose()
      }
    }
  }

  handleVideoAnswerClick = (e: React.MouseEvent<any>) => {
    const { question } = this.props
    const { isUploading } = this.state

    if (!isUploading && !question?.textual_answer) {
      this.setState({
        originX: e.clientX,
        originY: e.clientY,
        isRecorderOpen: true,
        dialogOpen: false,
      })
      if (this.props.onRecorderOpen) {
        this.props.onRecorderOpen()
      }
    }
  }

  handleDialogSubmit = async () => {
    const { question, onError, onAnswerSaved } = this.props
    const { textualAnswer } = this.state

    let answerError: any

    if (textualAnswer) {
      try {
        await getAPIClient().createAnswer({
          question_id: question.id,
          textual_answer: textualAnswer,
        })

        if (onAnswerSaved) onAnswerSaved()
      } catch (error) {
        answerError = getErrorText(error)
        trackError(error)

        if (onError) onError(error)
      }
    }

    this.setState({
      isRecorderOpen: false,
      dialogOpen: false,
      error: answerError,
    })
    if (this.props.onRecorderClose) {
      this.props.onRecorderClose()
    }
  }

  handleRecorderClose = () => {
    this.setState({ isRecorderOpen: false, dialogOpen: false })
    if (this.props.onRecorderClose) {
      this.props.onRecorderClose()
    }
  }

  handleVideoAvailable = async (file) => {
    const { onAnswerSaved, question, onError } = this.props

    this.setState({
      isUploading: true,
      isRecorderOpen: false,
      error: null,
      originX: 'center',
      originY: 'center',
    })
    if (this.props.onRecorderClose) {
      this.props.onRecorderClose()
    }

    const videoFormData = new FormData()
    videoFormData.append('file', file)

    if (question?.id) videoFormData.append('question_id', question.id as any)

    let uploadError

    try {
      const video = await getAPIClient().postVideoUpload(videoFormData)
      if (onAnswerSaved) onAnswerSaved(video)
    } catch (error) {
      uploadError = error.response || error.message
      trackError(error)
      if (onError) onError(error)
    }

    this.setState({ isUploading: false, error: uploadError })
  }

  handleAnswerDelete = async () => {
    const { video, question, onDeleted } = this.props
    const videoAnswer = video || question.answer

    this.setState({
      isDeleting: true,
    })

    try {
      if (videoAnswer) {
        await getAPIClient().deleteVideo(videoAnswer.id)
      }

      if (question?.textual_answer_id) {
        await getAPIClient().deleteAnswer(question.textual_answer_id)
      }
    } finally {
      this.setState({
        isDeleting: false,
      })
    }

    if (onDeleted) {
      onDeleted()
    }
  }
}
