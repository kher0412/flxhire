import React, { useCallback } from 'react'
import { FormErrorSummary, LoadingIcon, MoreButtonMenu, Suspense, LoadingPage } from 'components'
import { Card, Grid, Typography } from '@material-ui/core'
import { Button, InfoMessage, Box } from 'components/themed'
import { Field, Fields } from 'redux-form'
import { useCurrentUser } from 'hooks'
import { useFragment, graphql } from 'react-relay'
import { JobSourcingForm_Job$key } from '__generated__/JobSourcingForm_Job.graphql'
import { CheckCircle, Save } from '@material-ui/icons'
import { JobSourcingFormContainerProps } from './JobSourcingFormContainer'
import CandidatesField from './components/CandidatesField'
import ExistingJobButtons from '../../../../../ExistingJobButtons'
import AdvertisingIntegrationsField from './components/AdvertisingIntegrationsField'
import SocialIntegrationsField from './components/SocialIntegrationsField'
import ReferralBoostField from './components/ReferralBoostField'
import JobHiringManagerFields from './components/JobHiringManagerFields'

export interface IJobSourcingFormProps {
  job: JobSourcingForm_Job$key
  onSubmitForm: (formData: any, shouldContinue: boolean) => void
}

const JobSourcingForm = (props: IJobSourcingFormProps & JobSourcingFormContainerProps) => {
  const { job: jobProp, handleSubmit, submitting, submitFailed, onSubmitForm } = props
  const [user] = useCurrentUser()
  const firmSlug = user?.firm?.slug

  const job = useFragment(graphql`
    fragment JobSourcingForm_Job on Job {
      slug
      status
      ...JobHiringManagerFields_Job
    }
  `, jobProp)

  const jobSlug = job?.slug
  const jobStatus = job?.status
  const published = jobSlug && jobStatus === 'opened'

  const handleSaveClickSubmit = useCallback((formData) => {
    onSubmitForm(formData, false)
  }, [onSubmitForm, jobSlug])

  const handleNextClickSubmit = useCallback((formData) => {
    onSubmitForm(formData, true)
  }, [onSubmitForm, jobSlug])

  return (
    <form
      onSubmit={handleSubmit(handleNextClickSubmit)}
      style={{
        maxWidth: '100%',
        opacity: submitting ? 0.35 : undefined,
        pointerEvents: submitting ? 'none' : undefined,
      }}
    >
      <Grid container spacing={3}>
        {user?.configuration?.enable_hiring_manager && (
          <Grid item xs={12}>
            <Card variant="outlined" elevation={0}>
              <Box>
                <Fields
                  names={['user_id', 'hiring_manager_id', 'hiring_manager_type']}
                  component={JobHiringManagerFields}
                  job={job}
                />
              </Box>
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Sourcing Method 1 - matching Flexhire members for your job
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2">
                    The following Flexhire members potentially match your job. We'll automatically notify any preferred candidates you choose for you
                    to see if they are interested. For other candidates, we'll send them a referral opportuntiy email to let them help out with sourcing
                    for your position.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  {!jobSlug && (
                    <InfoMessage>
                      Please publish or save a draft of your job posting to preview job candidates.
                    </InfoMessage>
                  )}

                  {jobSlug && (
                    <Suspense fallback={<LoadingPage />}>
                      <Fields
                        names={['candidates_to_notify', 'automatically_notify_candidates']}
                        component={CandidatesField}
                        jobSlug={jobSlug}
                        status={jobStatus}
                      />
                    </Suspense>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Sourcing Method 2 - Super power job post with a referral bonus
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    Incentivize our Flexhire members to find the perfect candidate for you by giving them a referral reward.
                    We generate a unique referral link for each of our Flexhire members to share.
                    We track all referred candidates and you only pay if you hire a verified referred candidate.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="referral_bounty"
                    component={ReferralBoostField}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Sourcing Method 3 - Advertise on third party job boards
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    We make it simple for you to reach the most applicants by advertising automatically on some of the world’s biggest job sites.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Suspense fallback={<LoadingPage />}>
                    <Field
                      name="active_job_integrations_names"
                      component={AdvertisingIntegrationsField}
                    />
                  </Suspense>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Sourcing Method 4 - Share your job on your social media
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    Connect your social media accounts and we auto post your positions to extend your reach.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="job_social_integrations"
                    component={SocialIntegrationsField}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box style={{ textAlign: 'right', display: 'flex' }}>
              {jobSlug && published && (
                <MoreButtonMenu component={Button} color="secondary" iconOnly style={{ marginRight: 'auto' }}>
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
                {submitting ? <LoadingIcon /> : <Save />} {jobStatus === 'draft' ? 'Save Draft' : 'Save Changes'}
              </Button>

              <Button
                color="primary"
                type="submit"
                disabled={submitting}
                data-cy="job-continue"
              >
                <CheckCircle /> Next: Screening
              </Button>

              <div>
                <FormErrorSummary show={submitFailed} />
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default JobSourcingForm
