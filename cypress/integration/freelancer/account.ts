import { freelancer3, freelancer4, freelancer3Profile, freelancer4Profile } from '../../fixtures/freelancer'
import { freelancerTypes } from '../../fixtures/freelancer_types'
import { skipOnCI } from '../../support/services'

const NEW_FIRST_NAME = `${freelancer3.first_name} Rename`
const NEW_LAST_NAME = `${freelancer3.last_name} Rename`
const NEW_EMAL = `rename.${freelancer3.email}`
const NEW_PHONE = '+393453213212'
const NEW_PASSWORD = '222222'

describe('Freelancer Account', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
  })

  beforeEach(() => {
    cy.logout()
  })

  it('redirects from /member/account/[tab] to /account/[tab]', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('create_user', { ...freelancer4, status: 'unverified' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
      .login(freelancer4.email, freelancer4.password)

      .visit('/member/account/email_settings')
      .currentURL().should('equal', '/account/email_settings')
  })

  it('navigation items redirect properly', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
      .callTestAPI('create_user', freelancer3)
      .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
      .login(freelancer3.email, freelancer3.password)

      .visit('/account')
      .get('[data-cy=account-navigation-paying-you]').first().click()
      .currentURL().should('equal', '/account/paying_you')
      .get('[data-cy=account-navigation-tax-compliance]').first().click()
      .currentURL().should('equal', '/account/tax_compliance')
      .get('[data-cy=account-navigation-email-settings]').first().click()
      .currentURL().should('equal', '/account/email_settings')
      .get('[data-cy=account-navigation-account]').first().click()
      .currentURL().should('equal', '/account/settings')
  })

  it('sets up payoneer')

  it('user can download 1099 PDF', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
      .callTestAPI('create_user', freelancer3)
      .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
      .login(freelancer3.email, freelancer3.password)

      .visit('/account/tax_compliance')
      .get('.cy-radio-us_citizen-0', { timeout: 120000 }).click()
      .get('[data-cy=textfield-input-tax_id]').first().type('012-34-5678')
      .get('[data-cy=textfield-input-address_recipient]').first().type('11 Wall St')
      .get('[data-cy=textfield-input-city_recipient]').first().type('New York')
      .get('[data-cy=textfield-input-state_recipient]').first().type('New York')
      .get('[data-cy=textfield-input-zip]').first().type('10005')
      .get('[data-cy=textfield-input-country_recipient]').first().type('USA')
      .get('[data-cy=textfield-input-phone]').first().type('+1-541-754-3010')
      .get('[data-cy=save]').first().click()
      // .get('[data-cy=save]').first().should('contain', 'Saved')
      .get('[data-cy=download-pdf]').should('exist')
      // .get('[data-cy=download-pdf]').first().click()
      // @TODO Check that file was indeed downloaded
  })

  it('allows freelancer to unsubscribe from subscriptions', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('create_user', { ...freelancer4, status: 'unverified' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
      .login(freelancer4.email, freelancer4.password)

      .visit('/account/email_settings')

      .get('[data-cy=toggle-subscription-freelancer_incomplete]').as('toggle1')
      .invoke('attr', 'data-value').then((val) => {
        cy
          .get('@toggle1').click()
          .get('.snackbar-open').should('contain', 'Subscription updated')
          .get('@toggle1').invoke('attr', 'data-value').should('equal', val === 'true' ? 'false' : 'true')
      })

      .get('[data-cy=toggle-subscription-job_opportunity]').as('toggle')
      .invoke('attr', 'data-value').then((val) => {
        cy
          .get('@toggle').click()

        if (Cypress.env('RUN_ENV') !== 'DOCKER') {
          // When doing a complete headless test run (both locally and shippable) this fails
          // and the snackbar opens only for a split second with no content. I tested:
          // - running this test alone in dashboard
          // - running this spec file in dashboard
          // - running this spec file alone headless
          // these all work. Only a complete test runs makes it fail, thus it's very hard to debug.
          cy
            .get('.snackbar-open').should('contain', 'Subscription updated')
            .get('@toggle').invoke('attr', 'data-value').should('equal', val === 'true' ? 'false' : 'true')
        }
      })
  })

  it('allows deleting own account', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
      .callTestAPI('create_user', freelancer3)
      .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
      .login(freelancer3.email, freelancer3.password)

      .visit('/account')
      .get('[data-cy=logged-in-name]', { timeout: 120000 }).should('contain', freelancer3.first_name)
      .get('[data-cy=delete-account]').click()
      .get('[data-cy=confirm-password-to-delete] input').type(freelancer3.password)
      .get('[data-cy=logged-in-name]', { timeout: 120000 }).should('contain', freelancer3.first_name)
      .get('[data-cy=confirm-deletion]').click()
      .currentURL().should('equal', '/login')
      .get('[data-cy=logged-in-name]', { timeout: 120000 }).should('not.exist')
  })

  it('allows user to unsubscribe while logged out', () => {
    cy
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('create_user', { ...freelancer4, status: 'unverified' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
      .callTestAPI('get_subscriptions', { email: freelancer4.email }).its('body').then((subscriptions) => {
        return cy.visit(`/unsubscribe/${subscriptions[0].token}`)
          .get('[data-cy=info-message]').should('contain', 'You have been unsubscribed')
      })
  })
})
