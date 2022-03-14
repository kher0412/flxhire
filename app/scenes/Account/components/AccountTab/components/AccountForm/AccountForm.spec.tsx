import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import AccountForm from './AccountFormContainer'

describe('for member user', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve withSuspense withRedux>
        <AccountForm
          userRoles={['member']}
          userUnconfirmedEmail={undefined}
          initialValues={{}}
          submitting={false}
          onSubmit={() => { }}
        />
      </ComponentTestEnvironment>,
    )
  })

  it('renders fields', () => {
    cy.get('[data-cy=textfield-firstName]').should('exist')
  })

  describe('validation', () => {
    it('reports missing fields', () => {
      cy.get('[data-cy=save-changes]').click()
      cy.get('[data-cy=textfield-helper-firstName]').should('contain', 'Required')
    })
  })
})

describe('for client user', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve withSuspense withRedux>
        <AccountForm
          userRoles={['client']}
          userUnconfirmedEmail={undefined}
          initialValues={{}}
          submitting={false}
          onSubmit={() => { }}
        />
      </ComponentTestEnvironment>,
    )
  })

  it('renders fields', () => {
    cy.get('[data-cy=textfield-firstName]').should('exist')
  })

  describe('validation', () => {
    it('reports missing fields', () => {
      cy.get('[data-cy=save-changes]').click()
      cy.get('[data-cy=textfield-helper-firstName]').should('contain', 'Required')
    })

    it('reports new password mismatch', () => {
      // note: it's important to check password confirmation match here, as the confirmation is not actually sent to the backend
      cy.get('[data-cy=textfield-input-password]').type('newpass')
      cy.get('[data-cy=save-changes]').click()
      cy.get('[data-cy=textfield-helper-password]').should('contain', 'must be the same')
    })
  })
})
