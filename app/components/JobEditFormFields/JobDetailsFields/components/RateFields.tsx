import React from 'react'
import { Grid } from '@material-ui/core'
import { Fields } from 'redux-form'
import { RateField } from 'components/themed'

export default class RateFields extends React.Component<{}> {
  render() {
    return (
      <Fields
        names={[
          'min_client_rate',
          'client_rate',
          'rate_mode',
        ]}
        component={this.renderFields}
      />
    )
  }

  renderFields = ({ min_client_rate, client_rate, rate_mode }) => {
    // TODO: add typings
    let minClientRate = min_client_rate.input.value
    let maxClientRate = client_rate.input.value
    let errors = [] as string[]

    if (min_client_rate.meta.error) {
      errors.push(min_client_rate.meta.error)
    }

    if (client_rate.meta.error) {
      errors.push(client_rate.meta.error)
    }

    return (
      <Grid item xs={12} md={6}>
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
    )
  }
}
