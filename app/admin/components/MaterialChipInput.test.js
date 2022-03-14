import React from 'react'
import MaterialChipInput from './MaterialChipInput'
import { Field } from 'react-final-form'
import { shallow } from 'enzyme'

describe('MaterialChipInput', () => {
  it('should component mount with right props', () => {
    const wrapper = shallow(<MaterialChipInput source="user_skills" input={<input />} />)
    expect(wrapper.find(Field)).toHaveLength(1)
    expect(wrapper.prop('name')).toEqual('user_skills')
  })

  it('should component mount with AutoCompleteChip', () => {
    const wrapper = shallow(<MaterialChipInput source="user_skills" autoComplete input={<input />} />)
    expect(wrapper.find(Field)).toHaveLength(1)
    expect(wrapper.prop('name')).toEqual('user_skills')
    expect(wrapper.prop('autoComplete')).toEqual(true)
  })
})
