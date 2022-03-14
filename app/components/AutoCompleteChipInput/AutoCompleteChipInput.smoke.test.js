import AutoCompleteChipInput from './AutoCompleteChipInput'
import React from 'react'
import { shallow } from 'enzyme'

describe('<AutoCompleteChipInput />', () => {
  it('mounts without error', () => {
    shallow(
      <AutoCompleteChipInput
        suggestions={[{ value: 1, name: 'one' }, { value: 2, name: 'two' }]}
        suggestionsFormat={{ text: 'name', value: 'value' }}
        value={[1]}
      />
    )
  })
})
