import moment from 'moment'
import { DATE_PATTERN } from '../../../app/services/timeKeeping'
import { timesheets, timesheetExpenses } from '../../fixtures/timesheets'
import { classNameIncludes } from '../../support/callbacks'
import { clients } from '../../fixtures/client'
import { freelancer4 } from '../../fixtures/freelancer'
import { jobs } from '../../fixtures/jobs'
import { activeContracts } from '../../fixtures/contracts'

const RECEIPT_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tBGjZ-5PNfQZQMMj6iroRrARypGcLNCiDxntGiHMX1w3kAYG&s'
const monday = moment().isoWeekday(1).format(DATE_PATTERN)
const tuesday = moment().isoWeekday(2).format(DATE_PATTERN)
const friday = moment().isoWeekday(5).format(DATE_PATTERN)

export function uploadReceiptURL() {
  return cy.get('[title="Link (URL)"] > .fsp-source-list__icon').click()
    .get('.fsp-url-source__input').type(RECEIPT_URL)
    .get('.fsp-url-source__form > .fsp-button').click()
    .get('.fsp-footer__nav--right > .fsp-button').click()
    .wait(5000) // CI will get the wrong fsp-button if we are not careful
    .get('div > .fsp-button', { timeout: 120000 }).click()
    .get('.fsp-picker', { timeout: 120000 }).should('not.exist')
}

export function mockUploadReceiptURL() {
  return cy.dispatch({
    type: '@@redux-form/CHANGE',
    meta: { form: 'timesheetForm', field: 'expenses.0.receipt_url', touch: false },
    payload: RECEIPT_URL,
  })
}

