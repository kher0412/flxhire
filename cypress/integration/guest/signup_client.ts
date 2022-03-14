/* eslint-disable indent */
import { billing_plans } from '../../fixtures/billing_plans'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { stripeCards } from '../../fixtures/payment_methods'

const email = 'new.client@test.com'

describe('Client Signup', () => {
  function typeClientInfo() {
    return cy
      .get('[data-cy=textfield-input-email]').type(email)
      .get('[data-cy=textfield-input-password]').type(clients[2].password)
      .get('[data-cy=textfield-input-password_confirmation]').type(clients[2].password)

      .get('[data-cy=textfield-input-first_name]').type(clients[2].first_name)
      .get('[data-cy=textfield-input-last_name]').type(clients[2].last_name)
      .get('[data-cy=textfield-input-phone]').type(clients[2].phone)
      .get('[data-cy=textfield-input-companyName]').type(clients[2].company_name)
      .get('[data-cy=agree-to-terms]').click()
  }

  beforeEach(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { email } })
  })

  describe('without billing plans', () => {
    before(() => {
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[1].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[2].id }, method: 'delete_all' })
    })

    it('Sign up as a new client', () => {
      cy
        .visit('/signup/client')
      typeClientInfo()
        .get('[data-cy=submit]').click()
        .get('[data-cy=logged-in-name]', { timeout: 5000 }).should('contain', clients[2].first_name)
        .confirmEmail({ email })
        .currentURL().should('equal', '/client/dashboard')
    })

    it('signup as a new client by posting a job', () => {
      cy
        .visit('/')
        .get('[data-cy=post-a-job]').click()
        .get('[data-cy=tile-technology]').click()
        .get('[data-cy=tile-frontend]').click()
        .get('[data-cy=view-sample-experts]').click()
        .currentURL().should('equal', '/candidates_preview/technology/frontend')
        .get('[data-cy=post-a-job]').click()

        // Account registration
        .currentURL().should('equal', '/signup/client')
      typeClientInfo()
        .get('[data-cy=submit]').click()

        .currentURL().should('equal', '/confirm_email')
        .confirmEmail({ email })
        .wait(2000)

        // Company introduction
        .get('[data-cy=textfield-input-name]', { timeout: 60000 }).type(clients[2].company_name)
        .get('[data-cy=textfield-input-website]').type(clients[2].company_website)
        .get('[data-cy=textarea-description]:last').type('My company description')
        .get('[data-cy=submit-company]').click()
        .wait(100) // avoid element detached on CI
        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Company details saved')

        // Job details
        .fillSimpleJobForm(jobs[1])

        .get('[data-cy=job-continue]').click() // sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(15000)
        .get('[data-cy=job-continue]').click() // screening
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(15000)
        .get('[data-cy=job-continue]').click() // review
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')

        .get('[data-cy=publish-changes]', { timeout: 120000 }).should('not.be.disabled').click()

        .currentURL().should('match', /^\/client\/hire/)
    })

    it('signup as a new client from timesheet management page', () => {
      cy
        .visit('/')
        .menuNavigateTo('guest-navigation-for-companies')
        .currentURL().should('equal', '/companies')
        .get('[data-cy=signup-timesheets]').first().click()
        .currentURL().should('equal', '/flexmanage')
      typeClientInfo()
        .get('[data-cy=submit]').click()
        .confirmEmail({ email })
        .get('[data-cy=logged-in-name]', { timeout: 5000 }).should('contain', clients[2].first_name)
        .currentURL().should('equal', '/client/invitation_team')
    })
  })

  describe('with billing plans', () => {
    before(() => {
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[1].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[2].id }, method: 'delete_all' })
      cy.callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[0] })
      cy.callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[1] })
      cy.callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[2] })
      cy.callTestAPI('delete_data', { model: 'User', params: { email } })
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { account_id: stripeCards[0].account_id } })
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[2].id } })
    })

    it('Sign up as a new client', () => {
      cy
        .visit('/signup/client')
      typeClientInfo()
        .get('[data-cy=submit]').click()
        .get('[data-cy=logged-in-name]', { timeout: 5000 }).should('contain', clients[2].first_name)
        .confirmEmail({ email })
        .currentURL().should('equal', '/client/dashboard')
    })

    it('signup as a new client by posting a job', () => {
      cy
        .visit('/')
        .get('[data-cy=post-a-job]').click()
        .get('[data-cy=tile-technology]').click()
        .get('[data-cy=tile-frontend]').click()
        .get('[data-cy=view-sample-experts]').click()
        .currentURL().should('equal', '/candidates_preview/technology/frontend')
        .get('[data-cy=post-a-job]').click()

        // Account registration
        .currentURL().should('equal', '/signup/client')
      typeClientInfo()
        .get('[data-cy=submit]').click()

        .currentURL().should('equal', '/confirm_email')
        .confirmEmail({ email })
        .wait(2000)

        // Company introduction
        .get('[data-cy=textfield-input-name]', { timeout: 60000 }).type(clients[2].company_name)
        .get('[data-cy=textfield-input-website]').type(clients[2].company_website)
        .get('[data-cy=textarea-description]:last').type('My company description')
        .get('[data-cy=submit-company]').click()
        .wait(100) // avoid element detached on CI
        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Company details saved')

        // Job details
        .fillSimpleJobForm(jobs[1])

        .get('[data-cy=job-continue]').click() // sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(10000)
        .get('[data-cy=job-continue]').click() // screening
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(10000)
        .get('[data-cy=job-continue]').click() // review
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')

        .get(`[data-cy=billing-plan-${billing_plans[1].id}] [data-cy=choose-plan]`).click()
        .get('[data-cy=publish-changes]').should('be.disabled')

        .callTestAPI('create_data', { model: 'PaymentMethod', params: { ...stripeCards[0], user_id: 'current' } })
        .wait(1000)

        .reload()
        // note: reloading at this point will reload the user to the preview step instead of the billing plan selection
        // because everything should be set up on their account

        .get('[data-cy=publish-changes]').click()
        .currentURL().should('match', /^\/client\/hire/)
    })

    it('signup as a new client from timesheet management page', () => {
      cy
        .visit('/')
        .menuNavigateTo('guest-navigation-for-companies')
        .currentURL().should('equal', '/companies')
        .get('[data-cy=signup-timesheets]').first().click()
        .currentURL().should('equal', '/flexmanage')
      typeClientInfo()
        .get('[data-cy=submit]').click()
        .confirmEmail({ email })
        .get('[data-cy=logged-in-name]', { timeout: 5000 }).should('contain', clients[2].first_name)
        .currentURL().should('equal', '/client/invitation_team')
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[1].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[2].id }, method: 'delete_all' })
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { account_id: stripeCards[0].account_id } })
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[2].id } })
      cy.callTestAPI('delete_data', { model: 'User', params: { email } })
    })
  })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { email } })
  })
})
