import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { ConfirmButton } from 'components'
import {
  Visibility,
  VisibilityOff,
  Videocam,
  QuestionAnswer,
  Delete,
} from '@material-ui/icons'
import { formatAsDate } from 'services/formatting'

export default function VideoAnswer({
  answer,
  isUploading,
  recordingVideo,
  toggleVideoVisibility,
  handleRecorderOpen,
  handleDeleteVideo,
}) {
  let visibilityText = answer.public ? 'Public' : 'Hidden from Profile'
  if (!answer.question_public) visibilityText = 'Hidden from Profile (Question is Private)'
  let secondaryText = `${visibilityText} | Uploaded ${formatAsDate(answer.created_at)}`
  if (isUploading && recordingVideo?.id === answer.id) secondaryText = 'Uploading...'
  const isPublic = answer.public && answer.question_public
  return (
    <ListItem>
      <ListItemIcon><QuestionAnswer /></ListItemIcon>
      <ListItemText
        primary={answer.question_title}
        secondary={secondaryText}
      />
      <ListItemSecondaryAction>
        {answer.question_id && (
        <IconButton
          onClick={() => toggleVideoVisibility(answer)}
          disabled={recordingVideo || isUploading || !answer.question_public}
          data-cy={`toggle-visibility-answer-to-${answer.question_id}`}
        >
          {isPublic ? <Visibility data-cy={`answer-to-${answer.question_id}-visible`} /> : <VisibilityOff data-cy={`answer-to-${answer.question_id}-hidden`} />}
        </IconButton>
        )}
        <IconButton
          color="primary"
          onClick={handleRecorderOpen(answer)}
          disabled={recordingVideo || isUploading}
          data-cy={`open-recorder-answer-to-${answer.question_id}`}
        >
          <Videocam />
        </IconButton>
        {answer.question_id && (
        <ConfirmButton
          icon
          color="secondary"
          onClick={() => handleDeleteVideo(answer)}
          disabled={recordingVideo || isUploading}
          dialogMessage="Video deletion is permanent. Your candidate rating for positions related to this Question will be affected."
          data-cy={`delete-answer-to-${answer.question_id}`}
        >
          <Delete />
        </ConfirmButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}
