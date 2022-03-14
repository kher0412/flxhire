import React from 'react'
import { shallow } from 'enzyme'

import ThemeProvider from '@material-ui/styles/ThemeProvider'

import SignupCTA from './SignupCTA'
import FlexHireTheme from 'FlexHireTheme'


describe('Home component', () => {
  fit('renders correctly', () => {
    const signupCTA = shallow(<ThemeProvider theme={FlexHireTheme}><SignupCTA /></ThemeProvider>)

    expect(signupCTA.contains(<SignupCTA />)).toBe(true)
  })
})
