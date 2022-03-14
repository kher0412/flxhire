import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { TeamTab_Test_Query } from '__generated__/TeamTab_Test_Query.graphql'
import { useDispatch, useSelector } from 'hooks'
import { createAction } from 'redux-actions'
import JobDetailsForm from './JobDetailsFormContainer'

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

describe('without existing job', () => {
  let env: any
  let submitHandler: (data: any) => any

  beforeEach(() => {
    env = createMockEnvironment()
    submitHandler = cy.stub()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <JobDetailsForm
          jobId={undefined}
          firmSlug="test"
          status={undefined}
          submitForm={submitHandler}
          initialValues={{
            job_skills: [],
            location_type: 'anywhere',
          }}
        />
      </ComponentTestEnvironment>,
    )
  })

  it('renders fields', () => {
    cy.get('[data-cy=textfield-title]').should('exist')
  })

  describe('validation', () => {
    it('reports missing fields', () => {
      cy.get('[data-cy=textarea-description]').type('you will work overtime and wont get paid')
      cy.get('[data-cy=job-continue]').click()
      cy.get('[data-cy=loading-overlay]').should('not.exist')
      cy.get('[data-cy=form-error-summary]').should('exist')
    })

    it('reports title length exceeded', () => {
      cy.get('[data-cy=textfield-input-title]').type('you will work overtime and wont get paid you will work overtime and wont get paid')
      cy.get('[data-cy=job-continue]').click()
      cy.get('[data-cy=loading-overlay]').should('not.exist')
      cy.get('[data-cy=textfield-helper-title]').should('contain', '60 characters')
      cy.get('[data-cy=form-error-summary]').should('exist')
    })
  })

  // NOTE: there is no need to test for correct payload from submitting the form
  // it is tested as part of the query that gets sent during submission
})
