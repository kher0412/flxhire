import React from 'react'
import { shallow } from 'enzyme'
import AutoCompleteChipInput from './AutoCompleteChipInput'

describe('<AutoCompleteChipInput />', () => {
  describe('with direct value', () => {
    it('mounts without error', () => {
      shallow(
        <AutoCompleteChipInput
          suggestions={[{ value: 1, name: 'one' }, { value: 2, name: 'two' }]}
          suggestionsFormat={{ text: 'name', value: 'value' }}
          value={[1]}
          onChange={() => { }}
        />,
      )
    })
  })

  describe('as field input', () => {
    it('mounts without error', () => {
      shallow(
        <AutoCompleteChipInput
          suggestions={[{ value: 1, name: 'one' }, { value: 2, name: 'two' }]}
          suggestionsFormat={{ text: 'name', value: 'value' }}
          input={{ value: [1], onChange: () => { } }}
          meta={{ touched: false, error: undefined }}
        />,
      )
    })
  })
})
