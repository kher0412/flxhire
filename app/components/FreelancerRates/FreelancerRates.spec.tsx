import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { FreelancerRates_TestQuery } from '__generated__/FreelancerRates_TestQuery.graphql'
import FreelancerRates from './FreelancerRates'

const TestRenderer = () => {
  const data = useLazyLoadQuery<FreelancerRates_TestQuery>(
    graphql`
        query FreelancerRates_TestQuery @relay_test_operation {
          freelancer: node(id: "test-freelancer-id") {
            ...FreelancerRates_Freelancer
          }
          contract: node(id: "test-contract-id") {
            ...FreelancerRates_Contract
          }
        }
      `, {},
  )
  return <FreelancerRates freelancer={data?.freelancer} contract={data?.contract} />
}

function resolveQuery(env, userData = null, contractData = null) {
  env.mock.resolveMostRecentOperation(operation => (
    MockPayloadGenerator.generate(operation, {
      User() {
        return userData
      },
      Contract() {
        return contractData
      },
    })
  ))
}

describe('without contract', () => {
  it('displays profile rate', () => {
    const env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense>
        <TestRenderer />
      </ComponentTestEnvironment>,
    ).then(() => {
      resolveQuery(env, {
        profile: {
          jobTypes: ['freelance'],
          availabilityType: ['full-time'],
          clientRate: {
            value: 100,
            currency: {
              code: 'USD',
            },
          },
        },
      })
    })

    cy.get('[data-cy=compensation-hourly-rate]').should('contain', '$100/hr')
      .get('[data-cy=annual-compensation]').should('not.exist')
  })

  it('displays profile annual compensation', () => {
    const env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense>
        <TestRenderer />
      </ComponentTestEnvironment>,
    ).then(() => {
      resolveQuery(env, {
        profile: {
          jobTypes: ['permanent'],
          availabilityType: ['full-time'],
          annualCompensation: {
            value: 10000,
            currency: {
              code: 'USD',
            },
          },
        },
      })
    })

    cy.get('[data-cy=annual-compensation]').should('contain', '$10,000')
      .get('[data-cy=compensation-hourly-rate]').should('not.exist')
  })
})

describe('with expired contract', () => {
  it('displays contract rate', () => {
    const env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense>
        <TestRenderer />
      </ComponentTestEnvironment>,
    ).then(() => {
      resolveQuery(env, {
        profile: {
          jobTypes: ['freelance'],
          availabilityType: ['full-time'],
          clientRate: {
            value: 100,
            currency: {
              code: 'USD',
            },
          },
        },
      }, {
        status: 'expired',
        clientRate: {
          value: 200,
          currency: {
            code: 'USD',
          },
        },
        rateMode: 'hour',
      })
    })

    cy.get('[data-cy=compensation-hourly-rate]').should('contain', '$200/hr')
      .get('[data-cy=annual-compensation]').should('not.exist')
    cy.get('[data-cy=compensation-hourly-rate]').click()
      .get('[data-cy=compensation-fees]').should('contain', '$4.2 daily fee')
  })
})
