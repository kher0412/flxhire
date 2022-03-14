import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { ChatButton } from 'components'
import AdminTools from 'scenes/ClientHire/components/FreelancerActions/components/AdminTools'
import { FreelancerActions_FreelancerMemberPipelineActionsFragment$key } from '__generated__/FreelancerActions_FreelancerMemberPipelineActionsFragment.graphql'

interface IFreelancerActionsProps {
  freelancer: FreelancerActions_FreelancerMemberPipelineActionsFragment$key
}

const FreelancerActions = ({ freelancer: freelancerProp }: IFreelancerActionsProps) => {
  const freelancer = useFragment(graphql`
    fragment FreelancerActions_FreelancerMemberPipelineActionsFragment on User {
      rawId
      directChatThreadId
      firstName
      lastName
      avatarUrl
      lastSeenAt
      ...AdminTools_Freelancer
    }
  `, freelancerProp)

  if (!freelancer) return null

  return (
    <React.Fragment>
      <ChatButton
        threadId={freelancer.directChatThreadId}
        recipientId={freelancer.rawId}
        contact={{
          first_name: freelancer?.firstName,
          name: `${freelancer?.firstName || ''} ${freelancer?.lastName || ''}`.trim(),
          avatar_url: freelancer?.avatarUrl,
          last_seen_at: freelancer?.lastSeenAt,
        }}
      />
      <AdminTools freelancer={freelancer} />
    </React.Fragment>
  )
}

export default FreelancerActions
