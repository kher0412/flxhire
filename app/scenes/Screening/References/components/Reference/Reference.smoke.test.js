import Reference from './Reference'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'


describe('<Reference />', () => {
  it('mounts without error', () => {
    const props = {
      reference: {
        name: 'VC',
        email: 'vc@example.com',
        status: 'status'
      }
    }
    shallow(<ThemeProvider theme={FlexHireTheme}><Reference {...props}/></ThemeProvider>)
  })
})
