import React, { useCallback } from 'react'
import { IContractStatus, IJob } from 'types'
import { useOnMount } from 'hooks'
import OffersIcon from 'components/Icons/OffersIcon'
import { Button } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { canMakeOffer } from 'services/freelancer'
import { jobActionsDisabled } from 'services/job'
import { MakeOfferButton_Contract$key } from '__generated__/MakeOfferButton_Contract.graphql'
import { MakeOfferButton_Job$key } from '__generated__/MakeOfferButton_Job.graphql'
import { MakeOfferButton_Freelancer$key } from '__generated__/MakeOfferButton_Freelancer.graphql'
import { browserHistory } from 'services/router'

interface IMakeOfferButtonProps {
  contract: MakeOfferButton_Contract$key
  job: MakeOfferButton_Job$key
  freelancer: MakeOfferButton_Freelancer$key
  autoOpenAction?: string
}

const MakeOfferButton = ({ contract: contractProp, job: jobProp, freelancer: freelancerProp, autoOpenAction }: IMakeOfferButtonProps) => {
  const job = useFragment(graphql`
    fragment MakeOfferButton_Job on Job {
      status
    }
  `, jobProp)

  const freelancer = useFragment(graphql`
    fragment MakeOfferButton_Freelancer on User {
      rawId
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment MakeOfferButton_Contract on Contract {
      rawId
      status
      job {
        status
      }
    }
  `, contractProp)

  const makeOffer = useCallback(() => {
    if (contract?.rawId) {
      browserHistory.push(`/client/invitation_team?contract=${contract?.rawId}&member=${freelancer?.rawId}`)
    } else if (freelancer?.rawId) {
      browserHistory.push(`/client/invitation_team?member=${freelancer?.rawId}`)
    }
  }, [freelancer?.rawId])

  const offerRejected = contract?.status === 'offer_rejected'
  const offerMade = contract?.status === 'offer_made'

  let label = 'Make Offer'

  if (offerRejected) {
    label = 'Make Another Offer'
  }

  if (offerMade) {
    label = 'Offer Made'
  }

  const offerable = canMakeOffer({ status: contract?.status as IContractStatus })

  useOnMount(() => {
    if (autoOpenAction === 'offer' && offerable) makeOffer()
  })

  if (!offerable) return null

  return (
    <Button
      onClick={makeOffer}
      color="primary"
      data-cy="make-offer"
      disabled={jobActionsDisabled({ status: (contract?.job?.status || job?.status) as IJob['status'] })}
    >
      <OffersIcon width={24} height={21} /> {label}
    </Button>
  )
}

export default MakeOfferButton
