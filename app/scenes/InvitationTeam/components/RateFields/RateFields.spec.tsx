import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import { useFormValue } from 'hooks'
import { Currency } from 'types'
import { getGraphQLBaseURL } from 'api/graphql'
import { ContractPreviewAttributes } from '__generated__/useContractPreview_ContractPreviewQuery.graphql'
import { MoneyInput } from '__generated__/RatePreviewText_ContractPreviewQuery.graphql'
import RateFields from './RateFields'

const TestRenderer = ({ contractId }: { contractId?: string }) => {
  const clientRate = useFormValue<MoneyInput>('client_rate')
  const rateMode = useFormValue<string>('rate_mode', 'hour')
  const currency = useFormValue<string>('currency', 'USD')
  return (
    <RateFields
      currencies={[{ code: 'EUR' } as Currency, { code: 'USD', symbol: '$' } as Currency]}
      currency={currency}
      client_rate={clientRate}
      rate_mode={rateMode}
      freelancerFirstName="Test"
      freelancerEmail="test@flexhire.com"
      freelancerRate={{ value: 0, currencyCode: currency.toString() }}
      offerMode={Boolean(contractId)}
      firstInvitation={false}
      contractId={contractId}
    />
  )
}

function interceptPreview(contractPreview) {
  // We need HTTP intercepting because the component uses
  // fetchQuery instead of a hook, so it bypasses the mock
  // environment
  cy.intercept(getGraphQLBaseURL(), {
    statusCode: 200,
    body: {
      data: {
        contractPreview,
      },
    },
  }).as('ratePreview')
}

function checkRates(source, clientRate, memberRate, contractId = null) {
  cy.wait('@ratePreview').should(({ request }) => {
    const payload: ContractPreviewAttributes = {
      currency: 'USD',
      clientRate: source === 'member' ? 0 : clientRate,
      freelancerRate: source === 'client' ? 0 : memberRate,
      freelancerEmail: 'test@flexhire.com',
      rateMode: 'hour',
    }
    if (contractId) payload.contractId = contractId
    expect(request.body?.variables?.input).to.deep.equal(payload)
  })
    .get('[data-cy=textfield-input-client_rate]').invoke('attr', 'value').should('equal', `${clientRate}`)
    .get('[data-cy=textfield-input-member_rate]').invoke('attr', 'value').should('equal', `${memberRate}`)
}

describe('with no contract', () => {
  describe('entering client rate', () => {
    it('correctly fetches member rate', () => {
      interceptPreview({
        clientRate: 100,
        freelancerRate: 80,
      })

      mount(
        <ComponentTestEnvironment withSuspense withRedux>
          <TestRenderer />
        </ComponentTestEnvironment>,
      )

      cy.get('[data-cy=textfield-input-client_rate]').clear().type('100')
      checkRates('client', 100, 80)
    })
  })

  describe('entering member rate', () => {
    it('correctly fetches client rate', () => {
      interceptPreview({
        clientRate: 100,
        freelancerRate: 80,
      })

      mount(
        <ComponentTestEnvironment withSuspense withRedux>
          <TestRenderer />
        </ComponentTestEnvironment>,
      )

      cy.get('[data-cy=textfield-input-member_rate]').clear().type('80')
      checkRates('member', 100, 80)
    })
  })
})

describe('with contract', () => {
  describe('entering client rate', () => {
    it('correctly fetches member rate', () => {
      interceptPreview({
        clientRate: 100,
        freelancerRate: 80,
      })

      mount(
        <ComponentTestEnvironment withSuspense withRedux>
          <TestRenderer contractId="test-id" />
        </ComponentTestEnvironment>,
      )

      cy.get('[data-cy=textfield-input-client_rate]').clear().type('100')
      checkRates('client', 100, 80, 'test-id')
    })
  })

  describe('entering member rate', () => {
    it('correctly fetches client rate', () => {
      interceptPreview({
        clientRate: 100,
        freelancerRate: 80,
      })

      mount(
        <ComponentTestEnvironment withSuspense withRedux>
          <TestRenderer contractId="test-id" />
        </ComponentTestEnvironment>,
      )

      cy.get('[data-cy=textfield-input-member_rate]').clear().type('80')
      checkRates('member', 100, 80, 'test-id')
    })
  })
})
