import React from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { IJob } from 'types'
import { Address, SelectTimeZone, CountrySelector } from 'components'
import { NumberField, SelectField, TextField, TimezoneRangeField } from 'components/themed'
import { LocationData } from 'services/location'
import { HireMembersFilters } from 'scenes/ClientHire/Hire'
import { graphql, useFragment } from 'react-relay'
import { LocationFields_Job$key } from '__generated__/LocationFields_Job.graphql'

export interface ILocationFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void
  job: LocationFields_Job$key
  disabled?: boolean
}

const LocationFields = (props: ILocationFieldsProps) => {
  const { filterParams = {}, setFilterParam, job: jobProp } = props
  const [distanceOrigin, setDistanceOrigin] = React.useState('')

  const job = useFragment(graphql`
    fragment LocationFields_Job on Job {
      locationLongitude
      locationLatitude
    }
  `, jobProp)

  const handleAddressChange = React.useCallback((event, address: LocationData) => {
    if (address) {
      setFilterParam('distanceOriginLongitude', address.longitude)
      setFilterParam('distanceOriginLatitude', address.latitude)
    } else {
      setFilterParam('distanceOriginLongitude', job?.locationLongitude)
      setFilterParam('distanceOriginLatitude', job?.locationLatitude)
    }
  }, [setFilterParam])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectField
          fullWidth
          label="Show Candidates From"
          value={filterParams.locationType || 'anywhere'}
          onChange={e => setFilterParam('locationType', e.target.value)}
          data-cy="select-show_candidates_from"
        >
          <MenuItem value="anywhere" data-cy="anywhere">
            Anywhere
          </MenuItem>

          <MenuItem value="job_timezone" data-cy="job-timezone">
            Specific timezone
          </MenuItem>

          <MenuItem value="specific_countries" data-cy="specific-countries">
            Specific countries
          </MenuItem>

          <MenuItem value="full_address" data-cy="specific-location">
            Specific location
          </MenuItem>
        </SelectField>
      </Grid>

      {filterParams.locationType === 'full_address' && (
        <React.Fragment>
          <Grid item xs={12}>
            <NumberField
              fullWidth
              name="distance_miles"
              value={filterParams.distanceMiles}
              onChange={value => setFilterParam('distanceMiles', value)}
              label="Max distance"
              endAdornment="miles"
            />
          </Grid>

          <Grid item xs={12}>
            <Address
              name="full_address"
              label="Location Address"
              value={distanceOrigin}
              onChange={value => setDistanceOrigin(value)}
              onSelectLocation={handleAddressChange}
            />
          </Grid>
        </React.Fragment>
      )}

      {filterParams.locationType === 'job_timezone' && (
        <React.Fragment>
          <Grid item xs={12}>
            <SelectTimeZone
              compact
              fullWidth
              input={{
                name: 'job_timezone',
                value: filterParams.timezone,
                onChange: event => setFilterParam('timezone', event.target.value),
              }}
              data-cy="select-job_timezone"
            />
          </Grid>

          <Grid item xs={12}>
            <TimezoneRangeField
              fullWidth
              input={{
                name: 'timezone_range',
                value: filterParams.timezoneRange,
                onChange: value => setFilterParam('timezoneRange', value),
              }}
            />
          </Grid>
        </React.Fragment>
      )}
      {filterParams.locationType === 'specific_countries' && (
        <Grid item xs={12}>
          <CountrySelector
            fullWidth
            label="Countries"
            placeholder="Start typing countries..."
            input={{
              name: 'countries',
              value: filterParams.countries,
              onChange: countries => setFilterParam('countries', countries),
            }}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default LocationFields
