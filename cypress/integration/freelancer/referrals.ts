import { freelancer3, freelancer3Profile } from '../../fixtures/freelancer'
import { freelancerTypes } from '../../fixtures/freelancer_types'

describe('Freelancer Referrals', () => {
  beforeEach(() => {
    cy.logout()
  })

  it('user can send referral e-mails', () => {
    cy
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_user', freelancer3)
      .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
      .login(freelancer3.email, freelancer3.password)

      .visit('/referrals')

    // Test copy to clipboard
    // On modern browsers this directly copies to the clipboard, but for others (currently including the test browser)
    // it falls back to a `confirm()` popup. We need to handle the popup or make sure it works the same as in modern browsers.
    // .get('[data-cy=copy-link]').first().click()
    // .get('.snackbar-open').first().should('contain', 'copied to clipboard')

      // Test invitation by e-mail
      .get('[data-cy=input-input-email]').first().type('prison.eric.test@flexhire.com')
      .get('[data-cy=send-invite]').first().click()
      .get('.snackbar-open').first().should('contain', 'Email sent')
      // @TODO check if the e-mail was sent.
  })
})
