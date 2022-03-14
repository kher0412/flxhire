import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import { getGraphQLBaseURL } from 'api/graphql'
import { useContractPreview } from './useContractPreview'

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

describe('useContractPreview', () => {
  let env: any
  let contractPreview

  it('clientRate is of the expected amount', () => {
    interceptPreview({
      freelancerRate: {
        value: 25,
        currency: {
          code: 'USD',
          id: 'Y3VycmVuY2llcy0x',
        },
      },
      clientRate: {
        value: 30,
        currency: {
          code: 'USD',
          id: 'Y3VycmVuY2llcy0x',
        },
      },
    })

    const MockComponent: React.FC = () => {
      contractPreview = useContractPreview({
        rateMode: 'hour',
        contractId: 'Y29udHJhY3RzLTQ4MTY=',
        currencyCode: 'USD',
        freelancerEmail: 'test@email.com',
        defaultClientRate: 30,
        defaultMemberRate: 25,
      })

      return null
    }

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense>
        <MockComponent />
      </ComponentTestEnvironment>,
    ).then(() => {
      expect(contractPreview.clientRate).to.equal(30)
      expect(contractPreview.memberRate).to.equal(25)
    })
  })
})
