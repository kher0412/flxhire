import { mountHook } from '@cypress/react'
import { getGraphQLBaseURL } from 'api/graphql'
import { useBonusPreview } from './useBonusPreview'

const bonusPreviewOptions = {
  contractId: 'Y29udHJhY3RzLTkzOTE=',
  defaultClientBonus: 20,
  currencyCode: 'USD',
}

function interceptPreview(bonusPreview) {
  // We need HTTP intercepting because the component uses
  // fetchQuery instead of a hook, so it bypasses the mock
  // environment
  cy.intercept(getGraphQLBaseURL(), {
    statusCode: 200,
    body: {
      data: {
        bonusPreview,
      },
    },
  }).as('ratePreview')
}

describe('useBonusPreview', () => {
  it('clientBonus is of the expected amount', () => {
    interceptPreview({
      clientBonus: {
        value: 20,
        currency: {
          code: 'USD',
          id: 'Y3VycmVuY2llcy0x',
        },
      },
      memberBonus: {
        value: 20,
        currency: {
          code: 'USD',
          id: 'Y3VycmVuY2llcy0x',
        },
      },
    })

    mountHook(() => useBonusPreview(bonusPreviewOptions)).then((result) => {
      expect(result.current.clientBonus).to.equal(20)
      expect(result.current.memberBonus).to.equal(20)
    })
  })
})
