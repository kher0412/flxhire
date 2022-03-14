import { ComponentTestEnvironment } from 'components/testing'
import mockRouter from 'next-router-mock'
import { mount } from '@cypress/react'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { Suspense } from 'components'
import NavigationMenu, { IDropdownState, KEY_DROPDOWN_STATE } from './NavigationMenu'

describe('NavigationMenu', () => {
  let env

  function mountComponent() {
    env = createMockEnvironment()
    mount(
      <ComponentTestEnvironment withRedux withRouter={mockRouter} relayEnvironment={env}>
        <Suspense>
          <NavigationMenu />
        </Suspense>
      </ComponentTestEnvironment>,
    ).then(() => {
      env.mock.resolveMostRecentOperation(operation => (
        MockPayloadGenerator.generate(operation, {
          Contract() {
            return {
              allowHireAccess: true,
              allowManageAccess: true,
            }
          },
        })
      ))
    })
  }

  describe('without saved dropdown status', () => {
    beforeEach(() => {
      localStorage.setItem(KEY_DROPDOWN_STATE, undefined)
      mountComponent()
    })

    it('initializes collapse status correctly when localStorage value is null', () => {
      // check that top level item is loaded
      cy.get('[data-cy=client-team-overview]').should('exist')
      // check that all sections are closed (child items dont exist)
      cy.get('[data-cy=hire-overview-jobs]').should('not.exist')
      cy.get('[data-cy=team-overview-team]').should('not.exist')
      cy.get('[data-cy=account-overview-settings]').should('not.exist')
    })
  })

  describe('with saved dropdown status', () => {
    beforeEach(() => {
      localStorage.setItem(KEY_DROPDOWN_STATE, JSON.stringify({ hire: true, team: false, account: false } as IDropdownState))
      mountComponent()
    })

    it('loads initial status from localStorage', () => {
      cy.get('[data-cy=hire-overview-jobs]').should('exist')
      cy.get('[data-cy=team-overview-team]').should('not.exist')
      cy.get('[data-cy=account-overview-settings]').should('not.exist')
    })

    it('keeps localStorage updated when toggling collapse status', () => {
      expect(JSON.parse(localStorage.getItem(KEY_DROPDOWN_STATE))?.team).to.eq(false)
      cy.get('[data-cy=client-team-overview]').click().then(() => {
        expect(JSON.parse(localStorage.getItem(KEY_DROPDOWN_STATE))?.team).to.eq(true)
      })
    })
  })
})
