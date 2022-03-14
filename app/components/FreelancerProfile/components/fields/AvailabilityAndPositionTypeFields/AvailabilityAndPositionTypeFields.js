import React from 'react'
import { IconButton, DialogTitle, DialogContent, DialogActions, MenuItem, Grid } from '@material-ui/core'
import moment from 'moment'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import BlockIcon from '@material-ui/icons/Block'
import CreateIcon from '@material-ui/icons/Create'
import { AVAILABILITY_TYPES } from 'services/freelancer'
import { ResponsiveDialog, Tags, Tag } from 'components'
import { Button, DatePicker, SelectField } from 'components/themed'
import AvailabilityOptions from './components/AvailabilityOptions'
import styles from './AvailabilityAndPositionTypeFields.module.css'

export default class AvailabilityAndPositionTypeFields extends React.Component {
  state = {
    isEditMode: false,
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAvailability()}
        {this.renderEditDialog()}
      </React.Fragment>
    )
  }

  renderAvailability() {
    // eslint-disable-next-line camelcase
    const { editable, availability, availability_type } = this.props

    const availabilityTypes = (availability_type.input.value || []).map(type => AVAILABILITY_TYPES.find(t => t.value === type).label)
    const availabilityTypeText = availabilityTypes.length === 1 ? `(${availabilityTypes[0]})` : ''

    const editButton = editable && (
      <IconButton className={styles.editButton} onClick={this.handleDialogOpen} data-cy="profile-availability-edit">
        <CreateIcon />
      </IconButton>
    )

    if (editable && (!availability.input.value || (!Array.isArray(availability_type.input.value) || availability_type.input.value.length === 0))) {
      return (
        <div className={styles['not-available']}>
          <BlockIcon className={styles['availability-icon']} /> Availability {editButton}
          {this.renderTimezone()}
          {this.renderErrors()}
        </div>
      )
    }

    switch (availability.input.value) {
      case 'available_now':
        return (
          <div className={styles['available-now']} data-cy="available-now">
            <CheckCircleIcon className={styles['availability-icon']} /> Available {availabilityTypeText} {editButton}
            {this.renderTimezone()}
            {this.renderErrors()}
          </div>
        )

      case 'available_soon':
        return (
          <div className={styles['available-soon']} data-cy="available-soon">
            <WatchLaterIcon className={styles['availability-icon']} /> Available soon {editButton}
            {this.renderTimezone()}
            {this.renderErrors()}
          </div>
        )

      default:
        return (
          <div className={styles['not-available']} data-cy="not-available">
            <BlockIcon className={styles['availability-icon']} /> Currently unavailable {editButton}
            {this.renderTimezone()}
            {this.renderErrors()}
          </div>
        )
    }
  }

  renderTimezone() {
    const { timezone, editable } = this.props
    if (!timezone || editable) return null
    return (
      <div className={styles.timezone} data-cy="timezone">
        {timezone}
      </div>
    )
  }

  renderErrors() {
    // eslint-disable-next-line camelcase
    const { availability, availability_type, editable } = this.props
    if (!editable) return null

    const errorMessages = []

    if (availability.meta.touched && availability.meta.error) {
      errorMessages.push(availability.meta.error)
    }

    if (availability_type.meta.touched && availability_type.meta.error) {
      errorMessages.push(availability_type.meta.error)
    }

    if (errorMessages.length > 0) {
      return (
        <div className={styles.error}>
          <Tags>
            {errorMessages.map(errMessage => (
              <Tag>
                {errMessage}
              </Tag>
            ))}
          </Tags>
        </div>
      )
    }

    return null
  }

  renderEditDialog() {
    // eslint-disable-next-line camelcase
    const { availability, available_at } = this.props
    const { isEditMode } = this.state

    if (!isEditMode) {
      return null
    }

    let value = available_at.value
    const minValue = moment().toDate()
    if (value < minValue) value = moment().add(1, 'days').toDate()

    return (
      <ResponsiveDialog open maxWidth="sm" onClose={this.handleDialogClose}>
        <DialogTitle>
          Select your availability
        </DialogTitle>

        <DialogContent style={{ overflow: 'hidden' }}>
          <div style={{ width: 99999 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AvailabilityOptions
                input={availability.input}
                meta={availability.meta}
              />
            </Grid>

            {availability.input.value === 'available_soon' && (
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Available on"
                  fullWidth
                  minDate={minValue}
                  input={{
                    ...available_at.input,
                    value,
                  }}
                  meta={available_at.meta}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <SelectField
                value={this.getAvailabilityTypeSelectValue()}
                onChange={this.handleAvailabilityTypeSelectChange}
                fullWidth
                data-cy="profile-availability-type"
                label="Interested in"
              >
                <MenuItem value="full_time" data-cy="availability-type-full_time">
                  Full-time jobs
                </MenuItem>

                <MenuItem value="part_time" data-cy="availability-type-part_time">
                  Part-time jobs
                </MenuItem>

                <MenuItem value="both" data-cy="availability-type-both">
                  Both part-time and full-time jobs
                </MenuItem>
              </SelectField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose} data-cy="profile-availability-close">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isEditMode: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditMode: false,
    })
  }

  getAvailabilityTypeSelectValue() {
    // eslint-disable-next-line camelcase
    const { availability_type } = this.props
    const availabilityType = availability_type.input.value || []

    if (availabilityType.includes('part_time') && availabilityType.includes('full_time')) {
      return 'both'
    }

    if (availabilityType.includes('part_time')) {
      return 'part_time'
    }

    if (availabilityType.includes('full_time')) {
      return 'full_time'
    }

    return 'unspecified'
  }

  handleAvailabilityTypeSelectChange = (e) => {
    // eslint-disable-next-line camelcase
    const { availability_type } = this.props
    const { value } = e.target

    let availabilityType = []

    switch (value) {
      case 'both':
        availabilityType = ['part_time', 'full_time']
        break

      case 'part_time':
        availabilityType = ['part_time']
        break

      case 'full_time':
        availabilityType = ['full_time']
        break
    }

    availability_type.input.onChange(availabilityType)
  }
}
