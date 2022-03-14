import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { resolveAllPendingOperations } from 'services/testing'
import { JobScreeningStep_Test_JobQuery } from '__generated__/JobScreeningStep_Test_JobQuery.graphql'
import JobScreeningStep from './JobScreeningStep'

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  FreelancerType: () => {
    return {
      id: 'freelancer-type-1',
      rawId: 1,
      name: 'Tech',
      slug: 'tech',
    }
  },
  Project: () => {
    return {
      rawId: 1,
      title: 'Project title',
      description: 'Project description',
    }
  },
  Question: () => {
    return {
      rawId: 1,
      title: 'Existing question title',
      description: 'Existing question description',
    }
  },
}

function JobScreeningStepTest({ continueHandler, jobSlug }) {
  const data = useLazyLoadQuery<JobScreeningStep_Test_JobQuery>(graphql`
    query JobScreeningStep_Test_JobQuery($jobSlug: String, $hasJob: Boolean!) {
      job(slug: $jobSlug) @include(if: $hasJob) {
        ...JobScreeningStep_Job
      }
    }
  `, {
    hasJob: Boolean(jobSlug),
    jobSlug: jobSlug,
  })

  return (
    <JobScreeningStep onContinue={continueHandler} jobFragmentRef={data?.job} />
  )
}

describe('for draft job', () => {
  let env: any
  let continueHandler: Function

  beforeEach(() => {
    env = createMockEnvironment()
    continueHandler = cy.stub()
    mockRouter.setCurrentUrl('/client/job/recaptcha-farm-slave/screening')

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux withRouter={mockRouter}>
        <JobScreeningStepTest continueHandler={continueHandler} jobSlug="recaptcha-farm-slave" />
      </ComponentTestEnvironment>,
    )
  })

  describe('without screening', () => {
    let draftJobResolver = {
      ...resolver,
      Job: () => {
        return {
          id: 'job-1',
          slug: 'recaptcha-farm-slave',
          status: 'draft',
          questions: [],
          project: null,
          autoSendScreeningRequests: false,
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, draftJobResolver))
    })

    describe('initial state', () => {
      it('defaults to no screening', () => {
        cy.get('[data-cy=screening-mode-none] input').should('be.checked')
      })
    })

    describe('continuing to next step', () => {
      it('calls onContinue', () => {
        cy.get('[data-cy=screening-mode-none]').click() // default, but makes the test more resilient
          .get('[data-cy=job-continue]').click()
          .wait(10)
          .then(() => resolveAllPendingOperations(env, draftJobResolver))
          .wait(10)
          .then(() => expect(continueHandler).to.have.been.called)
      })

      it('sends correct query', () => {
        cy.get('[data-cy=screening-mode-none]').click() // default, but makes the test more resilient
          .get('[data-cy=job-continue]').click()
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(false))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.project').deep.equal({ rawId: -1 }))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(0))
      })
    })
  })

  describe('with existing auto-screening', () => {
    let draftJobResolver = {
      ...resolver,
      Job: () => {
        return {
          id: 'job-1',
          slug: 'recaptcha-farm-slave',
          status: 'draft',
          autoSendScreeningRequests: true,
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, draftJobResolver))
    })

    describe('initial state', () => {
      it('defaults to auto screening', () => {
        cy.get('[data-cy=screening-mode-automatic] input').should('be.checked')
      })
    })

    describe('continuing to next step', () => {
      describe('as-is', () => {
        it('calls onContinue', () => {
          cy.get('[data-cy=job-continue]').click()
            .wait(10)
            .then(() => resolveAllPendingOperations(env, draftJobResolver))
            .wait(10)
            .then(() => expect(continueHandler).to.have.been.called)
        })

        it('sends correct query', () => {
          // note about project: the rawId is not strictly required to be sent,
          // as the backend will attempt to identify an existing project by title and description
          // however the correct approach is to send it for existing projects
          let projectToSend = { rawId: 1, title: 'Project title', description: 'Project description' }
          let questionsToSend = [{ rawId: 1, title: 'Existing question title', description: 'Existing question description' }]

          cy.get('[data-cy=job-continue]').click()
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(true))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.project').deep.equal(projectToSend))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(1))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].rawId').equal(questionsToSend[0].rawId))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].title').equal(questionsToSend[0].title))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].description').equal(questionsToSend[0].description))
        })
      })

      describe('with a new question', () => {
        beforeEach(() => {
          cy.get('[data-cy=add-custom-question]').click()
            .get('[data-cy=add-custom-question-input] input[type=text]').type('Hello, how are you?')
            .get('[data-cy=add-custom-question-done]').click()
        })

        it('calls onContinue', () => {
          cy.get('[data-cy=job-continue]').click()
            .wait(10)
            .then(() => resolveAllPendingOperations(env, draftJobResolver))
            .wait(10)
            .then(() => expect(continueHandler).to.have.been.called)
        })

        it('sends correct query', () => {
          let questionsToSend = [
            { rawId: 1, title: 'Existing question title', description: 'Existing question description' },
            { rawId: undefined, title: 'Hello, how are you?' },
          ]

          cy.get('[data-cy=job-continue]').click()
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(true))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(2))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].rawId').equal(questionsToSend[0].rawId))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].title').equal(questionsToSend[0].title))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[0].description').equal(questionsToSend[0].description))

            // custom question only has a title (and optionally a description), no ID
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions[1].title').equal(questionsToSend[1].title))
        })
      })

      describe('with switch to manual screening', () => {
        it('sends correct query', () => {
          cy.get('[data-cy=screening-mode-manual]').click()
            .get('[data-cy=job-continue]').click()
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(false))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(1))
        })
      })
    })
  })

  describe('with existing manual-screening', () => {
    // note: in this test-suite, only the differences vs auto-screening are checked, as the rest should be the same
    let draftJobResolver = {
      ...resolver,
      Job: () => {
        return {
          id: 'job-1',
          slug: 'recaptcha-farm-slave',
          status: 'draft',
          autoSendScreeningRequests: false,
        }
      },
    }

    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, draftJobResolver))
    })

    describe('initial state', () => {
      it('defaults to manual screening', () => {
        cy.get('[data-cy=screening-mode-manual] input').should('be.checked')
      })
    })

    describe('continuing to next step', () => {
      describe('as-is', () => {
        it('sends correct query', () => {
          cy.get('[data-cy=job-continue]').click()
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(false))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(1))
        })
      })

      describe('with switch to auto screening', () => {
        it('sends correct query', () => {
          cy.get('[data-cy=screening-mode-automatic]').click()
            .get('[data-cy=job-continue]').click()
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.autoSendScreeningRequests').equal(true))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.questions').length(1))
        })
      })
    })
  })
})
