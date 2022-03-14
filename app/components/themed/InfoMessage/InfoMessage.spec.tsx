import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import InfoMessage from './InfoMessage'

it('InfoMessage', () => {
  mount(<ComponentTestEnvironment><InfoMessage>Test message</InfoMessage></ComponentTestEnvironment>)
  cy.get('div').contains('Test message').should('exist')
})
