import moment from 'moment'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { ensureDateAsString, formatAsDate } from 'services/formatting'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { PayrollAutoInvoiceDialogTest_Query } from '__generated__/PayrollAutoInvoiceDialogTest_Query.graphql'
import { resolveAllPendingOperations } from 'services/testing'
import PayrollAutoInvoiceDialog from './PayrollAutoInvoiceDialog'

const nextAutoInvoiceMoment = moment().day(8) // always equals next monday

const buildResolver = (options = {}) => ({
  Firm: () => {
    return {
      invoiceSchedule: 'weekly',
      nextAutoInvoiceDate: ensureDateAsString(nextAutoInvoiceMoment),
      invoiceSalariesInAdvance: false,
      ...options,
    }
  },
})

const PayrollAutoInvoiceDialogTest = () => {
  const data = useLazyLoadQuery<PayrollAutoInvoiceDialogTest_Query>(graphql`
    query PayrollAutoInvoiceDialogTest_Query {
      currentUser {
        firm {
          ...PayrollAutoInvoiceDialog_Firm
        }
      }
    }
  `, {})

  return (
    <PayrollAutoInvoiceDialog firmFragmentRef={data?.currentUser?.firm} />
  )
}

let env: any

beforeEach(() => {
  env = createMockEnvironment()

  mount(
    <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux>
      <PayrollAutoInvoiceDialogTest />
    </ComponentTestEnvironment>,
  )
})

it('shows current schedule', () => {
  cy.then(() => resolveAllPendingOperations(env, buildResolver()))
  cy.get('[data-cy=auto-invoicing-info]').should('contain', formatAsDate(nextAutoInvoiceMoment))
})

it('opens edit dialog', () => {
  cy.then(() => resolveAllPendingOperations(env, buildResolver()))
  cy.get('[data-cy=settings-explanation]').should('not.exist')
    .get('[data-cy=edit-auto-invoicing]').click()
    .get('[data-cy=settings-explanation]').should('exist')
})

it('can change weekly day and save', () => {
  cy
    .then(() => resolveAllPendingOperations(env, buildResolver()))
    .get('[data-cy=loading-icon]').should('not.exist')
    .get('[data-cy=edit-auto-invoicing]').click()
    .get('[data-cy=select-day-of-week]').click()
    .get('[data-value=2]').click() // tuesday instead of monday
    .get('[data-cy=save]').click()
    .get('[data-cy=loading-icon]').should('exist')

  const tuesday = nextAutoInvoiceMoment.day(2)

  cy.then(() => {
    expect(moment(env.mock.getMostRecentOperation().request.variables.input.nextAutoInvoiceDate).day()).equal(2) // tuesday
    expect(env.mock.getMostRecentOperation().request.variables.input.invoiceSchedule).equal('weekly')
    expect(env.mock.getMostRecentOperation().request.variables.input.invoiceSalariesInAdvance).equal(false)
  })
    .then(() => resolveAllPendingOperations(env, buildResolver({ nextAutoInvoiceDate: tuesday })))
    .get('[data-cy=loading-icon]').should('not.exist')
    .get('[data-cy=auto-invoicing-info]').should('contain', formatAsDate(tuesday))
})

it('can change schedule to monthly and invoice salaries in advance', () => {
  cy
    .then(() => resolveAllPendingOperations(env, buildResolver()))
    .get('[data-cy=loading-icon]').should('not.exist')
    .get('[data-cy=edit-auto-invoicing]').click()
    .get('[data-cy=checkbox-field-salary-in-advance]').should('not.exist')
    .get('[data-cy=select-schedule]').click()
    .get('[data-value=monthly]').click()
    .get('[data-cy=checkbox-field-salary-in-advance] input').should('exist')
    .get('[data-cy=checkbox-field-salary-in-advance] input').should('not.be.checked')
    .get('[data-cy=checkbox-field-salary-in-advance] input').check()
    .get('[data-cy=save]').click()
    .get('[data-cy=loading-icon]').should('exist')

  cy.then(() => {
    expect(moment(env.mock.getMostRecentOperation().request.variables.input.nextAutoInvoiceDate)).to.not.be.null
    expect(env.mock.getMostRecentOperation().request.variables.input.invoiceSchedule).equal('monthly')
    expect(env.mock.getMostRecentOperation().request.variables.input.invoiceSalariesInAdvance).equal(true)
  })
    .then(() => resolveAllPendingOperations(env, buildResolver({ invoiceSchedule: 'monthly', invoiceSalariesInAdvance: true })))
    .get('[data-cy=loading-icon]').should('not.exist')
    .get('[data-cy=edit-auto-invoicing]').click()
    .get('[data-cy=checkbox-field-salary-in-advance] input').should('be.checked')
})
