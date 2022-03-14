import React, { useEffect, useState } from 'react'
import { flatten } from 'lodash'
import { PagePlaceholder, CodeTest, ExistingQuestionsDialog } from 'components'
import { Button, TextArea } from 'components/themed'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  InputAdornment,
  IconButton,
  ListItemSecondaryAction,
  Checkbox,
  Accordion,
  AccordionSummary,
  ExpansionPanelDetails,
  Divider,
} from '@material-ui/core'
import { isCypress } from 'services/browserAgent'

// TODO: these 2 should be reusable components instead of being in the job scene
import ExistingCodeTestsBrowser from 'scenes/AddJob/components/JobEditorMain/components/JobScreeningStep/components/JobScreeningForm/components/CodeTests/components/ExistingCodeTestsBrowser'
import EditCodeTestDialog from 'scenes/AddJob/components/JobEditorMain/components/JobScreeningStep/components/JobScreeningForm/components/CodeTests/components/EditCodeTestDialog'

import { graphql, useFragment } from 'react-relay'
import { useSnackbar, useQuickCommit } from 'hooks'
import { RequestMoreInfoDialog_Contract$key } from '__generated__/RequestMoreInfoDialog_Contract.graphql'
import { RequestMoreInfoDialog_Freelancer$key } from '__generated__/RequestMoreInfoDialog_Freelancer.graphql'
import { RequestMoreInfoDialog_Job, RequestMoreInfoDialog_Job$key } from '__generated__/RequestMoreInfoDialog_Job.graphql'
import { AddCircle, Assignment, CheckCircle, Code, Delete, ExpandMore, Person, Timer } from '@material-ui/icons'
import ResponsiveDialog from '../ResponsiveDialog'
import styles from './RequestMoreInfoDialog.module.css'
import CompletionBadge from './components/CompletionBadge'
import PendingBadge from './components/PendingBadge'
import ToSendBadge from './components/ToSendBadge'
import CodeTestSubmission from './components/CodeTestSubmission'

interface IRequestMoreInfoDialogProps {
  contract: RequestMoreInfoDialog_Contract$key
  freelancer: RequestMoreInfoDialog_Freelancer$key
  job: RequestMoreInfoDialog_Job$key
  open: boolean
  onClose: () => void
  connectionId?: string
}

type QuestionType = RequestMoreInfoDialog_Job['questions'][0]
type ProjectType = RequestMoreInfoDialog_Job['project']

