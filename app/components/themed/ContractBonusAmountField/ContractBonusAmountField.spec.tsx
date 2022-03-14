import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import { useFormValue } from 'hooks'
import { getGraphQLBaseURL } from 'api/graphql'
import ContractBonusAmountField from './ContractBonusAmountField'

const TestRenderer = ({ contractId }: { contractId?: string }) => {
  const clientRate = useFormValue<number>('client_rate')

  return (
    <ContractBonusAmountField
      input={clientRate.input}
      meta={clientRate.meta}
      contractId={contractId}
      currency={{ code: 'USD', symbol: '$' }}
    />
  )
}

function interceptPreview(bonusPreview) {
  // We need HTTP intercepting because the component uses
  // fetchQuery instead of a hook, so it bypasses the mock
  // environment
  cy.intercept(getGraphQLBaseURL(), {
    statusCode: 200,
    body: {
      data: {
        contract: {
          bonusPreview: bonusPreview,
        },
      },
    },
  }).as('bonusPreview')
}

function checkRates(clientBonus: number, memberBonus: number) {
  cy
    .get('[data-cy=textfield-input-client_rate]').invoke('attr', 'value').should('equal', `${clientBonus}`)
    .get('[data-cy=textfield-input-member_rate]').invoke('attr', 'value').should('equal', `${memberBonus}`)
}

describe('entering client rate', () => {
  it('correctly fetches member rate', () => {
    interceptPreview({
      clientBonus: 100,
      memberBonus: 80,
    })

    mount(
      <ComponentTestEnvironment withSuspense withRedux>
        <TestRenderer contractId="test-id" />
      </ComponentTestEnvironment>,
    )

    cy.get('[data-cy=textfield-input-client_rate]').clear().type('100')
    checkRates(100, 80)
  })
})

describe('entering member rate', () => {
  it('correctly fetches client rate', () => {
    interceptPreview({
      clientBonus: 100,
      memberBonus: 80,
    })

    mount(
      <ComponentTestEnvironment withSuspense withRedux>
        <TestRenderer contractId="test-id" />
      </ComponentTestEnvironment>,
    )

    cy.get('[data-cy=textfield-input-member_rate]').clear().type('80')
    checkRates(100, 80)
  })
})
