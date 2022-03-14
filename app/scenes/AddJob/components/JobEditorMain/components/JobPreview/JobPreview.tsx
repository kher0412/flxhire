import React from 'react'
import { Card, Grid } from '@material-ui/core'
import JobPosting from 'components/JobPosting'
import { LoadingIcon, MoreButtonMenu } from 'components'
import { Button, Box } from 'components/themed'
import { JobStatus, IFreelancerType } from 'types'
import { Save, Send } from '@material-ui/icons'
import ExistingJobButtons from '../../../ExistingJobButtons'
import { ContainerProps } from './JobPreviewContainer'

interface IJobPreviewProps extends ContainerProps {
  freelancerTypes: Pick<IFreelancerType, 'id' | 'name'>[]
  firmSlug?: string
  jobId?: string | number
  status?: JobStatus
}

const JobPreview = (props: IJobPreviewProps) => {
  const { jobId, isSavingJob, onSave, firmSlug, status, jobForPosting, freelancerTypes } = props
  const published = jobId && status === 'opened'

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card variant="outlined" elevation={0}>
          <div style={{ opacity: isSavingJob ? 0.35 : undefined }}>
            <form>
              <JobPosting
                job={jobForPosting}
                freelancerTypes={freelancerTypes}
                freelancerSubtypes={[]}
                skills={[]}
                managers={[]}
              />
            </form>
          </div>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card variant="outlined" elevation={0}>
          <Box>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {jobId && published && (
                <MoreButtonMenu component={Button} iconOnly style={{ marginRight: 'auto' }}>
                  <ExistingJobButtons jobId={jobId} firmSlug={firmSlug} status={status} />
                </MoreButtonMenu>
              )}

              <Button
                responsive
                color={published ? 'primary' : 'secondary'}
                disabled={isSavingJob}
                onClick={() => onSave(jobId)}
                style={{ marginRight: 12, marginLeft: 'auto' }}
                data-cy="save-changes"
              >
                {isSavingJob ? <LoadingIcon /> : <Save />} {jobId ? 'Save Changes' : 'Save Draft'}
              </Button>

              {!published && (
                <Button
                  responsive
                  disabled={isSavingJob}
                  color="primary"
                  onClick={() => onSave(jobId, 'opened')}
                  style={{ marginRight: 12 }}
                  data-cy="publish-changes"
                >
                  {isSavingJob ? <LoadingIcon /> : <Send />} Publish Job
                </Button>
              )}
            </div>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}
export default JobPreview
