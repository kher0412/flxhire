import { useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'components/Link'
import { CardHeader, CardContent } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Tags, Tag, UserSkillsCollection, JobShare } from 'components'
import { getRateText } from 'services/job'
import RateExplanation from 'components/JobPosting/components/RateExplanation'
import { Button } from 'components/themed'
import { IJob } from 'types'
import { buildQueryParams } from 'services/router'
import { useSelector } from 'hooks'
import styles from './Job.module.css'

interface IJobProps {
  job: IJob
}

const Job = ({ job }: IJobProps) => {
  const theme = useTheme()
  const isIframe = useSelector(state => state.common.isIframe)

  const handleRateExplanationClick = useCallback((e) => {
    // Prevent click from triggering card click
    e.stopPropagation()
    e.preventDefault()
  }, [])

  let query = isIframe ? `?${buildQueryParams({ ref: 'iframe' })}` : ''
  let jobDescription = job.description.length > 300 ? `${job.description.substring(0, 299)}...` : job.description

  // fixes missing space around unwrapped paragraphs
  jobDescription = jobDescription?.replace(/\n/g, ' ')?.replace(/\r/g, ' ')

  const isPermanent = job.position_types?.includes('permanent')
  const isFreelance = job.position_types?.includes('freelancer')
  const minRate = job.min_client_rate || job.min_freelancer_rate
  const maxRate = job.client_rate || job.freelancer_rate

  let jobType: string

  if (isPermanent && isFreelance) {
    jobType = 'Permanent and Freelance'
  } else if (isPermanent) {
    jobType = 'Permanent'
  } else if (isFreelance) {
    jobType = 'Freelance'
  }

  const permRateText = getRateText(minRate, maxRate, 'year')?.replace('/year', '/annual')
  const freelanceRateText = getRateText(minRate, maxRate, 'day')

  return (
    <Link className={styles.wrapper} href="/[...slugs]" as={`/${job.firm_slug}/${job.slug}${query}`} style={{ textDecoration: 'none' }}>
      <div className={styles.job} data-cy="job-item" data-cy-job-slug={job.slug}>
        <CardHeader
          className={styles.header}
          title={(
            <span className={styles.title} style={{ color: theme?.palette?.secondary?.main }}>
              {job.title}
            </span>
          )}
          subheader={(
            <Tags className={styles.subheader} dense>
              <Tag>
                {jobType}
              </Tag>

              {isPermanent && permRateText && (
                <Tag>
                  {permRateText}
                </Tag>
              )}

              {isFreelance && freelanceRateText && (
                <Tag>
                  {freelanceRateText}

                  <div
                    style={{ display: 'inline-block', marginTop: -12 }}
                    role="button"
                    onClick={handleRateExplanationClick}
                  >
                    <RateExplanation job={job} />
                  </div>
                </Tag>
              )}
            </Tags>
          )}
          action={(
            <span className={styles['header-actions']}>
              <JobShare job={job} />
            </span>
          )}
        />

        <CardContent className={styles.content}>
          {job.job_skills && job.job_skills.length > 0 && (
          <UserSkillsCollection userSkills={job.job_skills} hideExperience />
          )}

          {job.description && (
          <div className={styles.description}>
            <ReactMarkdown
              source={jobDescription}
              allowedTypes={['root', 'text', 'strong', 'emphasis', 'delete', 'link', 'inlineCode']}
              unwrapDisallowed
            />
          </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <Button
              color="primary"
              muiComponent={Link}
              href="/[...slugs]"
              as={`/${job.firm_slug}/${job.slug}${query}`}
              data-cy="apply"
            >
              View &amp; Apply
            </Button>
          </div>
        </CardContent>
      </div>
    </Link>
  )
}

export default Job
