import { omit } from 'lodash'
import { referer, freelancer4, freelancer4Profile, freelancer6 } from '../../fixtures/freelancer'
import { clients } from '../../fixtures/client'

describe('Freelancer Signup', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_user', { email: freelancer6.email })
      .callTestAPI('delete_user', { email: freelancer4.email })
      .logout()
  })

  describe('Test validation', () => {
    it('Opens from homepage button', () => {
      cy
        .visit('/')
        .menuNavigateTo('for-talent')
        .currentURL().should('equal', '/talent')
        .get('[data-cy=signup-today]').first().click()
        .currentURL().should('equal', '/signup/member')
    })

    it('Requires fields to be compiled', () => {
      cy
        .visit('/signup/member')
        .get('[data-cy=terms-of-service-error]').should('not.exist')
        .get('[data-cy=submit]').click()
        .get('[data-cy=textfield-helper-email]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-password]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-first_name]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-last_name]').should('contain', 'Required')
        .get('[data-cy="textfield-helper-password_confirmation"]').should('contain', 'Required')
        .get('[data-cy=terms-of-service-error]').should('exist')
    })

    it('Checks that passwords match', () => {
      cy
        .visit('/signup/member')
        .get('[data-cy=agree-to-terms]').click()
        .get('[data-cy=textfield-input-email]').type(freelancer4.email)
        .get('[data-cy=textfield-input-password]').type(freelancer4.password)
        .get('[data-cy=textfield-input-password_confirmation]').type('wrong thing')
        .get('[data-cy=submit]').click()
        .get('[data-cy=textfield-helper-password_confirmation]').should('contain', 'Doesn\'t match password')
    })

    it('Checks if email has already been taken', () => {
      cy
        .callTestAPI('create_user', freelancer4)

        .visit('/signup/member')
        .get('[data-cy=agree-to-terms]').click()
        .get('[data-cy=textfield-input-email]').type(freelancer4.email)
        .get('[data-cy=textfield-input-password]').type(freelancer4.password)
        .get('[data-cy=textfield-input-password_confirmation]').type(freelancer4.password)
        .get('[data-cy=textfield-input-first_name]').type(freelancer6.first_name)
        .get('[data-cy=textfield-input-last_name]').type(freelancer6.last_name)
        .get('[data-cy=submit]').click()
      if (Cypress.env('RUN_ENV') !== 'DOCKER') {
        // Somewhy in Docker the server error is not displayed.
        cy.get('[data-cy=server-error]').should('contain', 'Email has already been taken')
      }
    })

    after(() => {
      cy.callTestAPI('delete_user', { email: freelancer4.email })
    })
  })

  describe('Sign up with different methods', () => {
    it('Signing up without a password and having to set it', () => {
      cy
        .callTestAPI('create_user', { ...freelancer6, password: null, password_confirmation: null, password_setup_required: true })
        .callTestAPI('log_in', { email: freelancer6.email })
        .visit('/signup/member')
        .currentURL().should('equal', '/password_setup')
        .get('[data-cy=textfield-input-password]').type(freelancer6.password)
        .get('[data-cy=textfield-input-password_confirmation]').type(freelancer6.password)
        .get('[data-cy=submit-confirmation-token]').click()
        .get('.snackbar-open').should('contain', 'Password set!')
        .currentURL().should('equal', '/member/dashboard')
    })

    it('Signs up as a new freelancer', () => {
      cy
        .visit('/signup/member')
        .get('[data-cy=agree-to-terms]').click()
        .get('[data-cy=textfield-input-email]').type(freelancer6.email)
        .get('[data-cy=textfield-input-password]').type(freelancer6.password)
        .get('[data-cy=textfield-input-password_confirmation]').type(freelancer6.password)
        .get('[data-cy=textfield-input-first_name]').type(freelancer6.first_name)
        .get('[data-cy=textfield-input-last_name]').type(freelancer6.last_name)
        .get('[data-cy=submit]').click()
        .confirmEmail(freelancer6)
        .currentURL().should('equal', '/profile')
        .wait(3000) // solve DOM element detached
        .get('[data-cy=avatar-header-more]').click()
        .get('[data-cy=logout]').click()
    })

    it('Signs up as a new freelancer with a referral', () => {
      cy
        .callTestAPI('get_freelancer', { email: referer.email })

        .its('body').then(({ profile }) => {
          cy
            .visit(`/signup/member?referer=${profile.slug}`)
            .get('[data-cy=agree-to-terms]').click()
            .get('[data-cy=textfield-input-email]').type(freelancer6.email)
            .get('[data-cy=textfield-input-password]').type(freelancer6.password)
            .get('[data-cy=confirm-password] input').type(freelancer6.password)
            .get('[data-cy=textfield-input-first_name]').type(freelancer6.first_name)
            .get('[data-cy=textfield-input-last_name]').type(freelancer6.last_name)
            .get('[data-cy=submit]').click()
            .confirmEmail(freelancer6)
            .currentURL().should('equal', '/profile')
        })
    })

    it('Signs up as a new freelancer with an offer', () => {
      cy
        .callTestAPI('create_user', clients[1])
        .callTestAPI('create_data', {
          model: 'Contract',
          params: {
            client_id: clients[1].id,
            freelancer_first_name: freelancer4.first_name,
            freelancer_last_name: freelancer4.last_name,
            freelancer_email: freelancer6.email,
            client_rate_cents: 5000,
            invitation_type: 'invitation',
            status: 'offer_made',
          },
        })
        .visit('/signup/member')
        .get('[data-cy=agree-to-terms]').click()
        .get('[data-cy=textfield-input-email]').type(freelancer6.email)
        .get('[data-cy=textfield-input-password]').type(freelancer6.password)
        .get('[data-cy=confirm-password] input').type(freelancer6.password)
        .get('[data-cy=textfield-input-first_name]').type(freelancer6.first_name)
        .get('[data-cy=textfield-input-last_name]').type(freelancer6.last_name)
        .get('[data-cy=submit]').click()
        .confirmEmail(freelancer6)
        .currentURL().should('equal', '/profile')
        // TODO: Check that the video field is not shown, because the user has an invitation contract
        .callTestAPI('update_user', { email: freelancer6.email, status: 'unverified', ...omit(freelancer4, ['id', 'status', 'email']) })
        .callTestAPI('update_profile', { email: freelancer6.email, ...omit(freelancer4Profile, ['id', 'user_id']) })
        // We use / because when visiting it, the frontend must redirect to the right page
        // the frontend will first redirect to /profile/my_profile due to the cached currentUser object
        // then it will do an API call to update it and fix the redirect, going to /member/dashboard
        // This is why we use / and not /member/dashboard directly, to test this logic
        .visit('/')
        .currentURL().should('equal', '/member/dashboard')
        .get('[data-cy=alert-job-offers]').should('contain', 'new job offer')
        .get('[data-cy=job-offers-container]').should('contain', '$45')
    })

    afterEach(() => {
      cy.callTestAPI('delete_user', { email: freelancer6.email })
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
    })
  })
})
