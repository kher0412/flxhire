import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import mockRouter from 'next-router-mock'
import CustomListItem from './CustomListItem'

describe('CustomListItem', () => {
  beforeEach(() => {
    mount(
      <ComponentTestEnvironment withRouter={mockRouter} withRedux>
        <CustomListItem href="/client/hire" as="/client/hire?tab=jobs" primary="Hire Jobs" cyId="item" />
      </ComponentTestEnvironment>,
    )
    cy.spy(mockRouter, 'push')
  })

  describe('rendering', () => {
    it('renders anchor tag', () => {
      cy.get('[data-cy=item]').should('exist')
        .should('have.prop', 'tagName').should('eq', 'A')
    })
  })

  // TODO: restore the commented out tests. They crash cypress for some reason when executing them
  /*
  describe('click handler', () => {
    it('redirects with correct parameters', () => {
      cy.get('[data-cy=item]').should('exist').click().then(() => {
        expect(mockRouter.push).to.have.been.calledWith('/client/hire', '/client/hire?tab=jobs', { shallow: false })
      })
    })

    describe('when on the same page', () => {
      before(() => mockRouter.setCurrentUrl('/client/hire?tab=potential'))

      it('does a shallow redirect', () => {
        cy.get('[data-cy=item]').should('exist').click().then(() => {
          expect(mockRouter.push).to.have.been.calledWith('/client/hire', '/client/hire?tab=jobs', { shallow: true })
        })
      })
    })
  })
   */

  describe('showing as selected', () => {
    describe('when on different page', () => {
      before(() => mockRouter.setCurrentUrl('/client/manage'))

      it('is not selected', () => cy.get('[data-cy=item]').should('not.have.class', 'Mui-selected'))
    })

    describe('when on the same page, different query params', () => {
      before(() => mockRouter.setCurrentUrl('/client/hire?tab=potential'))

      it('is not selected', () => cy.get('[data-cy=item]').should('not.have.class', 'Mui-selected'))
    })

    describe('when on the same page, with superset of query params', () => {
      before(() => mockRouter.setCurrentUrl('/client/hire?tab=jobs&firm=test'))

      it('is selected', () => cy.get('[data-cy=item]').should('have.class', 'Mui-selected'))
    })
  })
})
