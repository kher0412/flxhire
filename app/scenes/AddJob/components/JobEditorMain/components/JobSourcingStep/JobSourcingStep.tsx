import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { Card, Grid, Typography } from '@material-ui/core'
import { Divider } from 'components'
import { JobSourcingStep_Job$key } from '__generated__/JobSourcingStep_Job.graphql'
import { useSnackbar, useQuickCommit } from 'hooks'
import { JobSourcingStep_UpdateJobDetailsMutation } from '__generated__/JobSourcingStep_UpdateJobDetailsMutation.graphql'
import JobSourcingForm from './components/JobSourcingForm'
import { Box } from 'components/themed'

export interface IJobSourcingstepProps {
  job: JobSourcingStep_Job$key
  onContinue: () => void
}

function JobSourcingstep(props: IJobSourcingstepProps) {
  const { job: jobProp, onContinue } = props

  const job = useFragment(graphql`
    fragment JobSourcingStep_Job on Job {
      slug
      user {
        rawId
      }
      hiringManager {
        rawId
      }
      hiringManagerType
      referralBounty {
        currency {
          code
        }
        value
      }
      activeJobIntegrationsNames
      candidatesToNotify {
        rawId
        status
      }
      automaticallyNotifyCandidates
      jobSocialIntegrations
      ...JobSourcingForm_Job
    }
  `, jobProp)

  const showSnackbarMessage = useSnackbar()

  const { execute: commit } = useQuickCommit<JobSourcingStep_UpdateJobDetailsMutation>(graphql`
    mutation JobSourcingStep_UpdateJobDetailsMutation($input: UpdateJobSourcingInput!) {
      updateJobSourcing(input: $input) {
        job {
          user {
            id
            rawId
            name
          }
          hiringManager {
            id
            rawId
            name
          }
          hiringManagerType
          slug
          referralBounty {
            currency {
              code
            }
            value
          }
          automaticallyNotifyCandidates
          jobSocialIntegrations
          activeJobIntegrationsNames
          candidatesToNotify {
            rawId
          }
        }
      }
    }
  `)

  const handleFormSave = (async (formData: any, shouldContinue: boolean) => {
    const result = await commit({
      input: {
        userId: formData.user_id,
        hiringManagerId: formData.hiring_manager_id || null, // Note: we make sure we don't send '0'
        referralBounty: { value: formData.referral_bounty, currencyCode: 'USD' },
        automaticallyNotifyCandidates: formData.automatically_notify_candidates,
        jobSocialIntegrations: formData.job_social_integrations,
        activeJobIntegrationsNames: formData.active_job_integrations_names,
        candidatesToNotify: formData.candidates_to_notify?.map(c => ({ rawId: c.id })),
        slug: job?.slug,
      },
    })

    if (result) {
      showSnackbarMessage('Job saved')

      if (shouldContinue) {
        onContinue()
      }
    }
  })

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card variant="outlined" elevation={0}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Sourcing
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2">
                  Flexhire makes it simple to put your role in front of as many qualified people as possible. Message existing Flexhire members,
                  create a referral program, syndicate your job posting on other great sites and leverage social media to reach qualified candidates faster.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <JobSourcingForm
          job={job}
          onSubmitForm={handleFormSave}
          initialValues={{
            user_id: job?.user?.rawId,
            hiring_manager_id: job?.hiringManager?.rawId,
            hiring_manager_type: job?.hiringManagerType || 'job_owner',
            referral_bounty: job?.referralBounty?.value ?? 0,
            active_job_integrations_names: job?.activeJobIntegrationsNames || [],
            candidates_to_notify: job?.candidatesToNotify?.map(c => ({ id: c.rawId, status: c.status })) || [],
            automatically_notify_candidates: job?.automaticallyNotifyCandidates || false,
            job_social_integrations: job?.jobSocialIntegrations || [],
          }}
        />
      </Grid>
    </Grid>
  )
}

export default React.memo(JobSourcingstep)
