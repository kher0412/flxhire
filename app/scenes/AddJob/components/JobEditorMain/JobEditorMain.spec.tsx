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
import JobEditorMain from './JobEditorMain'

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

// need a larger viewport for sidebar to show up (for simplicity sake)
Cypress.config({
  viewportWidth: 1600,
  viewportHeight: 800,
})

// custom resolver
// TODO: figure out how to override returning a custom set of candidates based on context
const resolver = {
  User: () => {
    return {
      firstName: 'custom',
      lastName: 'candidate',
      name: 'custom candidate',
    }
  },
  Tag: () => {
    return {
      name: 'FlexTeam',
      rawId: 75,
    }
  },
}

describe('without existing job', () => {
  describe('step 0', () => {
    let env: any

    beforeEach(() => {
      env = createMockEnvironment()
      mockRouter.setCurrentUrl('/client/hire?tab=potential&company=test')

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
          <JobEditorMain
            jobSlug={undefined}
            firmSlug="test"
            currentStep={0}
            maxStep={4}
            defaultFreelancerTypeId={undefined}
            defaultFreelancerSubtypeId={undefined}
            requireAccountSetup={false}
            router={mockRouter}
            onStepChange={() => { }}
            onMobileStepClose={() => { }}
            onPaymentMethodAdded={() => { }}
            onSetInitialStep={() => { }}
          />
        </ComponentTestEnvironment>,
      )
    })

    it('renders company form', () => {
      cy.get('[data-cy=textfield-website]').should('exist')
    })
  })
})

describe('without existing job', () => {
  describe('step 1', () => {
    let env: any

    beforeEach(() => {
      env = createMockEnvironment()
      mockRouter.setCurrentUrl('/client/hire?tab=potential&company=test')

      mount(
        <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
          <JobEditorMain
            jobSlug={undefined}
            firmSlug="test"
            currentStep={1}
            maxStep={4}
            defaultFreelancerTypeId={undefined}
            defaultFreelancerSubtypeId={undefined}
            requireAccountSetup={false}
            router={mockRouter}
            onStepChange={() => { }}
            onMobileStepClose={() => { }}
            onPaymentMethodAdded={() => { }}
            onSetInitialStep={() => { }}
          />
        </ComponentTestEnvironment>,
      )
    })

    it('renders details form', () => {
      cy.get('[data-cy=select-industry]').should('exist')
    })
  })
})
