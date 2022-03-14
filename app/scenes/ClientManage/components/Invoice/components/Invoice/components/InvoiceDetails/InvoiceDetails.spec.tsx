import React from 'react'
import { mount } from '@cypress/react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { createMoney } from 'services/testing'
import { InvoiceDetails_Test_Query } from '__generated__/InvoiceDetails_Test_Query.graphql'
import { RootState } from 'reducers'
import { IFirm, ICurrentUser } from 'types'
import InvoiceDetails from './InvoiceDetails'

// set up enough redux state for currentUser not to be considered a firmless user, and set up feature flag
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

// custom resolver
const resolver = {
  Currency: () => {
    return {
      code: 'USD',
    }
  },
  Invoice: () => {
    return {
      capitalExpenditureSubtotal: createMoney(500),
      operatingExpenditureSubtotal: createMoney(300),
      totalToPayClient: createMoney(1500),
    }
  },
  User: () => {
    return {
      name: 'John Doe',
    }
  },
}

// desktop version
Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

function InvoiceTestWrapper() {
  const data = useLazyLoadQuery<InvoiceDetails_Test_Query>(graphql`
    query InvoiceDetails_Test_Query($token: String!) {
      invoice(token: $token) {
        ...InvoiceDetails_Invoice
      }
    }
  `, {
    token: 'test-invoice-token',
  }, {
    fetchPolicy: 'store-and-network',
  })

  return (
    <InvoiceDetails
      invoiceFragmentRef={data?.invoice}
    />
  )
}

describe('with USD invoice', () => {
  let env: any

  describe('with work report item', () => {
    beforeEach(() => {
      env = createMockEnvironment()

      const resolverWithWorkReportItem = {
        ...resolver,
        InvoiceItem: () => {
          return {
            itemType: 'timesheet',
            description: 'Test item',
            totalAmount: createMoney(1500),
          }
        },
        PayrollItem: () => {
          return {
            type: 'timesheet',
          }
        },
        Timesheet: () => {
          return {
            projectCodes: ['123'],
            totalCapitalExpenditure: createMoney(500),
            totalOperatingExpenditure: createMoney(300),
          }
        },
      }

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithWorkReportItem} withSuspense withRedux={reduxState}>
          <InvoiceTestWrapper />
        </ComponentTestEnvironment>,
      )
    })

    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', 'Work Report')
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', 'Test item')
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', '$500')
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', '$300')
      cy.get('[data-cy=invoice-details-row]:eq(0)').should('contain', '$1,500')
    })
  })

  describe('with referral boost item', () => {
    beforeEach(() => {
      env = createMockEnvironment()

      const resolverWithWorkReportItem = {
        ...resolver,
        InvoiceItem: () => {
          return {
            itemType: 'referral_boost',
            description: 'Referral boost for John Doe',
            totalAmount: createMoney(1300),
            payrollItem: null,
          }
        },
      }

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithWorkReportItem} withSuspense withRedux={reduxState}>
          <InvoiceTestWrapper />
        </ComponentTestEnvironment>,
      )
    })

    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Referral Boost')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-freelancer-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-description]').should('contain', 'Referral boost for John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '$1,300')
    })
  })

  describe('with bonus grant item', () => {
    beforeEach(() => {
      env = createMockEnvironment()

      const resolverWithWorkReportItem = {
        ...resolver,
        InvoiceItem: () => {
          return {
            itemType: 'bonus',
            description: 'Bonus grant for John Doe',
            totalAmount: createMoney(600),
          }
        },
        PayrollItem: () => {
          return {
            type: 'bonus',
            timesheet: null,
          }
        },
      }

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithWorkReportItem} withSuspense withRedux={reduxState}>
          <InvoiceTestWrapper />
        </ComponentTestEnvironment>,
      )
    })

    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Bonus Grant')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-freelancer-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-description]').should('contain', 'Bonus grant for John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '$600')
    })
  })

  describe('with tracking log item', () => {
    beforeEach(() => {
      env = createMockEnvironment()

      const resolverWithWorkReportItem = {
        ...resolver,
        InvoiceItem: () => {
          return {
            itemType: 'tracking_log',
            totalAmount: createMoney(200),
            payrollItem: null,
          }
        },
      }

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithWorkReportItem} withSuspense withRedux={reduxState}>
          <InvoiceTestWrapper />
        </ComponentTestEnvironment>,
      )
    })

    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Platform Fee')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '-')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '$200')
    })
  })
})
