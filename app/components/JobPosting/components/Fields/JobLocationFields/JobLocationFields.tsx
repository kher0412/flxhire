import React from 'react'
import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Grow,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Address, SelectTimeZone, CountrySelector, ResponsiveDialog, FocusFadeGroup, MoreButtonCard } from 'components'
import { TimezoneRangeField } from 'components/themed'
import { getCountryName, LocationData } from 'services/location'
import { FormValue } from 'types'
import { Create, Help, LocationOn } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './JobLocationFields.module.css'

const locationTypeOptions = [
  { label: 'Specific location', value: 'full_address' },
  { label: 'Specific timezone', value: 'job_timezone' },
  { label: 'Specific countries', value: 'specific_countries' },
  { label: 'Anywhere', value: 'anywhere' },
]

const TransitionComponent = React.forwardRef<any, any>((props, ref) => (
  <Grow ref={ref} {...props} />
))

export interface IJobLocationFieldsProps {
  editable: boolean
  location_type: FormValue<string>
  job_countries: FormValue<string[]>
  job_timezone: FormValue<number>
  timezone_value: FormValue<number>
  timezone_range: FormValue<number>
  full_address: FormValue<string>
  default_distance: FormValue<number>
  country: FormValue<string>
  region: FormValue<string>
  city: FormValue<string>
  location_latitude: FormValue<number>
  location_longitude: FormValue<number>
}

export interface IJobLocationFieldsState {
  isDialogOpen: boolean
}

// eslint-disable-next-line react/no-multi-comp
export default class JobLocationFields extends React.PureComponent<IJobLocationFieldsProps, IJobLocationFieldsState> {
  state: IJobLocationFieldsState = {
    isDialogOpen: false,
  }

  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={4}>
          <List disablePadding>
            <FocusFadeGroup focused={false}>
              {this.renderListItem()}
            </FocusFadeGroup>
          </List>
        </Grid>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderListItem() {
    // eslint-disable-next-line camelcase
    const { location_type, job_countries, job_timezone, timezone_value, timezone_range, full_address, country, region, city, editable } = this.props

    if (location_type.input.value === 'anywhere' || !location_type.input.value) {
      return (
        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon}>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            className={styles['list-item-text']}
            primary={(
              <div className={styles['primary-text']}>
                Remote/anywhere
              </div>
            )}
            secondary={this.renderSecondaryText('Location')}
          />

          {this.renderEditButton()}
        </ListItem>
      )
    }

