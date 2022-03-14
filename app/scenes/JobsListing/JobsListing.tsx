import React, { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'components/Link'
import { getBaseURL, extractQueryParams } from 'services/router'
import { Typography, Divider, Collapse } from '@material-ui/core'
import {
  PagePlaceholder,
  PageHeader,
  PageHeaderTitle,
  PageHeaderDivider,
  PageHeaderActions,
  PageContainer,
  PageWrapper,
  PageHeaderText,
  LoadingPage,
  Box,
  ExternalLink,
  Condition,
} from 'components'
import { Button } from 'components/themed'
import { IFirm, IVideo } from 'types'
import { useCurrentUser, useOnMount } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { Create } from '@material-ui/icons'
import Job from './components/Job'
import AlternativeBackgroundButton from './components/AlternativeBackgroundButton/AlternativeBackgroundButton'
import styles from './JobsListing.module.css'
import { ContainerProps } from './JobsListingContainer'
import EmbedWidgetButton from './components/EmbedWidgetButton'
import RecordVideoButton from './components/RecordVideoButton'
import RemoveVideoButton from './components/RemoveVideoButton'
import CompanyIntroduction from './components/CompanyIntroduction'

interface IJobsListingProps extends ContainerProps {
  firm: IFirm
}

const JobsListing = ({ firm: firmProp, getJobs, jobs, jobsReceived, isIframe, router }: IJobsListingProps) => {
  const [user] = useCurrentUser()
  const isUserFirm = user.firm?.id === firmProp.id
  const firm = isUserFirm ? user.firm : firmProp
  const [video, setVideo] = useState(firm?.video)
  const showFirmControls = isUserFirm && !isIframe
  const alternativeHeader = firm.background_theme === 'light'
  const embedShowVideo = extractQueryParams(router.asPath).video === 'true' && !!video
  const embedShowText = extractQueryParams(router.asPath).text === 'true'
  const noLayout = extractQueryParams(router.asPath).layout === 'false' // && embedMode === 'compact'
  const subtitleClasses = alternativeHeader ? [styles.subtitle] : [styles.subtitle, styles['subtitle-not-alternative']]
  const showRecordVideoButton = user?.configuration?.enable_company_videos
  const showRemoveVideoButton = video && showRecordVideoButton
  const isSmallScreen = useMediaQuery('(max-width:800px)')
  const [limitItems, setLimitItems] = useState(isSmallScreen && noLayout)

  const onVideoRecorded = useCallback((v: IVideo) => { setVideo(v) }, [setVideo])
  const onVideoRemoved = useCallback(() => { setVideo(null) }, [setVideo])
  useEffect(() => { if (firm?.video) setVideo(firm?.video) }, [firm?.video])

  useOnMount(() => {
    getJobs(firm.id)
  })

  let title = `Careers at ${firm.name}`

  if (title !== 'Careers at Flexhire') title += ' - Flexhire'

  let description = (firm.description || '').substring(0, 150)

  if (!description) {
    if (jobs.length > 0) {
      description = `${jobs.length} Open Position${jobs.length > 1 ? 's' : ''}`
    } else {
      description = 'No open positions at the moment'
    }
  }

  return (
    <React.Fragment>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${getBaseURL()}/${firm.slug}`} />
        <meta property="og:description" content={description} />
        {(firm.avatar_url || firm.logo_url) && <meta property="og:image" content={firm.logo_url || firm.avatar_url} />}
      </Helmet>

      {!noLayout && (
        <PageHeader alternative={alternativeHeader} compact={jobs.length < 2}>
          <PageHeaderTitle className={styles.title}>
            {firm.logo_url && (
              <div className={styles['logo-container']}>
                <div className={styles['logo-wrapper']}>
                  <img
                    src={firm.logo_url}
                    className={styles.logo}
                    alt={`${firm.name} logo`}
                    style={firm.background_theme === 'light' ? { boxShadow: '0 0 32px 16px #fff' } : undefined}
                  />
                </div>
              </div>
            )}

            Available Jobs at {firm.name}

            <div className={subtitleClasses.join(' ')}>
              {jobsReceived ? (jobs.length || 'No') : '-'} open job posting{jobs.length === 1 ? '' : 's'}
            </div>
          </PageHeaderTitle>

          {(showFirmControls || firm.description) && (
            <PageHeaderDivider />
          )}

          {showFirmControls && (
            <PageHeaderActions alternative={alternativeHeader}>
              <Button
                color="primary"
                muiComponent={Link}
                to="/client/jobs"
                style={{ textDecoration: 'none', marginRight: 12 }}
                data-cy="edit-jobs-listing"
              >
                <Create /> Edit your jobs listing
              </Button>

              <EmbedWidgetButton firmSlug={firm?.slug} firmVideo={video} style={{ marginRight: 12 }} />
              {showRecordVideoButton && <RecordVideoButton firm={firm} onVideoRecorded={onVideoRecorded} style={{ marginRight: 12 }} />}
              {showRemoveVideoButton && <RemoveVideoButton firm={firm} video={video} onVideoRemoved={onVideoRemoved} />}

              <AlternativeBackgroundButton
                firm={firm}
                style={{ marginLeft: 'auto' }}
              />
            </PageHeaderActions>
          )}

          {firm.description && (
            <PageHeaderText>
              <CompanyIntroduction firm={firm} video={video} />
            </PageHeaderText>
          )}
        </PageHeader>
      )}

      {!jobsReceived && (
        <LoadingPage />
      )}

      {jobsReceived && (
        <PageContainer>
          <PageWrapper raised withoutCard={noLayout}>
            {(noLayout && (embedShowVideo || embedShowText)) && (
              <React.Fragment>
                <Box>
                  <Typography variant="body1">
                    <CompanyIntroduction
                      firm={firm}
                      video={video}
                      hideText={!embedShowText}
                      hideVideo={!embedShowVideo}
                    />
                  </Typography>
                </Box>

                <Divider style={{ margin: 0 }} />
              </React.Fragment>
            )}

            {jobs.length === 0 && (
              <PagePlaceholder
                raised
                title="No open positions"
                subtitle={`${firm.name} is not hiring at the moment`}
              />
            )}

            <Condition condition={jobs.length > 0}>
              <div data-cy="jobs-list">
                {jobs.slice(0, Math.min(2, jobs.length)).map(job => (
                  <Job key={job.id} job={job} />
                ))}

                <Condition condition={jobs.length > 2}>
                  <Condition condition={!limitItems}>
                    {jobs.slice(2, jobs.length).map(job => (
                      <Job key={job.id} job={job} />
                    ))}
                  </Condition>
                </Condition>
              </div>

              <Condition condition={limitItems}>
                <Box>
                  <Button color="secondary" fullWidth onClick={() => setLimitItems(false)}>
                    Show More Jobs
                  </Button>
                </Box>
              </Condition>
            </Condition>

            {noLayout && (
              <div className={styles.link}>
                <Typography variant="subtitle2">
                  Powered by <ExternalLink href={process.env.ROOT_URL} label="FlexHire" />
                </Typography>
              </div>
            )}
          </PageWrapper>
        </PageContainer>
      )}
    </React.Fragment>
  )
}

export default JobsListing
