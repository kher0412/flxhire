import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import AvailabilityOptions from './AvailabilityOptions'
import FlexHireTheme from 'FlexHireTheme'

describe('<AvailabilityOptions />', () => {
  let props
  beforeEach(() => {
    props = {
      input: {
        value: 'working',
      },
      meta: {
        touched: false,
        error: null,
      },
    }
  })

  const mountView = (props) => {
    return shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <AvailabilityOptions {...props} />
      </ThemeProvider>,
    )
  }

  it('mount as working', () => {
    mountView(props)
  })

  it('mount as available_now', () => {
    props.input.value = 'available_now'
    mountView(props)
  })

  it('mount as available_soon', () => {
    props.input.value = 'available_soon'
    mountView(props)
  })

  it('mount as not_available', () => {
    props.input.value = 'not_available'
    mountView(props)
  })
})
