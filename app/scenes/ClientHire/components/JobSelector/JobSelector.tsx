import React, { useCallback } from 'react'
import { MoreButtonMenu, MediaQuery, Link } from 'components'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getJobTitleWithStatus } from 'services/job'
import { SelectField, Button } from 'components/themed'
import { canAccessHireAdminTools } from 'services/user'
import { useCurrentUser, useQuickCommit } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { JobSelector_Firm$key } from '__generated__/JobSelector_Firm.graphql'
import { JobSelector_ToggleAutoScreeningMutation } from '__generated__/JobSelector_ToggleAutoScreeningMutation.graphql'
import { IJob } from 'types'
import { AddCircle, Build, Business, CheckBox, CheckBoxOutlineBlank, Create, SupervisedUserCircle, Visibility, VisibilityOff, Tune } from '@material-ui/icons'
import { usePageState } from 'hooks/usePageState'
import styles from './JobSelector.module.css'

interface IJobSelectorProps {
  firm: JobSelector_Firm$key
  title: string
  showAdminTools: boolean
  selectedJobSlug: string
  setSelectedFirmSlug: (slug: string) => void
  setSelectedJob: (id: string) => void
  toggleAdminTools: () => void
}

const JobSelector = (props: IJobSelectorProps) => {
  const { firm: firmProp, setSelectedJob, selectedJobSlug, setSelectedFirmSlug, title, showAdminTools, toggleAdminTools } = props
  const [user] = useCurrentUser()
  const { pageSidebarHidden, setPageSidebarOpen } = usePageState()
  const shouldShowAdminTools = canAccessHireAdminTools(user)

  const firm = useFragment(graphql`
    fragment JobSelector_Firm on Firm {
      selectableJobs: jobs(first: 20) {
        edges {
          node {
            id
            slug
            title
            status
            user {
              firm {
                slug
              }
            }
            autoSendScreeningRequests
            # We spread these fragments and load these fields because they are used by Hire.tsx
            # By spreading/loading them here, we avoid a suspense when we change selected job
            rawId
            ...HireHooks_JobDefaultFilters
            ...Sidebar_Job
            ...Candidates_Job
            ...Applications_Job
          }
        }
      }
      name
    }
  `, firmProp)

  const jobs = firm?.selectableJobs?.edges?.map(e => e.node) || []
  const jobsReceived = Boolean(firm?.selectableJobs?.edges)
  const job = jobs.find(j => j.slug === selectedJobSlug)

  const { execute: commitToggleAutoScreening } = useQuickCommit<JobSelector_ToggleAutoScreeningMutation>(graphql`
    mutation JobSelector_ToggleAutoScreeningMutation($input: UpdateJobScreeningInput!) {
      updateJobScreening(input: $input) {
        job {
          autoSendScreeningRequests
        }
      }
    }
  `)

  const toggleAutoScreening = useCallback(async () => {
    await commitToggleAutoScreening({
      input: {
        slug: job.slug,
      },
    })
  }, [job?.slug, commitToggleAutoScreening])

  return (
    <div>
      <MediaQuery maxWidth={1000}>
        {isSmallScreen => (
          <div style={isSmallScreen ? undefined : { display: 'flex' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <MediaQuery minWidth={660}>
                <span className={styles.label}>
                  {title} for
                </span>
              </MediaQuery>

              <div style={{ width: 260, marginRight: 12 }}>
                <SelectField
                  value={job?.slug || ''}
                  onChange={e => setSelectedJob(e.target.value)}
                  disabled={!jobsReceived}
                  fullWidth
                  data-cy={`select-job_selector${jobsReceived ? '' : '-loading'}`}
                  label="Select position"
                >
                  <MenuItem
                    value={null}
                    data-cy="select-job_selector-all"
                    onClick={() => setSelectedJob(null)}
                  >
                    All Positions
                  </MenuItem>

                  {jobs.map(_job => (
                    <MenuItem
                      key={_job.id}
                      data-cy={`select-job_selector-option-${_job.slug}`}
                      onClick={() => setSelectedJob(_job.slug)}
                      value={_job.slug}
                    >
                      {getJobTitleWithStatus({ status: _job.status as IJob['status'], title: _job.title })}
                    </MenuItem>
                  ))}
                </SelectField>
              </div>
            </div>

            {isSmallScreen && (
              <div style={{ height: 12 }} />
            )}

            {job && (
              <React.Fragment>
                <Link href="/[...slugs]" as={`/${job.user?.firm?.slug || 'job'}/${job.slug}`} className={styles.link}>
                  <Button data-cy="view-job" responsive>
                    <Visibility /> View
                  </Button>
                </Link>

                <Link href="/client/job/[id]" as={`/client/job/${job.slug}`} className={styles.link}>
                  <Button data-cy="edit-job" responsive>
                    <Create /> Edit
                  </Button>
                </Link>

                <Link href="/client/job/[id]" as={`/client/job/${job.slug}?step=screening`} className={styles.link}>
                  <Button data-cy="edit-job-screening" responsive>
                    <SupervisedUserCircle /> Screening
                  </Button>
                </Link>

                {!isSmallScreen && (
                  <Button data-cy="toggle-auto-screening" onClick={toggleAutoScreening}>
                    {job.autoSendScreeningRequests ? <CheckBox /> : <CheckBoxOutlineBlank />} Auto Screening
                  </Button>
                )}
              </React.Fragment>
            )}

            {!job && (
              <Link href="/client/job/add_job/job" className={styles.link}>
                <Button data-cy="new-job" responsive>
                  <AddCircle /> New
                </Button>
              </Link>
            )}

            {pageSidebarHidden && (
              <Button onClick={() => setPageSidebarOpen(true)} style={{ marginLeft: 'auto' }}>
                <Tune /> Filters
              </Button>
            )}

            {shouldShowAdminTools && (
              <MoreButtonMenu
                responsive
                component={Button}
                label="Admin"
                icon={<Build />}
                data-cy="admin-settings"
                style={{ marginLeft: pageSidebarHidden ? 12 : 'auto' }}
              >
                <MenuItem onClick={toggleAdminTools} data-cy="toggle-admin-tools">
                  <ListItemIcon>{showAdminTools ? <VisibilityOff /> : <Visibility />}</ListItemIcon>
                  <ListItemText
                    primary="Toggle Admin Tools"
                    secondary={showAdminTools ? 'Admin tools are ENABLED. Click to turn them off' : 'Admin tools are DISABLED. Click to turn them on'}
                  />
                </MenuItem>
                <MenuItem onClick={() => setSelectedFirmSlug(null)} data-cy="select-firm">
                  <ListItemIcon><Business /></ListItemIcon>
                  <ListItemText
                    primary="Change Company"
                    secondary={`Currently viewing the ${firm?.name} hire pipeline. Click to unset ${firm?.name} and view the hire pipeline for another one`}
                  />
                </MenuItem>
              </MoreButtonMenu>
            )}
          </div>
        )}
      </MediaQuery>
    </div>
  )
}

export default JobSelector
