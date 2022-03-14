import React from 'react'
import { isClient } from 'services/user'
import TimesheetFormWrapper from './components/TimesheetFormWrapper'
import Timesheet from './Timesheet'
import { ContainerProps } from './TimesheetWrapperContainer'

export default class TimesheetWrapper extends React.PureComponent<ContainerProps> {
  render() {
    const { user, clientId, editable, timesheet, currency, ...restProps } = this.props

    if (editable) {
      return (
        <Timesheet
          editable
          clientId={clientId}
          currency={currency}
          {...restProps}
        />
      )
    }

    const rate: number = isClient(user) ? (timesheet as any)?.client_rate : timesheet?.freelancer_rate

    return (
      <TimesheetFormWrapper timesheet={timesheet}>
        <Timesheet
          clientId={timesheet?.client_id}
          hourlyRate={rate}
          currency={currency}
          {...restProps}
        />
      </TimesheetFormWrapper>
    )
  }
}
