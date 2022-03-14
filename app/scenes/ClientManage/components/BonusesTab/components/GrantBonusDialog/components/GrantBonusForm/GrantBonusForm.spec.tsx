import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import GrantBonusForm from './GrantBonusFormContainer'

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

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  Contract: () => {
    return {
      id: 'contract-1',
    }
  },
  User: () => {
    return {
      name: 'Steve Rambo',
    }
  },
}

describe('without existing job', () => {
  let env: any
  let submitHandler: (data: any) => any

  beforeEach(() => {
    env = createMockEnvironment()
    submitHandler = cy.stub()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <GrantBonusForm
          onCancel={() => { }}
          submitForm={submitHandler}
        />
      </ComponentTestEnvironment>,
    )
  })

  it('renders fields', () => {
    cy.get('[data-cy=select-contractId]').should('exist')
  })

  describe('validation', () => {
    it('reports missing fields', () => {
      cy.get('[data-cy=submit-bonus]').click()
      cy.get('[data-cy=selectfield-helper-contractId]').should('contain', 'Required')
      cy.get('[data-cy=textfield-helper-clientAmount]').should('contain', 'Required')
    })

    // TODO: properly fill out and test date inputs valudation
  })

  // NOTE: there is no need to test for correct payload from submitting the form
  // it is tested as part of the query that gets sent during submission
})
