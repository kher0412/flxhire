import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { useQueryLoader } from 'react-relay'
import { CompanyTab_Query } from '__generated__/CompanyTab_Query.graphql'
import { resolveAllPendingOperations } from 'services/testing'
import { useOnMount } from 'hooks'
import CompanyTab, { CompanyTabQuery } from './CompanyTab'

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

function CompanyTabTest() {
  const [companyTabQuery, loadCompanyTabQuery] = useQueryLoader<CompanyTab_Query>(CompanyTabQuery)

  useOnMount(() => loadCompanyTabQuery({}))

  return (
    <CompanyTab preloadedQuery={companyTabQuery} />
  )
}

describe('as firm admin', () => {
  let env: any
  let resolver = {
    User: () => {
      return {
        firmRole: 'firm_admin',
      }
    },
    Firm: () => {
      return {
        name: 'Flexhire',
        website: 'flexhire.com',
        description: 'FlexhireerihxelF',
      }
    },
  }

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux>
        <CompanyTabTest />
      </ComponentTestEnvironment>,
    )
  })

  describe('initial state', () => {
    it('loads correct values', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').should('have.value', 'Flexhire')
      cy.get('[data-cy=textfield-input-website]').should('have.value', 'flexhire.com')
      cy.get('[data-cy=textarea-description]').should('contain', 'FlexhireerihxelF')
    })

    it('fields are editable', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').should('not.be.disabled')
      cy.get('[data-cy=textfield-input-website]').should('not.be.disabled')
      cy.get('[data-cy=textarea-description]').should('not.be.disabled')
    })
  })

  describe('changing company data', () => {
    it('sends correct query', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').clear().type('Flexhire 2')
      cy.get('[data-cy=textfield-input-website]').clear().type('www.flexhire.com')
      cy.get('[data-cy=textarea-description]').clear().type('xelf')
      cy.get('[data-cy=save-changes]').click()
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.name').equal('Flexhire 2'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.website').equal('www.flexhire.com'))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('xelf'))
    })
  })
})

describe('as firm member', () => {
  let env: any
  let resolver = {
    User: () => {
      return {
        firmRole: 'firm_member',
      }
    },
    Firm: () => {
      return {
        name: 'Flexhire',
        website: 'flexhire.com',
        description: 'FlexhireerihxelF',
      }
    },
  }

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux>
        <CompanyTabTest />
      </ComponentTestEnvironment>,
    )
  })

  describe('initial state', () => {
    it('loads correct values', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').should('have.value', 'Flexhire')
      cy.get('[data-cy=textfield-input-website]').should('have.value', 'flexhire.com')
      cy.get('[data-cy=textarea-description]').should('contain', 'FlexhireerihxelF')
    })

    it('fields are readonly', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').should('be.disabled')
      cy.get('[data-cy=textfield-input-website]').should('be.disabled')
      cy.get('[data-cy=textarea-description]').should('be.disabled')
    })
  })
})
