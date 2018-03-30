import React from 'react'
import { shallow } from 'enzyme'
import { HeaderWrapper } from '../../src/components'

test('should render the HeaderWrapper correctly', () => {
    const wrapper = shallow(<HeaderWrapper channelName="general" />)
    expect(wrapper).toMatchSnapshot()
})
