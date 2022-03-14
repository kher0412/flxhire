import React from 'react'
import { PageWrapper, QuestionsToAnswer } from 'components'
import { Button } from 'components/themed'
import { browserHistory } from 'services/router'
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import styles from 'scenes/Screening/Screening.module.css'
import VideoIcon from '@material-ui/icons/VideoCall'
import ProfileIcon from '@material-ui/icons/AccountBox'
import ReferencesIcon from '@material-ui/icons/SupervisedUserCircle'
import ProjectIcon from '@material-ui/icons/Assignment'
import { ProjectForm } from '../ProjectForm'

const MIN_ANSWERS_PER_CATEGORY = 1
const answeredEnoughQuestions = g => Boolean(g.questions.filter(q => Boolean(q.answer)).length >= Math.min(g.questions.length, MIN_ANSWERS_PER_CATEGORY))

class ScreeningFinalStep extends React.Component {
  state = {
    questions: [],
    questionsReceived: false,
  }

  async componentDidMount() {
    this.refreshQuestions()
  }

  refreshQuestions = async () => {
    const { getQuestions } = this.props

    this.setState({
      questions: await getQuestions(),
      questionsReceived: true,
    })
  }

  openReferences = () => browserHistory.push('/application/references')

  openVideoIntroduction = () => browserHistory.push('/application/introduction')

  openProfile = () => browserHistory.push('/profile')

  renderCompleteYourApplication() {
    const { submitApplication, user, project } = this.props
    const { questions, questionsReceived } = this.state
    // const referencesProvided = user.references.filter(r => r.status === 'completed').length >= 2
    const referencesProvided = user.references.length >= 2
    const videoUploaded = Boolean(user.video?.url)
    const projectRequired = user.profile.screening_requires_project
    const projectProvided = project && project.description && project.title && project.url
    const questionsAnswered = questions.filter(answeredEnoughQuestions).length === questions.length
    const questionsDone = questionsReceived && questions.length > 0 ? questionsAnswered : true
    const skillScreeningDone = projectRequired ? projectProvided : questionsDone
    const ready = videoUploaded && referencesProvided && skillScreeningDone

    return (
      <PageWrapper raised>
        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">
                Complete Your Submission
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Review your Profile and complete any remaining items.
                A full application has a better chance of being approved.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <List disablePadding>
                <ListItem button onClick={this.openProfile}>
                  <ListItemIcon><ProfileIcon style={{ color: 'green' }} /></ListItemIcon>

                  <ListItemText
                    primary="Profile"
                    secondary="Click to review your Profile and Skills"
                  />
                </ListItem>

                <ListItem button onClick={this.openVideoIntroduction}>
                  <ListItemIcon><VideoIcon style={{ color: videoUploaded ? 'green' : 'red' }} /></ListItemIcon>
                  <ListItemText
                    primary={videoUploaded ? 'Video Introduction' : 'Video Introduction Required'}
                    secondary={videoUploaded ? 'You have submitted an Introduction Video. Click to review it' : 'Click to submit a Video Introduction'}
                  />
                </ListItem>

                <ListItem button onClick={this.openReferences}>
                  <ListItemIcon><ReferencesIcon style={{ color: referencesProvided ? 'green' : 'red' }} /></ListItemIcon>
                  <ListItemText
                    primary={referencesProvided ? 'References' : 'References Required'}
                    secondary={referencesProvided ? 'You have provided enough references, but you can click here to add more if you want' : 'Click to provide references'}
                  />
                </ListItem>

                {projectRequired && (
                  <ListItem button>
                    <ListItemIcon><ProjectIcon style={{ color: projectProvided ? 'green' : 'red' }} /></ListItemIcon>
                    <ListItemText
                      primary={projectProvided ? 'Project' : 'Project Required'}
                      secondary={projectProvided ? 'You have provided a Project to represent your skillset' : 'Scroll above to provide a Project'}
                    />
                  </ListItem>
                )}

                {!projectRequired && questions.length > 0 && (
                  <ListItem button>
                    <ListItemIcon><ProjectIcon style={{ color: questionsAnswered ? 'green' : 'red' }} /></ListItemIcon>
                    <ListItemText
                      primary={questionsAnswered ? 'Questions' : 'Question Answers Required'}
                      secondary={questionsAnswered ? 'You have answered our Expertise Questions' : `Answer at least ${MIN_ANSWERS_PER_CATEGORY} Questions per Category`}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
        </div>

        <div className={styles['button-container']}>
          <Button
            color="primary"
            disabled={!ready}
            onClick={submitApplication}
            data-cy="submit"
            style={{ marginRight: '12px', marginBottom: '12px' }}
          >
            Submit Application
          </Button>
        </div>
      </PageWrapper>
    )
  }

  renderProject() {
    const { user } = this.props
    const { questions } = this.state
    const projectRequired = user.profile.screening_requires_project

    if (projectRequired) {
      return (
        <div style={{ marginBottom: 48 }}>
          <PageWrapper raised style={{ transformOrigin: '80% top' }}>
            <div className={styles.box}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Step 3 - Expertise Verification
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    We know your time is valuable, so we try to make verification of your expertise as efficient as possible.
                    We validate technical ability by talking through a software project with you that you have written in your preferred tech stack
                    over a video conference with a Flexhire engineer.
                    If you don't have an existing project ready to submit, you can build and submit our simple app per the specification below.
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <Divider />
            <ProjectForm />
          </PageWrapper>
        </div>
      )
    }

    if (!projectRequired && questions.length > 0) {
      return (
        <div style={{ marginBottom: 48 }}>
          <PageWrapper raised style={{ transformOrigin: '80% top' }}>
            <div className={styles.box}>
              <Typography variant="h3">
                Step 3 - Expertise Verification
              </Typography>

              <div className={styles.statement}>
                We know your time is valuable, so we try to make verification of your expertise as efficient as possible.
                Answer the questions below and submit your profile for verification.
              </div>

              <QuestionsToAnswer
                groupMode
                questions={questions}
                groupSecondaryText={(group) => {
                  const total = Math.min(group.questions.length, MIN_ANSWERS_PER_CATEGORY)
                  const completed = answeredEnoughQuestions(group)
                  return completed ? 'Section completed' : `${total} Answer${total > 1 ? 's' : ''} needed`
                }}
                onVideoReady={this.refreshQuestions}
              />
            </div>
          </PageWrapper>
        </div>
      )
    }

    return null
  }

  render() {
    return (
      <div>
        {this.renderProject()}
        {this.renderCompleteYourApplication()}
      </div>
    )
  }
}

export default ScreeningFinalStep
