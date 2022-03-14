import Timesheets from './Timesheets'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<Timesheets />', () => {

  let  props
  beforeEach(() => {
    props = {
      getTimesheets: f => f,
      getTimesheetStats: f => f,
      showTimesheet: f => f,
      deleteTimesheet: f => f,
      timesheetsReceived: true,
      stats: {
        total_pending: 3000,
        total_paid: 1000,
        total_paid_hours: 10,
      },
      timesheets: [
        {
          client_name: 'name1',
          start_date: new Date('2016-01-01'),
          end_date: new Date('2016-01-02'),
          freelancer_rate: 100,
          total_hours: 20,
          freelancer_total: 2000,
          status: 'pending'
        },
        {
          client_name: 'name1',
          start_date: new Date('2016-01-02'),
          end_date: new Date('2016-01-03'),
          freelancer_rate: 100,
          total_hours: 20,
          freelancer_total: 2000,
          status: 'client_query'
        },
        {
          client_name: 'name1',
          start_date: new Date('2016-01-03'),
          end_date: new Date('2016-01-04'),
          freelancer_rate: 100,
          total_hours: 20,
          freelancer_total: 2000,
          status: 'approved'
        },
        {
          client_name: 'name1',
          start_date: new Date('2016-01-04'),
          end_date: new Date('2016-01-05'),
          freelancer_rate: 100,
          total_hours: 20,
          freelancer_total: 2000,
          status: 'reject'
        }
      ]
    }
  })

  const mountView = (props) => {
    return shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <Timesheets {...props} />
      </ThemeProvider>
    )
  }

  it('mount with timesheets - one in each state', () => {
    mountView(props)
  })
})
