import React, { useCallback } from 'react'
import {
  FreelancerCard,
  FreelancerCardHeader,
  FreelancerCardSlider,
  FreelancerCardActions,
  Link,
  FreelancerCardInfoItems,
  FreelancerCardLocationInfo,
  FreelancerCardIndustryInfo,
  FreelancerCardSkillsInfo,
} from 'components'
import { ICandidate, IContractForClient } from 'types'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Button } from 'components/themed'
import { Freelancer_FreelancerPreviewQuery } from '__generated__/Freelancer_FreelancerPreviewQuery.graphql'

interface IFreelancerProps {
  freelancer?: ICandidate
  contract?: IContractForClient & { updating?: boolean }
  hireLinkDestination?: string
  adminMode?: boolean
  flat?: boolean
}

const Freelancer = (props: IFreelancerProps) => {
  const { contract: contractProp, freelancer: freelancerProp, hireLinkDestination } = props
  const hasContract = Boolean(contractProp?.id)
  const data = useLazyLoadQuery<Freelancer_FreelancerPreviewQuery>(graphql`
    query Freelancer_FreelancerPreviewQuery($freelancerId: Int!, $contractId: Int, $hasContract: Boolean!) {
      freelancer: user(rawId: $freelancerId) {
        firstName
        ...FreelancerCardHeader_Freelancer
        ...FreelancerCardIndustryInfo_Freelancer
        ...FreelancerCardLocationInfo_Freelancer
        ...FreelancerCardSkillsInfo_Freelancer
        ...FreelancerCardSlider_Freelancer
      }
      contract(rawId: $contractId) @include(if: $hasContract) {
        rawId
        ...BookmarkButton_Contract
        ...FreelancerCardHeader_Contract
        ...FreelancerRates_Contract
        ...FreelancerCardSlider_Contract
      }
    }
  `, {
    freelancerId: freelancerProp?.id,
    contractId: contractProp?.id,
    hasContract: hasContract,
  }, {
    fetchPolicy: 'store-and-network',
  })

  const freelancer = data?.freelancer
  const contract = data?.contract

  return (
    <FreelancerCard>
      <FreelancerCardHeader
        freelancer={freelancer}
        contract={contract}
        profileUrlQuery="?action=signup"
      />

      <FreelancerCardInfoItems>
        <FreelancerCardLocationInfo
          freelancer={freelancer}
        />

        <FreelancerCardIndustryInfo
          freelancer={freelancer}
        />

        <FreelancerCardSkillsInfo
          freelancer={freelancer}
        />
      </FreelancerCardInfoItems>

      <FreelancerCardSlider
        freelancer={freelancer}
        contract={contract}
      />

      <FreelancerCardActions>
        <Button
          color="primary"
          muiComponent={Link}
          to={hireLinkDestination}
        >
          Join to hire experts like {freelancer.firstName}
        </Button>
      </FreelancerCardActions>
    </FreelancerCard>
  )
}

export default Freelancer
