import React from 'react'
import { mount } from '@cypress/react'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { RootState } from 'reducers'
import { ICurrentUser, IFirm } from 'types'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { TeamTab_Test_Query } from '__generated__/TeamTab_Test_Query.graphql'
import { useDispatch, useSelector } from 'hooks'
import { createAction } from 'redux-actions'
import TeamTab from './TeamTab'
import { SET_FILTER_PARAMS } from '../../ManageDucks'

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

function TeamTabTestWrapper({ innerTabName }) {
  const filterParams = useSelector((state: RootState) => state.clientManage.filterParams)
  const dispatch = useDispatch()
  const data = useLazyLoadQuery<TeamTab_Test_Query>(graphql`
    query TeamTab_Test_Query {
      currentUser {
        firm {
          ...TeamTab_Firm
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })

  const firm = data?.currentUser?.firm

  return (
    <TeamTab
      firm={firm}
      innerTabName={innerTabName}
      filterParams={filterParams}
      graphFetchKey={1}
      setFilter={(key, value) => dispatch(createAction(SET_FILTER_PARAMS)({ key: key, value: value }))}
      toggleBulkEdit={() => { }}
      toggleSelection={() => { }}
      setBulkActionParam={() => { }}
      performBulkAction={() => { }}
      performBulkEmail={() => { }}
      clearSelection={() => { }}
      setInnerTabName={() => { }}
      bulkActions={{
        show: false,
        invert: false,
        graphFetchKey: 1,
        params: {},
        ids: [],
      }}
    />
  )
}

describe('individuals tab', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <TeamTabTestWrapper innerTabName="individuals" />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })

    it('sends subtab filters with query', () => {
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.membersOnly').equal(true))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('contract'))
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-filter-by-name]').click().type('Riccardo Pizzuti')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Riccardo Pizzuti'))
      })
    })

    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-paused]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('paused'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-active]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('active'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))
      })
    })

    describe('by teams', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-team]').click()
        cy.get('[data-cy=select-team-option-FlexTeam]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.tagsIds').length(1))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.tagsIds').include(75))
      })
    })
  })
})

describe('managers tab', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <TeamTabTestWrapper innerTabName="managers" />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })

    it('sends subtab filters with query', () => {
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managersOnly').equal(true))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('contract'))
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-filter-by-name]').click().type('Bud Spencer')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Bud Spencer'))
      })
    })

    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-paused]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('paused'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-active]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('active'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))
      })
    })
  })
})

describe('admins tab', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <TeamTabTestWrapper innerTabName="admins" />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })

    it('sends subtab filters with query', () => {
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.managersOnly').equal(true))
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.stage').equal('contract'))
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-filter-by-name]').click().type('Terence Hill')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Terence Hill'))
      })
    })

    describe('by status', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-paused]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('paused'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))

        cy.get('[data-cy=select-status]').click()
        cy.get('[data-cy=select-status-option-active]').click()
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').include('active'))
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.statuses').length(1))
      })
    })
  })
})

describe('invited tab', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} autoResolve={resolver} withSuspense withRedux={reduxState}>
        <TeamTabTestWrapper innerTabName="invited" />
      </ComponentTestEnvironment>,
    )
  })

  describe('rendering', () => {
    it('shows results from query', () => {
      // note: these assertions rely on MockPayloadGenerator's default behavior of having exactly one result for collections
      // the actual name is set in the custom resolver
      cy.get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', 'custom candidate')
    })

    it('sends subtab filters with query', () => {
      cy.wait(100)
      cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.invitationType').equal('invitation'))
    })
  })

  describe('filtering', () => {
    describe('by name', () => {
      it('sends filters with query', () => {
        cy.get('[data-cy=textfield-input-filter-by-name]').click().type('Riccardo Pizzuti')
        cy.wait(500)
        cy.get('[data-cy=page-placeholder-loading]').should('not.exist')
        cy.then(() => expect(env.mock.getMostRecentOperation()).to.nested.property('request.variables.filters.name').equal('Riccardo Pizzuti'))
      })
    })
  })
})
