import ApplicationSubmitted from './ApplicationSubmitted'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'


describe('<ApplicationSubmitted />', () => {
  it('mounts without error', () => {
    shallow(<ThemeProvider theme={FlexHireTheme}><ApplicationSubmitted /></ThemeProvider>)
  })
})
