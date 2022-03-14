import Job from './Job'
import React from 'react'
import { shallow } from 'enzyme'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({
    remove: () => void 0
  })
}))

describe('<Job />', () => {
  it('mounts without error', () => {
    shallow(
      <Job
        job={{ job_skills: [], position_types: [], availability: [] }}
        router={{ query: {}, asPath: '/job/x' }}
        user={{}}
        getJob={() => void 0}
      />
    )
  })
})
