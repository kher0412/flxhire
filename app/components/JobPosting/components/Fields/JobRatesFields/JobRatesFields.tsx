import React from 'react'
import {
  Tooltip,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grow,
  DialogContentText,
  Grid,
  MenuItem,
  GrowProps,
} from '@material-ui/core'
import { ResponsiveDialog, FocusFadeGroup, Tag, Tags } from 'components'
import { getRateText } from 'services/job'
import { FormValue, JobPositionType, IJob, RateMode } from 'types'
import { RateField, SelectField } from 'components/themed'
import { Create } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import RateExplanation from '../../RateExplanation'
import styles from './JobRatesFields.module.css'

const TransitionComponent = React.forwardRef((props: GrowProps, ref) => <Grow ref={ref} {...props} />)

interface IJobRatesProps {
  position_types: FormValue<JobPositionType[]>
  client_rate: FormValue<number>
  min_client_rate: FormValue<number>
  freelancer_rate: FormValue<number>
  min_freelancer_rate: FormValue<number>
  rate_mode: FormValue<RateMode>
  editable: boolean
  job: IJob
}

interface IJobRatesState {
  isDialogOpen: boolean
}

// eslint-disable-next-line react/no-multi-comp
export default class JobRatesFields extends React.PureComponent<IJobRatesProps, IJobRatesState> {
  state = {
    isDialogOpen: false,
  }

  container: HTMLDivElement

