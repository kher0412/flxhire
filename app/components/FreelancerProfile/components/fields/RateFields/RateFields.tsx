import React from 'react'
import { IconButton, DialogTitle, DialogContent, DialogActions, MenuItem, Grid, ListSubheader } from '@material-ui/core'
import { TOTAL_EXPERIENCE } from 'services/freelancer'
import { formatAsCurrency } from 'services/formatting'
import { ResponsiveDialog, Tags, Tag, FocusFadeGroup, MoreButtonMenu } from 'components'
import { Button, SelectField, NumberField } from 'components/themed'
import MediaQuery from 'components/MediaQuery'
import { FormValue } from 'types'
import { ArrowDropDown, Create } from '@material-ui/icons'
import styles from './RateFields.module.css'

interface IRateFieldsProps {
  editable?: boolean
  total_experience: FormValue<number>
  annual_compensation: FormValue<number>
  freelancer_rate: FormValue<number>
  job_types: FormValue<string[]>
  rate?: number
}

interface IRateFieldsState {
  isEditorOpen: boolean
}

export default class RateFields extends React.Component<IRateFieldsProps, IRateFieldsState> {
  state = {
    isEditorOpen: false,
  }

  render() {
    const { editable, total_experience, job_types, freelancer_rate, annual_compensation } = this.props
    const style = {} as React.CSSProperties

    if (editable) {
      style.paddingLeft = 48

      if (
        (job_types.meta.touched && job_types.meta.error) ||
        (freelancer_rate.meta.touched && freelancer_rate.meta.error) ||
        (annual_compensation.meta.touched && annual_compensation.meta.error)
      ) {
        style.paddingBottom = 12
      }
    }

    return (
      <div className={styles.rate}>
        <div className={styles.text}>
          <FocusFadeGroup focused={false}>
            <div style={style} className={styles.wrapper}>
              <Tags>
                {this.renderCompensationSummary()}
                {this.renderExperience()}
              </Tags>
            </div>

            {this.renderEditDialog()}

            <MediaQuery maxWidth={800}>
              {this.renderMobileErrorSummary()}
            </MediaQuery>
          </FocusFadeGroup>
        </div>
      </div>
    )
  }

  renderEditButton() {
    const { editable } = this.props

    return editable && (
      <IconButton onClick={this.handleDialogOpen} data-cy="profile-rate-edit" className={styles.edit}>
        <Create />
      </IconButton>
    )
  }

  renderExperience() {
    // eslint-disable-next-line camelcase
    const { editable, total_experience } = this.props
    const experienceObject = TOTAL_EXPERIENCE.find(x => x.value === total_experience.input.value)

    return (
      <Tag className={styles.tag} data-cy="profile-total-experience-container">
        {experienceObject ? experienceObject.label : '? years'} experience

        {editable && (
          <MoreButtonMenu icon={<ArrowDropDown />} data-cy="profile-total-experience" className={styles.edit}>
            <ListSubheader>
              Years of Experience
            </ListSubheader>

            {TOTAL_EXPERIENCE.map(item => (
              <MenuItem
                value={item.value}
                key={item.value}
                data-cy={`total-experience-${item.value}`}
                onClick={() => total_experience.input.onChange(item.value)}
              >
                {item.label}
              </MenuItem>
            ))}
          </MoreButtonMenu>
        )}

        {(total_experience.meta.touched && total_experience.meta.error) && (
          <div className={styles.errorInline}>
            {total_experience.meta.error}
          </div>
        )}
      </Tag>
    )
  }

  renderCompensationSummary() {
    // eslint-disable-next-line camelcase
    const { job_types, freelancer_rate, rate: rateProp, annual_compensation, editable } = this.props

    // Important Note: we want rates to not show up when editable is off and the user does not receive rate information
    // from the backend. So, we need rate and annualCompensation to evaluate to be "falsy" if they are missing or zero
    const rate = freelancer_rate.input.value || rateProp
    const annualCompensation = annual_compensation.input.value
    const formattedRate = rate ? formatAsCurrency(rate, { currency: 'USD' }) : '?'
    const formattedAnnualCompensation = annualCompensation ? formatAsCurrency(annualCompensation, { withCents: false, currency: 'USD' }) : '?'

    const isFreelance = (job_types.input.value || []).includes('freelance') && (rate || editable)
    const isPermanent = (job_types.input.value || []).includes('permanent') && (annualCompensation || editable)

    const jobTypeError = (job_types.meta.touched && job_types.meta.error) && (
      <div className={styles.errorInline} data-cy="profile-job-type-error">
        {job_types.meta.error}
      </div>
    )

    const rateError = (freelancer_rate.meta.touched && freelancer_rate.meta.error) && (
      <div className={styles.errorInline} data-cy="profile-freelancer-rate-error">
        {freelancer_rate.meta.error}
      </div>
    )

    const compensationError = (annual_compensation.meta.touched && annual_compensation.meta.error) && (
      <div className={styles.errorInline} data-cy="profile-annual-compensation-error">
        {annual_compensation.meta.error}
      </div>
    )

    if (isFreelance && isPermanent) {
      return (
        <React.Fragment>
          <Tag className={styles.tag} data-cy="freelancer-rate">
            Freelance from <strong>{formattedRate}/hr</strong>
            {jobTypeError}
            {rateError}
          </Tag>

          <Tag className={styles.tag} data-cy="freelancer-annual-compensation">
            Permanent from <strong>{formattedAnnualCompensation}/year</strong> {this.renderEditButton()}
            {compensationError}
          </Tag>
        </React.Fragment>
      )
    }

    if (isFreelance) {
      return (
        <Tag className={styles.tag} data-cy="freelancer-rate">
          Freelance from <strong>{formattedRate}/hr</strong> {this.renderEditButton()}
          {jobTypeError}
          {rateError}
        </Tag>
      )
    }

    if (isPermanent) {
      return (
        <Tag className={styles.tag} data-cy="freelancer-annual-compensation">
          Permanent from <strong>{formattedAnnualCompensation}/year</strong> {this.renderEditButton()}
          {jobTypeError}
          {compensationError}
        </Tag>
      )
    }

    if (!editable) return null

    return (
      <Tag className={styles.tag}>
        <MediaQuery maxWidth={600}>
          {isMobile => (
            isMobile ? (
              'Job Type & Compensation'
            ) : (
              'Enter your job type and compensation expectations'
            )
          )}
        </MediaQuery>
        {jobTypeError}
        {this.renderEditButton()}
      </Tag>
    )
  }

