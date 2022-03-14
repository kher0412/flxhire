import React from 'react'
import { get } from 'lodash'
import { Grid, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getCountryName } from 'services/location'
import { IJob } from 'types'
import { LocationOn } from '@material-ui/icons'

const JobLocation = ({ job }: { job: IJob }) => {
  if (job.location_type === 'anywhere') {
    return (
      <Grid item xs={12} md={4}>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            primary="Remote"
            secondary="Location"
          />
        </ListItem>
      </Grid>
    )
  }

  if (job.location_type === 'specific_countries') {
    return (
      <Grid item xs={12} md={4}>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            primary={get(job, 'job_countries', []).map(getCountryName).sort().join(', ')}
            secondary="Countries"
          />
        </ListItem>
      </Grid>
    )
  }

  if (job.location_type === 'job_timezone') {
    return (
      <Grid item xs={12} md={4}>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            primary={job.job_timezone}
            secondary="Timezone"
          />
        </ListItem>
      </Grid>
    )
  }

  if (job.location_type === 'full_address') {
    let jobAddress

    if (job.full_address) {
      jobAddress = job.full_address
    } else {
      const locationParts = [
        job.country,
        job.region,
        job.city,
      ].filter(part => !!part)

      if (locationParts.length > 0) {
        jobAddress = locationParts.join(', ')
      }
    }

    if (jobAddress) {
      return (
        <Grid item xs={12} md={4}>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>

            <ListItemText
              primary={jobAddress}
              secondary="Location"
            />
          </ListItem>
        </Grid>
      )
    }
  }

  return null
}

export default JobLocation