const RequestMoreInfoDialog = (props: IRequestMoreInfoDialogProps) => {
  const { open, onClose, contract: contractProp, freelancer: freelancerProp, job: jobProp, connectionId } = props
  const freelancer = useFragment(graphql`
      fragment RequestMoreInfoDialog_Freelancer on User {
        firstName
        video {
          id
        }
      }
    `, freelancerProp)

  const contract = useFragment(graphql`
    fragment RequestMoreInfoDialog_Contract on Contract {
      id
      rawId
      answers {
        question {
          rawId
        }
      }
      projectSubmission {
        url
        screenshotUrl
        description
        project {
          title
        }
      }
      contractRequests {
        status
        requestType
        question {
          rawId
          title
        }
        project {
          rawId
          title
          description
        }
        projectSubmission {
          rawId
          url
          screenshotUrl
          description
        }
      }
    }
  `, contractProp)

  const job = useFragment(graphql`
    fragment RequestMoreInfoDialog_Job on Job {
      rawId
      screeningRequestMessageTemplate
      questions {
        rawId
        title
      }
      project {
        rawId
        title
        description
      }
    }
  `, jobProp)

  const { execute: requestContract } = useQuickCommit(
    graphql`
      mutation RequestMoreInfoDialog_SendRequestsMutation($input: SendContractRequestsInput!, $connections: [ID!]!) {
        sendContractRequests(input: $input) {
          contract {
            id @deleteEdge(connections: $connections)
            status
            requestsStatus
            lastInteractionAt
            ...RequestMoreInfoDialog_Contract
          }
        }
      }
    `,
  )

  const [currentPanel, setCurrentPanel] = useState(1)
  const [questionsToSend, setQuestionsToSend] = useState<QuestionType[]>([])
  const [codeTestToSend, setCodeTestToSend] = useState<ProjectType>(null)
  const [videoIntroductionToSend, setVideoIntroductionToSend] = useState(false)
  const [questionsDialogOpen, setQuestionsDialogOpen] = useState(false)
  const [codeTestBrowserDialogOpen, setCodeTestBrowserDialogOpen] = useState(false)
  const [codeTestEditDialogOpen, setCodeTestEditDialogOpen] = useState(false)
  const [messageTemplate, setMessageTemplate] = useState('')
  const [customQuestionTitle, setCustomQuestionTitle] = useState('')
  const showSnackbarMessage = useSnackbar()

  const sendContractRequest = async () => {
    if (questionsToSend.length > 0 || codeTestToSend || videoIntroductionToSend) {
      const result = await requestContract({
        input: {
          contractId: contract.id,
          questionsIds: questionsToSend.filter(q => Boolean(q.rawId)).map(q => q.rawId),
          questionsTitles: questionsToSend.filter(q => !q.rawId && q.title).map(q => q.title),
          projectId: codeTestToSend?.rawId,
          projectTitle: codeTestToSend?.title,
          projectDescription: codeTestToSend?.description,
          videoIntroduction: videoIntroductionToSend,
          messageTemplate,
        },
        connections: connectionId ? [connectionId] : [],
      })

      if (result) {
        onClose()
        showSnackbarMessage('Request sent')
      }
    }
  }

  const handlePanelOpenToggle = (index, isExpanded) => setCurrentPanel(isExpanded ? index : -1)

  const addCustomQuestion = () => {
    if (customQuestionTitle) {
      setQuestionsToSend(questionsToSend.concat({ title: customQuestionTitle, rawId: undefined }))
      setCustomQuestionTitle('')
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.which === 13) {
      addCustomQuestion()
    }
  }

  const addQuestion = question => setQuestionsToSend(questionsToSend.concat({ ...question, rawId: question?.rawId || question?.id, fromDialog: true }))
  const removeQuestion = question => setQuestionsToSend(questionsToSend.filter(q => question.id ? q.rawId !== question.id : q.title !== question.title))

  const addCodeTest = (codeTest) => {
    setCodeTestToSend(codeTest)
    setCodeTestBrowserDialogOpen(false)
    setCodeTestEditDialogOpen(false)
  }

  const requests = contract.contractRequests || []
  const loading = !contract || !freelancer || !job

  useEffect(() => {
    const jobQuestions = job?.questions || []
    const defaultQuestions = jobQuestions.filter((q) => {
      const answer = Boolean(contract?.answers?.find(a => a.question?.rawId === q.rawId))
      const request = Boolean(contract?.contractRequests?.find(x => x.question?.rawId === q.rawId))
      return !answer && !request
    })

    let codeTest

    if (job?.project && !(contract?.contractRequests?.some(r => r.project?.rawId) || contract?.projectSubmission)) {
      codeTest = job.project
    }

    const shouldSendVideoIntroduction = !freelancer?.video && !contract?.contractRequests?.some(x => x.requestType === 'video_introduction')

    // Automatically add saved job screening items to the request
    if (questionsToSend.length === 0) setQuestionsToSend(defaultQuestions)
    if (!codeTestToSend) setCodeTestToSend(codeTest)
    if (!videoIntroductionToSend && shouldSendVideoIntroduction) setVideoIntroductionToSend(true)
    if (job?.screeningRequestMessageTemplate) setMessageTemplate(job?.screeningRequestMessageTemplate)
  }, [job?.rawId])

  // Video intro
  const videoIntroductionCompleted = Boolean(freelancer?.video)
  const isPendingVideoIntro = x => x.requestType === 'video_introduction' && x.status !== 'completed'
  const videoIntroductionRequested = !videoIntroductionCompleted && requests.filter(isPendingVideoIntro).length > 0

  // Questions
  const questionRequests = requests.filter(x => x.question?.rawId)
  const answered = questionRequests.filter(x => x.status === 'completed')
  const unanswered = questionRequests.filter(x => x.status !== 'completed')

  const allQuestions = flatten([
    answered.map(contractRequest => ({ rawId: contractRequest.question?.rawId, title: contractRequest.question?.title, isAnswered: true })),
    unanswered.map(contractRequest => ({ rawId: contractRequest.question?.rawId, title: contractRequest.question?.title, isRequested: true })),
    questionsToSend.map(q => ({ ...q, rawId: q.rawId })),
  ]) as Array<QuestionType & { isRequested?: boolean, isAnswered?: boolean, fromDialog?: boolean }>

  // Code test
  const projectSubmission = contract?.projectSubmission
  const projectCompleted = projectSubmission || requests.filter(x => x.project?.rawId && x.status === 'completed').length > 0
  const projectRequested = !projectCompleted && requests.filter(x => x.project?.rawId && x.status !== 'completed').length > 0
  const projectRequest = requests.find(x => x.project?.rawId && x.status !== 'completed')

  // Summary
  const totalCompleted = answered.length + (videoIntroductionCompleted ? 1 : 0) + (projectCompleted ? 1 : 0)
  const totalRequested = unanswered.length + (videoIntroductionRequested ? 1 : 0) + (projectRequested ? 1 : 0)
  const totalToSend = questionsToSend.length + (videoIntroductionToSend ? 1 : 0) + (codeTestToSend ? 1 : 0)

  return (
    <React.Fragment>
      <ResponsiveDialog
        open={open}
        onClose={onClose}
        scroll="body"
      >
        {!loading && (
          <DialogTitle>
            Screen {freelancer.firstName}
            <div className={styles.badges}>
              <CompletionBadge count={totalCompleted} multiple />
              <PendingBadge count={totalRequested} multiple />
              <ToSendBadge count={totalToSend} multiple />
            </div>
          </DialogTitle>
        )}

        {loading && (
          <DialogContent>
            <PagePlaceholder
              flat
              title="Loading"
              subtitle="Please wait..."
              icon={<Assignment />}
              style={{ width: '100%' }}
            />
          </DialogContent>
        )}

        {!loading && (
          <React.Fragment>
            <DialogContent>
              <Accordion
                // Introduction Video
                expanded={currentPanel === 0 || isCypress()}
                onChange={(_e, isExpanded) => handlePanelOpenToggle(0, isExpanded)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Person className={styles.icon} /> Introduction Video

                  <div className={styles.badges}>
                    <CompletionBadge count={videoIntroductionCompleted ? 1 : 0} />
                    <PendingBadge count={videoIntroductionRequested ? 1 : 0} />
                    <ToSendBadge count={videoIntroductionToSend ? 1 : 0} />
                  </div>
                </AccordionSummary>

                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                  {!videoIntroductionRequested && !videoIntroductionCompleted && (
                    <DialogContentText>
                      Request an introduction video from {freelancer.firstName}.
                      An introduction video gives a good perspective of an individual's communication and overall expertise.
                    </DialogContentText>
                  )}

                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          color="primary"
                          edge="start"
                          checked={Boolean(videoIntroductionToSend || videoIntroductionCompleted || videoIntroductionRequested)}
                          disabled={Boolean(videoIntroductionCompleted || videoIntroductionRequested)}
                          onChange={() => setVideoIntroductionToSend(!videoIntroductionToSend)}
                          tabIndex={-1}
                          data-cy="request-intro-video"
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Request introduction video"
                        secondary={(
                          <React.Fragment>
                            {videoIntroductionCompleted && 'Video Introduction completed'}
                            {videoIntroductionRequested && `Awaiting response from ${freelancer.firstName}`}
                          </React.Fragment>
                        )}
                      />
                    </ListItem>
                  </List>
                </ExpansionPanelDetails>
              </Accordion>

              <Accordion
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // Structured Interview Questions
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                expanded={currentPanel === 1 || isCypress()}
                onChange={(_e, isExpanded) => handlePanelOpenToggle(1, isExpanded)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Assignment className={styles.icon} /> Structured Interview Questions

                  <div className={styles.badges}>
                    <CompletionBadge count={answered.length} multiple />
                    <PendingBadge count={unanswered.length} multiple />
                    <ToSendBadge count={questionsToSend.length} multiple />
                  </div>
                </AccordionSummary>

                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                  <List disablePadding>
                    {allQuestions.map((question) => {
                      const questionId = question.rawId
                      const title = question.title
                      const isRequested = Boolean(question.isRequested)
                      const isCompleted = Boolean(question.isAnswered)
                      const isNotSent = !isRequested && !isCompleted

                      let status = 'Not Sent'

                      if (questionId && !question.fromDialog) status = 'Not Sent (Saved for Job)'
                      if (!questionId) status = 'Not Sent (Unsaved)'
                      if (isRequested) status = 'Sent - Awaiting Response'
                      if (isCompleted) status = 'Answered'

                      return (
                        <ListItem key={questionId} data-cy={`question-${questionId}`} disableGutters>
                          <ListItemIcon>
                            {isNotSent && <Assignment />}
                            {isCompleted && <CheckCircle />}
                            {isRequested && <Timer />}
                          </ListItemIcon>

                          <ListItemText
                            primary={title}
                            secondary={status}
                          />

                          {isNotSent && (
                            <ListItemSecondaryAction style={{ right: 0 }}>
                              <IconButton onClick={() => removeQuestion(question)} data-cy={`question-${questionId}-delete`}>
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          )}
                        </ListItem>
                      )
                    })}
                  </List>

                  <TextField
                    fullWidth
                    label={`Ask ${freelancer.firstName} a question`}
                    placeholder="Type your question..."
                    name="title"
                    value={customQuestionTitle}
                    onChange={e => setCustomQuestionTitle(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    inputProps={{
                      // TODO: this can go once updated to use themed fields
                      'data-cy': 'textfield-input-title',
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={addCustomQuestion}
                            data-cy="add-custom-question"
                          >
                            <AddCircle />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ marginBottom: 24 }}
                  />

                  <Button
                    color="primary"
                    onClick={() => setQuestionsDialogOpen(true)}
                    data-cy="choose-questions"
                  >
                    <AddCircle style={{ marginRight: 12 }} /> Browse from existing questions
                  </Button>
                </ExpansionPanelDetails>
              </Accordion>

              <Accordion
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // Code Tests
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                expanded={currentPanel === 2 || isCypress()}
                onChange={(_e, isExpanded) => handlePanelOpenToggle(2, isExpanded)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Code className={styles.icon} /> Code Test

                  <div className={styles.badges}>
                    <CompletionBadge count={projectCompleted ? 1 : 0} />
                    <PendingBadge count={projectRequested ? 1 : 0} />
                    <ToSendBadge count={codeTestToSend ? 1 : 0} />
                  </div>
                </AccordionSummary>

                <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                  {projectRequested && !projectCompleted && (
                    <List disablePadding>
                      <ListItem>
                        <ListItemIcon>
                          <Timer />
                        </ListItemIcon>

                        <ListItemText
                          primary={projectRequest.project?.title || 'Code Test'}
                          secondary="Sent - Awaiting Response"
                        />
                      </ListItem>
                    </List>
                  )}

                  {projectCompleted && (
                    <List disablePadding>
                      <CodeTestSubmission
                        freelancer={{
                          first_name: freelancer?.firstName,
                        }}
                        projectSubmission={projectSubmission ? {
                          title: projectSubmission?.project?.title,
                          url: projectSubmission?.url,
                          screenshot_url: projectSubmission?.screenshotUrl,
                          description: projectSubmission?.description,
                        } : null}
                      />
                    </List>
                  )}

                  {!projectCompleted && !projectRequested && !codeTestToSend && (
                    <React.Fragment>
                      <DialogContentText>
                        Assigning a code test gives a thorough verification of {freelancer.firstName}'s capabilities.
                        You can add your own, or choose from a library of common coding tests.
                        {' '}{freelancer.firstName} will be required to provide the completed solution and submit a publicly available URL to its source.
                      </DialogContentText>

                      <Button
                        variant="outlined"
                        onClick={() => setCodeTestEditDialogOpen(true)}
                        style={{ marginBottom: 6 }}
                      >
                        Create a new code test
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setCodeTestBrowserDialogOpen(true)}
                      >
                        Browse existing code tests
                      </Button>
                    </React.Fragment>
                  )}

                  {codeTestToSend && (
                    <React.Fragment>
                      <div style={{ marginTop: 12, marginBottom: -24 }}>
                        <CodeTest title={codeTestToSend?.title} description={codeTestToSend?.description} />
                      </div>

                      <Button
                        variant="outlined"
                        onClick={() => setCodeTestToSend(null)}
                      >
                        Remove
                      </Button>
                    </React.Fragment>
                  )}
                </ExpansionPanelDetails>
              </Accordion>
            </DialogContent>

            <Divider style={{ margin: '24px 0' }} />

            <DialogContent>
              <TextArea
                label="Customizable Screening Request Message"
                value={messageTemplate}
                onChange={e => setMessageTemplate(e.target.value)}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>
                Close
              </Button>

              <Button
                color="primary"
                onClick={sendContractRequest}
                disabled={questionsToSend.length === 0 && !codeTestToSend && !videoIntroductionToSend}
                data-cy="send"
              >
                Send {totalToSend > 0 ? `(${totalToSend})` : ''}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </ResponsiveDialog>

      {questionsDialogOpen && (
        <ExistingQuestionsDialog
          open={questionsDialogOpen}
          onClose={() => setQuestionsDialogOpen(false)}
          questions={questionsToSend.filter(q => Boolean(q.rawId)).map(q => ({ id: q.rawId, title: q.title }))}
          addQuestion={addQuestion}
          removeQuestion={removeQuestion}
          dialogTitle="Choose Questions"
          dialogDescription="Choose any combination of Questions. You will be able to review your requests before sending it."
          doneButtonMessage="Continue"
        />
      )}

      {codeTestEditDialogOpen && (
        <EditCodeTestDialog
          onChange={addCodeTest}
          codeTest={codeTestToSend}
          open={codeTestEditDialogOpen}
          onClose={() => setCodeTestEditDialogOpen(false)}
        />
      )}

      {codeTestBrowserDialogOpen && (
        <ExistingCodeTestsBrowser
          onAdd={addCodeTest}
          open={codeTestBrowserDialogOpen}
          onClose={() => setCodeTestBrowserDialogOpen(false)}
        />
      )}
    </React.Fragment>
  )
}

export default RequestMoreInfoDialog

export type RequestMoreInfoDialogComponent = typeof RequestMoreInfoDialog
