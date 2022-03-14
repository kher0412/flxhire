import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { CardActions } from '@material-ui/core'
import { RecordVideoButton } from 'components'
import { Button } from 'components/themed'
import { browserHistory } from 'services/router'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { isClient, isGuest, isMember } from 'services/user'

const useQuestionForNewJob = question => browserHistory.push('/signup/client?mode=job', `/signup/client?mode=job&question_title=${question.title}`)

export default function QuestionActions({ user, question, handleUse, onVideoChanged }) {
  const guest = isGuest(user)
  const canAnswer = guest || isMember(user)
  const canUse = guest || isClient(user)
  const onUseClick = () => guest ? useQuestionForNewJob(question) : handleUse()

  return (
    <MediaQuery minWidth={800}>
      {isLargeScreen => (
        <CardActions style={isLargeScreen ? { padding: '24px 48px 48px 48px' } : undefined}>
          {canAnswer && (
            <RecordVideoButton
              question={question}
              video={question.answer}
              onVideoReady={onVideoChanged}
            />
          )}

          {canUse && (
            <Button
              color={canAnswer ? 'default' : 'primary'}
              onClick={onUseClick}
              data-cy={`use-question-${question.id}`}
            >
              <AssignmentIcon style={{ marginRight: '10px' }} />
              Use this Question for a job
            </Button>
          )}
        </CardActions>
      )}
    </MediaQuery>
  )
}
