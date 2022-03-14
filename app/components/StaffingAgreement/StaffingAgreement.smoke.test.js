import StaffingAgreement from './StaffingAgreement'
import React from 'react'
import { shallow } from 'enzyme'

describe('<StaffingAgreement />', () => {
    it('mounts without error', () => {
        shallow(<StaffingAgreement />)
    })
})
