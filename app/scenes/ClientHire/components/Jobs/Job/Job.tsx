import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { capitalize } from 'lodash'
import { UserSkillsCollection, ConfirmButton, Link, MoreButtonDialog, JobShare } from 'components'
import { Button } from 'components/themed'
import { browserHistory } from 'services/router'
import { Divider, CardContent, CardHeader, Grid, IconButton, Tooltip, Chip } from '@material-ui/core'
import { getRateText, getAnnualCompensationText, hourlyRateToAnnualCompensation } from 'services/job'
import { graphql, useFragment } from 'react-relay'
import { formatAsDate } from 'services/formatting'
import { Job_Job$key } from '__generated__/Job_Job.graphql'
import { IHireTab } from 'scenes/ClientHire/Hire'
import { Create, Delete, MonetizationOn, MoneyOff, Share, VisibilityOff } from '@material-ui/icons'
import JobInfoItem from './components/JobInfoItem'
import styles from './Job.module.css'
import { ContainerProps } from './JobContainer'
import LocationTypeListItem from './components/LocationTypeListItem'
import JobActions from './components/JobActions'

interface IJobProps extends ContainerProps {
  job: Job_Job$key
  setSelectedJob: (slug: string) => void
  setTab: (tab: IHireTab) => void
}

const Job = (props: IJobProps) => {
  const { job: jobProp, updateJob, setSelectedJob, setTab, deleteJob } = props

  const job = useFragment(graphql`
    fragment Job_Job on Job {
      title
      user {
        firm {
          slug
        }
      }
      slug
      status
      expiresAt
      clientRate {
        currency {
          code
        }
        value
      }
      minClientRate {
        currency {
          code
        }
        value
      }
      freelancerRate {
        currency {
          code
        }
        value
      }
      minFreelancerRate {
        currency {
          code
        }
        value
      }
      autoRenew
      freelancerType {
        name
      }
      jobSkills {
        required
        requiredYears
        groupIndex
        skill {
          rawId
          name
        }
      }
      positionTypes
      projectLengthInMonths
      ...LocationTypeListItem_Job
      ...JobActions_Job
    }
  `, jobProp)

  const expiresAt = formatAsDate(job?.expiresAt)
  const title = job.title || 'Untitled Job'
  const linkMode = job?.user?.firm?.slug && job?.slug && job?.status !== 'closed'

  const editJob = () => browserHistory.push('/client/job/[id]', `/client/job/${job.slug}`)

  const positionTypes = job?.positionTypes?.map(p => capitalize(p === 'freelancer' ? 'freelance' : p)) || []
  const isFreelance = positionTypes?.includes('Freelance')
  const isPerm = positionTypes?.includes('Permanent')
  const annualCompensation = isPerm ? getAnnualCompensationText(hourlyRateToAnnualCompensation(job?.minFreelancerRate?.value), hourlyRateToAnnualCompensation(job?.freelancerRate?.value)) : null
  const rate = isFreelance ? getRateText(job?.minClientRate?.value, job?.clientRate?.value, 'hour') : null
  const jobSkills = job?.jobSkills?.map(j => ({ name: j.skill.name, id: j.skill.rawId, required_years: j.requiredYears, group_index: j.groupIndex, required: j.required }))

  if (!job) return null

  return (
    <div className={styles.card} data-cy="job" data-cy-job-slug={job?.slug}>
      <CardHeader
        title={(
          <React.Fragment>
            {linkMode && (
            <Link
              data-cy="view-job"
              href="/[...slugs]"
              as={`/${job?.user?.firm?.slug}/${job?.slug}`}
              style={{ color: 'rgb(0, 87, 255)' }}
            >
              {title}
            </Link>
            )}
            {!linkMode && title}

            {job?.status === 'draft' && (
              <Chip
                label="Draft"
                icon={<Create style={{ color: '#fff', transform: 'scale(0.8)' }} />}
                style={{ color: '#fff', background: '#2ECB80', marginLeft: 12 }}
              />
            )}

            {job?.status === 'closed' && (
              <Chip
                label="Closed"
                icon={<VisibilityOff style={{ color: '#fff', transform: 'scale(0.8)' }} />}
                style={{ color: '#fff', background: '#2ECB80', marginLeft: 12 }}
              />
            )}
          </React.Fragment>
          )}
        data-cy="job-header"
        className={styles['card-header']}
        action={(
          <React.Fragment>
            <MediaQuery minWidth={701}>
              <ConfirmButton
                icon
                tooltip="Auto Renewal Settings"
                dialogTitle={job?.autoRenew ? 'Disable Auto Renewal' : 'Enable Auto Renewal'}
                dialogMessage={
                    job.autoRenew ?
                      `Are you sure? The Job will automatically expire on ${expiresAt}.` :
                      `Are you sure? Instead of expiring on ${expiresAt}, the Job will be automatically renewed.`
                  }
                onClick={() => updateJob(job?.slug, !job?.autoRenew)}
                data-cy="toggle-job-renewal"
                color={job?.autoRenew ? 'primary' : 'secondary'}
                disabled={!job?.expiresAt || job?.status !== 'opened'}
                style={{ visibility: job?.expiresAt ? undefined : 'hidden' }}
              >
                {job.autoRenew ? <MonetizationOn /> : <MoneyOff />}
              </ConfirmButton>

              <MoreButtonDialog icon={<Share />} dialogTitle="Share job" tooltip="Share job" disabled={job.status !== 'opened'}>
                <JobShare job={job ? { slug: job?.slug, firm_slug: job?.user?.firm?.slug } : null} />
              </MoreButtonDialog>

              <Tooltip title="Edit job">
                <IconButton
                  onClick={editJob}
                  data-cy="edit-job"
                >
                  <Create />
                </IconButton>
              </Tooltip>

              <ConfirmButton
                icon
                tooltip="Close Job"
                dialogTitle="Close Job"
                dialogMessage="Are you sure that you want to close this job posting?"
                onClick={() => deleteJob(job?.slug)}
                disabled={job?.status !== 'opened'}
                data-cy="delete-job"
              >
                <Delete />
              </ConfirmButton>
            </MediaQuery>

            <MediaQuery maxWidth={700}>
              <MoreButtonDialog dialogTitle={job?.title}>
                <div className={styles.mobileActions}>
                  <Button onClick={editJob}>
                    <Create style={{ marginRight: 12 }} /> Edit
                  </Button>

                  <ConfirmButton onClick={() => deleteJob(job?.slug)}>
                    <Delete style={{ marginRight: 12 }} /> Delete
                  </ConfirmButton>

                  <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    {job?.status === 'opened' && (
                    <MoreButtonDialog
                      icon={<Share />}
                      label="Share"
                      dialogTitle="Share job"
                      tooltip="Share job"
                      disabled={job?.status !== 'opened'}
                      component={Button}
                    >
                      <JobShare job={job ? { slug: job?.slug, firm_slug: job?.user?.firm?.slug } : null} />
                    </MoreButtonDialog>
                    )}
                  </div>
                </div>
              </MoreButtonDialog>
            </MediaQuery>
          </React.Fragment>
          )}
      />

      <CardContent>
        <Grid container alignItems="flex-start" justify="center" spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <div className={styles.skills}>
              <UserSkillsCollection userSkills={jobSkills} hideExperience />
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div style={{ padding: '0 7px' }}>
              <Grid container>
                <JobInfoItem
                  primary={job?.freelancerType?.name || 'Unspecified'}
                  secondary="Job Category"
                  data-cy="job-candidate-type-text"
                />
                <JobInfoItem
                  primary={positionTypes.length > 0 ? positionTypes.map(capitalize).join(', ') : 'Unspecified'}
                  secondary="Job Type"
                  data-cy="job-candidate-type-text"
                />
                {rate && (
                  <JobInfoItem
                    primary={rate}
                    secondary="Hourly rate"
                    data-cy="job-hourly-rate-text"
                  />
                )}
                {annualCompensation && (
                  <JobInfoItem
                    primary={annualCompensation}
                    secondary="Annual compensation"
                    data-cy="job-annual-compensation-text"
                  />
                )}
                <LocationTypeListItem job={job} />
                {job?.positionTypes?.includes('freelancer') && (
                  <JobInfoItem
                    primary={`${job?.projectLengthInMonths === 0 ? 'Indefinite' : `${job?.projectLengthInMonths} months`}`}
                    secondary="Job duration"
                    data-cy="job-project-duration-text"
                  />
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider className={styles.divider} />

      <JobActions
        setTab={setTab}
        setSelectedJob={setSelectedJob}
        job={job}
      />
    </div>
  )
}

export default Job
