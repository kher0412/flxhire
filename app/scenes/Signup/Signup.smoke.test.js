import React from 'react'
import { shallow } from 'enzyme'
import Signup from './Signup'

describe('<Signup />', () => {
  it('mounts without error', () => {
    shallow(
      <Signup
        router={{ query: {}, asPath: '/signup' }}
        getJobData={() => null}
        handleSubmit={() => null}
      />,
    )
  })
})
