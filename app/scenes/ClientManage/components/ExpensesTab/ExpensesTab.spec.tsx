import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import ExpensesTab from './ExpensesTab'

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
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  Expense: () => {
    return {
      rawId: 1,
      timesheet: {
        status: 'approved',
        approvedAt: '2021-11-11',
        submittedAt: '2021-11-11',
        payrollItem: {
          invoiceItem: {
            invoice: {
              invoiceNum: 11,
            },
          },
        },
        client: {
          name: 'Brian',
        },
        freelancer: {
          name: 'Freelancer',
        },
      },
      amount: 2074,
      currency: {
        code: 'USD',
      },
    }
  },
}

const ExpensesTabTest = () => {
  return (
    <ExpensesTab />
  )
}

describe('reading', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <ExpensesTabTest />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual data is set in the custom resolver
      cy.get('[data-cy=expense-item]').should('have.length', 1)
        .get('[data-cy=expense-item]:eq(0)').should('contain', 'Approved')
        .get('[data-cy=expense-item]:eq(0)').should('contain', 'Brian')
        .get('[data-cy=expense-item]:eq(0)').should('contain', 'Freelancer')
        .get('[data-cy=expense-item]:eq(0)').should('contain', '#11')
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-name]').click().type('Freelancer')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Freelancer'))
      })
    })

    describe('by invoice number', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-invoice]').click().type('11')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.invoiceNum').equal(11))
      })
    })

    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-approved]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('approved'))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-submitted]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.status').equal('submitted'))

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
