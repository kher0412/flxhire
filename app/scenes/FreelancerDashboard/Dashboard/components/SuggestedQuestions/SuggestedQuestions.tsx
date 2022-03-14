import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  MenuItem,
} from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { browserHistory } from 'services/router'
import { QuestionsToAnswer, MoreButtonMenu, LoadingIcon } from 'components'
import { IVideo } from 'types'
import { SuggestedQuestionsContainerProps } from './SuggestedQuestionsContainer'
import styles from './SuggestedQuestions.module.css'

export interface ISuggestedQuestionsProps {
  onAnswerSubmit?: (video: IVideo) => void
}

export interface ISuggestedQuestionsState {
}

export default class SuggestedQuestions extends React.Component<ISuggestedQuestionsProps & SuggestedQuestionsContainerProps, ISuggestedQuestionsState> {
  state = {
    questions: [],
    questionsReceived: false,
  }

  getQuestions = async () => {
    try {
      this.setState({
        questions: await getAPIClient().getSuggestedQuestions(),
      })
    } catch (error) {
      trackError(error)
    }

    this.setState({ questionsReceived: true })
  }

  componentDidMount() {
    this.getQuestions()
  }

  onAnswerSaved = (video?: IVideo) => {
    const { showSnackbarMessage, onAnswerSubmit } = this.props
    showSnackbarMessage('Answer Saved')
    this.getQuestions()

    if (onAnswerSubmit) {
      onAnswerSubmit(video)
    }
  }

  render() {
    const { questions, questionsReceived } = this.state

    return (
      <Card className={styles.container} raised data-cy="dashboard-suggested-questions">
        <CardHeader
          title="Suggested Questions"
          subheader={`${questions.length} available`}
          action={(
            <MoreButtonMenu>
              <MenuItem onClick={() => browserHistory.push('/profile#1')}>
                Manage My Answers
              </MenuItem>
            </MoreButtonMenu>
          )}
        />

        {questions.length > 0 && (
          <CardContent>
            <Typography variant="body1">
              Improve your profile by answering the most popular expert questions.
              Profiles with more answers get more views and appear first to clients in job postings
            </Typography>
          </CardContent>
        )}

        <CardContent>
          <QuestionsToAnswer questions={questions} onAnswerSaved={this.onAnswerSaved} />

          {questions.length === 0 && questionsReceived && (
            <List>
              <ListItem>
                <ListItemIcon><CheckCircle /></ListItemIcon>
                <ListItemText
                  primary="All set!"
                  secondary="We don't have any more questions for you at this time. Good job!"
                />
              </ListItem>
            </List>
          )}

          {questions.length === 0 && !questionsReceived && (
            <List>
              <ListItem>
                <ListItemIcon>
                  <LoadingIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Hold On..."
                  secondary="Looking for questions related to your profile"
                />
              </ListItem>
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}
