import ReferenceSubmitted from './ReferenceSubmitted'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import FlexHireTheme from 'FlexHireTheme'
import { shallow  } from 'enzyme'


describe('<ReferenceSubmitted />', () => {
  it('mounts without error', () => {
    shallow(<ThemeProvider theme={FlexHireTheme}><ReferenceSubmitted /></ThemeProvider>)
  })
})
