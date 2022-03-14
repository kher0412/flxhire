import { mount } from '@cypress/react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import moment from 'moment'
import { createMockEnvironment } from 'relay-test-utils'
import { ComponentTestEnvironment } from 'components/testing'
import { resolveAllPendingOperations } from 'services/testing'
import { DATE_FORMAT_INTERNAL } from 'services/formatting'
import { ICurrentUser } from 'types'
import { RootState } from 'reducers'
import { ContractSettingsForm_Test_Query } from '__generated__/ContractSettingsForm_Test_Query.graphql'
import ContractSettingsForm from './ContractSettingsFormContainer'

const reduxState: Partial<RootState> = {
  auth: {
    currentUser: {
      id: 1,
    } as ICurrentUser,
  } as any,
}

const futureDate = moment().add(30, 'day').format(DATE_FORMAT_INTERNAL).toString()

const resolverProvider = (startDate: string, status: string) => {
  const resolver = {
    Contract: () => {
      return {
        startDate: startDate,
        isManager: false,
        isFirmAdmin: false,
        endDate: '2021-12-28',
        currency: {
          code: 'USD',
        },
        client: {
          rawId: 1,
        },
        status: status,
      }
    },
    User: () => {
      return {
        managerContract: {
          isManager: true,
          isFirmAdmin: true,
          allowManageAccess: true,
        },
      }
    },
  }

  return resolver
}

function ContractSettingsFormTest() {
  const data = useLazyLoadQuery<ContractSettingsForm_Test_Query>(graphql`
    query ContractSettingsForm_Test_Query($contractId: ID!) {
      contract: node(id: $contractId) {
        ... on Contract {
          currency {
            code
          }
          startDate
          endDate
          isManager
          isFirmAdmin
          status
          ...ContractSettingsForm_Contract
        }
      }
      currentUser {
        ...ContractSettingsForm_User
      }
    }
  `, {
    contractId: 'test',
  }, {
    fetchPolicy: 'store-and-network',
  })

  let firmRole: 'firm_member' | 'firm_admin' | 'individual' = data?.contract?.isManager ? 'firm_member' : 'individual'
  if (data?.contract?.isFirmAdmin) firmRole = 'firm_admin'

  return (
    <ContractSettingsForm
      userFragmentRef={data?.currentUser}
      contractFragmentRef={data?.contract}
      initialValues={{
        start_date: data?.contract?.startDate,
        end_date: data?.contract?.endDate,
        firm_role: firmRole,
        currency: data?.contract?.currency?.code,
      }}
      onClose={() => { }}
    />
  )
}

describe('contract settings form', () => {
  let env: any

  beforeEach(() => {
    env = createMockEnvironment()

    mount(
      <ComponentTestEnvironment relayEnvironment={env} withRedux={reduxState} withSuspense>
        <ContractSettingsFormTest />
      </ComponentTestEnvironment>,
    )
  })

  describe('start date in the future', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverProvider(futureDate, ''))).wait(10)
    })

    describe('is', () => {
      it('editable', () => {
        cy.get('[data-cy=datefield-start_date]').click()
        cy.get('[data-cy=datefield-start_date] .Mui-disabled').should('not.exist')
      })
    })
  })

  describe('start date with null', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverProvider(null, ''))).wait(10)
    })

    describe('is', () => {
      it('editable', () => {
        cy.get('[data-cy=datefield-start_date]').click()
        cy.get('[data-cy=datefield-start_date] .Mui-disabled').should('not.exist')
      })
    })
  })

  describe('start date in the past', () => {
    beforeEach(() => {
      cy.then(() => resolveAllPendingOperations(env, resolverProvider('2021-11-01', 'active'))).wait(10)
    })

    describe('is', () => {
      it('not editable', () => {
        cy.get('[data-cy=datefield-start_date]').click()
        cy.get('[data-cy=datefield-start_date] .Mui-disabled').should('exist')
      })
    })
  })
})
