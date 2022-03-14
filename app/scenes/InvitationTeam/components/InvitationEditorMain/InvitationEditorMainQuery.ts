import { graphql, useLazyLoadQuery } from 'react-relay'
import { InvitationEditorMainQuery_JobQuery } from '__generated__/InvitationEditorMainQuery_JobQuery.graphql'

export function useInvitationEditorMainQuery(contractId?: number, freelancerId?: number) {
  // TODO: break this up into fragments
  const queryResult = useLazyLoadQuery<InvitationEditorMainQuery_JobQuery>(graphql`
    query InvitationEditorMainQuery_JobQuery($contractId: Int, $hasContract: Boolean!, $freelancerId: Int, $hasFreelancer: Boolean!) {
      currentUser {
        id
        firm {
          currency{
            code
          }
          jobs {
            edges {
              node {
                id
                title
                status
              }
            }
          }
          users {
            id
            self
            name
          }
        }
        managerContract {
          allowManageAccess
        }
      }
      freelancer: user(rawId: $freelancerId) @include(if: $hasFreelancer) {
        id
        firstName
      }
      contract(rawId: $contractId) @include(if: $hasContract) {
        id
        job {
          id
        }
        freelancer {
          id
          firstName
          lastName
          email
        }
        client {
          id
          firstName
        }
        currency {
          code
        }
        managedOffPlatform
        clientRate {
          currency {
            code
          }
          value
        }
        freelancerRate {
          currency {
            code
          }
          value
        }
        annualCompensation {
          currency {
            code
          }
          value
        }
        projectLengthInMonths
      }
    }
  `, {
    contractId: contractId,
    hasContract: !!contractId,
    freelancerId: freelancerId,
    hasFreelancer: !!freelancerId,
  }, {
    fetchPolicy: 'store-and-network',
  })

  return queryResult
}
