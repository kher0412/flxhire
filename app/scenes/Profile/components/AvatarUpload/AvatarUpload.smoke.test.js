import AvatarUpload from './AvatarUpload'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'


describe('<AvatarUpload />', () => {
  it('mounts without error', () => {
    shallow(<ThemeProvider theme={FlexHireTheme}><AvatarUpload /></ThemeProvider>)
  })
})
