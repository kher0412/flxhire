import React from 'react'
import { Grid } from '@material-ui/core'
import { ConfirmButton, Video } from 'components'
import { isMember } from 'services/user'
import { Delete, Visibility, VisibilityOff } from '@material-ui/icons'
import AddVideoAnswers from './components/AddVideoAnswers'
import styles from './VideoAnswersField.module.css'
import TabPlaceholder from '../../TabPlaceholder'

export default class VideoAnswersField extends React.PureComponent {
  render() {
    const { input, editable, user } = this.props
    const answers = input.value || []
    const isProfileCreationMode = isMember(user) && user?.status === 'pending'

    return (
      <div className={styles.container}>
        <Grid container spacing={2} data-cy="answers-list">
          {answers.map(v => (
            <Grid item xs={12} sm={12} md={6} key={v.src || v.url}>
              <div className={styles.item}>
                {editable && (
                  <div className={styles['item-controls']}>
                    <ConfirmButton
                      icon
                      tooltip={v.public ? 'Video is public - click to make it private' : 'Video is private - click to make it public'}
                      dialogTitle="Toggle visibility"
                      dialogMessage={v.public ? 'This will hide your video answer from your profile. Continue?' : 'This will make your video answer show up on your profile to the public. Continue?'}
                      data-cy={`toggle-visibility-answer-to-${v.question_id}`}
                      onClick={() => this.handleSetVisibility(v.id, !v.public)}
                    >
                      {v.public ? <Visibility data-cy={`answer-to-${v.question_id}-visible`} /> : <VisibilityOff data-cy={`answer-to-${v.question_id}-hidden`} />}
                    </ConfirmButton>

                    <ConfirmButton
                      icon
                      tooltip="Delete video answer"
                      dialogTitle="Delete video answer"
                      data-cy={`delete-answer-to-${v.question_id}`}
                      onClick={() => this.handleDelete(v.id)}
                    >
                      <Delete />
                    </ConfirmButton>
                  </div>
                )}

                <Video video={v} style={{ width: '100%' }} />

                <div className={styles.title}>
                  {v.question_title || 'Video Answer'}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {answers.length === 0 && (
          <TabPlaceholder
            title="No video answers posted yet"
          />
        )}

        {editable && (
          <AddVideoAnswers
            isProfileCreationMode={isProfileCreationMode}
            onAnswerSubmit={this.handleAnswerSubmit}
          />
        )}
      </div>
    )
  }

  handleSetVisibility = (id, isPublic) => {
    const { input, onSetVideoVisibility } = this.props
    const videos = (input.value || [])
    const video = videos.find(_video => _video.id === id)
    const videoIndex = videos.findIndex(_video => _video.id === id)

    const newVideos = videos.slice()
    newVideos.splice(videoIndex, 1, { ...video, public: isPublic })

    input.onChange(newVideos)
    onSetVideoVisibility(id, isPublic)
  }

  handleDelete = (id) => {
    const { input, onDeleteVideo } = this.props
    const videos = (input.value || [])
    const videoIndex = videos.findIndex(_video => _video.id === id)

    const newVideos = videos.slice()
    newVideos.splice(videoIndex, 1)

    input.onChange(newVideos)
    onDeleteVideo(id)
  }

  handleAnswerSubmit = (newVideo) => {
    const { input } = this.props

    if (newVideo) {
      const videos = (input.value || [])
      input.onChange([...videos, newVideo])
    }
  }
}
