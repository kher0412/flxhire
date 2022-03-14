import SampleSkills from './SampleSkills'
import React from 'react'
import { shallow } from 'enzyme'

describe('<SampleSkills />', () => {
  it('mounts without error', () => {
    shallow(
      <SampleSkills getSkills={async () => []} />
    )
  })
})
