import Home from 'scenes/Home/Home'
import React from 'react'
import { shallow } from 'enzyme'

describe('<Home />', () => {
  it('mounts without error', () => {
    shallow(<Home />)
  })
})
