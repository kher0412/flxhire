import { skipOnCI } from '../../support/services'
import { clients } from '../../fixtures/client'
import { billing_plans } from '../../fixtures/billing_plans'

const NEW_ACCOUNT = {
  firstName: `${clients[1].first_name} Rename`,
  lastName: `${clients[1].last_name} Rename`,
  email: `rename.${clients[1].email}`,
  phone: '+393451231234',
  password: '222222',
}

const NEW_COMPANY = {
  name: `${clients[1].company_name} Rename`,
  website: 'http://robert.co.uk',
  description: 'We sell stuff...',
  email: 'rob@robert.co.uk',
  invoiceApprover: `${clients[1].first_name} ${clients[1].last_name}`,
  purchaseOrderNumber: '1234',
  address: '711-2880 Nulla St. Mankato Mississippi 96522',
}

describe('Client Account', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
      .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
  })

  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
      .callTestAPI('create_user', clients[1])
  })

  it('Navigation items redirect properly', () => {
    cy
      .login(clients[1].email, clients[1].password)

      .visit('/client/account')
      .get('[data-cy=account-navigation-company]').click()
      .currentURL().should('equal', '/account/company')
      .get('[data-cy=account-navigation-plans]').click()
      .currentURL().should('equal', '/account/plans')
      .get('[data-cy=account-navigation-paying-us]').click()
      .currentURL().should('equal', '/account/paying_us')
      .get('[data-cy=account-navigation-invoices]').click()
      .currentURL().should('equal', '/account/invoices')
      .get('[data-cy=account-navigation-account]').click()
      .currentURL().should('equal', '/account/settings')
  })

  // TODO: figure out how to make this test work again
  // currently, we use Stripe Checkout which redirects off our site
  // this breaks cypress
  it.skip('Payments tab: Configures client credit card', () => {
    cy
      .login(clients[1].email, clients[1].password)

      .visit('/client/account/payments')
      .get('[name="default-payment-method-credit-card"]').should('not.be.checked')
      .get('[name="default-payment-method-bank-account"]').should('not.be.checked')

      .get('[data-cy=stripe-checkout] button').click()
      .get('iframe.stripe_checkout_app').as('stripe')
      .waitForIFrameToLoad()
      .find('input:eq(0)').type('4242424242424242')
      .get('@stripe').iframe().find('input:eq(1)').type('1222')
      .get('@stripe').iframe().find('input:eq(2)').type('123')
      .get('@stripe').iframe().find('button').click()
      .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Your credit card has been saved')
      .get('[name=default-payment-method-credit-card]', { timeout: 120000 }).should('be.checked')

      .get('[data-cy=server-error]').each(el => cy.wrap(el).should('be.empty'))
      .get('[data-cy=card-status]').should('contain', '12/2022')
  })

  skipOnCI('Payments tab: Configures client bank account', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/account/payments')
      .addPlaidBankAccount()
      // TODO: check if bank account shows up in list of payment methods
  })

  it('Payments tab: Configures client wire transfer account', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/client/account/payments')
      .addWireTransferAccount()
      .get('[data-cy=payment-method-card').should('contain', 'Wire Transfer')
  })

  // TODO: update the second part of the test to use the new UI for editing managers on /manage/team
  // instead of the old one in /account which has been removed.
  it.skip('Managers tab: edit a manager', () => {
    cy
      .login(clients[1].email, clients[1].password)

      // create invitation from new combined page
      // TODO: this should be cleaned up with the team invitation management redesign (manage/team page)
      .visit('/client/invitation_team')
      .get('[data-cy=textfield-input-first_name]', { timeout: 120000 }).type(clients[2].first_name)
      .get('[data-cy=textfield-input-last_name]').type(clients[2].last_name)
      .get('[data-cy=textfield-input-email]').type(clients[2].email)
      .get('[data-cy=select-invitation_type]').click()
      .get('[data-cy=manager]').click()
      .get('[data-cy=invitation-form-continue]').click()
      .addWireTransferAccount()
      .get('[data-cy=account-setup-continue]').click()
      .get('[data-cy=submit-invitation]').click()
      .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Invitation sent')

      .visit('/client/account/managers')

      .get(`[data-cy=managers-table-body] [data-cy=row][data-cy-email="${clients[2].email}"]`)
      .should('contain', `${clients[2].first_name} ${clients[2].last_name}`)
      .should('contain', clients[2].email)
      .should('contain', 'Invited Manager')

      // Navigate to sign up
      .get('[data-cy=avatar-header-more]').click()
      .get('[data-cy=logout]').click()
      .visit(`/signup/client?email=${clients[2].email}&firstName=${clients[2].first_name}&lastName=${clients[2].last_name}`)

      // Check data prefill
      .get('[data-cy=textfield-input-email]').should('have.value', clients[2].email)
      .get('[data-cy=textfield-input-first_name]').should('have.value', clients[2].first_name)
      .get('[data-cy=textfield-input-last_name]').should('have.value', clients[2].last_name)

      // Sign up as the invited client
      .get('[data-cy=textfield-input-password]').type(clients[2].password)
      .get('[data-cy=textfield-input-password_confirmation]').type(clients[2].password)
      .get('[data-cy=agree-to-terms]').click()
      .get('[data-cy=submit]').click()
      .confirmEmail(clients[2])
      .currentURL().should('equal', '/client/dashboard')

      .logout()
      .login(clients[1].email, clients[1].password)
      .visit('/client/account/managers')

      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"]`).should('contain', 'Manager')

      // Check admin actions
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"] [data-cy=actions]`).click()
      .get('[data-cy=make-admin]').last().click()
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"]`).should('contain', 'Admin')
      .wait(1000)
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"] [data-cy=actions]`).click()
      .get('[data-cy=remove-admin]').last().click()
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"]`).should('contain', 'Manager')

      .wait(1000)
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"] [data-cy=actions]`).click()
      .get('[data-cy=remove-from-team]').last().click()
      .get('[data-cy=confirm-remove-from-team]').click()
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[2].email}"]`).should('not.exist')

      // TODO: if we want to enable this, then we must delete some other use
      // the current user cannot delete themselves from the firm
      // even though it technically worked before it causes problems so I disabled it from the backend
      /*
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[1].email}"] [data-cy=actions]`).click()
      .get(`[data-cy=remove-from-team]`).click()
      .get(`[data-cy=managers-table-body] [data-cy-email="${clients[1].email}"]`).should('not.exist')
      .get('[data-cy=managers-table-body] [data-cy=row]').should('not.exist')
      */

      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
  })

  it('Invoices tab: edit invoice settings', () => {
    cy
      .login(clients[1].email, clients[1].password)
      .visit('/account/invoices')
      // .get('[data-cy=checkbox-input-allow_invoice_auto_charge]').click() // toggles off // TODO: does not work on CI because of default config
      .get('[data-cy=textfield-purchase_order_number]').type('123')
      .get('[data-cy=textarea-additional_invoice_text]').type('test additional text')
      .get('[data-cy=textarea-additional_invoice_text_user]').type('test additional text for myself')
      .get('[data-cy=invoices-save-button]').click()
      .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Company details saved')
      .reload()
      // .get('[data-cy=checkbox-input-allow_invoice_auto_charge]').should('not.be.checked') // TODO: does not work on CI because of default config
      .get('[data-cy=textfield-purchase_order_number] input').should('have.value', '123')
      .get('[data-cy=textarea-additional_invoice_text]').should('have.value', 'test additional text')
      .get('[data-cy=textarea-additional_invoice_text_user]').should('have.value', 'test additional text for myself')
  })

  describe('Complete setup dialog', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })
        .callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[0] })
    })

    it('appears if billing plan is not selected, and can be dismissed', () => {
      cy.callTestAPI('create_user', { ...clients[1], legacy_billing: false })
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard')
        .get('[data-cy=billing-setup-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=dismiss-billing-setup]').click()
        .get('[data-cy=billing-setup-dialog]').should('not.exist')
    })

    it('appears if billing plan is not selected, and redirects to account page', () => {
      cy.callTestAPI('create_user', { ...clients[1], legacy_billing: false })
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard')
        .get('[data-cy=billing-setup-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=choose-billing-plan]').click()
        .get('[data-cy=billing-setup-dialog]').should('not.exist')
        .currentURL().should('equal', '/account/plans')
    })

    it('appears if payment method is missing, and redirects to account page', () => {
      cy.callTestAPI('create_user', { ...clients[1], legacy_billing: false, billing_plan_id: billing_plans[0].id })
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard')
        .get('[data-cy=billing-setup-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=choose-payment-method]').click()
        .get('[data-cy=billing-setup-dialog]').should('not.exist')
        .currentURL().should('equal', '/account/paying_us')
    })

    it('appears if payment method is missing, and redirects to jobs page', () => {
      cy.callTestAPI('create_user', { ...clients[1], legacy_billing: false, billing_plan_id: billing_plans[0].id })
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard')
        .get('[data-cy=billing-setup-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=goto-jobs]').click()
        .get('[data-cy=billing-setup-dialog]').should('not.exist')
        .currentURL().should('equal', '/client/hire')
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[2].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
        .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })
    })
  })

  afterEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
  })
})
