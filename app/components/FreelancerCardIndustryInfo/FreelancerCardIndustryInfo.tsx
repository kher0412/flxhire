import { FreelancerCardInfoItem } from 'components'
import { graphql, useFragment } from 'react-relay'
import { FreelancerCardIndustryInfo_Freelancer$key } from '__generated__/FreelancerCardIndustryInfo_Freelancer.graphql'
import { Work } from '@material-ui/icons'

const FreelancerCardIndustryInfo = ({ freelancer }: { freelancer: FreelancerCardIndustryInfo_Freelancer$key }) => {
  const data = useFragment(graphql`
    fragment FreelancerCardIndustryInfo_Freelancer on User {
      profile {
        freelancerType {
          name
        }
      }
    }
  `, freelancer)

  return (
    <FreelancerCardInfoItem
      icon={<Work />}
      primary={data?.profile?.freelancerType?.name || '?'}
      secondary="Occupation"
    />
  )
}

export default FreelancerCardIndustryInfo
