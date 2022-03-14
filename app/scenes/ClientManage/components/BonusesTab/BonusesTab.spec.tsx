import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { resolveAllPendingOperations } from 'services/testing'
import BonusesTab from './BonusesTab'

// set up enough redux state for currentUser not to be considered a firmless user
const reduxState: Partial<RootState> = {
  auth: {
    currentUser: {
      firm: {
        name: 'Test',
        slug: 'test',
      } as IFirm,
    } as ICurrentUser,
  } as any,
}

// need a larger viewport for sidebar to show up for filtering (easier)
Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  User: () => {
    return {
      firstName: 'bonus',
      lastName: 'member',
      name: 'bonus member',
    }
  },
  Contract: () => {
    return {
      id: 'contract-1',
      status: 'active',
    }
  },
  Bonus: () => {
    return {
      id: 'bonus-1',
      stage: 'pending',
      totalToPayClient: 200,
    }
  },
  Currency: () => {
    return {
      code: 'EUR',
    }
  },
}

describe('reading', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <BonusesTab />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual data is set in the custom resolver
      cy.get('[data-cy=bonus]').should('have.length', 1)
        .get('[data-cy=bonus]:eq(0)').should('contain', '€200')
        .get('[data-cy=bonus]:eq(0)').should('contain', 'bonus member')
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-name]').click().type('Riccardo Pizzuti')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Riccardo Pizzuti'))
      })
    })

    describe('by stage', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-pending]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('pending'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-approved]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('approved'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-paid]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('paid'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-all]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal(null))
      })
    })
  })
})

describe('granting a bonus', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux={reduxState}>
        <BonusesTab />
      </ComponentTestEnvironment>,
    )

    cy.then(() => resolveAllPendingOperations(env, resolver))
    cy.wait(10)
    cy.then(() => resolveAllPendingOperations(env, resolver))
  })

  it('sends correct mutation', () => {
    cy.get('[data-cy=grant-bonus]').click()
    cy.wait(10)
    cy.then(() => resolveAllPendingOperations(env, resolver))
    cy.get('[data-cy=select-contractId]').click()
    cy.get('[data-cy=select-contractId-contract-1]').click()
    cy.get('[data-cy=textfield-input-clientAmount]').type('200')
    cy.get('[data-cy=checkbox-field-autoApprove]').click()
    cy.get('[data-cy=submit-bonus]').click()
    cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.contractId').equal('contract-1'))
    cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientAmount').equal(200))
    cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoApprove').equal(true))
  })
})

describe('approving a pending bonus', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux={reduxState}>
        <BonusesTab />
      </ComponentTestEnvironment>,
    )

    cy.then(() => resolveAllPendingOperations(env, resolver))
    cy.wait(10)
    cy.then(() => resolveAllPendingOperations(env, resolver))
  })

  it('sends correct mutation', () => {
    cy.get('[data-cy=bonus-row-menu]').first().click()
    cy.get('[data-cy=approve-bonus]').click()
    cy.wait(10)
    cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.bonusId').equal('bonus-1'))
  })
})

describe('deleting a pending bonus', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux={reduxState}>
        <BonusesTab />
      </ComponentTestEnvironment>,
    )

    cy.then(() => resolveAllPendingOperations(env, resolver))
    cy.wait(10)
    cy.then(() => resolveAllPendingOperations(env, resolver))
  })

  it('sends correct mutation', () => {
    cy.get('[data-cy=bonus-row-menu]').first().click()
    cy.get('[data-cy=delete-bonus]').click()
    cy.wait(10)
    cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.bonusId').equal('bonus-1'))
  })
})
