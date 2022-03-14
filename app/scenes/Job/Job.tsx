import React from 'react'
import Link from 'components/Link'
import { omit } from 'lodash'
import MediaQuery from 'components/MediaQuery'
import { Card } from '@material-ui/core'
import { PageBundlePlaceholder, PagePlaceholder, PageContainer, PageWrapper } from 'components'
import { Button } from 'components/themed'
import { extractQueryParams, buildQueryParams, browserHistory } from 'services/router'
import CreateIcon from '@material-ui/icons/Create'
import CandidatesIcon from '@material-ui/icons/SupervisedUserCircle'
import JobPosting from 'components/JobPosting'
import { isClient, isRecruiter, isRealAdmin, isGuest, isMember } from 'services/user'
import { trackEvent } from 'services/analytics'
import JobApplicationDialog from './components/JobApplicationDialog'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './Job.module.css'
import JobHead from './JobHead'
import { ContainerProps } from './JobContainer'
import FakeApplyDialog from './components/JobApplicationDialog/components/FakeApplyDialog/FakeApplyDialog'

interface IJobState {
  applying: boolean
  applicationDialogClosedByUser: boolean
  fakeDialogeOpen: boolean
}

class Job extends React.Component<ContainerProps, IJobState> {
  state = {
    applying: false,
    applicationDialogClosedByUser: false,
    fakeDialogeOpen: false,
  }

  componentDidMount() {
    if (this.isAutoApplying()) {
      this.openApplyDialog()
    } else {
      this.sendJobView()
    }
  }

  componentDidUpdate(prevProps) {
    const { applying } = this.state
    if ((!prevProps.jobReceived || !extractQueryParams(prevProps.router.asPath).applying) && this.isAutoApplying() && !applying) this.openApplyDialog()
  }

  getJobId() : string | number {
    const { router, job } = this.props
    return job?.slug || job?.id || (router.query.id as string) || (router.query.slugs?.[1] as string)
  }

  renderClientActions() {
    const { user, job } = this.props

    if ((isClient(user) && job?.firm_slug && user.firm?.slug === job?.firm_slug) || isRecruiter(user) || isRealAdmin(user)) {
      const clientActions = (
        <React.Fragment>
          <Button
            muiComponent={Link}
            variant="contained"
            color="primary"
            style={{ background: '#0033cc', marginRight: 12, marginBottom: 12, textDecoration: 'none' }}
            href="/client/hire"
            as={`/client/hire?company=${job.firm_slug}&job=${job.slug}&tab=potential`}
            data-cy="view-candidates"
          >
            <CandidatesIcon style={{ marginRight: 12 }} /> View Candidates
          </Button>

          <MediaQuery minWidth={1401}>
            <br />
          </MediaQuery>

          <Button
            muiComponent={Link}
            style={{ marginBottom: 12, textDecoration: 'none' }}
            href="/client/job/[id]"
            as={`/client/job/${job.slug}`}
            data-cy="edit-job"
          >
            <CreateIcon style={{ marginRight: 12 }} /> Edit job
          </Button>
        </React.Fragment>
      )

      return (
        <React.Fragment>
          <MediaQuery minWidth={1401}>
            <div className={styles.sidebar}>
              {clientActions}
            </div>
          </MediaQuery>

          <MediaQuery maxWidth={1400}>
            <div className={styles.box}>
              {clientActions}
            </div>
          </MediaQuery>
        </React.Fragment>
      )
    }
    return null
  }

  renderContent() {
    const { job, user, error } = this.props
    const freelancerTypes = job?.freelancer_type ? [job.freelancer_type] : []

    return (
      <PageContainer>
        <div className={styles['clear-area']} />
        <div className={styles['clear-area']} />

        <PageWrapper style={{ position: 'relative' }} withoutCard noAnim>
          {error && (
            <PagePlaceholder title={error} />
          )}

          {!error && (
            <React.Fragment>
              <Card raised>
                <JobPosting
                  job={job}
                  managers={[]}
                  skills={[]}
                  freelancerSubtypes={[]}
                  freelancerTypes={freelancerTypes}
                />
                {this.renderClientActions()}
              </Card>

              <Footer
                job={job}
                user={user}
                apply={this.openApplyDialog}
                fakeApply={this.openFakeApplyDialog}
              />
            </React.Fragment>
          )}
        </PageWrapper>
      </PageContainer>
    )
  }

  render() {
    const { user, job, jobReceived, error, apply } = this.props
    const { applying, fakeDialogeOpen } = this.state
    const jobSlug = job?.slug
    const isReady = !error && jobReceived
    const title = jobReceived ? `${job.title} at ${job.company_name}${job.company_name !== 'Flexhire' ? ' - Flexhire' : ''}` : 'Flexhire'
    const autoApplying = this.isAutoApplying()

    if (!jobReceived && !error) {
      return <PageBundlePlaceholder />
    }

    return (
      <div className={styles.container}>
        <JobHead job={job} title={title} jobSlug={jobSlug} />

        {isReady && (applying || autoApplying) && (
          <JobApplicationDialog
            open={applying}
            autoApply={autoApplying}
            job={job}
            jobId={this.getJobId()}
            onClose={this.closeApplyDialog}
            apply={apply}
          />
        )}
        {fakeDialogeOpen && (
          <FakeApplyDialog
            open={fakeDialogeOpen}
            close={this.closeFakeApplyDialog}
          />
        )}

        {!error && job && <Header job={job} user={user} apply={this.openApplyDialog} fakeApply={this.openFakeApplyDialog} isReady={isReady} /> }

        <div className={styles['main-area']}>
          {this.renderContent()}
        </div>
      </div>
    )
  }

  openFakeApplyDialog = () => {
    this.setState({ fakeDialogeOpen: true })
  }

  closeFakeApplyDialog = () => {
    this.setState({ fakeDialogeOpen: false })
  }

  openApplyDialog = () => {
    trackEvent('Job Application Dialog Opened')
    this.setState({ applying: true })
  }

  closeApplyDialog = () => {
    const { router, job, user } = this.props
    const { applying, applicationDialogClosedByUser } = this.state

    // Prevent infinite loop (not sure how it happens)
    if (!applying && applicationDialogClosedByUser) return

    this.setState({ applying: false, applicationDialogClosedByUser: true }, () => {
      const query = extractQueryParams(router.asPath)

      if (query.applying === 'true') {
        let params = buildQueryParams(omit(query, 'applying'))
        if (params) params = `?${params}`

        if (isGuest(user) || isMember(user)) {
          browserHistory.push('/[...slugs]', `/${job.firm_slug}/${job.slug}${params}`, { replace: true, shallow: true })
        }
      }

      trackEvent('Job Application Dialog Closed')
    })
  }

  isAutoApplying = () => {
    const { router, jobReceived } = this.props
    const { applicationDialogClosedByUser } = this.state
    const query = extractQueryParams(router.asPath)
    return jobReceived && query.applying === 'true' && !applicationDialogClosedByUser
  }

  sendJobView = () => {
    const { user, job, apply } = this.props
    if (job?.id && !job?.contract?.status && (isGuest(user) || isMember(user))) {
      apply(job.id, null)
    }
  }
}

export default Job
