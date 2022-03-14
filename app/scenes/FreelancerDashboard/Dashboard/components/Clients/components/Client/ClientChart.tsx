import React from 'react'
import { ITimesheetForFreelancer } from 'types'
import { TimeWorkedChart } from 'components/Timesheet'

export default class ClientChart extends React.PureComponent<{ timesheets: ITimesheetForFreelancer[] }> {
  state = {
    show: false,
  }

  showTimeoutHandle: number

  componentDidMount() {
    this.showTimeoutHandle = window.setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 1000)
  }

  componentWillUnmount() {
    window.clearTimeout(this.showTimeoutHandle)
  }

  render() {
    const { timesheets } = this.props

    if (this.state.show && timesheets?.length) {
      return (
        <TimeWorkedChart timesheetEntries={timesheets[0].timesheet_entries} />
      )
    }

    return null
  }
}
