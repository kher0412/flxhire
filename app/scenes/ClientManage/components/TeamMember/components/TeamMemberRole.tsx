import React from 'react'
import { FreelancerCardInfoItem } from 'components'
import { SupervisorAccount } from '@material-ui/icons'
import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { TeamMemberRole_Contract$key } from '__generated__/TeamMemberRole_Contract.graphql'

export interface ITeamMemberRoleProps {
  contractFragmentRef: TeamMemberRole_Contract$key
}

function TeamMemberRole({ contractFragmentRef }: ITeamMemberRoleProps) {
  const contract = useFragment(graphql`
    fragment TeamMemberRole_Contract on Contract {
      isManager
      isFirmAdmin
    }
  `, contractFragmentRef)

  let firmRole = 'Individual'
  if (contract?.isManager) firmRole = 'Manager'
  if (contract?.isFirmAdmin) firmRole = 'Admin'

  return (
    <FreelancerCardInfoItem
      icon={<SupervisorAccount />}
      primary={firmRole}
      secondary="Role"
    />
  )
}

export default React.memo(TeamMemberRole)
