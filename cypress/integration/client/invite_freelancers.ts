import { firms } from '../../fixtures/firms'
import { billing_plans } from '../../fixtures/billing_plans'
import { clients } from '../../fixtures/client'
import { freelancer3, freelancer3Profile } from '../../fixtures/freelancer'
import { freelancerTypes } from '../../fixtures/freelancer_types'
import { jobs } from '../../fixtures/jobs'

const INVITED_USER = {
  email: 'cypress@flexhire.com',
  first_name: 'Ted',
  last_name: 'Invi',
}

describe('Invite to Team', () => {
  beforeEach(() => {
    cy
      // Make sure everything created in this file is deleted
      // Delete all contracts for this client because in the freelancer signup test
      // we deal with contracts too, so we make sure every contract is wiped
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Firm', params: { id: firms[0].id } })
      .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })

      .callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[0] })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_data', { model: 'Firm', params: firms[1] })
      .callTestAPI('create_user', { ...clients[1], legacy_billing: false, company_name: firms[1].name })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
  })

  beforeEach(() => {
    return cy
      .callTestAPI('delete_data', { model: 'Contract', method: 'delete_all', params: { freelancer_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'Contract', method: 'delete_all', params: { client_id: clients[1].id} })
  })

  const fillFields = () => (
    cy
      .get('[data-cy=textfield-input-first_name]', { timeout: 20000 }).type(INVITED_USER.first_name)
      .get('[data-cy=textfield-input-last_name]', { timeout: 20000 }).type(INVITED_USER.last_name)
      .get('[data-cy=textfield-input-email]', { timeout: 20000 }).type(INVITED_USER.email)
      .get('[data-cy=textfield-input-client_rate]', { timeout: 20000 }).type('50')
      .wait(1000) // In mobile mode usually it can't click the dropdown without this. Probably an animation issue.
  )

  const submitThenCheck = () => (
    cy
      .get('[data-cy=invitation-form-continue]').click()
      .addWireTransferAccount({ funds: 5000 })
      .get(`[data-cy=billing-plan-${billing_plans[0].id}] [data-cy=choose-plan]`).click()
      .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Company details saved')
      .get('[data-cy=account-setup-continue]').click()
      .get('[data-cy=submit-invitation]').click()

      .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Invitation sent')
      .wait(5000)

      .currentURL().should('equal', '/client/manage')
      .queryParams().should('deep.equal', { tab: 'team', subtab: 'invited' })
      .get('[data-cy=select-filter-by-manager]').first().click()
      .get('[data-cy=select-filter-by-manager-option-]').click()
      .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]', { timeout: 10000 }).should('contain', INVITED_USER.first_name)
  )

  const submitThenCheckWithRequestBackground = () => (
    cy
      .get('[data-cy=invitation-form-continue]').click()
      .addWireTransferAccount({ funds: 5000 })
      .get(`[data-cy=billing-plan-${billing_plans[0].id}] [data-cy=choose-plan]`).click()
      .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Company details saved')
      .get('[data-cy=account-setup-continue]').click()
      .get('[data-cy=submit-invitation]').click()
      .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Invitation sent')
      .wait(5000)

      .currentURL().should('equal', '/client/manage')
      .queryParams().should('deep.equal', { tab: 'team', subtab: 'invited' })
      .wait(1000)
      .get('[data-cy=select-filter-by-manager]').first().click()
      .get('[data-cy=select-filter-by-manager-option-]').click()
      .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]', { timeout: 10000 }).should('contain', INVITED_USER.first_name)
  )

  describe('inviting a client', () => {
    before(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
    })

    it('client can invite manager', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/invitation_team')
        .get('[data-cy=textfield-input-first_name]').type(clients[2].first_name)
        .get('[data-cy=textfield-input-last_name]').type(clients[2].last_name)
        .get('[data-cy=textfield-input-email]').type(clients[2].email)
        .get('[data-cy=select-invitation_type]').click()
        .get('[data-cy=manager]').click()
        .get('[data-cy=invitation-form-continue]').click()

        .get(`[data-cy=billing-plan-${billing_plans[0].id}] [data-cy=choose-plan]`).click()
        .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Company details saved')
        .addWireTransferAccount({ funds: 5000 })
        .get('[data-cy=account-setup-continue]').click()

        .get('[data-cy=submit-invitation]').click()

        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Invitation sent')

        // Check existing invitation on team page
        .currentURL().should('equal', '/client/manage')
        .queryParams().should('deep.equal', { tab: 'team', subtab: 'invited' })
        .wait(1000)
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get('[data-cy=select-filter-by-manager-option-]').click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]', { timeout: 10000 }).should('contain', clients[2].first_name)

        // Navigate to sign up
        .get('body').then((body) => {
          if (body.find('[data-cy=avatar-header-more]').length > 0) {
            return cy.get('[data-cy=avatar-header-more]').click()
          }
        })
        .get('[data-cy=logout]').click()
        .visit(`/signup/client?email=${clients[2].email}&firstName=${clients[2].first_name}&lastName=${clients[2].last_name}`)

        // Check data prefill
        .get('[data-cy=textfield-input-email]', { timeout: 20000 }).should('have.value', clients[2].email)
        .get('[data-cy=textfield-input-first_name]').should('have.value', clients[2].first_name)
        .get('[data-cy=textfield-input-last_name]').should('have.value', clients[2].last_name)

        // Sign up as the invited client
        .get('[data-cy=textfield-input-password]').type(clients[2].password)
        .get('[data-cy=textfield-input-password_confirmation]').type(clients[2].password)
        .get('[data-cy=agree-to-terms]').click()
        .get('[data-cy=submit]').click()
        .confirmEmail(clients[2])
        .currentURL().should('equal', '/client/dashboard')
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
    })
  })

  it('client can invite freelancer to Flexhire for a direct offer', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/invitation_team')
      .get('[data-cy=select-invitation_type]').click()
      .get('[data-cy=individual]').click()
    fillFields()
    submitThenCheck()
  })

  it('client can invite freelancer to Flexhire for a direct offer with monthly rate', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/invitation_team')
      .get('[data-cy=select-invitation_type]').click()
      .get('[data-cy=individual]').click()
      .get('[data-cy=textfield-input-first_name]', { timeout: 20000 }).type(INVITED_USER.first_name)
      .get('[data-cy=textfield-input-last_name]', { timeout: 20000 }).type(INVITED_USER.last_name)
      .get('[data-cy=textfield-input-email]', { timeout: 20000 }).type(INVITED_USER.email)
      .get('[data-cy=textfield-input-client_rate]', { timeout: 20000 }).type('2500')
      .get('[data-cy=select-rate_mode]', { timeout: 20000 }).click()
      .get('[data-cy=select-rate_mode-month]', { timeout: 20000 }).click()
      .get('[data-cy=checkbox-field-require_timesheet_approval_for_payments]', { timeout: 20000 }).click()
      .wait(1000) // In mobile mode usually it can't click the dropdown without this. Probably an animation issue.
    submitThenCheck()
  })

  describe('with existing freelancer', () => {
    const freelancer3Modified = { ...freelancer3, ...INVITED_USER }

    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
        .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
        .callTestAPI('delete_data', { model: 'User', params: { email: freelancer3Modified.email } })
        .callTestAPI('create_user', freelancer3Modified)
        .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
    })

    it('client can invite a freelancer to Flexhire for a direct offer while the freelancer already has an account', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/invitation_team')
        .get('[data-cy=select-invitation_type]').click()
        .get('[data-cy=individual]').click()

      fillFields()
      submitThenCheck()

      cy.logout().login(freelancer3Modified.email, freelancer3Modified.password)
        .visit('/')
        .currentURL().should('equal', '/member/dashboard')
        .get('[data-cy=alert-job-offers]').should('contain', 'new job offer')
        .get('[data-cy=job-offer-hourly-rate]').should('contain', '45')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
    })
  })

  it('client can invite freelancer to Flexhire for a direct offer and associate a job', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/invitation_team')
      .get('[data-cy=select-invitation_type]').click()
      .get('[data-cy=individual]').click()
      .get('[data-cy=select-job_id]').click()
      .get('[data-cy=job-0]').click()
    fillFields()
    submitThenCheck()
  })

  it('client can invite freelancer to Flexhire for a job and request background check', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/invitation_team')
      .get('[data-cy=select-invitation_type]').click()
      .get('[data-cy=individual]').click()
      .get('[data-cy=select-job_id]').click()
      .get('[data-cy=job-0]').click()
      .get('[data-cy=checkbox-field-request_background]').click()
    fillFields()
    submitThenCheckWithRequestBackground()
  })

  afterEach(() => {
    cy.callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id, freelancer_id: null }, method: 'delete_all' })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Firm', params: { id: firms[0].id } })
      .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
  })
})