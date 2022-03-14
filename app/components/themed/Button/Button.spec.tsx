import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import Button from './Button'

it('Button', () => {
  mount(<ComponentTestEnvironment><Button color="primary">Test button</Button></ComponentTestEnvironment>)
  cy.get('button').contains('Test button').click()
})
