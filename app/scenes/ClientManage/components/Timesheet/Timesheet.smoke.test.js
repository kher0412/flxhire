import Timesheet from './Timesheet'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<Timesheet />', () => {
  it('mounts without error', () => {
    const props = {
      timesheet: {
        status: 'pending',
        freelancer_name: 'freelancer name',
        total_to_pay_for_hours_client: 1000,
        timesheet_entries: {
          monday: {hours: 1, description: 'some work on monday'},
          tuesday: {hours: 1, description: 'some work on tuesday'},
          wednesday: {hours: 1, description: 'some work on wednesday'},
          thursday: {hours: 1, description: 'some work on thursday'},
          friday: {hours: 1, description: 'some work on friday'},
        }
      },
      params: {
        id: 1
      },
      reject: fn => fn,
      approve: fn => fn,
      openQueryDialog: fn => fn
    }
    shallow(<ThemeProvider theme={FlexHireTheme}><Timesheet {...props}/></ThemeProvider>)
  })
})
