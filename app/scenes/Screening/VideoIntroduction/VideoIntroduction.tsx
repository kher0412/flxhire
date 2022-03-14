import { memo, useState } from 'react'
import { Divider, Typography, Grid } from '@material-ui/core'
import { PageWrapper } from 'components'
import { Button } from 'components/themed'
import { browserHistory } from 'services/router'
import styles from 'scenes/Screening/Screening.module.css'
import VideoField from 'components/FreelancerProfile/components/fields/VideoField'
import CompletionBadge from '../components/CompletionBadge'
import { ContainerProps } from './VideoIntroductionContainer'

const VideoIntroduction = memo((props: ContainerProps) => {
  const { video, getCurrentUser } = props
  const [error, setError] = useState(null as string)
  const [isUploading, setUploading] = useState(false)

  return (
    <div>
      <PageWrapper raised style={{ transformOrigin: '25% top' }}>
        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2">
                The Flexhire Verification Process
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                All Flexhire members have the option to apply for our 3 step verification process.
                Verified members will appear as suggested candidates to matching companies and
                be displayed as pre-screened, verified experts when applying to jobs.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3">
                Step 1 - Let's hear from you - Your Video Introduction

                {video?.url && <CompletionBadge />}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Everyone likes to work with good clear communicators
                and hearing you talk about your professional background is one of the best ways to highlight your talents!
                On Flexhire, we know the power of video to help you land a dream job.
                Hiring managers hire significantly faster when they see the person speak versus read a resume.
                As a first step, record or upload a short video introduction for your profile.
                <br />
                <br />
                You can use the teleprompter for guidance, but feel free to be creative!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <VideoField
                required
                editable
                forceVisibility
                meta={{
                  touched: Boolean(error),
                  error,
                }}
                input={{
                  onChange: () => {
                    getCurrentUser()
                    setError(null)
                  },
                  value: video?.id,
                }}
                onUploadStart={() => setUploading(true)}
              />
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={styles['button-container']}>
          <Button
            color="primary"
            onClick={() => {
              if (video?.url) {
                browserHistory.push('/application/references')
              } else {
                setError(isUploading ? 'Please wait for the upload to finish' : 'Required')
              }
            }}
            data-cy="continue"
            style={{ marginRight: '12px', marginBottom: '12px' }}
          >
            Next
          </Button>
        </div>
      </PageWrapper>
    </div>
  )
})

export default VideoIntroduction
