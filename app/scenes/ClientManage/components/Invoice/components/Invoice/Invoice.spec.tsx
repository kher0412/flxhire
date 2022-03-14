import React from 'react'
import { mount } from '@cypress/react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { createMockEnvironment } from 'relay-test-utils'
import { createMoney } from 'services/testing'
import { ComponentTestEnvironment } from 'components/testing'
import { Invoice_Test_Query } from '__generated__/Invoice_Test_Query.graphql'
import { RootState } from 'reducers'
import { IFirm, ICurrentUser } from 'types'
import Invoice from './Invoice'

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
      invoiceItemsExchangeRates: [],
    }
  },
  InvoiceItem: () => {
    return {
      description: 'Test item',
      totalAmount: createMoney(1500),
      amountExchanged: false,
      currency: {
        code: 'USD',
      },
      itemTypeHumanized: 'Work Report',
    }
  },
  PayrollItem: () => {
    return {
      type: 'timesheet',
    }
  },
  User: () => {
    return {
      name: 'John Doe',
    }
  },
  Timesheet: () => {
    return {
      projectCodes: ['123'],
      totalCapitalExpenditure: createMoney(500),
      totalOperatingExpenditure: createMoney(300),
    }
  },
  BankTransferDetails: () => {
    return {
      achAccountNumber: 'ach-account-number',
      achRoutingNumber: 'ach-routing-number',
      institutionName: 'institution-name',
      swiftCode: 'swift-code',
    }
  },
}

// desktop version
Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

function InvoiceTestWrapper() {
  const data = useLazyLoadQuery<Invoice_Test_Query>(graphql`
    query Invoice_Test_Query($token: String!) {
      invoice(token: $token) {
        ...Invoice_Invoice
      }
    }
  `, {
    token: 'test-invoice-token',
  }, {
    fetchPolicy: 'store-and-network',
  })

  return (
    <Invoice
      invoiceFragmentRef={data?.invoice}
    />
  )
}

describe('with USD invoice', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <InvoiceTestWrapper />
      </ComponentTestEnvironment>,
    )
  })

  describe('data display', () => {
    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Work Report')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-freelancer-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-description]').should('contain', 'Test item')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '$500')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '$300')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '$1,500')
    })

    it('shows bank transfer details', () => {
      cy.get('[data-cy=bank-transfer-details-institution-name]').should('contain', 'institution-name')
      cy.get('[data-cy=bank-transfer-details-ach-account-number]').should('contain', 'ach-account-number')
      cy.get('[data-cy=bank-transfer-details-ach-routing-number]').should('contain', 'ach-routing-number')
      cy.get('[data-cy=bank-transfer-details-swift-code]').should('contain', 'swift-code')
    })

    it('does not show rate exchange details', () => {
      cy.get('[data-cy=exchange-rate-hint]').should('not.exist')
    })
  })
})

describe('with USD invoice with conversion', () => {
  // custom resolver
  const resolverWithEur = {
    ...resolver,
    Currency: () => {
      return {
        code: 'USD',
      }
    },
    InvoiceItem: () => {
      return {
        description: 'Test item',
        totalAmount: createMoney(1500),
        amountExchanged: true,
        itemTypeHumanized: 'Work Report',
      }
    },
    Invoice: () => {
      return {
        capitalExpenditureSubtotal: createMoney(500),
        operatingExpenditureSubtotal: createMoney(300),
        totalToPayClient: createMoney(1500),
        invoiceItemsExchangeRates: [{
          value: 2.0,
        }],
      }
    },
  }

  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithEur} withSuspense withRedux={reduxState}>
        <InvoiceTestWrapper />
      </ComponentTestEnvironment>,
    )
  })

  describe('data display', () => {
    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Work Report')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-freelancer-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-description]').should('contain', 'Test item')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '$500*')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '$300*')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '$1,500*')
    })

    it('shows bank transfer details', () => {
      cy.get('[data-cy=bank-transfer-details-institution-name]').should('contain', 'institution-name')
      cy.get('[data-cy=bank-transfer-details-ach-account-number]').should('contain', 'ach-account-number')
      cy.get('[data-cy=bank-transfer-details-ach-routing-number]').should('contain', 'ach-routing-number')
      cy.get('[data-cy=bank-transfer-details-swift-code]').should('contain', 'swift-code')
    })

    it('shows rate exchange details', () => {
      // TODO: testing the source currency code is difficult, because relay keeps substituting 3rd level overrides with resolvers
      // for now, only the target currency is tested, as well as the exchange rate value itself
      cy.get('[data-cy=exchange-rate-hint]').should('exist')
      cy.get('[data-cy=exchange-rate-hint]').should('contain', 'to USD: 1:2')
    })
  })
})

describe('with EUR invoice', () => {
  // custom resolver
  const resolverWithEur = {
    ...resolver,
    Currency: () => {
      return {
        code: 'EUR',
      }
    },
    Invoice: () => {
      return {
        capitalExpenditureSubtotal: createMoney(500, 'EUR'),
        operatingExpenditureSubtotal: createMoney(300, 'EUR'),
        totalToPayClient: createMoney(1500),
        invoiceItemsExchangeRates: [],
      }
    },
    InvoiceItem: () => {
      return {
        description: 'Test item',
        totalAmount: createMoney(1500, 'EUR'),
        amountExchanged: false,
        itemTypeHumanized: 'Work Report',
      }
    },
    Timesheet: () => {
      return {
        projectCodes: ['123'],
        totalCapitalExpenditure: createMoney(500, 'EUR'),
        totalOperatingExpenditure: createMoney(300, 'EUR'),
      }
    },
  }

  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolverWithEur} withSuspense withRedux={reduxState}>
        <InvoiceTestWrapper />
      </ComponentTestEnvironment>,
    )
  })

  describe('data display', () => {
    it('shows correct data from query', () => {
      cy.get('[data-cy=invoice-details-row]').should('have.length', 1)
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-type]').should('contain', 'Work Report')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-freelancer-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-manager-name]').should('contain', 'John Doe')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-description]').should('contain', 'Test item')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-capex]').should('contain', '€500')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-opex]').should('contain', '€300')
      cy.get('[data-cy=invoice-details-row]:eq(0) [data-cy=invoice-item-total]').should('contain', '€1,500')
      cy.get('[data-cy=invoice-capex]').should('contain', '€500')
      cy.get('[data-cy=invoice-opex]').should('contain', '€300')
      cy.get('[data-cy=invoice-total]').should('contain', '€1,500')
    })

    it('shows bank transfer details', () => {
      cy.get('[data-cy=bank-transfer-details-institution-name]').should('contain', 'institution-name')
      cy.get('[data-cy=bank-transfer-details-ach-account-number]').should('contain', 'ach-account-number')
      cy.get('[data-cy=bank-transfer-details-ach-routing-number]').should('contain', 'ach-routing-number')
      cy.get('[data-cy=bank-transfer-details-swift-code]').should('contain', 'swift-code')
    })

    it('does not show rate exchange details', () => {
      cy.get('[data-cy=exchange-rate-hint]').should('not.exist')
    })
  })
})
