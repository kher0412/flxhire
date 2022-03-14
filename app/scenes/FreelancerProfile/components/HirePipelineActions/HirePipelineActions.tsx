import { useCurrentUser } from 'hooks'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { isRealAdmin } from 'services/user'
import FeedbackButton from 'scenes/ClientHire/components/Freelancer/components/FeedbackButton'
import FreelancerCardChatButton from 'scenes/ClientHire/components/Freelancer/components/FreelancerCardChatButton'
import FreelancerActions from 'scenes/ClientHire/components/FreelancerActions'
import { HirePipelineActions_Query } from '__generated__/HirePipelineActions_Query.graphql'

interface IHirePipelineActionsProps {
  freelancer: {
    id: number
  }
  contract: {
    id: number
  }
}

const HirePipelineActions = ({ freelancer: freelancerProp, contract: contractProp }: IHirePipelineActionsProps) => {
  // TODO: switch to preloaded query
  const data = useLazyLoadQuery<HirePipelineActions_Query>(graphql`
    query HirePipelineActions_Query($freelancerId: Int!, $contractId: Int, $withContract: Boolean!) {
      freelancer: user(rawId: $freelancerId) {
        ...FeedbackButton_Freelancer
        ...FreelancerCardChatButton_Freelancer
        ...FreelancerActions_Freelancer
      }
      contract(rawId: $contractId) @include(if: $withContract) {
        ...FeedbackButton_Contract
        ...FreelancerCardChatButton_Contract
        ...FreelancerActions_Contract
        job {
          ...FreelancerActions_Job
        }
      }
    }
  `, {
    freelancerId: freelancerProp?.id,
    contractId: contractProp?.id,
    withContract: Boolean(contractProp?.id),
  }, {
    fetchPolicy: 'store-and-network',
  })
  const [user] = useCurrentUser()
  const freelancer = data?.freelancer
  const contract = data?.contract
  const job = data?.contract?.job

  return (
    <div style={{ marginLeft: 6, display: 'flex', width: '100%', flexWrap: 'wrap' }}>
      <FeedbackButton
        contract={contract}
        freelancer={freelancer}
        style={{ marginRight: 8 }}
      />
      <FreelancerCardChatButton
        contract={contract}
        freelancer={freelancer}
      />
      <FreelancerActions
        adminMode={isRealAdmin(user)}
        freelancer={freelancer}
        contract={contract}
        job={job}
      />
    </div>
  )
}

export default HirePipelineActions

export type HirePipelineActionsComponent = typeof HirePipelineActions
