import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { resolveAllPendingOperations } from 'services/testing'
import { JobDetailsStep_Test_JobQuery } from '__generated__/JobDetailsStep_Test_JobQuery.graphql'
import JobDetailsStep from './JobDetailsStep'

Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
const resolver = {
  Skill: () => {
    return {
      name: 'FlexOS',
      freelancerTypeId: 1,
    }
  },
  JobSkill: () => {
    return {
      name: 'FlexOS',
    }
  },
  FreelancerType: () => {
    return {
      rawId: 1,
      name: 'Tech',
      slug: 'tech',
    }
  },
  Job: () => {
    return {
      slug: 'recaptcha-farm-slave',
    }
  },
}

function JobDetailsStepTest({ continueHandler, jobSlug }) {
  const data = useLazyLoadQuery<JobDetailsStep_Test_JobQuery>(graphql`
    query JobDetailsStep_Test_JobQuery($jobSlug: String, $hasJob: Boolean!) {
      job(slug: $jobSlug) @include(if: $hasJob) {
        status,
        ...JobDetailsStep_Job
      }
    }
  `, {
    hasJob: Boolean(jobSlug),
    jobSlug: jobSlug,
  })

  return (
    <JobDetailsStep
      jobId={jobSlug}
      firmSlug="test"
      status={data?.job?.status}
      onContinue={continueHandler}
      job={data?.job}
    />
  )
}

describe('for new job', () => {
  let env: any
  let continueHandler: Function

  beforeEach(() => {
    env = createMockEnvironment()
    continueHandler = cy.stub()
    mockRouter.setCurrentUrl('/client/job/add_job')

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux withRouter={mockRouter}>
        <JobDetailsStepTest continueHandler={continueHandler} jobSlug={undefined} />
      </ComponentTestEnvironment>,
    )
  })

  describe('for remote job', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
        .get('[data-cy=textfield-input-title]').type('recaptcha farm slave')
        .get('[data-cy=select-industry]').click()
        .get('[data-cy=select-industry-tech]').click()
        .get('[data-cy=textarea-description]').first().type('recaptcha farm slave')
        .get('[data-cy=select-type]').click()
        .get('[data-cy=select-type-freelancer]').click()
        .get('[data-cy=textfield-input-client_rate]').first().type('100')
        .get('[data-cy=textfield-input-min_client_rate]').first().type('40')
        .get('[data-cy=select-duration]').click()
        .get('[data-cy=select-duration-3]').click()
        .get('[data-cy=chipfield-input-job_skills]').first().type('FlexOS ')
    })

    describe('continuing wizard', () => {
      beforeEach(() => {
        cy.spy(mockRouter, 'replace')
        cy.get('[data-cy=job-continue]').click()
          .wait(10)
      })

      it('updates URL', () => {
        cy.then(() => resolveAllPendingOperations(env, resolver))
          .wait(100)
          .then(() => expect(mockRouter.replace).to.have.been.calledWith('/client/job/[id]/[step]', '/client/job/recaptcha-farm-slave/sourcing', Cypress.sinon.match.any))
      })

      it('sends correct query', () => {
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.title').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientRate').equal(100))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.minClientRate').equal(40))
      })

      it('calls onContinue', () => {
        cy.then(() => resolveAllPendingOperations(env, resolver))
          .wait(100)
          .then(() => expect(continueHandler).to.have.been.called)
      })
    })

    describe('saving in place', () => {
      beforeEach(() => {
        cy.spy(mockRouter, 'replace')
        cy.get('[data-cy=save-changes]').click()
      })

      it('updates URL', () => {
        cy.then(() => resolveAllPendingOperations(env, resolver))
          .wait(100)
          .then(() => expect(mockRouter.replace).to.have.been.calledWith('/client/job/[id]', '/client/job/recaptcha-farm-slave', Cypress.sinon.match.any))
      })

      it('sends correct query', () => {
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.title').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientRate').equal(100))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.minClientRate').equal(40))
      })

      it('does not call onContinue', () => {
        cy.then(() => resolveAllPendingOperations(env, resolver))
          .wait(100)
          .then(() => expect(continueHandler).to.not.have.been.called)
      })
    })
  })

  describe('for on-site job', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolver))
        .get('[data-cy=textfield-input-title]').type('recaptcha farm slave')
        .get('[data-cy=select-industry]').click()
        .get('[data-cy=select-industry-tech]').click()
        .get('[data-cy=textarea-description]').first().type('recaptcha farm slave')
        .get('[data-cy=select-type]').click()
        .get('[data-cy=select-type-freelancer]').click()
        .get('[data-cy=textfield-input-client_rate]').first().type('100')
        .get('[data-cy=textfield-input-min_client_rate]').first().type('40')
        .get('[data-cy=select-location_type]').click()
        .get('[data-cy=select-location_type-full_address]').click()
        .get('[data-cy=textfield-input-location]').type('Madrid')
        .get('[data-cy=address-suggestion-0]', { timeout: 20000 }).click() // this fires off an actual request // TODO: intercept and mock
        .get('[data-cy=textfield-input-default_distance]').type('105')
        .get('[data-cy=select-duration]').click()
        .get('[data-cy=select-duration-3]').click()
        .get('[data-cy=chipfield-input-job_skills]').first().type('FlexOS ')
    })

    describe('continuing wizard', () => {
      beforeEach(() => {
        cy.get('[data-cy=job-continue]').click()
          .wait(100)
      })

      it('sends correct query', () => {
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.title').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('recaptcha farm slave'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientRate').equal(100))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.minClientRate').equal(40))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.locationLatitude').equal(40.41889))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.defaultDistance').equal('105')) // TODO: make it a number
      })

      it('calls onContinue', () => {
        cy.then(() => resolveAllPendingOperations(env, resolver))
          .wait(100)
          .then(() => expect(continueHandler).to.have.been.called)
      })
    })
  })
})

