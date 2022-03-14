import React from 'react'
import VideoField from './VideoField'
import { shallow } from 'enzyme'

describe('VideoField', () => {
  it('mounted component is null', () => {
    const wrapper = shallow(<VideoField source="video" />)
    expect(wrapper.html()).toBeFalsy()
  })

  it('component render video', () => {
    const record = {
      video: 'videoId'
    }

    const wrapper = shallow(<VideoField source="video" record={record} />)
    expect(wrapper.html()).toBeTruthy()
  })
})
