import Stepper from './Stepper'
import React from 'react'
import { shallow } from 'enzyme'

describe('<Stepper />', () => {
  it('mounts without error', () => {
    const props = {
      stepNum: 0,
      steps: [
        {path: '/profile/skills', name: 'skills'}
      ]
    }
    shallow(<Stepper {...props} />)
  })
})
