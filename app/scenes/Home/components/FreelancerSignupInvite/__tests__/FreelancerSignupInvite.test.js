import React from 'react'
import { shallow } from 'enzyme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import FreelancerSignupInvite from '../FreelancerSignupInvite'
import FlexHireTheme from 'FlexHireTheme'

describe('FreelancerSignupInvite component', () => {
  it('renders correctly', () => {
    const freelancerSignupInvite = shallow(<ThemeProvider theme={FlexHireTheme}><FreelancerSignupInvite /></ThemeProvider>)
    
    expect(freelancerSignupInvite.contains(<FreelancerSignupInvite />)).toBe(true)
    freelancerSignupInvite.find(FreelancerSignupInvite).shallow()      
  })
})
