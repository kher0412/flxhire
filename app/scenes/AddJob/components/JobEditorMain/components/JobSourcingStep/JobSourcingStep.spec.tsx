import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { resolveAllPendingOperations } from 'services/testing'
import { JobSourcingStep_Test_JobQuery } from '__generated__/JobSourcingStep_Test_JobQuery.graphql'
import JobSourcingStep from './JobSourcingStep'

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
  User: () => {
    return {
      // id: 'user-1', // TODO: having this enabled prevents candidates from being rendered, figure out why
      invitedToJob: false,
    }
  },
  Contract: () => {
    return {
      id: 'contract-1',
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
  JobIntegrationProvider: () => {
    return {
      id: 'job-integration-provider-1',
      name: 'linkedin',
    }
  },
}

function JobSourcingStepTest({ continueHandler, jobSlug }) {
  const data = useLazyLoadQuery<JobSourcingStep_Test_JobQuery>(graphql`
    query JobSourcingStep_Test_JobQuery($jobSlug: String, $hasJob: Boolean!) {
      job(slug: $jobSlug) @include(if: $hasJob) {
        ...JobSourcingStep_Job
      }
    }
  `, {
    hasJob: Boolean(jobSlug),
    jobSlug: jobSlug,
  })

  return (
    <JobSourcingStep onContinue={continueHandler} job={data?.job} />
  )
}

describe('for draft job', () => {
  let env: any
  let continueHandler: Function
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
    continueHandler = cy.stub()
    mockRouter.setCurrentUrl('/client/job/recaptcha-farm-slave/sourcing')

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux withRouter={mockRouter}>
        <JobSourcingStepTest continueHandler={continueHandler} jobSlug="recaptcha-farm-slave" />
      </ComponentTestEnvironment>,
    )
  })

  describe('without any sourcing changes', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, draftJobResolver)).wait(10)
        .then(() => resolveAllPendingOperations(env, draftJobResolver))
    })

    describe('saving draft', () => {
      it('does not call onContinue', () => {
        cy.get('[data-cy=save-changes]').click()
          .wait(100)
          .then(() => resolveAllPendingOperations(env, draftJobResolver))
          .wait(100)
          .then(() => expect(continueHandler).to.not.have.been.called)
      })
    })

    describe('continuing to next step', () => {
      it('calls onContinue', () => {
        cy.get('[data-cy=job-continue]').click()
          .wait(100)
          .then(() => resolveAllPendingOperations(env, draftJobResolver))
          .wait(100)
          .then(() => expect(continueHandler).to.have.been.called)
      })
    })
  })

  describe('job integrations', () => {
    describe('without existing job integrations', () => {
      beforeEach(() => {
        cy.then(() => resolveAllPendingOperations(env, draftJobResolver)).wait(10)
          .then(() => resolveAllPendingOperations(env, draftJobResolver)).wait(10)
          .then(() => resolveAllPendingOperations(env, draftJobResolver))
      })

      describe('continuing to next step', () => {
        it('calls onContinue', () => {
          cy.get('[data-cy=checkbox-job-integration-linkedin]').click()
            .get('[data-cy=job-continue]').click()
            .wait(100)
            .then(() => resolveAllPendingOperations(env, draftJobResolver))
            .wait(100)
            .then(() => expect(continueHandler).to.have.been.called)
        })

        it('sends correct query', () => {
          cy.get('[data-cy=checkbox-job-integration-linkedin]').click()
            .get('[data-cy=job-continue]').click()
            .wait(100)
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.activeJobIntegrationsNames').length(1))
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.activeJobIntegrationsNames').contain('linkedin'))
        })
      })
    })

    describe('with existing job integrations', () => {
      let draftJobResolverWithLinkedIn = {
        ...resolver,
        Job: () => {
          return {
            id: 'job-1',
            slug: 'recaptcha-farm-slave',
            status: 'draft',
            activeJobIntegrationsNames: ['linkedin'],
          }
        },
      }

      beforeEach(() => {
        cy.then(() => resolveAllPendingOperations(env, draftJobResolverWithLinkedIn)).wait(10)
          .then(() => resolveAllPendingOperations(env, draftJobResolverWithLinkedIn)).wait(10)
          .then(() => resolveAllPendingOperations(env, draftJobResolver))
      })

      describe('initial state', () => {
        it('preselects existing job integration', () => {
          cy.get('[data-cy=checkbox-job-integration-linkedin] input').should('be.checked')
        })
      })

      describe('continuing to next step', () => {
        it('calls onContinue', () => {
          cy.get('[data-cy=checkbox-job-integration-linkedin]').click()
            .get('[data-cy=job-continue]').click()
            .wait(100)
            .then(() => resolveAllPendingOperations(env, draftJobResolverWithLinkedIn))
            .wait(100)
            .then(() => expect(continueHandler).to.have.been.called)
        })

        it('sends correct query', () => {
          cy.get('[data-cy=checkbox-job-integration-linkedin]').click()
            .get('[data-cy=job-continue]').click()
            .wait(100)
            .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.activeJobIntegrationsNames').length(0))
        })
      })
    })
  })

  describe('candidates', () => {
    describe('with perfect match only', () => {
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // this suite tests candidates sourcing with a single, perfectly matching candidate
      // this is the ideal case for this flow
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      const resolverWithPerfectCandidate = {
        ...draftJobResolver,
        Job: () => {
          return {
            id: 'job-1',
            slug: 'recaptcha-farm-slave',
            status: 'draft',
            activeJobIntegrationsNames: [],
            automaticallyNotifyCandidates: true, // this is how the backend would set it if there are some perfect matches
          }
        },
        Candidate: () => {
          return {
            id: 'candidate-1',
            jobIncompatibilityReasons: [],
          }
        },
      }

      beforeEach(() => {
        // TODO: this is unfortunate, but currently we need to resolve queries 3 times to get to the point where candidates show up
        cy.then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate)).wait(10)
          .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate)).wait(10)
          .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
      })

      describe('continuing to next step', () => {
        describe('without changes', () => {
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // this suite tests hitting 'continue' on the job sourcing step, with exactly 1 perfectly matching candidate
          // sourcing is left in its initial state, meaning FlexHire should auto-notify candidates
          // this should result in continuing to the next step, with the 'automaticallyNotifyCandidates' flag sent with the job mutation
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          it('preselects flexhire recommended', () => {
            cy.get('[data-cy=checkbox-input-automatically_notify_candidates]').should('be.checked')
          })

          it('calls onContinue', () => {
            cy.get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
              .wait(10)
              .then(() => expect(continueHandler).to.have.been.called)
          })

          it('sends correct query', () => {
            cy.get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.automaticallyNotifyCandidates').equal(true))
          })
        })
      })
    })

    describe('with partial match only', () => {
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // this suite tests candidates sourcing with a single, partially matching candidate
      // the candidate in this test will have a missing required skill
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      const resolverWithPerfectCandidate = {
        ...draftJobResolver,
        Job: () => {
          return {
            id: 'job-1',
            slug: 'recaptcha-farm-slave',
            status: 'draft',
            activeJobIntegrationsNames: [],
            automaticallyNotifyCandidates: false, // this is how the backend would set it if there are no perfect matches
            candidatesToNotify: [],
          }
        },
        Candidate: () => {
          return {
            id: 'candidate-1',
            jobIncompatibilityReasons: ['skills'],
          }
        },
      }

      beforeEach(() => {
        // TODO: this is unfortunate, but currently we need to resolve queries multiple times to get to the point where candidates show up
        cy.then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate)).wait(10)
          .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate)).wait(10)
          .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate)).wait(10)
          .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
      })

      describe('continuing to next step', () => {
        describe('without changes', () => {
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // this suite tests hitting 'continue' on the job sourcing step, with only 1 partially matching candidate
          // sourcing is left in its initial state, meaning the partial match is not selected
          // this should result in continuing to the next step, with no 'candidatesToNotify' to be sent with the job mutation
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          it('calls onContinue', () => {
            cy.get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
              .wait(10)
              .then(() => expect(continueHandler).to.have.been.called)
          })

          it('sends correct query', () => {
            cy.get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.automaticallyNotifyCandidates').equal(false))
              .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.candidatesToNotify').length(0))
          })
        })

        describe('with partial matching candidate selected', () => {
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // this suite tests hitting 'continue' on the job sourcing step, with only 1 partially matching candidate
          // the single partially matching candidate is selected before continuing
          // this should result in continuing to the next step, with a single candidatesToNotify item to be sent with the job mutation
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          it('calls onContinue', () => {
            cy.get('[data-cy=checkbox-candidate]').first().click()
              .get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => resolveAllPendingOperations(env, resolverWithPerfectCandidate))
              .wait(10)
              .then(() => expect(continueHandler).to.have.been.called)
          })

          it('sends correct query', () => {
            cy.get('[data-cy=checkbox-candidate]').first().click()
              .get('[data-cy=job-continue]').click()
              .wait(10)
              .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.automaticallyNotifyCandidates').equal(false))
              .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.candidatesToNotify').length(1))
          })
        })
      })
    })
  })
})