describe('Freelancer Timesheets', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'Expense', params: { timesheet_id: timesheets[1].id } })
      .callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.email } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, freelancer_rate_cents: 6400, client_rate_cents: 8000 } })
  })

  describe('Test basic functionality', () => {
    beforeEach(() => {
      cy.login(freelancer4.email, freelancer4.password)
    })

    it('opens from homepage button', () => {
      cy
        .visit('/')
        .get('[data-cy=view-timesheets]', { timeout: 10000 }).click()
        .currentURL().should('equal', '/member/work_reports')
    })

    it('shows empty list when there are no timesheets', () => {
      cy
        .visit('/member/timesheets')
        .get('[data-cy=page-wrapper]').should('contain', 'No work report')
    })
  })

  describe('Freelancer can create a timesheet', () => {
    before(() => {
      cy.login(freelancer4.email, freelancer4.password).visit('/member/timesheets/new')
    })

    beforeEach(() => {
      cy.login(freelancer4.email, freelancer4.password)
    })

    it('Test work item validation', () => {
      cy
        .visit('/member/timesheets/new')
        .get('[data-cy=add-work-item]').should('exist')
        .wait(5000) // if we click too fast it does not work
        .get('[data-cy=add-work-item]', { timeout: 120000 }).first().click()
        .wait(1000)
        .get('[data-cy=textfield-input-project_code]').first().click()
        .clear().type('123 Testing')
        .get('[data-cy=save-item]').first().click()
        .get('[data-cy=textarea-helper-description]').first().should('contain', 'Required')
    })

    it('Add 90 min work item', () => {
      cy
        .visit('/member/timesheets/new')
        .wait(2000)
        .get('[data-cy=add-work-item]').first().click()
        // TODO: test manually changing the day
        .get('[data-cy=textfield-input-start_time]').first()
        .clear().type('09:11')
        .get('[data-cy=textfield-input-end_time]').first()
        .clear().type('08:00')
        .get('[data-cy=save-item]').first().click()
        .get('[data-cy=textfield-helper-end_time]').first().should('contain', 'Must be after')
        .get('[data-cy=textfield-input-end_time]')
        .clear().type('10:41')
        .get('[data-cy=total-time]').first().should('contain', '1 hour(s) 30 minutes')
        .get('[data-cy=textarea-description]').first()
        .clear().type('Writing e2e test specification.')
        .get('[data-cy=save-item]').first().click()
    })

    it('Add 8 hour work item', () => {
      cy
        .get('[data-cy=add-work-item]').first().click()
        .wait(1000)
        // TODO: test manually changing the day
        .get('[data-cy=textarea-description]').first()
        .clear().type('Writing e2e tests.')
        .get('[data-cy=save-item]').first().click()
    })

    it('Add full day work item', () => {
      cy
        .get('[data-cy=add-work-item]').first().click()
        .wait(1000)
        // TODO: test manually changing the day
        .get('[data-cy=textarea-description]').first()
        .clear().type('Documenting e2e tests.')
        .get('[data-cy=save-item]').first().click()
    })

    it('Test expense item validation', () => {
      cy
        .get('[data-cy=add-expense]').click()
        .wait(1000)
        .get('[data-cy=textfield-input-project_code]').click().clear().type('123 Testing')
        .get('[data-cy=save-item]').click()
        .get('[data-cy=textarea-helper-description]').should('contain', 'Required')
        // TODO: detect datepicker field's error
        // .get('[data-cy=selectfield-helper-expense_date]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-amount]').should('contain', 'Required')
        .get('[data-cy=document-upload-error-receipt_url]').should('contain', 'Required')

        .get('[data-cy=cancel-item]').click()
    })

    it('Add expense item', () => {
      cy
        .get('[data-cy=add-expense]').click()
        .wait(1000)
        .get('[data-cy=textarea-description]').clear().type('Buying e2e testing software.')
        // TODO: test manually changing the day
        .get('[data-cy=textfield-input-amount]')
        .clear().type('100')
        // Upload a receipt.
        mockUploadReceiptURL()
        .get('[data-cy=save-item]').click()
    })

    it('Can save timesheet', () => {
       cy
        .wait(2000) // Make sure save can be clicked properly.
        .get('[data-cy=save-timesheet]').click()
        .get('[data-cy=save-timesheet-confirm]').click()
        .currentURL({ timeout: 120000 }).should('equal', '/member/work_reports')
        .get('[data-cy=timesheets-table-body] > tr').should('have.length', 1)
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
    })
  })

  describe('Handles index actions properly', () => {
    before(() => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[11], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
    })

    beforeEach(() => {
      // If we remove the wait, sometimes the active contracts aren't fetched and the frontend thinks the timesheet can't be sumbmitted
      cy.login(freelancer4.email, freelancer4.password).visit('/member/timesheets').wait(5000)
    })

    it('Check correct amount of rows and their ordering', () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]').should('have.length', 2)
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0)').should('have.attr', 'data-cy-timesheet-id', timesheets[11].id.toString(10))
    })

    // TODO: stabilize this flaky test and re-enable.
    it.skip('Check view redirects (row click and dropdown)', () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0)').click()
        .currentURL().should('equal', `/member/work_reports/${timesheets[11].id}`, { timeout: 120000 })
        .menuNavigateTo('freelancer-navigation-timesheets')
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=timesheets-table-row-actions]').click()
        .get('[data-cy=timesheets-table-row-view]').click()
        .currentURL().should('equal', `/member/work_reports/${timesheets[11].id}`, { timeout: 120000 })
    })

    it("Timesheet with not high enough cost can't be submitted", () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=timesheets-table-row-actions]').click()
        .get('[data-cy-client-count]').should('have.attr', 'data-cy-client-count', '1') // Wait for clients to load.
        .get('[data-cy=timesheets-table-row-submit]').first().click()
        .get('[data-cy=checkbox-input-confirm_submit]', { timeout: 120000 }).checkIfUnchecked()
        .get('[data-cy=submit-timesheet]').click()
        .get('.snackbar-open').should('contain', 'total more than')
    })

    it('Submit a valid timesheet', () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(1) [data-cy=timesheets-table-row-actions]').click()
        .get('[data-cy=timesheets-table-row-submit]').last().click()
        .get('[data-cy=checkbox-input-confirm_submit]', { timeout: 5000 }).checkIfUnchecked()
        .get('[data-cy=submit-timesheet]').click()
        .get('.snackbar-open').should('contain', 'submitted')
    })

    it('Submitted timesheet has disabled drop-down options', () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(1) [data-cy=timesheets-table-row-actions]').click()
        .get('[data-cy=timesheets-table-row-submit]').last().parent().should(classNameIncludes('Mui-disabled'))
        .get('[data-cy=timesheets-table-row-delete]').last().parent().should(classNameIncludes('Mui-disabled'))
        .get('body').click() // Click away to close the popup
    })

    it('Delete a timesheet', () => {
      cy
        .get('[data-cy=timesheets-table-body] [data-cy=row]:eq(0) [data-cy=timesheets-table-row-actions]').click()
        .get('[data-cy=timesheets-table-row-delete]').first().click()
        .get('[data-cy=delete-timesheet]').click()
        .get('[data-cy=timesheets-table-body] > tr').should('have.length', 1)
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
    })
  })

  describe('Handles view actions properly', () => {
    before(() => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[2], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet', { params: { ...timesheets[11], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
    })

    beforeEach(() => {
      cy.login(freelancer4.email, freelancer4.password)
    })

    it("Timesheet with not high enough cost can't be submitted", () => {
      cy
        .visit(`/member/timesheets/${timesheets[11].id}`)
        .get('[data-cy=timesheet-submit]').first().click()
        .get('[data-cy=checkbox-input-confirm_submit]', { timeout: 120000 }).checkIfUnchecked()
        .get('[data-cy=submit-timesheet]').first().click()
        .get('.snackbar-open').first().should('contain', 'total more than')
    })

    it('Submit a valid timesheet', () => {
      cy
        .visit(`/member/timesheets/${timesheets[1].id}`)
        .get('[data-cy=timesheet-submit]').first().click()
        .get('[data-cy=checkbox-input-confirm_submit]', { timeout: 5000 }).checkIfUnchecked()
        .wait(1000)
        .get('[data-cy=submit-timesheet]').first().click()
        .get('.snackbar-open').first().should('contain', 'submitted')
        .visit(`/member/timesheets/${timesheets[1].id}`)
        .get('[data-cy=timesheet-actions]').first().should('contain', 'Awaiting Client Approval')
    })

    it('Delete a timesheet', () => {
      cy
        .visit(`/member/timesheets/${timesheets[2].id}`)
        .get('[data-cy=timesheet-delete]').first().click()
        .get('[data-cy=delete-timesheet]').first().click()
        .get('[data-cy=timesheets-table-body] > tr', { timeout: 120000 }).should('have.length', 2)
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
    })
  })

  describe('Timesheet data shown properly', () => {
    before(() => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet_expense', timesheetExpenses[1])
        .callTestAPI('create_timesheet_expense', timesheetExpenses[2])
    })

    it('Timesheet data and calculation results displayed properly', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit(`/member/timesheets/${timesheets[1].id}`)
        .get('[data-cy=page-title]', { timeout: 120000 })
          .should('contain', `${clients[1].first_name} ${clients[1].last_name}`)
        .get('[data-cy=page-subtitle]')
          .should('contain', 'Jan 14')
          .should('contain', 'Jan 19')
        .getByEnv('[data-cy=work-done-table-body] [data-cy=row]', '[data-cy=work-done-list] [data-cy=item]').should('have.length', 3)
      if (Cypress.env('RUN_RESOLUTION') !== 'MOBILE') {
        cy.get('[data-cy=work-done-table-footer]')
            .should('contain', '17h30m')
      }
    })

    it('Expense data displayed properly', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit(`/member/timesheets/${timesheets[1].id}`)
        .get('[data-cy=expenses-table-body] [data-cy=row]').should('have.length', 2)
    })

    it('Totals shown properly', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit(`/member/timesheets/${timesheets[1].id}`)
        .get('[data-cy=work-done-table-footer]').should('contain', '$1,120.00')
        .get('[data-cy=expenses-footer]').should('contain', '$200.00')
        .get('[data-cy=grand-total]').should('contain', '$1,320.00')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Expense', params: { timesheet_id: timesheets[1].id } })
        .callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
    })
  })

  describe('can edit an existing timesheet', () => {
    before(() => {
      cy
        .callTestAPI('create_timesheet', { params: { ...timesheets[1], client_id: clients[1].id, freelancer_id: freelancer4.id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_timesheet_expense', timesheetExpenses[1])
        .callTestAPI('create_timesheet_expense', timesheetExpenses[2])
    })

    beforeEach(() => {
      cy.login(freelancer4.email, freelancer4.password)
        .visit(`/member/timesheets/${timesheets[1].id}`)
    })

    it('Saves changes', () => {
      cy
        .get('[data-cy=edit-work-item]:nth(1)', { timeout: 120000 }).click()
        .get('[data-cy=cancel-item]').first().click()
        .get('[data-cy=edit-expense]').first().click()
        .get('[data-cy=cancel-item]').first().click()
        .get('[data-cy=save-timesheet]').first().click()
        .get('[data-cy=save-timesheet-confirm]').click()
        .wait(3000)
        .currentURL().should('equal', '/member/work_reports')
        .get('[data-cy=timesheets-table-body] [data-cy=row]').first().should('have.length', 1)
    })

    it('Has correct amounts and values', () => {
      // NOTE: this test depends on the previous one "Saves changes", if you only run this one it fails.
      cy
        // TODO: review the hours_by_day in the timesheet and git blame the following lines of code with the assertions. Figure out if the items are supposed to be 2 or 3, and update the assertions accordingly
        .getByEnv('[data-cy=work-done-table-body] [data-cy=row]', '[data-cy=work-done-list] [data-cy=item]').should('have.length', 2)
        .get('[data-cy=expenses-table-body] [data-cy=row]').should('have.length', 1)

      // Note: the totals for the work items are calculated using the freelancer_rate in the contract

      if (Cypress.env('RUN_RESOLUTION') !== 'MOBILE') {
        cy.get('[data-cy=work-done-table-footer]').first()
          .should('contain', '16h')
          .should('contain', '$1,024.00')
      }
      cy
        .get('[data-cy=expenses-footer]').should('contain', '$100.00')
        .get('[data-cy=grand-total]').should('contain', '$1,124.00')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Expense', params: { timesheet_id: timesheets[1].id } })
        .callTestAPI('delete_data', { model: 'Timesheet', params: { freelancer_id: freelancer4.id } })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.email } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
