import TeamMember from './TeamMember'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<TeamMember />', () => {
  it('mounts without error', () => {
    shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <TeamMember />
      </ThemeProvider>
    )
  })
})
