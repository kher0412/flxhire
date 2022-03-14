import Freelancer from './Freelancer'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<Freelancer />', () => {
  it('mounts without error', () => {
    const props = {
      freelancer: {
        id: 1,
      },
      skillId: 1,
      primaryText: 'text',
      skip: f => f,
      openOtherSkipReasonDialog: f => f
    }

    shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <Freelancer {...props} />
      </ThemeProvider>
    )
  })
})
