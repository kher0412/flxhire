import Account from './Account'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'


describe('<Account />', () => {
  it('mounts without error', () => {
    const props = {
      user: {
        profile: {
          availability: 'available_now',
          current: 'available_now'
        }
      },
    }
    shallow(<ThemeProvider theme={FlexHireTheme}><Account {...props}/></ThemeProvider>)
  })
})
