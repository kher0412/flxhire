import React from 'react'
import { Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Card } from '@material-ui/core'
import { FormErrorSummary, LoadingIcon, MoreButtonMenu, CheckboxField, GridExpandable } from 'components'
import { Button, TextArea, Box } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { JobScreeningForm_Job$key } from '__generated__/JobScreeningForm_Job.graphql'
import { Field, FieldArray, Fields } from 'redux-form'
import { ISkill } from 'types'
import { ChevronRight, Save } from '@material-ui/icons'
import ExistingJobButtons from '../../../../../ExistingJobButtons'
import { JobScreeningFormContainerProps, IJobScreeningFormPayload } from './JobScreeningFormContainer'
import ScreeningModeSelect from './components/ScreeningModeSelect'
import JobQuestions from './components/JobQuestions'
import CodeTests from './components/CodeTests'

export interface IJobScreeningFormProps {
  jobFragmentRef: JobScreeningForm_Job$key
  defaultQuestionTitle?: string
  submitForm: (formData: IJobScreeningFormPayload, shouldContinue: boolean) => void
  firmSlug?: string
}

function JobScreeningForm(props: IJobScreeningFormProps & JobScreeningFormContainerProps) {
  const {
    jobFragmentRef,
    firmSlug,
    handleSubmit,
    submitForm,
    submitting,
    submitFailed,
    defaultQuestionTitle,
    error,
  } = props

  // TODO: use jobSubtypes instead of freelancerSubtypes
  const job = useFragment(
    graphql`
      fragment JobScreeningForm_Job on Job {
        slug
        status
        freelancerType {
          rawId
          name
          slug
          jobsHaveCodeTests
        }
        freelancerSubtypes {
          rawId
          name
          slug
          freelancerType {
            rawId
          }
        }
        jobSkills {
          skill {
            rawId
            name
          }
        }
      }
    `,
    jobFragmentRef,
  )

  const [enabled, setEnabled] = React.useState(false)

  const handleSaveClickSubmit = (formData: IJobScreeningFormPayload) => {
    submitForm(formData, false)
  }

  const handleNextClickSubmit = (formData: IJobScreeningFormPayload) => {
    submitForm(formData, true)
  }

  const jobSlug = job?.slug
  const jobStatus = job?.status
  const published = jobSlug && job?.status === 'opened'
  const selectedFreelancerSubtypeIds = job?.freelancerSubtypes?.map(t => t.rawId) || []
  const selectedSkills = job?.jobSkills?.map(jobSkill => jobSkill.skill).map(s => ({ id: s.rawId, name: s.name }))

  return (
    <form
      style={{
        maxWidth: '100%',
        opacity: submitting ? 0.35 : undefined,
        pointerEvents: submitting ? 'none' : undefined,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    Screening
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2">
                    Standardize and automate initial screening of your applicants. Replace time consuming early stage interviews,
                    qualify faster and hire better based on all candidates answering the same questions.
                    See motivated, professional candidates via video early, reducing recruitment costs by up to 50%.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Fields
                    names={['screening_mode', 'project', 'auto_send_screening_requests', 'questions']}
                    component={ScreeningModeSelect}
                    onEnabledStateChange={setEnabled}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <GridExpandable item xs={12} expand={enabled}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined" elevation={0}>
                <Box>
                  <Field
                    label="Customizable Screening Request Message"
                    name="screening_request_message_template"
                    component={TextArea}
                    style={{ minHeight: 140 }}
                  />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" elevation={0}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        Candidate Interview Questions
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Create a set of screening questions associated with this job.
                        The first question, a basic introduction, is required for all candidates.
                        For subsequent questions choose from our extensive database of job-based best practice questions or write your own.
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <List disablePadding>
                        <ListItem>
                          <ListItemIcon>
                            <Field
                              name="allow_textual_answers"
                              component={CheckboxField}
                            />
                          </ListItemIcon>

                          <ListItemText
                            primary="Also allow text answers"
                            secondary="In addition to video answers"
                          />
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item xs={12} />

                    <Grid item xs={12}>
                      <FieldArray
                        name="questions"
                        component={JobQuestions}
                        freelancerTypes={[{
                          id: job?.freelancerType?.rawId,
                          name: job?.freelancerType?.name,
                          slug: job?.freelancerType?.slug,
                          jobs_have_code_tests: job?.freelancerType?.jobsHaveCodeTests,
                        }]}
                        // TODO: in the previous (REST) iteration, we passed all freelancerSubtypes for the given freelancerType,
                        // however now we are only passing freelancerSubtypes from the job... investigate if that's an issue
                        freelancerSubtypes={job?.freelancerSubtypes?.map(t => ({
                          id: t.rawId,
                          name: t.name,
                          slug: t.slug,
                          freelancer_type_id: t.freelancerType?.rawId,
                        }))}
                        selectedFreelancerSubtypeIds={selectedFreelancerSubtypeIds}
                        skills={selectedSkills as ISkill[]}
                        questionTitle={defaultQuestionTitle}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" elevation={0}>
                <Box>
                  <Field
                    name="project"
                    component={CodeTests}
                    enabled={job?.freelancerType?.jobsHaveCodeTests || false}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </GridExpandable>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {jobSlug && published && (
                  <MoreButtonMenu component={Button} iconOnly style={{ marginRight: 'auto' }}>
                    <ExistingJobButtons jobId={jobSlug} firmSlug={firmSlug} status={jobStatus} />
                  </MoreButtonMenu>
                )}

                <Button
                  responsive
                  disabled={submitting}
                  color="secondary"
                  onClick={handleSubmit(handleSaveClickSubmit)}
                  style={{ marginRight: 12, marginLeft: 'auto' }}
                  data-cy="save-changes"
                >
                  {submitting ? <LoadingIcon /> : <Save />} {jobSlug ? 'Save Changes' : 'Create Draft'}
                </Button>

                <Button
                  responsive
                  variant={jobSlug ? 'text' : 'contained'}
                  color="primary"
                  onClick={handleSubmit(handleNextClickSubmit)}
                  data-cy="job-continue"
                >
                  <ChevronRight /> Next: {jobSlug && jobStatus === 'opened' ? 'Update Publication' : 'Review & Publish'}
                </Button>
              </div>

              <div style={{ textAlign: 'right' }}>
                <FormErrorSummary show={submitFailed} style={{ paddingTop: 12 }} message={error} />
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default React.memo(JobScreeningForm)
