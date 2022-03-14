import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { Suspense, MediaQuery, UserAvatar } from 'components'
import { Chip, CardHeader, Typography, Badge } from '@material-ui/core'
import Link from 'components/Link'

import { isOnline } from 'services/chat'
import dynamic from 'services/dynamic'
import { graphql, useFragment } from 'react-relay'
import { IUserStatus } from 'types'
import { FreelancerCardHeader_Freelancer$key } from '__generated__/FreelancerCardHeader_Freelancer.graphql'
import { FreelancerCardHeader_Contract$key } from '__generated__/FreelancerCardHeader_Contract.graphql'
import { Search } from '@material-ui/icons'
import styles from './FreelancerCardHeader.module.css'
import ViewProfileButton from './components/ViewProfileButton'
import ViewResumeButton from './components/ViewResumeButton'
import VerificationItem from './components/VerificationItem'
import FreelancerCardStatus from '../FreelancerCardStatus'

const ProfileOverlay = dynamic(() => import(/* webpackChunkName: "Profileoverlay" */'./components/ProfileOverlay'), { ssr: false }) as any

interface IFreelancerCardHeaderProps {
  freelancer: FreelancerCardHeader_Freelancer$key
  contract?: FreelancerCardHeader_Contract$key
  avatar?: React.ReactNode
  showOnlineStatus?: boolean
  filteredOut?: boolean
  filteredOutReason?: string
  children?: any
  useProfileOverlays?: boolean
  profileUrlQuery?: string
  showStatus?: boolean
  statusAdditionalText?: string
}

const FreelancerCardHeader = (props: IFreelancerCardHeaderProps) => {
  const {
    freelancer: freelancerProp,
    contract: contractProp,
    avatar,
    showOnlineStatus,
    filteredOut,
    filteredOutReason,
    profileUrlQuery,
    children,
    showStatus,
    statusAdditionalText,
    useProfileOverlays,
  } = props
  const [isInlineProfileOpen, setInlineProfileOpen] = useState(false)

  const freelancer = useFragment(graphql`
    fragment FreelancerCardHeader_Freelancer on User {
      firstName
      lastName
      status
      email
      lastSeenAt
      resumeUrl
      avatarUrl
      profile {
        slug
      }

      ...FreelancerCardStatus_Freelancer
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment FreelancerCardHeader_Contract on Contract {
      freelancerFirstName
      freelancerLastName
      
      ...FreelancerCardStatus_Contract
    }
  `, contractProp)

  const handleViewProfileClick = useCallback((e: React.MouseEvent<any>) => {
    if (useProfileOverlays) {
      if (e.button === 0) {
        e.preventDefault()

        setInlineProfileOpen(true)
      }
    }
  }, [useProfileOverlays])

  const handleProfileOverlayClose = useCallback(() => setInlineProfileOpen(false), [])

  const firstName = freelancer?.firstName || contract?.freelancerFirstName || ''
  const lastName = freelancer?.lastName || contract?.freelancerLastName || ''
  let displayName = `${firstName || ''} ${lastName || ''}`.trim()
  let initial = displayName

  if (displayName === '') {
    initial = '?'
    if (freelancer?.status === 'deleted') {
      displayName = '(Deleted Account)'
    } else if (freelancer?.email) {
      displayName = freelancer?.email
    } else {
      displayName = '(N/A)'
    }
  }

  const profile = freelancer?.profile
  let isUserOnline = (showOnlineStatus && isOnline(freelancer?.lastSeenAt ? moment(freelancer?.lastSeenAt) : undefined))
  let avatarElement = avatar

  if (!avatarElement) {
    avatarElement = (
      <Badge
        variant="dot"
        badgeContent={isUserOnline ? 1 : 0}
        overlap="circle"
        className={styles.badge}
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <UserAvatar
          className={styles.avatar}
          name={initial}
          url={freelancer?.avatarUrl}
          href={profile?.slug && '/[...slugs]'}
          as={`/${profile?.slug}`}
          style={filteredOut ? { filter: 'grayscale(100%)' } : undefined}
          data-cy="freelancer-avatar"
        />
      </Badge>
    )
  }

  return (
    <React.Fragment>
      <MediaQuery maxWidth={800}>
        <div className={styles.mobileContainer}>
          <CardHeader
            avatar={(
              <React.Fragment>
                <Badge
                  variant="dot"
                  badgeContent={isUserOnline ? 1 : 0}
                  color="primary"
                  overlap="circle"
                  className={styles.badge}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <UserAvatar
                    name={initial}
                    url={freelancer?.avatarUrl}
                    href={profile?.slug && '/[...slugs]'}
                    as={`/${profile?.slug}`}
                    style={filteredOut ? { filter: 'grayscale(100%)' } : undefined}
                    data-cy="freelancer-avatar"
                  />
                </Badge>
              </React.Fragment>
              )}
            title={showStatus && (
              <Suspense>
                <FreelancerCardStatus
                  contract={contract}
                  freelancer={freelancer}
                  additionalText={statusAdditionalText}
                />
              </Suspense>
            )}
            subheader={(
              <Typography variant="h3">
                {displayName} <VerificationItem status={freelancer?.status as IUserStatus} />
              </Typography>
            )}
          />

          <div className={styles.mobileActions}>
            {profile?.slug && (
            <ViewProfileButton slug={profile?.slug} query={profileUrlQuery} />
            )}

            {freelancer?.resumeUrl && (
            <ViewResumeButton url={freelancer?.resumeUrl} />
            )}

            {children}
          </div>
        </div>
      </MediaQuery>

      <MediaQuery minWidth={801}>
        {showStatus && (
        <div className={styles.statusWrapper}>
          <FreelancerCardStatus
            contract={contract}
            freelancer={freelancer}
            additionalText={statusAdditionalText}
          />
        </div>
        )}

        <div className={styles.container} data-cy="freelancer-card-header">
          <div className={styles.avatarWrapper}>
            {avatarElement}

            {filteredOut && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
              <Chip
                icon={<Search />}
                label={filteredOutReason ? `Filtered Out: ${filteredOutReason}` : 'Filtered Out'}
              />
            </div>
            )}

            <div className={styles.avatarActions}>
              {profile?.slug && (
                <ViewProfileButton slug={profile?.slug} query={profileUrlQuery} />
              )}

              {freelancer?.resumeUrl && (
                <ViewResumeButton url={freelancer?.resumeUrl} />
              )}

              {children}
            </div>
          </div>

          <div className={styles.nameWrapper}>
            <div className={styles.name}>
              <Link href="/[...slugs]" as={`/${profile?.slug}`} style={{ textDecoration: 'none' }}>
                {displayName} <VerificationItem status={freelancer?.status as IUserStatus} />
              </Link>
            </div>
          </div>

          {isInlineProfileOpen && <ProfileOverlay open freelancer={freelancer} onClose={handleProfileOverlayClose} />}
        </div>
      </MediaQuery>
    </React.Fragment>
  )
}

export default FreelancerCardHeader
