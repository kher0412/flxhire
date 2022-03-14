import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { AccountTab_Test_Query } from '__generated__/AccountTab_Test_Query.graphql'
import { resolveAllPendingOperations } from 'services/testing'
import AccountTab from './AccountTab'

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

function AccountTabTest() {
  const data = useLazyLoadQuery<AccountTab_Test_Query>(graphql`
    query AccountTab_Test_Query {
      currentUser {
        ...AccountTab_User
      }
    }
  `, {})

  const user = data?.currentUser

  return (
    <AccountTab user={user} />
  )
}

const resolverForMember = {
  User: () => {
    return {
      firstName: 'Doe',
      lastName: 'John',
      email: 'doe.john@flexhire.com',
      phone: '987654321',
      roles: ['member'],
    }
  },
}

const resolverForClient = {
  User: () => {
    return {
      firstName: 'Doe',
      lastName: 'John',
      email: 'doe.john@flexhire.com',
      phone: '987654321',
      roles: ['client'],
    }
  },
}

describe('for member user', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux>
        <AccountTabTest />
      </ComponentTestEnvironment>,
    )
  })

  it('renders form with correct values', () => {
    cy.then(() => resolveAllPendingOperations(env, resolverForMember))
    cy.get('[data-cy=textfield-input-firstName]').should('have.value', 'Doe')
    cy.get('[data-cy=textfield-input-lastName]').should('have.value', 'John')
    cy.get('[data-cy=textfield-input-email]').should('have.value', 'doe.john@flexhire.com')
    cy.get('[data-cy=textfield-input-phone]').should('have.value', '987654321')
  })

  describe('changing personal information', () => {
    it('sends correct query', () => {
      cy.then(() => resolveAllPendingOperations(env, resolverForMember))
      cy.get('[data-cy=textfield-input-firstName]').clear().type('John')
      cy.get('[data-cy=textfield-input-lastName]').clear().type('Doe')
      cy.get('[data-cy=textfield-input-email]').clear().type('john.doe@flexhire.com')
      cy.get('[data-cy=textfield-input-phone]').clear().type('123456789')
      cy.get('[data-cy=save-changes]').click()
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.firstName').equal('John'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.lastName').equal('Doe'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.email').equal('john.doe@flexhire.com'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.phone').equal('123456789'))
    })
  })

  describe('changing password', () => {
    it('sends correct query', () => {
      cy.then(() => resolveAllPendingOperations(env, resolverForMember))
      cy.get('[data-cy=textfield-input-currentPassword]').type('current')
      cy.get('[data-cy=textfield-input-password]').clear().type('newpass')
      cy.get('[data-cy=textfield-input-confirmPassword]').clear().type('newpass')
      cy.get('[data-cy=save-changes]').click()
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.currentPassword').equal('current'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.password').equal('newpass'))
    })
  })
})

describe('for client user', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux>
        <AccountTabTest />
      </ComponentTestEnvironment>,
    )
  })

  it('renders form with correct values', () => {
    cy.then(() => resolveAllPendingOperations(env, resolverForClient))
    cy.get('[data-cy=textfield-input-firstName]').should('have.value', 'Doe')
    cy.get('[data-cy=textfield-input-lastName]').should('have.value', 'John')
    cy.get('[data-cy=textfield-input-email]').should('have.value', 'doe.john@flexhire.com')
    cy.get('[data-cy=textfield-input-phone]').should('have.value', '987654321')
  })

  describe('changing personal information', () => {
    it('sends correct query', () => {
      cy.then(() => resolveAllPendingOperations(env, resolverForClient))
      cy.get('[data-cy=textfield-input-firstName]').clear().type('John')
      cy.get('[data-cy=textfield-input-lastName]').clear().type('Doe')
      cy.get('[data-cy=textfield-input-email]').clear().type('john.doe@flexhire.com')
      cy.get('[data-cy=textfield-input-phone]').clear().type('123456789')
      cy.get('[data-cy=save-changes]').click()
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.firstName').equal('John'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.lastName').equal('Doe'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.email').equal('john.doe@flexhire.com'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.phone').equal('123456789'))
    })
  })

  describe('changing password', () => {
    it('sends correct query', () => {
      cy.then(() => resolveAllPendingOperations(env, resolverForMember))
      cy.get('[data-cy=textfield-input-currentPassword]').type('current')
      cy.get('[data-cy=textfield-input-password]').clear().type('newpass')
      cy.get('[data-cy=textfield-input-confirmPassword]').clear().type('newpass')
      cy.get('[data-cy=save-changes]').click()
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.currentPassword').equal('current'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.password').equal('newpass'))
    })
  })
})