  renderMobileErrorSummary() {
    const { job_types, freelancer_rate, annual_compensation, total_experience } = this.props
    const errorMessages = []

    if (job_types.meta.touched && job_types.meta.error) {
      errorMessages.push(job_types.meta.error)
    }

    if (freelancer_rate.meta.touched && freelancer_rate.meta.error) {
      errorMessages.push(freelancer_rate.meta.error)
    }

    if (annual_compensation.meta.touched && annual_compensation.meta.error) {
      errorMessages.push(annual_compensation.meta.error)
    }

    if (total_experience.meta.touched && total_experience.meta.error) {
      errorMessages.push(total_experience.meta.error)
    }

    if (errorMessages.length > 0) {
      return (
        <div className={styles.error} data-cy="profile-rate-errors">
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
    const { job_types, freelancer_rate, annual_compensation } = this.props

    const isFreelance = (job_types.input.value || []).includes('freelance')
    const isPermanent = (job_types.input.value || []).includes('permanent')
    const { isEditorOpen } = this.state

    if (!isEditorOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="sm">
        <DialogTitle>
          Edit rate and job type
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 99999 }} />

          <div style={{ padding: '6px 0' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SelectField
                  value={this.getJobTypeSelectValue()}
                  onChange={this.handlePositionTypeSelectChange}
                  label="Position types"
                  fullWidth
                  data-cy="profile-job-type"
                >
                  <MenuItem value="freelance" data-cy="profile-job-type-freelance">
                    Freelance positions
                  </MenuItem>

                  <MenuItem value="permanent" data-cy="profile-job-type-permanent">
                    Permanent positions
                  </MenuItem>

                  <MenuItem value="both" data-cy="profile-job-type-both">
                    Both permanent or freelance
                  </MenuItem>
                </SelectField>
              </Grid>

              {isFreelance && isPermanent && (
                <Grid item xs={12} md={6} />
              )}

              {isFreelance && (
                <Grid item xs={12} md={6}>
                  <NumberField
                    numDecimals={0}
                    label="Min freelance rate"
                    input={freelancer_rate.input}
                    meta={freelancer_rate.meta}
                    name="freelancer_rate"
                    startAdornment="$"
                    endAdornment="/hour"
                    fullWidth
                  />
                </Grid>
              )}

              {isPermanent && (
                <Grid item xs={12} md={6}>
                  <NumberField
                    numDecimals={0}
                    label="Min permanent compensation"
                    input={annual_compensation.input}
                    meta={annual_compensation.meta}
                    name="annual_compensation"
                    startAdornment="$"
                    endAdornment="/year"
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose} data-cy="profile-rate-close">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isEditorOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditorOpen: false,
    })
  }

  handlePositionTypeSelectChange = (e) => {
    // eslint-disable-next-line camelcase
    const { job_types } = this.props
    const { value } = e.target

    let positionTypes = []

    switch (value) {
      case 'both':
        positionTypes = ['freelance', 'permanent']
        break

      case 'freelance':
        positionTypes = ['freelance']
        break

      case 'permanent':
        positionTypes = ['permanent']
        break
    }

    job_types.input.onChange(positionTypes)
  }

  getJobTypeSelectValue() {
    // eslint-disable-next-line camelcase
    const { job_types } = this.props
    const selectedPositionTypes = job_types.input.value || []

    if (selectedPositionTypes.includes('freelance') && selectedPositionTypes.includes('permanent')) {
      return 'both'
    }

    if (selectedPositionTypes.includes('freelance')) {
      return 'freelance'
    }

    if (selectedPositionTypes.includes('permanent')) {
      return 'permanent'
    }

    return 'unspecified'
  }
}
