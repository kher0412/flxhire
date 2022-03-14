import React from 'react'
import { Collapse, Grid, MenuItem } from '@material-ui/core'
import { Field, Fields } from 'redux-form'
import { InputGroup, InputGroupConnector, SelectField, TextField, TimezoneRangeField } from 'components/themed'
import { SelectTimeZone, CountrySelector, MediaQuery } from 'components'
import FullAddressField from './FullAddressField'

export default class LocationFields extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field
                name="location_type"
                component={SelectField}
                label="Location"
                fullWidth
              >
                <MenuItem value="anywhere" data-cy="select-location_type-anywhere">
                  Remote/anywhere
                </MenuItem>

                <MenuItem value="job_timezone" data-cy="select-location_type-job_timezone">
                  Specific timezone...
                </MenuItem>

                <MenuItem value="specific_countries" data-cy="select-location_type-specific_countries">
                  Specific countries...
                </MenuItem>

                <MenuItem value="full_address" data-cy="select-location_type-full_address">
                  Specific location...
                </MenuItem>
              </Field>
            </Grid>
          </Grid>
        </Grid>

        <Fields
          names={[
            'location_type',
            'job_timezone',
            'job_countries',
            'timezone_value',
            'timezone_range',
            'full_address',
            'country',
            'region',
            'city',
            'location_latitude',
            'location_longitude',
            'default_distance',
          ]}
          component={this.renderLocationSubfields}
        />

      </React.Fragment>
    )
  }

  renderLocationSubfields = ({ location_type: { input: { value: locationType } } }) => {
    switch (locationType) {
      case 'job_timezone':
        return (
          <React.Fragment>
            <MediaQuery minWidth={501}>
              <Grid item xs={12} md={12}>
                <Collapse in appear>
                  <InputGroup>
                    <Field
                      name="job_timezone"
                      component={SelectTimeZone}
                      label="Timezone"
                      fullWidth
                    />

                    <InputGroupConnector>
                      Within
                    </InputGroupConnector>

                    <Field
                      style={{ flexBasis: 144 }}
                      name="timezone_range"
                      component={TimezoneRangeField}
                      fullWidth
                      label=""
                    />
                  </InputGroup>
                </Collapse>
              </Grid>
            </MediaQuery>

            <MediaQuery maxWidth={500}>
              <Grid item xs={12} md={12}>
                <Collapse in appear>
                  <Field
                    name="job_timezone"
                    component={SelectTimeZone}
                    label="Timezone"
                    fullWidth
                  />
                </Collapse>
              </Grid>

              <Grid item xs={12} md={12}>
                <Collapse in appear>
                  <Field
                    name="timezone_range"
                    component={TimezoneRangeField}
                    fullWidth
                    label="Timezone range"
                  />
                </Collapse>
              </Grid>
            </MediaQuery>
          </React.Fragment>
        )

      case 'full_address':
        return (
          <Grid item xs={12} md={12}>
            <Collapse in appear>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Fields
                    names={[
                      'location_type',
                      'job_countries',
                      'job_timezone',
                      'timezone_value',
                      'timezone_range',
                      'full_address',
                      'country',
                      'region',
                      'city',
                      'location_latitude',
                      'location_longitude',
                      'default_distance',
                    ]}
                    label="Address"
                    component={FullAddressField}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="default_distance"
                    component={TextField}
                    label="Max candidate distance"
                    endAdornment="miles"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        )

      case 'specific_countries':
        return (
          <Grid item xs={12} md={12}>
            <Collapse in appear>
              <Field
                name="job_countries"
                component={CountrySelector}
                fullWidth
                label="Countries"
                placeholder="Start typing countries..."
              />
            </Collapse>
          </Grid>
        )

      default:
        return (
          <div />
        )
    }
  }
}
