import References from './References'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'


describe('<References />', () => {
  it('mounts without error', () => {
    const props = {
      reference: {
        name: 'VC',
        email: 'vc@example.com',
        status: 'status'
      },
      deleteReference: 1
    }
    shallow(<ThemeProvider theme={FlexHireTheme}><References {...props}/></ThemeProvider>)
  })
})
