import { Divider, Grid, Typography } from '@material-ui/core'
import { Box, Link, QuestionsToAnswer } from 'components'
import { Button, InfoMessage } from 'components/themed'
import { capitalize } from 'lodash'
import { useCurrentUser } from 'hooks'
import React, { useMemo } from 'react'
import { getQuestionsRequests, getVideoIntroRequests, hasVideoIntroRequests } from 'services/contract'
import { formatDurationInSeconds } from 'services/formatting'
import { IContractForFreelancer } from 'types'
import { ArrowForward, CheckCircle, Visibility } from '@material-ui/icons'
import HiringManagerChatButton from './HiringManagerChatButton'

interface IQuestionsFormProps {
  contract: IContractForFreelancer
  handleContinue: () => void
  handleFinish?: () => void
  onAnswerSaved?: () => void
  onAnswerDeleted?: () => void
  onRecorderOpen: () => void
  onRecorderClose: () => void
  mobile?: boolean
}

const QuestionsForm = ({ contract, handleContinue, handleFinish, onAnswerSaved, onAnswerDeleted, onRecorderOpen, onRecorderClose, mobile }: IQuestionsFormProps) => {
  const showProfileIntroduction = hasVideoIntroRequests(contract)
  const [user] = useCurrentUser()
  const companyName = contract.company_name
  const questionsRequests = getQuestionsRequests(contract)
  const questionsAnswered = questionsRequests.filter(cr => cr.status === 'completed').length === questionsRequests.length
  const videoIntroRequests = getVideoIntroRequests(contract)
  const videoIntroIncomplete = videoIntroRequests.filter(r => r.status !== 'completed').length > 0
  const questions = questionsRequests.map(r => r.question)
  const allowTextualAnswers = Boolean(contract?.job?.allow_textual_answers)
  const videoMaxDuration = user?.configuration?.video_max_duration
  const textAnswerMaxLength = 1500

  const explanation = [
    `${companyName} has asked you to answer the following questions before scheduling an in-person interview.`,
    'You can use our built in recorder and teleprompter and check out sample videos for inspiration, or upload an existing video if you prefer.',
    'Although a video answer is recommended, you can answer via text as an alternative.',
  ].join(' ')

  const maxDurationMessage = useMemo(() => {
    let maxDurationMessageParts = []
    if (videoMaxDuration) maxDurationMessageParts.push(`videos must be at most ${formatDurationInSeconds(videoMaxDuration)} long`)
    if (allowTextualAnswers && textAnswerMaxLength) maxDurationMessageParts.push(`textual answers must be at most ${textAnswerMaxLength} characters long`)

    return maxDurationMessageParts.length > 0 ? capitalize(`${maxDurationMessageParts.join(' and ')}.`) : null
  }, [videoMaxDuration, textAnswerMaxLength, allowTextualAnswers])

  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">
              Questions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              {explanation}
            </Typography>
          </Grid>

          {maxDurationMessage && (
            <Grid item xs={12}>
              <InfoMessage><strong>{maxDurationMessage}</strong></InfoMessage>
            </Grid>
          )}

          <Grid item xs={12} />

          <Grid item xs={12}>
            <QuestionsToAnswer
              showProfileIntroduction={showProfileIntroduction}
              questions={questions}
              onAnswerSaved={onAnswerSaved}
              onAnswerDeleted={onAnswerDeleted}
              onRecorderOpen={onRecorderOpen}
              onRecorderClose={onRecorderClose}
              allowTextualAnswers={allowTextualAnswers}
            />
          </Grid>

          {contract?.client && (
            <Grid item xs={12}>
              <Typography variant="body1">
                If you have any questions, you can message {contract?.client?.first_name} from {companyName}.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      <Divider style={{ margin: 0 }} />

      <Box style={{ textAlign: 'right', display: 'flex' }}>
        <HiringManagerChatButton
          hiringManager={contract?.hiring_manager || contract?.client}
          mobile={mobile}
          color="secondary"
          style={{ marginRight: 'auto' }}
        />

        {!mobile && contract?.job && (
          <Button color="secondary" muiComponent={Link} to="/[...slugs]" as={`/${contract?.job.firm_slug}/${contract?.job.slug}`} style={{ marginRight: 12 }}>
            <Visibility /> View Job
          </Button>
        )}

        {handleContinue && (
          <Button color="primary" onClick={handleContinue} data-cy="continue">
            <ArrowForward /> Continue
          </Button>
        )}

        {handleFinish && (
          <Button color="primary" onClick={handleFinish} disabled={!questionsAnswered || videoIntroIncomplete} data-cy="finish">
            <CheckCircle /> Finish
          </Button>
        )}
      </Box>
    </React.Fragment>
  )
}

export default React.memo(QuestionsForm)
