import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { resolveAllPendingOperations } from 'services/testing'
import CandidatesField from './CandidatesField'

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  Candidate: () => {
    return {
      id: 'candidate-1',
    }
  },
  Skill: () => {
    return {
      id: 'skill-1',
      name: 'FlexOS',
      freelancerTypeId: 1,
    }
  },
  JobSkill: () => {
    return {
      id: 'job-skill-1',
      name: 'FlexOS',
    }
  },
  FreelancerType: () => {
    return {
      id: 'freelancer-type-1',
      rawId: 1,
      name: 'Tech',
      slug: 'tech',
    }
  },
}

function CandidatesFieldTest({ jobSlug }) {
  return (
    <CandidatesField
      jobSlug={jobSlug}
      status="draft"
      automatically_notify_candidates={{
        input: {
          name: 'automatically_notify_candidates',
          value: true,
          onChange: () => { },
        },
        meta: {},
      }}
      candidates_to_notify={{
        input: {
          name: 'candidates_to_notify',
          value: [],
          onChange: () => { },
        },
        meta: {},
      }}
    />
  )
}

describe('with draft job', () => {
  let env: any
  let draftJobResolver = {
    ...resolver,
    Job: () => {
      return {
        id: 'job-1',
        slug: 'recaptcha-farm-slave',
        status: 'draft',
        activeJobIntegrationsNames: [],
      }
    },
  }

  beforeEach(() => {
    env = createMockEnvironment()
    mockRouter.setCurrentUrl('/client/job/recaptcha-farm-slave/sourcing')

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux withRouter={mockRouter}>
        <CandidatesFieldTest jobSlug="recaptcha-farm-slave" />
      </ComponentTestEnvironment>,
    )
  })

  describe('with perfect match only', () => {
    const resolverWithPerfectCandidate = {
      ...draftJobResolver,
      Candidate: () => {
        return {
          id: 'candidate-1',
          jobIncompatibilityReasons: [],
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
    })

    describe('initial state', () => {
      it('renders flexhire recommended toggle', () => {
        cy.get('[data-cy=checkbox-input-automatically_notify_candidates]').should('exist')
      })

      it('does not render candidates-divider', () => {
        cy.wait(100)
          .get('[data-cy=sourcing-candidates-divider]').should('not.exist')
      })

      it('sends correct query', () => {
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.jobSlug').equal('recaptcha-farm-slave'))
      })
    })
  })

  describe('with partial match only', () => {
    const resolverWithPerfectCandidate = {
      ...draftJobResolver,
      Candidate: () => {
        return {
          id: 'candidate-1',
          jobIncompatibilityReasons: ['skills'],
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
        .wait(10)
        .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
    })

    describe('initial state', () => {
      it('does not render flexhire recommended toggle', () => {
        cy.wait(100)
          .get('[data-cy=checkbox-input-automatically_notify_candidates]').should('not.exist')
      })

      it('renders candidates-divider', () => {
        cy.wait(100)
          .get('[data-cy=sourcing-candidates-divider]').should('exist')
      })
    })
  })
})
