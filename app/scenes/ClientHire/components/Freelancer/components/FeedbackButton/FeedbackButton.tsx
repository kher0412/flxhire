import React, { useCallback, useState } from 'react'
import { IContractForClient } from 'types'
import dynamic from 'services/dynamic'
import { isInterviewStage, isSentJobApplication, isOfferStage } from 'services/contract'
import { Button } from 'components/themed'
import { MediaQuery } from 'components'
import { useOnMount } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { FeedbackButton_Contract$key } from '__generated__/FeedbackButton_Contract.graphql'
import { FeedbackButton_Freelancer$key } from '__generated__/FeedbackButton_Freelancer.graphql'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import styles from './FeedbackButton.module.css'

const RatingDialog = dynamic(() => import(/* webpackChunkName: "RatingDialog" */'./components/RatingDialog'), { ssr: false }) as any

export interface IFeedbackButtonProps {
  contract: FeedbackButton_Contract$key
  freelancer: FeedbackButton_Freelancer$key
  autoOpen?: boolean
  style?: React.CSSProperties
}

export interface IFeedbackButtonState {
  ratingDialogOpen: boolean
}

const FeedbackButton = (props: IFeedbackButtonProps) => {
  const { contract: contractProp, freelancer: freelancerProp, style, autoOpen } = props
  const freelancer = useFragment(graphql`
    fragment FeedbackButton_Freelancer on User {
      firstName
      avatarUrl
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment FeedbackButton_Contract on Contract {
      id
      rawId
      status
      positiveFeedbackCount
      negativeFeedbackCount
    }
  `, contractProp)

  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const openRatingDialog = useCallback(() => setRatingDialogOpen(true), [])
  const closeRatingDialog = useCallback(() => setRatingDialogOpen(false), [])

  useOnMount(() => {
    if (autoOpen) openRatingDialog()
  })

  if (!contract || !freelancer) return null

  const partialContract = { status: contract?.status as IContractForClient['status'] }
  if (!isSentJobApplication(partialContract) && !isInterviewStage(partialContract) && !isOfferStage(partialContract)) return null

  return (
    <React.Fragment>
      {ratingDialogOpen && (
        <RatingDialog
          open
          contract={contract}
          freelancer={freelancer}
          onClose={closeRatingDialog}
        />
      )}

      <Button onClick={openRatingDialog} color="default" className={styles.feedback} style={style} data-cy="contract-feedback">
        <div className={styles.sum}>
          <div className={styles.up}>
            <ThumbUp /> <MediaQuery minWidth={500}>{contract?.positiveFeedbackCount}</MediaQuery>
          </div>

          <MediaQuery minWidth={500}>
            <div className={styles.down}>
              <ThumbDown /> {contract?.negativeFeedbackCount}
            </div>
          </MediaQuery>
        </div>
      </Button>
    </React.Fragment>
  )
}

export default FeedbackButton
