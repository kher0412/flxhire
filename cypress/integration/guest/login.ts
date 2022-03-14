import { freelancer } from '../../fixtures/freelancer'
import { clients } from '../../fixtures/client'

describe('Login', () => {
  beforeEach(() => cy.logout())

  it('can be accessed from homepage', () => {
    cy
      .visit('/')
      .menuNavigateTo('guest-navigation-login')
      .currentURL().should('equal', '/login')
  })

  function fillLoginForm(user) {
    cy
      .get('[data-cy=textfield-input-email]').clear().type(user.email)
      .get('[data-cy=textfield-input-password]').clear().type(user.password)
      .get('[data-cy=login]:not(:disabled)').click()
  }

  function loginAndLogoutWithUI(user) {
    cy.visit('/login')
    // add bs creds to test error message
    fillLoginForm({ ...user, password: 'this-definitely-wont-work' })
    cy.get('[data-cy=login-server-error').should('contain', 'Invalid email or password')
    fillLoginForm(user)
    cy
      .get('[data-cy=logged-in-name').should('contain', user.first_name)
      .currentURL().should('not.be', '/login')
      // now logout
      .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
      .get('body').then((body) => {
        if (body.find('[data-cy=avatar-header-more]').length > 0) {
          return cy.get('[data-cy=avatar-header-more]').click()
        }
      })
      .get('[data-cy=logout]').click()
      .get('.snackbar-open')
      .should('contain', 'You logged out successfully')
  }

  it('allows a freelancer to login and logout', () => {
    loginAndLogoutWithUI(freelancer)
  })

  it('allows a client to login and logout', () => {
    loginAndLogoutWithUI(clients[0])
  })

  it('supports login with redirect', () => {
    const page = '/account/settings'
    cy
      .callTestAPI('update_user', {
        email: freelancer.email,
        status: 'unverified',
      })
      .visit(page)
      .currentURL().should('equal', '/login')
    // Verify that logging in when at /login?url= brings the user to the url
    fillLoginForm(freelancer)
    cy.wait(1000).currentURL().should('equal', page)
    // Verify that going to /login?url= while logged in brings the user to the url
    cy.login(freelancer.email, freelancer.password)
      .visit(`/login?url=${page}`)
      .wait(1000).currentURL().should('equal', page)
  })

  it('can login and logout through Cypress command', () => {
    cy.login(freelancer.email, freelancer.password).visit('/')
    cy.get('[data-cy=logged-in-name').should('contain', freelancer.first_name)
    cy.currentURL().should('not.be', '/login')
    cy.logout()
  })
})
