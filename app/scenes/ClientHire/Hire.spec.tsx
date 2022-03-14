import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import mockRouter from 'next-router-mock'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import Hire from './Hire'

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
  Firm: () => {
    return {
      name: 'Test',
      slug: 'test',
    }
  },
  Skill: () => {
    return {
      name: 'FlexOS',
    }
  },
  JobSkill: () => {
    return {
      name: 'FlexOS',
    }
  },
  FreelancerSubtype: () => {
    return {
      name: 'FlexGuru',
    }
  },
}

describe('candidates tab', () => {
  let env: any

  beforeEach(() => {
    mockRouter.setCurrentUrl('/client/hire?tab=potential&company=test')
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withRouter={mockRouter} withSuspense withRedux={reduxState}>
        <Hire />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })
  })

  describe('filtering', () => {
    describe('by max rate', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.get('[data-cy=open-filters-budget]').click()
        cy.get('[data-cy=textfield-input-max_rate]').clear().type('50').blur()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxClientRate').equal(50))
      })
    })

    describe('by max annual compensation', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.get('[data-cy=open-filters-budget]').click()
        cy.get('[data-cy=textfield-input-max_annual_compensation]').clear().type('50000').blur()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxAnnualCompensation').equal(50000))
      })
    })

    describe('by country', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-location]').click()
          .get('[data-cy=select-show_candidates_from]').click()
          .get('[data-cy=specific-countries]').click()

          .get('[data-cy=chipfield-input-countries]').type('Hungary{enter}')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.countries').include('hu'))

          .get('[data-cy=chipfield-input-countries]').type('{backspace}{backspace}Spain{enter}')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.countries').include('es'))

          .get('[data-cy=chipfield-input-countries]').type('{backspace}{backspace}')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.countries').have.length(0))
      })
    })

    describe('by timezone', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-location]').click()
          .get('[data-cy=select-show_candidates_from]').click()
          .get('[data-cy=job-timezone]').click()

          .get('[data-cy=select-job_timezone]').click()
          .get('[data-cy*=London]').click({ force: true })
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.timezone').equal(0))

          .get('[data-cy=select-job_timezone]').click()
          .get('[data-cy*=Berlin]').click({ force: true })
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.timezone').equal(1))
      })
    })

    describe('by specific location with distance', () => {
      it('sends filters with query', () => {
        // TODO: intercept and mock request to mapbox servers
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-location]').click()
          .get('[data-cy=select-show_candidates_from]').click()
          .get('[data-cy=specific-location]').click()
          .get('[data-cy=textfield-input-full_address]').type('Madrid')
          .get('[data-cy=address-suggestion-0]', { timeout: 20000 }).click() // this fires off an actual request // TODO: intercept and mock
          .get('[data-cy=textfield-input-distance_miles]').clear().type('100').blur()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.distanceOriginLatitude').equal(40.41889))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.distanceMiles').equal(100))
      })
    })

    describe('by top 1000 universities', () => {
      it('sends filters with query', () => {
        // TODO: intercept and mock request to mapbox servers
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-education]').click()

          .get('[data-cy=select-show_candidates_by_university_rank]').click()
          .get('[data-cy=top-100]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxUniversityRank').equal(100))

          .get('[data-cy=select-show_candidates_by_university_rank]').click()
          .get('[data-cy=top-1000]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxUniversityRank').equal(1000))

          .get('[data-cy=select-show_candidates_by_university_rank]').click()
          .get('[data-cy=top-500]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxUniversityRank').equal(500))

          // Test filtering by specific university
          .get('[data-cy=select-show_candidates_by_university_rank]').click()
          .get('[data-cy=any]').click()
          .get('[data-cy=autocomplete-input-filter-university]').type('International Robot Academy')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.maxUniversityRank').equal(0))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.university').equal('International Robot Academy'))
      })
    })

    describe('by managed team size', () => {
      it('sends filters with query', () => {
        // TODO: intercept and mock request to mapbox servers
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-experience]').click()
          .get('[data-cy=checkbox-input-managed_teams]').check()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeams').equal(true))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').include('5-10'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').include('10-x'))

          .get('[data-cy=managed_team_sizes-option-5-10]').uncheck()
          .get('[data-cy=managed_team_sizes-option-10-x]').uncheck()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeams').equal(true))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').not.include('5-10'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').not.include('10-x'))

          .get('[data-cy=managed_team_sizes-option-5-10]').check()
          .get('[data-cy=managed_team_sizes-option-1-4]').uncheck()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeams').equal(true))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').include('5-10'))
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeamSizes').not.include('1-4'))

          .get('[data-cy=checkbox-input-managed_teams]').uncheck()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managedTeams').equal(false))
      })
    })

    describe('by skill', () => {
      it.skip('sends filters with query', () => {
        // TODO: intercept and mock request to mapbox servers using cy.intercept
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-skills]').click()
          .wait(500)
          .get('[data-cy=chipfield-input-skills]').first().click().type('FlexOS').wait(1000).type(' ')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.skills').length(1))

          .get('[data-cy=chipfield-skills]').click()
          .get('[data-cy=chipfield-skills-input]').clear()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.skills').length(0))
      })
    })

    describe('by subtype', () => {
      it.skip('sends filters with query', () => {
        // TODO: this test fails with cryptic error:
        // environment.getOperationTracker(...).getPromiseForPendingOperationsAffectingOwner is not a function
        // Figure out the error and fix the test
        // TODO: intercept and mock request to mapbox servers using cy.intercept
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-skills]').click()
          .get('[data-cy=chipfield-input-freelancerSubtypes]').type('Flexguru ')
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.freelancerSubtypes').length(1))
      })
    })
  })
})

describe('applicants tab', () => {
  let env: any

  beforeEach(() => {
    mockRouter.setCurrentUrl('/client/hire?tab=applicants')
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withRouter={mockRouter} withSuspense withRedux={reduxState}>
        <Hire />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })
  })

  describe('filtering', () => {
    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-screening]').click()

          .get('[data-cy=select-contract_status]').click()
          .get('[data-cy=job_application_sent]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.contractStatus').equal('job_application_sent'))

          .get('[data-cy=select-contract_status]').click()
          .get('[data-cy=rejected]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.contractStatus').equal('rejected'))
      })
    })
  })
})

describe('screening tab', () => {
  let env: any

  beforeEach(() => {
    mockRouter.setCurrentUrl('/client/hire?tab=screening')
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withRouter={mockRouter} withSuspense withRedux={reduxState}>
        <Hire />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })
  })

  describe('filtering', () => {
    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
          .get('[data-cy=open-filters-screening]').click()

          .get('[data-cy=select-contract_status]').click()
          .get('[data-cy=screening_requested]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.contractStatus').equal('screening_requested'))

          .get('[data-cy=select-contract_status]').click()
          .get('[data-cy=screening_started]').click()
          .wait(500)
          .get('[data-cy=page-placeholder-loading]').should('not.exist')
          .then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.contractStatus').equal('screening_started'))
      })
    })
  })
})

describe('interviews tab', () => {
  let env: any

  beforeEach(() => {
    mockRouter.setCurrentUrl('/client/hire?tab=interviews')
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withRouter={mockRouter} withSuspense withRedux={reduxState}>
        <Hire />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })
  })
})

describe('offers tab', () => {
  let env: any

  beforeEach(() => {
    mockRouter.setCurrentUrl('/client/hire?tab=offers')
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withRouter={mockRouter} withSuspense withRedux={reduxState}>
        <Hire />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })
  })
})
