import React from 'react'
import { mount } from 'enzyme'
import ExternalLink from './ExternalLink'

describe('<ExternalLink />', () => {
  it('mounts without error', () => {
    mount(<ExternalLink href="www.example.com" />)
  })

  it('always renders absolute external href', () => {
    expect(mount(<ExternalLink href="www.example.com" />).find('a').getElement().props.href).toEqual('http://www.example.com')
  })

  it('click with mouseDown calls onMouseDown', () => {
    const mockMouseDown = jest.fn()
    mount(<ExternalLink href="www.example.com" mouseDown onMouseDown={mockMouseDown} />).find('a').simulate('mousedown') // simulated click does not call it
    expect(mockMouseDown).toHaveBeenCalled()
  })
})
