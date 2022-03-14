import React from 'react'
import { isJobApplication, isUnsentJobApplication } from 'services/contract'
import { Button, InfoMessage } from 'components/themed'
import { PageHeader } from 'components'
import { classList } from 'services/styles'
import { ICurrentUser, IJob } from 'types'
import { browserHistory } from 'services/router'
import { isGuest, isMember, isClient } from 'services/user'
import styles from './Header.module.css'

interface IHeaderProps {
  job: IJob
  user: ICurrentUser
  isReady: boolean
  apply: () => void
  fakeApply: () => void
}

export default class Header extends React.PureComponent<IHeaderProps> {
  render() {
    const { job, user, isReady } = this.props
    const isLightMode = job.company_background_theme === 'light'

    const applicationSent = user?.status === 'pending' || job.contract?.status === 'job_application_sent'
    const moreScreening = job.contract?.requests_status === 'requested' || job.contract?.requests_status === 'started'
    const contractInProgress = job?.contract && !isJobApplication(job.contract) && !isUnsentJobApplication(job.contract)
    const isMemberOrGuest = isMember(user) || isGuest(user)
    const notFromDifferentCompany = !user?.firm?.slug || user?.firm?.slug === job?.firm_slug
    const displayCta = (!applicationSent || moreScreening) && !contractInProgress && (isMemberOrGuest || notFromDifferentCompany)

    return (
      <PageHeader alternative={isLightMode} white={isLightMode} contentStyle={{ position: 'static' }}>
        {isReady && (
          <React.Fragment>
            <div className={styles['header-area-shade-overlay']} />
            <div className={styles['header-area-circle-overlay']} />
          </React.Fragment>
        )}

        <div className={styles['header-area']} data-cy="job-header" style={{ paddingTop: 12 }}>
          <div className={styles['header-area-content']}>
            <div className={styles['logo-container']}>
              <div className={styles['logo-wrapper']}>
                {this.renderCompanyLogo()}
              </div>
            </div>

            <div className={classList(styles['header-pre-title'], isLightMode && styles.alt)}>
              <span className={classList(styles['header-company'], isLightMode && styles.alt)}>{job.company_name}</span> <span>is hiring for</span>
            </div>

            <div className={classList(styles['header-title'], isLightMode && styles.alt)} style={{ fontSize: `${this.getTitleSize(job.title)}px` }}>
              {job.title}
            </div>

            {displayCta && (
              <div className={styles['header-cta']}>
                {isClient(user) ? this.renderFakeApplyButton() : this.renderMainApplyButton()}
              </div>
            )}

            {((applicationSent && !moreScreening) || contractInProgress) && isMember(user) && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <InfoMessage style={{ width: 'fit-content', color: isLightMode ? undefined : 'white' }} data-cy="application-message">
                  Thanks for applying to the position! Your application is currently being reviewed by {job.company_name}
                </InfoMessage>
              </div>
            )}
          </div>
        </div>
      </PageHeader>
    )
  }

  renderFakeApplyButton() {
    return (
      <Button
        fullWidth
        className={styles.button}
        data-cy="apply-for-job-fake"
        onClick={this.props.fakeApply}
      >
        {'Apply Now'}
      </Button>
    )
  }

  renderMainApplyButton() {
    const { job, user, apply } = this.props
    let disabled = false
    let text = 'Apply Now'
    let action = apply

    if (user?.status !== 'pending' && job.contract?.status === 'job_application_sent') {
      text = 'Application Sent'
      disabled = true
      if (job.contract?.requests_status === 'requested' || job.contract?.requests_status === 'started') {
        disabled = false
        text = 'Resume Screening'
        action = () => browserHistory.push('/pre_interview_questions/[id]', `/pre_interview_questions/${job.contract.id}`)
      }
    }
    return (
      <Button
        fullWidth
        disabled={disabled}
        className={`${styles.button} ${disabled ? styles['apply-sent'] : ''}`}
        onClick={action}
        data-cy="apply-for-job"
      >
        {text}
      </Button>
    )
  }

  renderCompanyLogo() {
    const { job } = this.props

    if (job.company_logo_url) {
      return (
        <img
          src={job.company_logo_url}
          className={styles.logo}
          alt={`${job.company_name} logo`}
          style={job.company_background_theme === 'light' ? { boxShadow: '0 0 32px 16px #fff' } : undefined}
        />
      )
    }

    return null
  }

  getTitleSize(title) {
    if (!title) {
      return 48
    }

    if (title.length > 45) {
      return 30
    }

    if (title.length > 35) {
      return 36
    }

    return 48
  }
}
