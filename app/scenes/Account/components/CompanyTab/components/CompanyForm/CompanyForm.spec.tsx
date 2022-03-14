import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { ComponentTestEnvironment } from 'components/testing'
import { resolveAllPendingOperations } from 'services/testing'
import { CompanyForm_Test_Query } from '__generated__/CompanyForm_Test_Query.graphql'
import CompanyForm from './CompanyFormContainer'

function CompanyFormTest() {
  const data = useLazyLoadQuery<CompanyForm_Test_Query>(graphql`
    query CompanyForm_Test_Query {
      currentUser {
        ...CompanyForm_User
      }
    }
  `, {})

  const user = data?.currentUser

  return (
    <CompanyForm user={user} />
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
        <CompanyFormTest />
      </ComponentTestEnvironment>,
    )
  })

  describe('validation', () => {
    it('reports missing fields', () => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.get('[data-cy=textfield-input-name]').clear()
      cy.get('[data-cy=textfield-input-website]').clear()
      cy.get('[data-cy=textarea-description]').clear()
      cy.get('[data-cy=save-changes]').click()
      cy.get('[data-cy=textfield-helper-name]').should('contain', 'Required')
    })
  })
})
