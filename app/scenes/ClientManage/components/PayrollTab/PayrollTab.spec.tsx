import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { resolveAllPendingOperations } from 'services/testing'
import PayrollTab from './PayrollTab'

// set up enough redux state for currentUser not to be considered a firmless user
const reduxState: Partial<RootState> = {
  auth: {
    currentUser: {
      firm: {
        name: 'Test',
        slug: 'test',
      } as IFirm,
    } as ICurrentUser,
  } as any,
}

// need a larger viewport for sidebar to show up (for simplicity sake)
Cypress.config({
  viewportWidth: 1920,
  viewportHeight: 1080,
})

// custom resolver
const resolver = {
  User: () => {
    return {
      id: 'test-user',
      firstName: 'payroll',
      lastName: 'member',
      name: 'payroll member',
    }
  },
  PayrollItem: () => {
    return {
      id: 'test',
      type: 'salary',
      status: 'pending',
    }
  },
}

describe('reading', () => {
  let env: any
  let refreshHandler: () => void

  beforeEach(() => {
    env = createMockEnvironment()
    refreshHandler = cy.stub()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <PayrollTab refresh={refreshHandler} />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual data is set in the custom resolver
      cy.get('[data-cy=payroll-item]').should('have.length', 1)
        .get('[data-cy=payroll-item]:eq(0)').should('contain', 'Monthly Salary')
        .get('[data-cy=payroll-item]:eq(0)').should('contain', 'Pending Invoicing')
        .get('[data-cy=payroll-item]:eq(0)').should('contain', 'payroll member')
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-name]').click().type('Riccardo Pizzuti')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Riccardo Pizzuti'))
      })
    })

    describe('by type', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-type]').click()
        cy.get('[data-cy=select-type-option-timesheet]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.type').equal('timesheet'))

        cy.get('[data-cy=select-type]').click()
        cy.get('[data-cy=select-type-option-salary]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.type').equal('salary'))

        cy.get('[data-cy=select-type]').click()
        cy.get('[data-cy=select-type-option-bonus]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.type').equal('bonus'))

        cy.get('[data-cy=select-type]').click()
        cy.get('[data-cy=select-type-option-all]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.type').equal(null))
      })
    })

    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-pending]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('pending'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-waiting]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('waiting'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-processing]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('processing'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-paid]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('paid'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-all]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal(null))
      })
    })
  })
})

describe('updating', () => {
  let env: any
  let refreshHandler: () => void

  beforeEach(() => {
    env = createMockEnvironment()
    refreshHandler = cy.stub()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux={reduxState}>
        <PayrollTab refresh={refreshHandler} />
      </ComponentTestEnvironment>,
    )
  })

  describe('with single pending payroll item', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
      cy.wait(10)
      cy.then(() => resolveAllPendingOperations(env, resolver))
    })

    describe('generating invoices', () => {
      it('is enabled', () => {
        cy.get('[data-cy=payroll-item-checkbox]:eq(0) input').should('not.be.disabled')
      })

      describe('for contract managers', () => {
        it('sends correct mutation', () => {
          cy.get('[data-cy=payroll-item-checkbox]:eq(0)').click()
          cy.get('[data-cy=invoice-pay-selected]').click()
          cy.get('[data-cy=invoice-pay-selected-default]').click()
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.forceAutoPay').not.equal(true))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.payrollItemIds').length(1))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.payrollItemIds[0]').equal('test'))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.managerId').equal(undefined))
          cy.then(() => resolveAllPendingOperations(env, resolver))
        })
      })

      describe('for current user', () => {
        it('sends correct mutation', () => {
          cy.get('[data-cy=payroll-item-checkbox]:eq(0)').click()
          cy.get('[data-cy=invoice-pay-selected]').click()
          cy.get('[data-cy=invoice-pay-selected-to-me]').click()
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.forceAutoPay').not.equal(true))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.payrollItemIds').length(1))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.payrollItemIds[0]').equal('test'))
          cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.managerId').equal('test-user'))
          cy.then(() => resolveAllPendingOperations(env, resolver))
        })
      })
    })
  })

  describe('with paid payroll items', () => {
    let resolverPaidItems = {
      ...resolver,
      PayrollItem: () => {
        return {
          id: 'test',
          type: 'salary',
          status: 'paid',
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverPaidItems))
      cy.wait(10)
      cy.then(() => resolveAllPendingOperations(env, resolverPaidItems))
    })

    describe('generating invoices', () => {
      it('is disabled', () => {
        cy.get('[data-cy=payroll-item-checkbox]:eq(0) input').should('be.disabled')
      })
    })
  })
})
