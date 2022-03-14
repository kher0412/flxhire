import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { getGraphQLBaseURL } from 'api/graphql'
import InvitationEditorMain from './InvitationEditorMain'

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

function InvitationEditorMainTest({ offerMode }) {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <InvitationEditorMain
      offerMode={offerMode}
      contractId={offerMode ? 123 : undefined}
      freelancerId={offerMode ? 123 : undefined}
      currentStep={currentStep}
      accountSetupMode={false}
      onAccountSetupCancel={() => { }}
      onAccountSetupContinue={() => { }}
      onContinue={() => currentStep === 0 ? setCurrentStep(1) : undefined}
      onStepChange={setCurrentStep}
      onSubmit={() => { }}
      requestBackgroundCheck={false}
      reviewData={{} as any}
    />
  )
}

describe('in offer mode', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withSuspense autoResolve withRedux={reduxState}>
        <InvitationEditorMainTest offerMode />
      </ComponentTestEnvironment>,
    )
  })

  describe('initial state', () => {
    it('does not render recipient fields', () => {
      // first check if the submit/continue button exists
      // otherwise the second assertion will pass before the scene finishes loading
      cy.get('[data-cy=invitation-form-continue]').should('exist')
      cy.get('[data-cy=recipients-fields]').should('not.exist')
    })

    it('renders contract details', () => {
      cy.get('[data-cy=invitation-details]').should('exist')
    })
  })

  describe('validation', () => {
    // currently, offer mode implies an individual offer
    it.skip('requires contract details', () => {
      cy.wait(500)
      cy.get('[data-cy=invitation-form-continue]').click()
      cy.wait(500)
      cy.get('[data-cy=textfield-helper-client_rate').should('contain', 'Required')
    })
  })
})

describe('in invitation mode', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve withSuspense withRedux={reduxState}>
        <InvitationEditorMainTest offerMode={false} />
      </ComponentTestEnvironment>,
    )
  })

  describe('initial state', () => {
    it('renders recipient fields', () => {
      cy.get('[data-cy=invitation-form-continue]').should('exist')
      cy.get('[data-cy=recipients-fields]').should('exist')
    })

    it('does not render contract details', () => {
      // first check if the submit/continue button exists
      // otherwise the second assertion will pass before the scene finishes loading
      cy.get('[data-cy=invitation-form-continue]').should('exist')
      cy.get('[data-cy=invitation-details]').should('not.exist')
    })
  })

  describe('submit validation', () => {
    // TODO: this should be in a separate InvitationForm component test suite
    describe('without recipient', () => {
      it('requires a recipient', () => {
        cy.get('[data-cy=invitation-form-continue]').click()
        cy.get('[data-cy=textfield-helper-first_name').should('exist')
        cy.get('[data-cy=textfield-helper-last_name').should('exist')
        cy.get('[data-cy=textfield-helper-email').should('exist')
        cy.get('[data-cy=selectfield-helper-invitation_type').should('exist')
      })
    })

    describe('with individual recipient', () => {
      it('requires contract details', () => {
        cy.get('[data-cy=textfield-input-first_name]').type('John')
        cy.get('[data-cy=textfield-input-last_name]').type('Doe')
        cy.get('[data-cy=textfield-input-email]').type('john.doe@flexhire.com')
        cy.get('[data-cy=select-invitation_type]').click()
        cy.get('[data-cy=individual]').click()
        cy.get('[data-cy=invitation-form-continue]').click()
        cy.get('[data-cy=textfield-helper-client_rate]').should('contain', 'Required')
        cy.wait(100)
        // TODO: the "You Pay" field, while works, is quite wonky, and sometimes does not register keys
        cy.get('[data-cy=textfield-input-client_rate]').clear().wait(100).type('44').wait(100).type('00')
        cy.wait(100)
        cy.get('[data-cy=invitation-form-continue]').click()
        cy.get('[data-cy=textfield-helper-client_rate]').should('not.contain', 'Required')
      })

      it('send correct contract details to correct freelancer', () => {
        cy.intercept(getGraphQLBaseURL()).as('validationQuery')

        cy.get('[data-cy=textfield-input-first_name]').type('John')
        cy.get('[data-cy=textfield-input-last_name]').type('Doe')
        cy.get('[data-cy=textfield-input-email]').type('john.doe@flexhire.com')
        cy.get('[data-cy=select-invitation_type]').click()
        cy.get('[data-cy=individual]').click()
        cy.get('[data-cy=invitation-form-continue]').click()
        cy.wait(100)
        // TODO: the "You Pay" field, while works, is quite wonky, and sometimes does not register keys
        cy.get('[data-cy=textfield-input-client_rate]').clear().wait(100).type('4').wait(100).type('4')
        cy.wait(100)
        cy.get('[data-cy=invitation-form-continue]').click()
        cy.wait(100)
        cy.get('[data-cy=submit-invitation]').click()
        cy.wait(1000)

        cy.get('@validationQuery') // yields the same interception object
          .its('request.body.variables.input')
          .should(
            'deep.equal',
            {
              currency: 'USD',
              clientRate: {
                value: 44,
                currencyCode: 'USD',
              },
              freelancerRate: {
                value: 0,
                currencyCode: 'USD',
              },
              freelancerEmail: 'john.doe@flexhire.com',
              rateMode: 'hour',
            },
          )
      })
    })
  })

  describe('setting invitation type', () => {
    describe('to individual', () => {
      it('reveals contract details', () => {
        cy.get('[data-cy=select-invitation_type]').click()
        cy.get('[data-cy=individual]').click()
        cy.get('[data-cy=invitation-details]').should('exist')
      })
    })

    describe('to manager', () => {
      it('does not reveal contract details', () => {
        cy.get('[data-cy=select-invitation_type]').click()
        cy.get('[data-cy=manager]').click()
        cy.wait(100)
        cy.get('[data-cy=invitation-details]').should('not.exist')
      })
    })

    describe('to admin', () => {
      it('does not reveal contract details', () => {
        cy.get('[data-cy=select-invitation_type]').click()
        cy.get('[data-cy=admin]').click()
        cy.wait(100)
        cy.get('[data-cy=invitation-details]').should('not.exist')
      })
    })
  })
})
