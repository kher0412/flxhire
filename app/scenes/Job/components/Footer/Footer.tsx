import React from 'react'
import Link from 'components/Link'
import { Button } from 'components/themed'
import { ICurrentUser, IJob } from 'types'
import { isJobApplication } from 'services/contract'
import { isClient } from 'services/user'
import styles from './Footer.module.css'

export interface IFooterProps {
  job: IJob
  user: ICurrentUser
  apply: (job: IJob, user: ICurrentUser) => void
  fakeApply: () => void
}


export default class Footer extends React.Component<IFooterProps> {
  static defaultProps = {
    job: {},
  }

  render() {
    const { job, user} = this.props
    return (
      <div className={styles.footer}>
        {(isClient(user) ? this.renderFakeApplyButton() : this.renderMainApplyButton())}

        <Link href="/[...slugs]" as={`/${job.firm_slug}`} className={styles.link}>
          <Button color="secondary">
            Browse more jobs from {job.company_name}
          </Button>
        </Link>
      </div>
    )
  }

  renderFakeApplyButton() {
    return (
      <Button
        color="primary"
        className={styles.button}
        onClick={this.props.fakeApply}
        data-cy="apply-for-job-fake"
        style={{ marginRight: 12, marginBottom: 12 }}
      >
        Apply now
      </Button>
    )
  }

  renderMainApplyButton() {
    const { job, user } = this.props

    if (user?.status !== 'pending' && job.contract?.status === 'job_application_sent') {
      return null
    }

    if (job.contract && !isJobApplication(job.contract)) {
      return null
    }

    return (
      <Button
        color="primary"
        className={styles.button}
        onClick={this.handleApplyClick}
        data-cy="apply-for-job"
        style={{ marginRight: 12, marginBottom: 12 }}
      >
        Apply now
      </Button>
    )
  }

  handleApplyClick = () => {
    const { user, job, apply } = this.props
    apply(job, user)
  }
}
