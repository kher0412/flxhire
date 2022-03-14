import React from 'react'
import { getCountryName } from 'services/location'
import { MoreButtonCard } from 'components'
import { graphql, useFragment } from 'react-relay'
import { LocationTypeListItem_Job$key } from '__generated__/LocationTypeListItem_Job.graphql'
import JobInfoItem from './JobInfoItem'
import styles from '../Job.module.css'
import { Help } from '@material-ui/icons'

const LocationTypeListItem = ({ job: jobProp }: { job: LocationTypeListItem_Job$key }) => {
  const job = useFragment(graphql`
    fragment LocationTypeListItem_Job on Job {
      locationType
      jobTimezone
      jobCountries
      fullAddress
    }
  `, jobProp)
  switch (job?.locationType) {
    case 'anywhere':
      return (
        <JobInfoItem
          primary="Remote"
          secondary="Location"
          data-cy="job-location-text"
        />
      )

    case 'job_timezone':
      if (!job.jobTimezone) return null
      return (
        <JobInfoItem
          primary={job.jobTimezone}
          secondary="Timezone"
          data-cy="job-location-text"
        />
      )

    case 'specific_countries': {
      if (!job.jobCountries || job.jobCountries.length === 0) return null

      let countriesString = (job.jobCountries || []).map(getCountryName).sort().join(', ') || ''
      let primaryText: React.ReactNode = countriesString

      if (countriesString.length > 40) {
        primaryText = (
          <React.Fragment>
            {(job.jobCountries || []).length} Countries

            <MoreButtonCard icon={<Help />} className={styles.helpButton}>
              <div className={styles.countriesWrapper}>
                {countriesString}
              </div>
            </MoreButtonCard>
          </React.Fragment>
        )
      }

      return (
        <JobInfoItem
          title={countriesString}
          primary={primaryText}
          secondary="Countries"
          data-cy="job-location-text"
        />
      )
    }

    case 'full_address':
      if (!job.fullAddress) return null
      return (
        <JobInfoItem
          primary={job.fullAddress?.length > 27 ? `${job.fullAddress?.substring(0, 26)}...` : job.fullAddress}
          secondary="Location"
          data-cy="job-location-text"
        />
      )
  }

  return null
}

export default LocationTypeListItem
