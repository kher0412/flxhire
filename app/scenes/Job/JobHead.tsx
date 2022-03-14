import { Helmet } from 'react-helmet'
import { hourlyRateToAnnualCompensation } from 'services/job'
import { getBaseURL } from 'services/router'
import { IJob } from 'types'

const createEmploymentTypes = (job: IJob) => {
  if (!Array.isArray(job.availability_type)) return []
  const employmentTypes = []
  if (Array.isArray(job.availability_type)) {
    if (job.availability_type.includes('part_time')) {
      employmentTypes.push('PART_TIME')
    }
    if (job.availability_type.includes('full_time')) {
      employmentTypes.push('FULL_TIME')
    }
  }
  if (Array.isArray(job.availability_type) && Array.isArray(job.position_types) && job.position_types.includes('freelancer')) {
    employmentTypes.push('CONTRACTOR')
  }
  return employmentTypes
}

function getJobPostingSchemaSalary(job: IJob) {
  let minValue: number
  let maxValue: number
  let unitText: 'YEAR' | 'HOUR'
  if (job.position_types.includes('freelancer')) {
    minValue = job.min_freelancer_rate
    maxValue = job.freelancer_rate
    unitText = 'HOUR'
  } else if (job.position_types.includes('permanent')) {
    minValue = hourlyRateToAnnualCompensation(job.min_freelancer_rate)
    maxValue = hourlyRateToAnnualCompensation(job.freelancer_rate)
    unitText = 'YEAR'
  }
  return {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: {
      '@type': 'QuantitativeValue',
      minValue,
      maxValue,
      unitText,
    },
  }
}

function getJobPostingSchema(job: IJob) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company_name,
    },
    datePosted: job.created_at,
    employmentType: createEmploymentTypes(job),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company_name,
      ...(job.company_website && { sameAs: job.company_website }),
      ...((job.company_logo_url || job.company_avatar_url) && { logo: job.company_avatar_url || job.company_logo_url }),
    },
    ...(job.location_type === 'full_address' && {
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: job.full_address,
          addressLocality: job.city,
          addressRegion: job.region,
          addressCountry: job.country,
        },
      },
    }),
    ...(job.location_type !== 'full_address' && { jobLocationType: 'TELECOMMUTE' }),
    baseSalary: getJobPostingSchemaSalary(job),
  }
}

export default function JobHead({ job, title, jobSlug }: { job: IJob, title: string, jobSlug: string }) {
  if (!job) return null
  return (
    <Helmet titleTemplate="%s">
      <title>{title}</title>
      <meta name="description" property="og:description" content={(job.description || '').substring(0, 150)} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`${getBaseURL()}/${job.firm_slug || 'job'}/${jobSlug}`} />
      {job.company_avatar_url && <meta property="og:image" content={job.company_avatar_url} />}
      <script type="application/ld+json">
        {JSON.stringify(getJobPostingSchema(job))}
      </script>
    </Helmet>
  )
}
