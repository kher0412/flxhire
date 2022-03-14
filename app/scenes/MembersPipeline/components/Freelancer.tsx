import React from 'react'
import {
  Grid,
} from '@material-ui/core'
import {
  FreelancerCard,
  FreelancerCardHeader,
  FreelancerCardSlider,
  FreelancerAvailableOn,
  FreelancerReferences,
  FreelancerRates,
  FreelancerCardInfoItems,
  ShareLinkButton,
  FreelancerCardLocationInfo,
  FreelancerCardIndustryInfo,
  FreelancerCardSkillsInfo,
  Suspense,
} from 'components'
import { useFragment, graphql } from 'react-relay'
import { Freelancer_FreelancerMemberPipelineFragment$key } from '__generated__/Freelancer_FreelancerMemberPipelineFragment.graphql'
import FreelancerContracts from './FreelancerContracts'

interface IFreelancerProps {
  freelancer: Freelancer_FreelancerMemberPipelineFragment$key
  children?: any
  flat?: boolean
}

const Freelancer = (props: IFreelancerProps) => {
  const { freelancer: freelancerProp, children, flat } = props
  const freelancer = useFragment(graphql`
    fragment Freelancer_FreelancerMemberPipelineFragment on User {
      rawId
      firstName
      hidden
      profile {
        slug
        availableAt
      }
      ...FreelancerCardHeader_Freelancer
      ...FreelancerCardLocationInfo_Freelancer
      ...FreelancerCardIndustryInfo_Freelancer
      ...FreelancerRates_Freelancer
      ...ShareLinkButton_Freelancer
      ...FreelancerCardChatButton_Freelancer
      ...FreelancerCardSkillsInfo_Freelancer
      ...FreelancerCardSlider_Freelancer
      ...FreelancerReferences_Freelancer
      ...FreelancerContracts_Contracts
    }
  `, freelancerProp)
  if (!freelancer) return null

  return (
    <FreelancerCard raised={!flat} flat={flat}>
      <FreelancerCardHeader
        freelancer={freelancer}
        showOnlineStatus
        showStatus
      >
        <Suspense>
          <ShareLinkButton
            membersPipeline
            freelancer={freelancer}
          />
        </Suspense>
      </FreelancerCardHeader>

      <FreelancerCardInfoItems>
        <Grid container>
          <Grid item xs={6}>
            <Suspense><FreelancerCardLocationInfo freelancer={freelancer} /></Suspense>
            <Suspense><FreelancerCardIndustryInfo freelancer={freelancer} /></Suspense>
            <Suspense><FreelancerCardSkillsInfo freelancer={freelancer} /></Suspense>
          </Grid>

          <Grid item xs={6}>
            <Suspense><FreelancerRates freelancer={freelancer} /></Suspense>
            <FreelancerAvailableOn freelancer={{ profile: { available_at: freelancer?.profile?.availableAt as string } }} />
            <Suspense><FreelancerReferences freelancer={freelancer} /></Suspense>
          </Grid>
        </Grid>
      </FreelancerCardInfoItems>

      <Suspense><FreelancerCardSlider freelancer={freelancer} /></Suspense>
      <Suspense><FreelancerContracts freelancer={freelancer} /></Suspense>

      {children}
    </FreelancerCard>
  )
}

export default Freelancer
