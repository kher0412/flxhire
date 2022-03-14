import Hire from './Hire'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<Hire />', () => {
  it('mounts without error', () => {
    const props = {
      freelancers: [],
      skip: f => f,
      openOtherSkipReasonDialog: f => f,
      freelancersReceived: f => f
    }

    shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <Hire {...props} />
      </ThemeProvider>
    )
  })
})
