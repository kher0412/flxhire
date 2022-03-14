import { clients } from '../fixtures/client'

describe('Developer page', () => {
  before(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('create_user', { ...clients[1], allow_api_access: true })
  })

    it('can create and delete api keys', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/developer')
        .get('[data-cy=create]', { timeout: 120000 }).click()
        .get('[data-cy=api-key-value]').should('exist').should('not.contain', 'N/A')
        .get('[data-cy=confirm]').click()
        .get('[data-cy=api-keys]').children().should('have.length', 1)
        .get('[data-cy^=api-key-]').should('exist')
        .get('[data-cy=delete]').click()
        .get('[data-cy=confirm]').click()
        .get('[data-cy^=api-key-]').should('not.exist')
    })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
