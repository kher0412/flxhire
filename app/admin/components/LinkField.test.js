import React from 'react';
import { shallow } from 'enzyme';
import LinkField from './LinkField';

describe('LinkField', () => {
  it('mounted component is null', () => {
    const wrapper = shallow(<LinkField source="link" text="Link" />);
    expect(wrapper.html()).toBeFalsy();
  });

  it('component render video', () => {
    const record = {
      link: 'url',
    };

    const wrapper = shallow(<LinkField source="link" record={record} text="Link" />);
    expect(wrapper.html()).toBeTruthy();
  });
});
