import { ChatButton } from 'components'
import { ComponentProps } from 'react'
import { graphql, useFragment } from 'react-relay'
import { isUnsentJobApplication } from 'services/contract'
import { FreelancerCardChatButton_Contract$key } from '__generated__/FreelancerCardChatButton_Contract.graphql'
import { FreelancerCardChatButton_Freelancer$key } from '__generated__/FreelancerCardChatButton_Freelancer.graphql'

interface IFreelancerCardChatButtonProps extends ComponentProps<typeof ChatButton> {
  contract: FreelancerCardChatButton_Contract$key
  freelancer: FreelancerCardChatButton_Freelancer$key
}

const FreelancerCardChatButton = ({ contract: contractProp, freelancer: freelancerProp, ...props }: IFreelancerCardChatButtonProps) => {
  const freelancer = useFragment(graphql`
    fragment FreelancerCardChatButton_Freelancer on User {
      rawId
      status
      directChatThreadId
      firstName
      lastName
      avatarUrl
      lastSeenAt
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment FreelancerCardChatButton_Contract on Contract {
      status
    }
  `, contractProp)
  if (!freelancer || !contract) return null

  if (contract?.status && !isUnsentJobApplication({ status: contract?.status as any }) && freelancer.status !== 'deleted') {
    return (
      <ChatButton
        color="default"
        threadId={freelancer.directChatThreadId as number}
        recipientId={freelancer.rawId as number}
        contact={{
          first_name: freelancer?.firstName,
          name: `${freelancer?.firstName || ''} ${freelancer?.lastName || ''}`.trim(),
          avatar_url: freelancer?.avatarUrl,
          last_seen_at: freelancer?.lastSeenAt as string,
        }}
        {...props}
      />
    )
  }

  return null
}

export default FreelancerCardChatButton
