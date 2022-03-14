import React from 'react'
import { shallow } from 'enzyme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import HowItWorks from '../HowItWorks'
import FlexHireTheme from 'FlexHireTheme'

describe('HowItWorks component', () => {
  it('renders correctly', () => {
    const howItWorks = shallow(<ThemeProvider theme={FlexHireTheme}><HowItWorks /></ThemeProvider>)

    expect(howItWorks.contains(<HowItWorks />)).toBe(true)
  })
})
