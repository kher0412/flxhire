import { FreelancerCardInfoItem, MoreButtonCard } from 'components'
import { Divider } from '@material-ui/core'
import { getLocation } from 'services/freelancer'
import dynamic from 'services/dynamic'
import { graphql, useFragment } from 'react-relay'
import { FreelancerCardLocationInfo_Freelancer$key } from '__generated__/FreelancerCardLocationInfo_Freelancer.graphql'
import { PinDrop } from '@material-ui/icons'
import styles from './FreelancerCardLocationInfo.module.css'

const FreelancerLocationMap: any = dynamic(
  () => import(/* webpackChunkName: "FreelancerLocationMap" */'components/FreelancerLocationMap'),
  {
    ssr: false,
    loading: () => <div style={{ height: 240, backgroundColor: '#eee' }} />,
  },
)

interface IFreelancerCardLocationInfoProps {
  freelancer: FreelancerCardLocationInfo_Freelancer$key
}

const FreelancerCardLocationInfo = ({ freelancer: freelancerProp }: IFreelancerCardLocationInfoProps) => {
  const freelancer = useFragment(graphql`
    fragment FreelancerCardLocationInfo_Freelancer on User {
      profile {
        city
        region
        country
        fullAddress
        locationLatitude
        locationLongitude
        locationBounds0
        locationBounds1
        locationBounds2
        locationBounds3
      }
    }
  `, freelancerProp)

  if (!freelancer?.profile) {
    return (
      <FreelancerCardInfoItem
        icon={<PinDrop />}
        primary="?"
        secondary="Location"
      />
    )
  }

  const profileLocationData = {
    city: freelancer.profile.city,
    region: freelancer.profile.region,
    country: freelancer.profile.country,
    fullAddress: freelancer.profile.fullAddress,
    location_latitude: freelancer.profile.locationLatitude,
    location_longitude: freelancer.profile.locationLongitude,
    location_bounds_0: freelancer.profile.locationBounds0,
    location_bounds_1: freelancer.profile.locationBounds1,
    location_bounds_2: freelancer.profile.locationBounds2,
    location_bounds_3: freelancer.profile.locationBounds3,
  }

  const locationString = getLocation(profileLocationData, true)
  const fullLocationString = getLocation(profileLocationData)

  if (!locationString) {
    return (
      <FreelancerCardInfoItem
        icon={<PinDrop />}
        primary="?"
        secondary="Location"
      />
    )
  }

  return (
    <MoreButtonCard
      component={props => (
        <FreelancerCardInfoItem
          {...props}
          button
          icon={<PinDrop />}
          primary={locationString}
          secondary="Location"
        />
      )}
    >
      <div className={styles.wrapper}>
        <FreelancerLocationMap
          profile={profileLocationData}
          style={{ margin: 0, height: 240, boxSizing: 'border-box' }}
        />

        <Divider style={{ margin: 0 }} />

        <div style={{ padding: 24 }}>
          {fullLocationString}
        </div>
      </div>
    </MoreButtonCard>
  )
}

export default FreelancerCardLocationInfo