describe('for existing draft job', () => {
  const existingJobResolverAfterSave = {
    ...resolver,
    Job: () => {
      return {
        title: 'recaptcha farm master',
        slug: 'recaptcha-farm-master',
      }
    },
  }

  let env: any
  let continueHandler: Function

  beforeEach(() => {
    env = createMockEnvironment()
    continueHandler = cy.stub()
    mockRouter.setCurrentUrl('/client/job/recaptcha-farm-slave')
    cy.spy(mockRouter, 'replace')

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense withRedux withRouter={mockRouter}>
        <JobDetailsStepTest continueHandler={continueHandler} jobSlug="recaptcha-farm-slave" />
      </ComponentTestEnvironment>,
    )
  })

  beforeEach(() => {
    cy.then(() => resolveAllPendingOperations(env, resolver))
      .wait(10)
      .then(() => resolveAllPendingOperations(env, resolver))
      .get('[data-cy=textfield-input-title]').clear().type('recaptcha farm master')
      .get('[data-cy=select-industry]').click()
      .get('[data-cy=select-industry-tech]').click()
      .get('[data-cy=textarea-description]').first().clear().type('recaptcha farm master')
      .get('[data-cy=select-type]').click()
      .get('[data-cy=select-type-freelancer]').click()
      .get('[data-cy=textfield-input-client_rate]').first().clear().type('120')
      .get('[data-cy=textfield-input-min_client_rate]').first().clear().type('50')
      .get('[data-cy=select-duration]').click()
      .get('[data-cy=select-duration-6]').click()
      .get('[data-cy=chipfield-input-job_skills]').first().clear().type('FlexOS ')
  })

  describe('continuing wizard', () => {
    beforeEach(() => {
      cy.get('[data-cy=job-continue]').click()
        .wait(10)
    })

    it('sends correct query', () => {
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.title').equal('recaptcha farm master'))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('recaptcha farm master'))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientRate').equal(120))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.minClientRate').equal(50))
    })

    it('updates URL', () => {
      cy.then(() => resolveAllPendingOperations(env, existingJobResolverAfterSave))
        .wait(100)
        .then(() => expect(mockRouter.replace).to.have.been.calledWith('/client/job/[id]/[step]', '/client/job/recaptcha-farm-master/sourcing', Cypress.sinon.match.any))
    })

    it('calls onContinue', () => {
      cy.then(() => resolveAllPendingOperations(env, existingJobResolverAfterSave))
        .wait(100)
        .then(() => expect(continueHandler).to.have.been.called)
    })
  })

  describe('saving in place', () => {
    beforeEach(() => {
      cy.get('[data-cy=save-changes]').click()
        .wait(10)
    })

    it('sends correct query', () => {
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.title').equal('recaptcha farm master'))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.description').equal('recaptcha farm master'))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.clientRate').equal(120))
        .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.input.minClientRate').equal(50))
    })

    it('updates URL', () => {
      cy.then(() => resolveAllPendingOperations(env, existingJobResolverAfterSave))
        .wait(100)
        .then(() => expect(mockRouter.replace).to.have.been.calledWith('/client/job/[id]', '/client/job/recaptcha-farm-master', Cypress.sinon.match.any))
    })

    it('does not call onContinue', () => {
      cy.then(() => resolveAllPendingOperations(env, existingJobResolverAfterSave))
        .wait(100)
        .then(() => expect(continueHandler).to.not.have.been.called)
    })
  })
})
