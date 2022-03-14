import moment from 'moment'
import { classNameIncludes } from '../../support/callbacks'
import { clients } from '../../fixtures/client'
import { freelancer4, freelancer5 } from '../../fixtures/freelancer'
import { jobs } from '../../fixtures/jobs'
import { activeContracts } from '../../fixtures/contracts'
import { invoices } from '../../fixtures/invoices'
import { timesheets, submittedTimesheets } from '../../fixtures/timesheets'

export function openFiltersIfHidden() {
  return cy
    .wait(1000) // sometimes on CI this runs too quickly
    .get('[data-cy=page-bundle-placeholder]').should('not.exist')
    .get('body').then((body) => {
      if (body.find('[data-cy=open-filters]').length > 0) {
        return cy.get('[data-cy=open-filters]').click()
      }
      return undefined
    })
}

describe('Client Timesheets', () => {
  before(() => {
    return cy
      .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer5.email } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.email } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_user', { params: freelancer5, method: 'create' })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
      .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[3], freelancer_id: freelancer5.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
  })

  beforeEach(() => cy.clearLocalStorage())

  describe('Timesheet actions works properly', () => {
    it('opens from homepage button', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/')
        .openMenuIfClosed()
        .get('[data-cy=client-team-overview]').first().click()
        .get('[data-cy=team-overview-team]').first().click()
        .closeMenuIfOpen()
        .wait(3000) // sometimes next click does not register
        .get('[data-cy=manage-navigation-work]').click()
        .currentURL({ timeout: 120000 }).should('equal', '/client/manage')
        .wait(3000) // need to wait for tab to be set
        .queryParams().its('tab').should('equal', 'work')
    })

    it('shows empty list when there are no timesheets', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        .wait(3000) // fix element detached issue on CI
        .get('[data-cy=page-placeholder]', { timeout: 120000 }).first().should('contain', 'No work report')
    })

    it('handles index actions properly', () => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[8], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[9], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[10], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })

        // Check correct amount of rows
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 3)

        // Check view redirects (row click and dropdown) which also checks ordering
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').first().click()
        .currentURL().should('equal', `/client/work_reports/${submittedTimesheets[10].id}`)

        if (Cypress.env('RUN_RESOLUTION') !== 'MOBILE') {
          cy
            .openMenuIfClosed()
            .wait(1000)
            .get('[data-cy=client-team-overview]').first().click()
            .wait(1000)
            .get('[data-cy=team-overview-team]').first().click()
            .wait(1000)
            .closeMenuIfOpen()
            .wait(5000) // changing tab does not work otherwise
            .get('[data-cy=manage-navigation-work]').click()
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=actions]').click()
            .get('[data-cy=view]').first().click()
            .currentURL().should('equal', `/client/work_reports/${submittedTimesheets[10].id}`)

            // Check approving
            .visit('/client/timesheets')
            .openMenuIfClosed()
            .wait(1000)
            .get('[data-cy=client-team-overview]').first().click()
            .wait(1000)
            .closeMenuIfOpen()
            .get('[data-cy=manage-navigation-work]').click()
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=actions]').click()
            .get('[data-cy=approve]').first().click()
            .get('[data-cy=timesheet-approve-submit]').click()
            .get('.snackbar-open').should('contain', 'approved')

            // Query a submitted timesheet
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(1) [data-cy=actions]').click()
            .get('[data-cy=query]').eq(1).click()
            .get('[data-cy=textarea-clientComments]').type('Please fix project codes!')
            .get('[data-cy=query-timesheet]').click()

            // Reject a submitted timesheet
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(2) [data-cy=actions]').click()
            .get('[data-cy=reject]').eq(2).click()
            .get('.snackbar-open').should('contain', 'rejected')

            // Approved timesheet has disabled drop-down options
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=actions]').click()
            .get('[data-cy=approve]').first().should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=query]').first().should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=reject]').first().should(classNameIncludes('Mui-disabled'))
            .get('body').click() // Click away to close the popup

            // Queried timesheet has disabled drop-down options
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(1) [data-cy=actions]').click()
            .get('[data-cy=approve]').eq(1).should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=query]').eq(1).should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=reject]').eq(1).should(classNameIncludes('Mui-disabled'))
            .get('body').first().click() // Click away to close the popup

            // Rejected timesheet has disabled drop-down options
            .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(2) [data-cy=actions]').click()
            .get('[data-cy=approve]').eq(2).should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=query]').eq(2).should(classNameIncludes('Mui-disabled'))
            .get('[data-cy=reject]').eq(2).should(classNameIncludes('Mui-disabled'))
            .get('body').first().click() // Click away to close the popup
        }
    })

    it('handles view actions properly', () => {
      cy
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[8], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[9], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[10], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })

        // Approve submitted timesheet
        .login(clients[1].email, clients[1].password)
        .visit(`/client/timesheets/${submittedTimesheets[8].id}`)
        .get('[data-cy=timesheet-approve]').first().click()
        .get('[data-cy=timesheet-approve-submit]').click()
        .get('.snackbar-open').should('contain', 'approved')
        .currentURL().should('equal', '/client/manage')
        .queryParams().its('tab').should('equal', 'work')

        // Query submitted timesheet
        .visit(`/client/timesheets/${submittedTimesheets[9].id}`)
        .get('[data-cy=timesheet-query]').first().click()
        .get('[data-cy=textarea-clientComments]').type('Please fix project codes!')
        .get('[data-cy=query-timesheet]').click()
        .wait(1000)
        .currentURL().should('equal', '/client/manage')
        .queryParams().its('tab').should('equal', 'work')

        // Reject submitted timesheet
        .visit(`/client/timesheets/${submittedTimesheets[10].id}`)
        .get('[data-cy=timesheet-reject]').first().click()
        .get('.snackbar-open').should('contain', 'rejected')
        .currentURL().should('equal', '/client/manage')
        .queryParams().its('tab').should('equal', 'work')
    })

    it('lists timesheets for multiple freelancers properly', () => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[0], status: 'submitted', client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90010 } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[0], status: 'submitted', client_id: clients[1].id, freelancer_id: freelancer5.id, contract_id: activeContracts[3].id, id: 90011 } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], status: 'submitted', client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90012 } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], status: 'submitted', client_id: clients[1].id, freelancer_id: freelancer5.id, contract_id: activeContracts[3].id, id: 90013 } })

        // Check correct amount of rows and their ordering
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 4)

        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]:eq(0)', '[data-cy=timesheets-list] [data-cy=card]:eq(0)').click()
        .currentURL().should('oneOf', ['/client/work_reports/90012', '/client/work_reports/90013']) // Between the same week the ordering is random

        .openMenuIfClosed()
        .get('[data-cy=client-team-overview]').first().click()
        .wait(1000)
        .get('[data-cy=team-overview-team]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .get('[data-cy=manage-navigation-work]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]:eq(1)', '[data-cy=timesheets-list] [data-cy=card]:eq(1)').click()
        .currentURL().should('oneOf', ['/client/work_reports/90012', '/client/work_reports/90013']) // Between the same week the ordering is random

        .openMenuIfClosed()
        .get('[data-cy=team-overview-team]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .get('[data-cy=manage-navigation-work]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]:eq(2)', '[data-cy=timesheets-list] [data-cy=card]:eq(2)').click()
        .currentURL().should('oneOf', ['/client/work_reports/90010', '/client/work_reports/90011']) // Between the same week the ordering is random

        .openMenuIfClosed()
        .get('[data-cy=team-overview-team]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .get('[data-cy=manage-navigation-work]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]:eq(3)', '[data-cy=timesheets-list] [data-cy=card]:eq(3)').click()
        .currentURL().should('oneOf', ['/client/work_reports/90010', '/client/work_reports/90011']) // Between the same week the ordering is random
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
    })
  })

  describe('Timesheet filtering works properly', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id, invoice_num: 1 } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[0], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, invoice_id: invoices[0].id, id: 90000, status: 'submitted', paycheck_status: 'ready' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90002, status: 'submitted' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer5.id, contract_id: activeContracts[3].id, id: 90003, status: 'submitted' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[2], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90004, status: 'submitted' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[2], client_id: clients[1].id, freelancer_id: freelancer5.id, contract_id: activeContracts[3].id, id: 90005, status: 'client_query' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[3], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90006, status: 'rejected' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[4], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90007, status: 'approved' } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[5], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90008, status: 'approved', paycheck_status: 'paid', invoice_id: invoices[0].id } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[6], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90009, status: 'approved', paycheck_status: 'failed', invoice_id: invoices[0].id } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[7], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id, id: 90010, status: 'void' } })
    })

    it('Search filter: Filter by name', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        openFiltersIfHidden()

        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]', { timeout: 4000 }).should('have.length', 10)
        .get('[data-cy=textfield-input-name]').type(freelancer4.last_name)
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]', { timeout: 4000 }).should('have.length', 8)
        .get('[data-cy=textfield-input-name]').clear()
    })

    it('Search filter: Filter by exact start date', () => {
      const startDate = moment('2019-02-25', 'YYYY-MM-DD')
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        openFiltersIfHidden()
        .wait(1000) // clicking the date range picker too fast won't work
        .get('[data-cy=textfield-input-date-range-picker-date-filter]').click()
        .selectDateInDatePicker('date-filter', startDate)
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)
        .getByEnv('[data-cy=timesheets-table-body] [data-cy-timesheet-id=90010]', '[data-cy=timesheets-list] [data-cy-timesheet-id=90010]').should('exist')
        .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 10)
        .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
        .type('{esc}')
    })

    it('Search filter: Filter by start date range', () => {
      const fromStartDate = moment(timesheets[1].start_date).subtract(1, 'day')
      const toStartDate = moment(timesheets[1].start_date).add(1, 'day')
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        openFiltersIfHidden()
        .wait(1000) // clicking the date range picker too fast won't work
        .get('[data-cy=textfield-input-date-range-picker-date-filter]').click()
        .selectDateInDatePicker('date-filter', fromStartDate)
        .selectDateInDatePicker('date-filter', toStartDate)
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 2)
        .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 10)
        .get('[data-cy=date-range-picker-date-filter] [data-cy=clear-selection]').click()
        .type('{esc}')
    })

    // TODO: this test is very flaky, and should be replaced by component and API tests.
    it.skip('Search filter: Filter by status', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        openFiltersIfHidden()

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-submitted]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 4)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-client_query]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-rejected]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-approved]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-paid]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-payout_failed]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-void]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 1)

        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 10)
    })

    it('Search filter: Filter by invoice', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/timesheets').closeMenuIfOpen()
        openFiltersIfHidden()

        .get('[data-cy=select-invoice]').click()
        .get('[data-cy=select-invoice-option--2]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 7)

        .get('[data-cy=select-invoice]').click()
        .get('[data-cy=select-invoice-option-1]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 3)

        .get('[data-cy=select-invoice]').click()
        .get('[data-cy=select-invoice-option-0]').click()
        .getByEnv('[data-cy=timesheets-table-body] [data-cy=row]', '[data-cy=timesheets-list] [data-cy=card]').should('have.length', 10)
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer5.email } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.email } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