  render() {
    // eslint-disable-next-line camelcase
    const {
      position_types,
      client_rate,
      min_client_rate,
      freelancer_rate,
      min_freelancer_rate,
      editable,
    } = this.props

    if (!editable) {
      const minRate = min_client_rate.input.value || min_freelancer_rate.input.value
      const maxRate = client_rate.input.value || freelancer_rate.input.value

      if (!position_types.input.value?.length) return null
      if (!maxRate && !minRate) return null
    }

    return (
      <React.Fragment>
        <FocusFadeGroup focused={false}>
          <div className={styles.container} ref={div => this.container = div}>
            {this.renderCompensationSummary()}

            {editable && (
              <Tooltip title="Edit job rates and compensation" placement="bottom">
                <IconButton onClick={this.handleDialogOpen} className={styles['icon-button']} data-cy="job-job_rates-open">
                  <Create />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <FormErrorHint
            message={[
              position_types.meta.touched && position_types.meta.error,
              client_rate.meta.touched && client_rate.meta.error,
              min_client_rate.meta.touched && min_client_rate.meta.error,
            ].filter(err => err).join(' ')}
          />
        </FocusFadeGroup>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderCompensationSummary() {
    // eslint-disable-next-line camelcase
    const {
      position_types,
      editable,
      job,
      client_rate,
      min_client_rate,
      freelancer_rate,
      min_freelancer_rate,
    } = this.props

    if (position_types.input.value) {
      const isPermanent = position_types.input.value.includes('permanent')
      const isFreelance = position_types.input.value.includes('freelancer')
      const minRate = min_client_rate.input.value || min_freelancer_rate.input.value
      const maxRate = client_rate.input.value || freelancer_rate.input.value

      return (
        <React.Fragment>
          <div className={styles.rates}>
            {isFreelance && (
              <div className={styles['rate-part']}>
                <div>
                  <div>
                    <Tags dense>
                      <Tag>
                        {getRateText(minRate, maxRate, 'hour', !editable)}
                      </Tag>

                      <Tag>
                        Freelance
                      </Tag>
                    </Tags>
                  </div>

                  <div className={styles.hint}>
                    <Tags dense>
                      <Tag>
                        {getRateText(minRate, maxRate, 'day')}
                      </Tag>

                      {!isPermanent && (
                        <Tag>
                          {getRateText(minRate, maxRate, 'year')}
                        </Tag>
                      )}
                    </Tags>
                  </div>
                </div>

                {(!editable && job && !isPermanent) && (
                  <div>
                    <RateExplanation job={job} style={{ marginTop: -12, marginBottom: -12, marginRight: -12 }} />
                  </div>
                )}
              </div>
            )}

            {isPermanent && (
              <div className={styles['rate-part']}>
                <div>
                  <div>
                    <Tags dense>
                      <Tag>
                        {getRateText(minRate, maxRate, 'year')}
                      </Tag>

                      <Tag>
                        Permanent
                      </Tag>
                    </Tags>
                  </div>

                  <div className={styles.hint}>
                    <Tags dense>
                      <Tag>
                        {getRateText(minRate, maxRate, 'month')}
                      </Tag>
                    </Tags>
                  </div>
                </div>

                {(!editable && job) && (
                  <div>
                    <RateExplanation job={job} style={{ marginTop: -12, marginBottom: -12, marginRight: -12 }} />
                  </div>
                )}
              </div>
            )}
          </div>
        </React.Fragment>
      )
    }

    if (editable) {
      return (
        <span className={styles.placeholder}>
          Select the position type
        </span>
      )
    }

    return null
  }

  renderDialog() {
    // eslint-disable-next-line camelcase
    const { position_types, client_rate, min_client_rate, rate_mode } = this.props
    const { isDialogOpen } = this.state

    if (isDialogOpen) {
      const containerBounds = this.container.getBoundingClientRect()
      const selectedPositionTypes = position_types.input.value || []
      const minClientRate = min_client_rate.input.value
      const maxClientRate = client_rate.input.value
      const errors = [] as string[]

      if (min_client_rate.meta.error) {
        errors.push(min_client_rate.meta.error)
      }

      if (client_rate.meta.error) {
        errors.push(client_rate.meta.error)
      }

      return (
        <ResponsiveDialog
          open
          onClose={this.handleDialogClose}
          TransitionComponent={TransitionComponent as any}
          TransitionProps={{
            style: {
              transformOrigin: `${containerBounds.left}px ${containerBounds.top}px`,
            },
          }}
        >
          <DialogTitle>
            Edit job rates and compensation
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SelectField
                  value={this.getPositionTypeSelectValue()}
                  onChange={this.handlePositionTypeSelectChange}
                  data-cy="job-job_positions-select"
                  fullWidth
                >
                  <MenuItem value="unspecified" disabled>
                    Position type
                  </MenuItem>

                  <MenuItem value="permanent" data-cy="job-job_positions-select-permanent">
                    Permanent position
                  </MenuItem>

                  <MenuItem value="freelancer" data-cy="job-job_positions-select-freelance">
                    Freelance position
                  </MenuItem>

                  <MenuItem value="both" data-cy="job-job_positions-select-both">
                    Both permanent or freelance
                  </MenuItem>
                </SelectField>
              </Grid>

              {(selectedPositionTypes.length > 0) && (
                <Grid item xs={12}>
                  <RateField
                    label="Rate range"
                    minHourlyRate={minClientRate}
                    maxHourlyRate={maxClientRate}
                    onMinHourlyRateChange={min_client_rate.input.onChange}
                    onMaxHourlyRateChange={client_rate.input.onChange}
                    rateMode={rate_mode.input.value}
                    onRateModeChange={rate_mode.input.onChange}
                    errorText={errors.join(' - ')}
                  />
                </Grid>
              )}
            </Grid>

            <DialogContentText className={styles.text}>
              For permanent positions, specify the range of annual compensation you are willing to offer.
              For freelance positions, specify the range of hourly rate you are willing to offer.
              These settings will also affect your initial filter settings when browsing for candidates on FlexHire.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDialogClose} data-cy="job-job_rates-close">
              Ok
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }

    return null
  }

  getPositionTypeSelectValue() {
    // eslint-disable-next-line camelcase
    const { position_types } = this.props
    const selectedPositionTypes = position_types.input.value || []

    if (selectedPositionTypes.includes('freelancer') && selectedPositionTypes.includes('permanent')) {
      return 'both'
    }

    if (selectedPositionTypes.includes('freelancer')) {
      return 'freelancer'
    }

    if (selectedPositionTypes.includes('permanent')) {
      return 'permanent'
    }

    return 'unspecified'
  }

  handlePositionTypeSelectChange = (e) => {
    // eslint-disable-next-line camelcase
    const { position_types } = this.props
    const { value } = e.target

    let positionTypes = []

    switch (value) {
      case 'both':
        positionTypes = ['freelancer', 'permanent']
        break

      case 'freelancer':
        positionTypes = ['freelancer']
        break

      case 'permanent':
        positionTypes = ['permanent']
        break
    }

    position_types.input.onChange(positionTypes)
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
