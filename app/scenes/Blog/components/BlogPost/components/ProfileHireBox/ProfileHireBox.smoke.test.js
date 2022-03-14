import ProfileHireBox from './ProfileHireBox'
import React from 'react'
import { shallow } from 'enzyme'

describe('<ProfileHireBox />', () => {
  it('mounts without error', () => {
    shallow(
      <ProfileHireBox blogPost={{}} />
    )
  })
})
