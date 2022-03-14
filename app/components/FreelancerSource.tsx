import React from 'react'
import { FreelancerCardInfoItem } from 'components'
import { Link as LinkIcon } from '@material-ui/icons'
import { getApplicantSource, getApplicantSourceIcon } from 'services/contract'
import { useFragment, graphql } from 'react-relay'
import { FreelancerSource_Contract$key } from '__generated__/FreelancerSource_Contract.graphql'
import { useCurrentUser } from 'hooks'

interface IFreelancerSourceProps {
  contract: FreelancerSource_Contract$key
}

const FreelancerSource = ({ contract: contractProp }: IFreelancerSourceProps) => {
  const [user] = useCurrentUser()
  const contract = useFragment(graphql`
    fragment FreelancerSource_Contract on Contract {
      ...contract_getApplicantSource
      ...contract_getApplicantSourceIcon
    }
  `, contractProp)

  if (!user?.firm?.allow_display_applicant_source) return null

  const source = getApplicantSource(contract)

  if (source) {
    const Icon = getApplicantSourceIcon(contract)
    return (
      <FreelancerCardInfoItem
        icon={Icon ? <Icon style={{ fontSize: 24, width: 24 }} /> : <LinkIcon />}
        primary={source}
        secondary="Applicant Source"
      />
    )
  }

  return null
}

export default FreelancerSource
