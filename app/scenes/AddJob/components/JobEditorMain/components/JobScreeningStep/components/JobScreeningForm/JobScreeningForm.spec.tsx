import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { JobScreeningForm_Test_JobQuery } from '__generated__/JobScreeningForm_Test_JobQuery.graphql'
import JobScreeningForm from './JobScreeningFormContainer'

// set up enough redux state for currentUser not to be considered a firmless user
const reduxState: Partial<RootState> = {
  auth: {
    currentUser: {
      firm: {
        name: 'Test',
        slug: 'test',
      } as IFirm,
    } as ICurrentUser,
  } as any,
}

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
  FreelancerType: () => {
    return {
      rawId: 1,
      name: 'Agriculture',
      slug: 'agriculture',
    }
  },
}

function JobScreeningFormTest({ submitHandler, jobSlug }) {
  const data = useLazyLoadQuery<JobScreeningForm_Test_JobQuery>(graphql`
    query JobScreeningForm_Test_JobQuery($jobSlug: String) {
      job(slug: $jobSlug) {
        ...JobScreeningForm_Job
      }
    }
  `, {
    jobSlug: jobSlug,
  })

  return (
    <JobScreeningForm
      jobFragmentRef={data?.job}
      submitForm={submitHandler}
      initialValues={{
        questions: [],
        project: undefined,
        screening_request_message_template: 'Hi there',
        auto_send_screening_requests: false,
        allow_textual_answers: false,
      }}
    />
  )
}

describe('with draft job', () => {
  let env: any
  let submitHandler: (data: any) => any

  beforeEach(() => {
    env = createMockEnvironment()
    submitHandler = cy.stub()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <JobScreeningFormTest submitHandler={submitHandler} jobSlug="recaptcha-farm-slave" />
      </ComponentTestEnvironment>,
    )
  })

  describe('custom questions', () => {
    it('can add question to form', () => {
      cy.get('[data-cy=screening-mode-automatic]').click()

        // add a custom question
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=add-custom-question-input] input[type=text]').type('Hello, how are you?')
        .get('[data-cy=add-custom-question-done]').click()

        // check that it's there
        .get('[data-cy="textfield-input-questions[0].title"] input[type=text]').should('have.value', 'Hello, how are you?')
    })
  })

  describe('validation', () => {
    it('reports insufficient question length', () => {
      cy.get('[data-cy=screening-mode-automatic]').click()

        // add a custom question
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=add-custom-question-input] input[type=text]').type('Hello?') // too short to pass
        .get('[data-cy=add-custom-question-done]').click()
        // .get('[data-cy="textfield-input-questions[0].title"] input[type=text]').should('have.value', QUESTION_TITLE)

        // submit & check
        .get('[data-cy=job-continue]').click()
        .get('[data-cy=loading-overlay]').should('not.exist')
        .get('[data-cy=form-error-summary]').should('exist')
    })

    it('reports duplicate questions', () => {
      cy.get('[data-cy=screening-mode-automatic]').click()

        // add custom question
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=add-custom-question-input] input[type=text]').type('Hello, how are you?')
        .get('[data-cy=add-custom-question-done]').click()

        // add custom question again
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=add-custom-question-input] input[type=text]').type('Hello, how are you?')
        .get('[data-cy=add-custom-question-done]').click() // adds in a duplicate question (by title)

        // submit & check
        .get('[data-cy=job-continue]').click()
        .get('[data-cy=loading-overlay]').should('not.exist')
        .get('[data-cy=form-error-summary]').should('exist')
    })
  })

  // NOTE: there is no need to test for correct payload from submitting the form
  // it is tested as part of the query that gets sent during submission
})
