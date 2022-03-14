import { freelancer } from '../../fixtures/freelancer'

describe('Recovering Password', () => {
  beforeEach(() => cy.logout())

  describe('Forgot Password page', () => {
    it('can be accessed from homepage', () => {
      cy
        .visit('/')
        .menuNavigateTo('guest-navigation-login')
        .get('[data-cy=forgot-password]', { timeout: 60000 }).click()
        .currentURL().should('equal', '/forgot_password')
    })

    it('sends the password recovery email', () => {
      cy
        .visit('/forgot_password')
        .get('[data-cy=textfield-input-email]').clear().type(freelancer.email)
        .get('[data-cy=submit]').click()
        .get('.snackbar-open').should('contain', 'An email has been sent')
    })
  })

  describe('Change Password page', () => {
    it('validates password confirmation', () => {
      cy
        .visit('/change_password')
        .get('[data-cy=textfield-input-password]').clear().type('testtest')
        .get('[data-cy=textfield-input-password_confirmation]').clear().type('testtest_wrong')
        .get('[data-cy=submit]').click()
        .get('[data-cy=textfield-helper-password_confirmation]').should('contain', "Doesn't match password")
    })

    it('gives error message if submit fails', () => {
      cy
        .visit('/change_password')
        .get('[data-cy=textfield-input-password]').clear().type('testtest')
        .get('[data-cy=textfield-input-password_confirmation]').clear().type('testtest')
        .get('[data-cy=submit]').click()
        .get('[data-cy=change-password-server-error]').should('contain', 'Not found')
    })

    it('logs you in after updating password', () => {
      cy
        .callTestAPI('update_user', {
          email: freelancer.email,
          reset_password_token: 'cypresstoken',
        })
        .visit('/change_password?token=cypresstoken')
        .get('[data-cy=textfield-input-password]').clear().type(freelancer.password)
        .get('[data-cy=textfield-input-password_confirmation]').clear().type(freelancer.password)
        .get('[data-cy=submit]').click()
        .get('[data-cy=logged-in-name]').should('contain', freelancer.first_name)
    })
  })
})
