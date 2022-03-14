import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { RequestMoreInfoDialog_Test_Query } from '__generated__/RequestMoreInfoDialog_Test_Query.graphql'
import { resolveAllPendingOperations } from 'services/testing'
import RequestMoreInfoDialog from './RequestMoreInfoDialog'

function RequestMoreInfoDialogTest({ freelancerId, contractId }) {
  const data = useLazyLoadQuery<RequestMoreInfoDialog_Test_Query>(graphql`
    query RequestMoreInfoDialog_Test_Query($freelancerId: Int, $contractId: Int, $withContract: Boolean!, $withFreelancer: Boolean!) {
      contract(rawId: $contractId) @include(if: $withContract) {
        job {
          ...RequestMoreInfoDialog_Job
        }
        ...RequestMoreInfoDialog_Contract
      }
      freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
        ...RequestMoreInfoDialog_Freelancer
      }
    }
  `, {
    freelancerId,
    contractId,
    withContract: Boolean(contractId),
    withFreelancer: Boolean(freelancerId),
  }, {
    fetchPolicy: 'store-and-network',
  })

  return (
    <RequestMoreInfoDialog
      contract={data?.contract}
      freelancer={data?.freelancer}
      job={data?.contract?.job}
      open
      onClose={() => { }}
      connectionId="test"
    />
  )
}

describe('with job saved question', () => {
  let env: any
  let resolver = {
    Question: () => {
      return {
        rawId: 7777,
        title: 'test question',
      }
    },
    Contract: () => {
      return {
        contractRequests: [],
        answers: [],
      }
    },
  }

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withRedux withSuspense>
        <RequestMoreInfoDialogTest freelancerId={1} contractId={1} />
      </ComponentTestEnvironment>,
    )

    cy.then(() => resolveAllPendingOperations(env, resolver))
  })

  describe('initial state', () => {
    it('renders question saved on job', () => {
      cy.get('[data-cy=question-7777]').should('contain', 'test question')
        .get('[data-cy=question-7777]').should('contain', 'Not Sent')
    })

    it('sends saved question', () => {
      cy.get('[data-cy=send]').click()
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questionsIds').contain(7777))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questionsIds').length(1))
    })
  })

  describe('deleting saved question', () => {
    it('removes it from list', () => {
      cy.get('[data-cy=question-7777-delete]').click()
        .get('[data-cy=question-7777]').should('not.exist')
    })

    it('saved question will not be sent', () => {
      // note: we need some other question to be able to send the request, so we'll use a custom question for that in this test
      cy.get('[data-cy=question-7777-delete]').click()
        .get('[data-cy=textfield-input-title]').type('new question')
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=send]').click()
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questionsIds').length(0))
    })
  })

  describe('adding custom question', () => {
    it('sends custom question', () => {
      cy.get('[data-cy=textfield-input-title]').type('new question')
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=send]').click()
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questionsTitles').contain('new question'))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questionsTitles').length(1))
    })
  })
})
