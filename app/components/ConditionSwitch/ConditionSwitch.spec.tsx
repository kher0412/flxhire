import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import ConditionSwitch from './ConditionSwitch'
import Condition from '../Condition'

it('renders first matching condition', () => {
  mount(
    <ComponentTestEnvironment>
      <ConditionSwitch>
        <Condition condition>
          <p>true</p>
        </Condition>
        <Condition condition={false}>
          <p>false</p>
        </Condition>
      </ConditionSwitch>
    </ComponentTestEnvironment>,
  )
  cy.get('p')
    .should('have.length', 1)
    .should('contain', 'true')
})
