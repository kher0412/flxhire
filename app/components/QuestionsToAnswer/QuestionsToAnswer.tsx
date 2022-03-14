import React, { useCallback, useEffect, useState } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { IQuestionForFreelancer, IVideo } from 'types'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import AnswerListItem from './AnswerListItem'
import styles from './QuestionsToAnswer.module.css'

interface IQuestionsToAnswerProps {
  questions: IQuestionForFreelancer[]
  groupMode?: boolean
  groupPrimaryText?: (group: any, category: any) => string
  groupSecondaryText?: (group: any, category: any) => string
  onAnswerSaved?: (video?: IVideo) => void
  onAnswerDeleted?: () => void
  onRecorderOpen?: () => void
  onRecorderClose?: () => void
  showProfileIntroduction?: boolean
  allowTextualAnswers?: boolean
}

const QuestionsToAnswer = (props: IQuestionsToAnswerProps) => {
  const {
    questions = [],
    groupMode = false,
    groupPrimaryText = (group, category) => `Answer these common ${category.name} questions to highlight your expertise`,
    groupSecondaryText = () => 'Please answer all questions',
    onAnswerSaved,
    onAnswerDeleted,
    onRecorderOpen,
    onRecorderClose,
    showProfileIntroduction,
    allowTextualAnswers,
  } = props

  const user = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch()
  const showSnackbarMessage = useCallback(message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })), [])
  const onError = useCallback(error => showSnackbarMessage(error.response || error.message || 'Upload Failed'), [])
  const [sampleVideos, setSampleVideos] = useState(null as IVideo[])

  useEffect(() => {
    if (showProfileIntroduction && sampleVideos === null) {
      getAPIClient().getTopFreelancers()
        .then(freelancers => setSampleVideos(freelancers.filter(f => f?.video?.url).map(f => f.video)))
        .catch((error) => {
          trackError(error)
          setSampleVideos([])
        })
    }
  })

  const videoIntroTitle = "Record a brief video introduction describing who you are, where you're from, your background, education and work experience"

  const getMaxDuration = (maxDuration: number) => {
    return maxDuration === null ? user?.configuration?.video_max_duration : maxDuration * 60
  }

  return (
    <React.Fragment>
      <List dense={groupMode} disablePadding className={styles.list}>
        {showProfileIntroduction && (
          <AnswerListItem
            title={videoIntroTitle}
            video={user.video}
            sampleVideos={sampleVideos || []}
            onAnswerSaved={onAnswerSaved}
            onRecorderOpen={onRecorderOpen}
            onRecorderClose={onRecorderClose}
            onError={onError}
            onDeleted={onAnswerDeleted}
            index={1}
            maxDuration={user?.configuration?.video_max_duration}
          />
        )}

        {!groupMode && questions.map((question, index) => (
          <AnswerListItem
            index={(showProfileIntroduction ? 2 : 1) + index}
            question={question}
            onAnswerSaved={onAnswerSaved}
            onRecorderOpen={onRecorderOpen}
            onRecorderClose={onRecorderClose}
            key={question.id}
            allowTextualAnswer={allowTextualAnswers}
            onError={onError}
            onDeleted={onAnswerDeleted}
            maxDuration={getMaxDuration(question.max_duration)}
          />
        ))}

        {groupMode && questions.map((questionGroup: any) => {
          const category = questionGroup.freelancer_type || questionGroup.freelancer_subtype

          return (
            <React.Fragment key={category.name}>
              <ListItem style={{ paddingLeft: 1 }}>
                <ListItemText
                  primary={groupPrimaryText(questionGroup, category)}
                  secondary={groupSecondaryText(questionGroup, category)}
                />
              </ListItem>

              <List style={{ paddingLeft: 0 }}>
                {questionGroup.questions.map((question, index) => (
                  <AnswerListItem
                    index={index + (showProfileIntroduction ? 2 : 1)}
                    question={question}
                    allowTextualAnswer={allowTextualAnswers}
                    onAnswerSaved={onAnswerSaved}
                    onRecorderOpen={onRecorderOpen}
                    onRecorderClose={onRecorderClose}
                    key={question.id}
                    onError={onError}
                    onDeleted={onAnswerDeleted}
                    maxDuration={getMaxDuration(question.max_duration)}
                  />
                ))}
              </List>
            </React.Fragment>
          )
        })}
      </List>
    </React.Fragment>
  )
}

export default React.memo(QuestionsToAnswer)
