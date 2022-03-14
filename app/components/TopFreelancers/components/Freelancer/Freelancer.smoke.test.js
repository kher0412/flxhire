import Freelancer from './Freelancer'
import React from 'react'
import { shallow } from 'enzyme'

describe('<Freelancer />', () => {
  it('mounts without error', () => {
    shallow(
      <Freelancer freelancer={{}} />
    )
  })
})
