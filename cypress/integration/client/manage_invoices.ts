import moment from 'moment'
import { billing_plans } from '../../fixtures/billing_plans'
import { clients } from '../../fixtures/client'
import { freelancer4 } from '../../fixtures/freelancer'
import { invoices, paidInvoices, overdueInvoices } from '../../fixtures/invoices'
import { invoiceItems } from '../../fixtures/invoice_items'
import { activeContracts } from '../../fixtures/contracts'
import { timesheets } from '../../fixtures/timesheets'
import { jobs } from '../../fixtures/jobs'
import { stripeCards, stripeBankAccounts } from '../../fixtures/payment_methods'

export function openFiltersIfHidden() {
  return cy
    .get('[data-cy=page-bundle-placeholder]').should('not.exist')
    .get('body').then((body) => {
      if (body.find('[data-cy=open-filters]').length > 0) {
        return cy.get('[data-cy=open-filters]').click()
      }
      return undefined
    })
}

describe('Client Invoices', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: 50001 } })
      .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })

  describe('Invoices Page', () => {
    describe('Invoice actions work properly', () => {
      it('Row actions: Pay redirects to billing account if no payment method is found', () => {
        cy
          .callTestAPI('create_user', clients[1])
          .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id, pdf_status: 'generated' } })
          .login(clients[1].email, clients[1].password)

          .visit('/client/invoices').closeMenuIfOpen()
          .get('[data-cy=invoices-table-body] [data-cy=row]:first [data-cy=actions]').click()
          .get('[data-cy=pay]').click()
          .get('[data-cy=configure-default-payment-method]').click()
          .currentURL().should('equal', '/account/paying_us')
      })

      function payInvoice() {
        return cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices')
          .openMenuIfClosed()
          .get('[data-cy=notification-badge-total]', { timeout: 30000 }).invoke('attr', 'data-value').should('equal', '1')
          .closeMenuIfOpen()
          .get('[data-cy=invoices-table-body] [data-cy=row]:first [data-cy=payment-status]').should('contain', 'Requested')
          .get('[data-cy=invoices-table-body] [data-cy=row]:first [data-cy=actions]').click()
          .get('[data-cy=pay]').click()
          .get('[data-cy=pay-dialog] [data-cy=pay]').click()
          .get('[data-cy=success-message]', { timeout: 120000 }).should('contain', 'Payment submitted successfully')
          .get('[data-cy=invoices-table-body] [data-cy=row]:first [data-cy=payment-status]').should('contain', 'Paid')
          .openMenuIfClosed()
          .get('[data-cy=notification-badge-total]').should('not.exist')
      }

      it('Row actions: Pay invoice with stripe card', () => {
        cy
          .callTestAPI('create_user', clients[1])
          .callTestAPI('create_data', { model: 'PaymentMethod', params: { ...stripeCards[0], user_id: clients[1].id } })
          .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id } })
          .callTestAPI('create_data', { model: 'InvoiceItem', params: { ...invoiceItems[0], invoice_id: invoices[0].id } })
        payInvoice()
      })

      // TODO: figure out why ACH Wire gets set as default payment method in this test, making it fail
      it.skip('Row actions: Pay invoice with bank account', () => {
        cy
          .callTestAPI('create_user', clients[1])
          .callTestAPI('create_data', { model: 'PaymentMethod', params: { ...stripeBankAccounts[0], user_id: clients[1].id } })
          .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id } })
          .callTestAPI('create_data', { model: 'InvoiceItem', params: { ...invoiceItems[0], invoice_id: invoices[0].id } })
        payInvoice()
      })

      afterEach(() => {
        cy
          .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: invoices[0].id } })
          .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'StripeCharge', params: { user_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      })
    })

    describe('Invoice display and filtering works properly', () => {
      before(() => {
        cy
          .callTestAPI('create_user', clients[1])
          .callTestAPI('create_user', { params: freelancer4, method: 'create' })
          .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
          .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, client_rate_cents: 8000 } })
          .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id, invoice_num: 1 } })
          .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, invoice_id: invoices[0].id, paycheck_status: 'paid' } })
          .callTestAPI('create_data', { model: 'Invoice', params: { ...paidInvoices[0], token: 'invoice-token-1', user_id: clients[1].id, invoice_num: 2, id: 50001 } })
          .callTestAPI('create_data', { model: 'InvoiceItem', params: { ...invoiceItems[0], invoice_id: 50001 } })
          .callTestAPI('create_data', { model: 'Invoice', params: { ...overdueInvoices[0], token: 'invoice-token-2', user_id: clients[1].id, invoice_num: 3, id: 50002 } })
      })

      it('Invoice data displayed properly.', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()

          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50000]').within(() => {
            cy
              .get('[data-cy=total]').should('contain', '$1,400.00')
              .get('[data-cy=payment-status]').should('contain', 'Requested')
          })
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').within(() => {
            cy
              .get('[data-cy=total]').should('contain', '$1,000.00')
              .get('[data-cy=payment-status]').should('contain', 'Paid')
          })
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50002]').within(() => {
            cy
              .get('[data-cy=total]').should('contain', '$0.00')
              .get('[data-cy=payment-status]').should('contain', 'Overdue')
          })
      })

      it('Search filter: Filter by invoice no.', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
        openFiltersIfHidden()
          .get('[data-cy=textfield-input-invoiceNo]').type('3')
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 1)
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50002]').should('exist')
          .get('[data-cy=textfield-input-invoiceNo]').clear()
      })

      const selectDateInDatePicker = (date) => {
        const year = date.format('YYYY')
        const month = date.format('MMM')
        const day = date.format('D')
        return cy
          .get('[data-cy=date-range-picker-date-filter]').within(() => {
            cy
              .get('[data-cy=select-month]').click()
              .get(`[data-cy=years] [data-cy=${year}]`).click()
              .get(`[data-cy=months] [data-cy=${month}]`).click()
              .get('[data-cy=select-month]').click()
              .get(`[data-cy=days] [data-cy-in-month=true][data-cy=${day}]`).click()
          })
      }

      it('Search filter: Filter by exact due date', () => {
        const dueDate = moment(invoices[0].due_date)
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
        openFiltersIfHidden()
          .wait(1000) // clicking the date range picker too fast won't work
          .get('[data-cy=textfield-input-date-range-picker-date-filter]').click()
        selectDateInDatePicker(dueDate)
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 2)
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50000]').should('exist')
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')
          .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
          .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
          .get('body').trigger('keypress', { key: 'Escape' })
      })

      it('Search filter: Filter by due date range', () => {
        const fromDueDate = moment(invoices[0].due_date).subtract(1, 'week')
        const toDueDate = moment(invoices[0].due_date).add(1, 'week')
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
        openFiltersIfHidden()
          .wait(1000) // clicking the date range picker too fast won't work
          .get('[data-cy=textfield-input-date-range-picker-date-filter]').click()
        selectDateInDatePicker(fromDueDate)
        selectDateInDatePicker(toDueDate)
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 2)
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50000]').should('exist')
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')
          .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
          .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
          .get('body').trigger('keypress', { key: 'Escape' })
      })

      it('Search filter: Filter by total.', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()

          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
        openFiltersIfHidden()
          .get('[data-cy=textfield-input-total]').type('1200')
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 2)
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50002]').should('exist')
          .get('[data-cy=textfield-input-total]').clear()
      })

      it('Search filter: Filter by status', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()

          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
        openFiltersIfHidden()
          .get('[data-cy=select-status]').click()
          .get('[data-cy=select-status-option-paid]').click()
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')

          .get('[data-cy=select-status]').click()
          .get('[data-cy=select-status-option-overdue]').click()
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50002]').should('exist')

          .get('[data-cy=select-status]').click()
          .get('[data-cy=select-status-option-requested]').click()
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50000]').should('exist')

          .get('[data-cy=select-status]').click()
          .get('[data-cy=select-status-option-]').click()
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('have.length', 3)
      })

      it('Search filter: Filter by all filters', () => {
        const fromDueDate = moment(invoices[0].due_date).subtract(1, 'week')
        const toDueDate = moment(invoices[0].due_date).add(1, 'week')
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/invoices').closeMenuIfOpen()
          .wait(3000) // otherwise filters dont open
        openFiltersIfHidden()
          .wait(1000) // clicking the date range picker too fast won't work
          .get('[data-cy=textfield-input-date-range-picker-date-filter]').click()
        selectDateInDatePicker(fromDueDate)
        selectDateInDatePicker(toDueDate)
          .get('body').trigger('keydown', { key: 'Escape' })
          .get('[data-cy=select-status]').click()
          .get('[data-cy=select-status-option-paid]').click()
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')

          .get('[data-cy=textfield-input-total]').type('1')
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('not.exist')
          .get('[data-cy=textfield-input-total]').type('500')
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')

          .get('[data-cy=textfield-input-invoiceNo]').type('1')
          .get('[data-cy=invoices-table-body] [data-cy=row]').should('not.exist')
          .get('[data-cy=textfield-input-invoiceNo]').clear().type('2')
          .get('[data-cy=invoices-table-body] [data-cy-invoice-id=50001]').should('exist')
      })

      after(() => {
        cy
          .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: 50001 } })
          .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
          .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
          .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
          .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      })
    })
  })

  describe('Individual Invoice Page', () => {
    before(() => {
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: invoices[0].id } })
        .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'StripeCharge', params: { invoice_id: invoices[0].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
        .callTestAPI('create_user', clients[1])
        .callTestAPI('create_data', { model: 'PaymentMethod', params: { ...stripeCards[0], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'InvoiceItem', params: { ...invoiceItems[0], invoice_id: invoices[0].id } })
    })

    it('Paying invoice with Stripe Card', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/invoices/${invoices[0].token}`).closeMenuIfOpen()

        .get('[data-cy=pay-invoice]').first().click()
        .get('[data-cy=pay-dialog] [data-cy=pay]').click()
        .get('[data-cy=success-message]', { timeout: 120000 }).should('contain', 'Payment submitted successfully')
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: invoices[0].id } })
        .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
    })
  })

  describe('Overdue Invoice Block', () => {
    before(() => {
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })
        .callTestAPI('create_data', { model: 'BillingPlan', params: billing_plans[0] })
        .callTestAPI('create_user', { ...clients[1], billing_plan_id: billing_plans[0].id })
        .callTestAPI('create_data', { model: 'PaymentMethod', params: { ...stripeCards[0], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id, invoice_date: moment().subtract(2, 'weeks'), due_date: moment().subtract(1, 'weeks').toDate() } })
        .callTestAPI('create_data', { model: 'InvoiceItem', params: { ...invoiceItems[0], invoice_id: invoices[0].id } })
    })

    it('User must pay invoice to continue', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()

        .get('[data-cy=invoice-blocked-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=view-invoices]').click()
        .currentURL().should('equal', '/client/manage')
        .get('[data-cy=row]').click()
        .get('[data-cy=pay-invoice]', { timeout: 120000 }).first().click()
        .get('[data-cy=pay-dialog] [data-cy=pay]').click()
        .get('[data-cy=success-message]', { timeout: 120000 }).should('contain', 'Payment submitted successfully')
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'PaymentMethod', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'InvoiceItem', params: { invoice_id: invoices[0].id } })
        .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'BillingPlan', params: { id: billing_plans[0].id } })
    })
  })
})