    if (location_type.input.value === 'specific_countries') {
      let countriesString = (job_countries.input.value || []).map(getCountryName).join(', ') || ''
      let primaryText: React.ReactNode = countriesString

      if (countriesString.length > 40) {
        primaryText = (
          <React.Fragment>
            {(job_countries.input.value || []).length} Countries

            {!editable && (
              <MoreButtonCard icon={<Help />} className={styles.helpButton}>
                <div className={styles.countriesWrapper}>
                  {countriesString}
                </div>
              </MoreButtonCard>
            )}
          </React.Fragment>
        )
      }

      return (
        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon} title={countriesString}>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            className={styles['list-item-text']}
            primary={(
              <div className={styles['primary-text']} title={countriesString}>
                {primaryText || (<span style={{ opacity: 0.6 }}>None</span>)}
              </div>
            )}
            secondary={this.renderSecondaryText('Countries')}
          />

          {this.renderEditButton()}
        </ListItem>
      )
    }

    if (location_type.input.value === 'job_timezone') {
      return (
        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon}>
            <LocationOn />
          </ListItemIcon>

          {this.renderTimezoneListItemText()}
          {this.renderEditButton()}
        </ListItem>
      )
    }

    if (location_type.input.value === 'full_address') {
      let jobAddress

      if (full_address.input.value) {
        jobAddress = full_address.input.value
      } else {
        const locationParts = [
          country.input.value,
          region.input.value,
          city.input.value,
        ].filter(part => !!part)

        if (locationParts.length > 0) {
          jobAddress = locationParts.join(', ')
        }
      }

      return (
        <ListItem className={styles.item}>
          <ListItemIcon className={styles.icon}>
            <LocationOn />
          </ListItemIcon>

          <ListItemText
            className={styles['list-item-text']}
            primary={(
              <div className={styles['primary-text']}>
                {jobAddress || 'No address specified'}
              </div>
            )}
            secondary={this.renderSecondaryText('Location')}
          />

          {this.renderEditButton()}
        </ListItem>
      )
    }

    return null
  }

  renderTimezoneListItemText() {
    const { timezone_value, timezone_range, job_timezone, editable } = this.props
    const timezoneValue = timezone_value.input.value
    const timezoneRange = timezone_range.input.value

    if (timezoneRange > 0) {
      const timezoneStart = timezoneValue - timezoneRange
      const timezoneEnd = timezoneValue + timezoneRange

      return (
        <ListItemText
          className={styles['list-item-text']}
          primary={(
            <div className={styles['primary-text']}>
              GMT{timezoneStart > 0 ? '+' : ''}{timezoneStart !== 0 && timezoneStart} to GMT{timezoneEnd > 0 ? '+' : ''}{timezoneEnd !== 0 && timezoneEnd}
            </div>
          )}
          secondary={this.renderSecondaryText('Timezone')}
        />
      )
    }

    return (
      <ListItemText
        className={styles['list-item-text']}
        primary={(
          <div className={styles['primary-text']}>
            {!editable && (
              <React.Fragment>
                {job_timezone.input.value}
              </React.Fragment>
            )}

            {editable && (
              <React.Fragment>
                GMT{timezoneValue > 0 ? '+' : ''}{timezoneValue !== 0 && timezoneValue}
              </React.Fragment>
            )}
          </div>
        )}
        secondary={this.renderSecondaryText('Timezone')}
      />
    )
  }

  renderEditButton() {
    const { editable } = this.props

    if (editable) {
      return (
        <ListItemIcon className={styles['edit-button']}>
          <Tooltip title="Edit job location" placement="right">
            <IconButton onClick={this.handleDialogOpen}>
              <Create />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
      )
    }

    return null
  }

  renderDialog() {
    // eslint-disable-next-line camelcase
    const { location_type, default_distance, full_address, job_timezone, timezone_range, job_countries } = this.props
    const { isDialogOpen } = this.state

    if (isDialogOpen) {
      const selectedLocationType = location_type.input.value
      // const containerBounds = this.container.getBoundingClientRect()

      return (
        <ResponsiveDialog
          open
          onClose={this.handleDialogClose}
          TransitionComponent={TransitionComponent as any}
          // TransitionProps={{
          //   style: {
          //     transformOrigin: `${containerBounds.left}px ${containerBounds.top}px`,
          //   },
          // }}
        >
          <DialogTitle>
            Edit job location
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  style={{ width: 9999, maxWidth: '100%' }}
                  value={location_type.input.value || 'anywhere'}
                  onChange={location_type.input.onChange}
                  onBlur={location_type.input.onBlur}
                >
                  {locationTypeOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {selectedLocationType === 'full_address' && (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Address
                      value={full_address.input.value}
                      onChange={full_address.input.onChange}
                      onSelectLocation={this.handleFullAddressChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Max miles from location for candidates"
                      value={default_distance.input.value}
                      onChange={default_distance.input.onChange}
                      onBlur={default_distance.input.onBlur}
                    />
                  </Grid>
                </React.Fragment>
              )}

              {selectedLocationType === 'specific_countries' && (
                <Grid item xs={12}>
                  <CountrySelector
                    input={job_countries.input}
                    meta={job_countries.meta}
                    label="Countries"
                    placeholder="Start typing countries..."
                    fullWidth
                  />
                </Grid>
              )}

              {selectedLocationType === 'job_timezone' && (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <SelectTimeZone
                      fullWidth
                      compact={false}
                      input={job_timezone.input}
                      meta={job_timezone.meta}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TimezoneRangeField
                      fullWidth
                      input={timezone_range.input}
                      meta={timezone_range.meta}
                    />
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDialogClose}>
              Ok
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }

    return null
  }

  renderSecondaryText(secondaryText: React.ReactNode) {
    // eslint-disable-next-line camelcase
    const { location_type, job_countries, job_timezone, full_address, country, region, city } = this.props

    return (
      <React.Fragment>
        {secondaryText}

        <FormErrorHint fieldMeta={location_type.meta} />
        <FormErrorHint fieldMeta={job_countries.meta} />
        <FormErrorHint fieldMeta={job_timezone.meta} />
        <FormErrorHint fieldMeta={full_address.meta} />
        <FormErrorHint fieldMeta={country.meta} />
        <FormErrorHint fieldMeta={region.meta} />
        <FormErrorHint fieldMeta={city.meta} />
      </React.Fragment>
    )
  }

  handleFullAddressChange = (e: React.SyntheticEvent<any>, address: LocationData) => {
    // eslint-disable-next-line camelcase
    const { full_address, region, country, city, location_latitude, location_longitude } = this.props

    e.preventDefault()

    full_address.input.onChange(address.placeName)
    region.input.onChange(address.region)
    country.input.onChange(address.country)
    city.input.onChange(address.city)
    location_latitude.input.onChange(address.latitude)
    location_longitude.input.onChange(address.longitude)
  }

  handleDialogOpen = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
