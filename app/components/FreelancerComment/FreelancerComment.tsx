import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { FreelancerComment_Contract$key } from '__generated__/FreelancerComment_Contract.graphql'
import { FreelancerComment_Freelancer$key } from '__generated__/FreelancerComment_Freelancer.graphql'
import styles from './FreelancerComment.module.css'

interface IFreelancerCommentProps {
  contract: FreelancerComment_Contract$key
  freelancer: FreelancerComment_Freelancer$key
}

const FreelancerComment = (props: IFreelancerCommentProps) => {
  const { contract: contractProp, freelancer: freelancerProp } = props
  const contract = useFragment(graphql`
    fragment FreelancerComment_Contract on Contract {
      freelancerFeedback
      freelancerMessage
      status
      requestsStatus
    }
  `, contractProp)
  const freelancer = useFragment(graphql`
    fragment FreelancerComment_Freelancer on User {
      firstName
    }
  `, freelancerProp)

  if (!contract || !freelancer) return null

  const { status, requestsStatus, freelancerFeedback, freelancerMessage } = contract

  if (freelancerFeedback && (['interview_rejected', 'offer_rejected'].includes(status) || requestsStatus === 'rejected')) {
    return (
      <div className={styles.comment}>
        <div className={styles['comment-wrapper']} data-cy="freelancer-card-reject-reason">
          <strong>{freelancer.firstName} says:</strong> {freelancerFeedback}
        </div>
      </div>
    )
  }

  if (freelancerMessage && ['interview_accepted'].includes(status)) {
    return (
      <div className={styles.comment}>
        <div className={styles['comment-wrapper']} data-cy="freelancer-card-comment">
          <strong>{freelancer.firstName} says:</strong> {freelancerMessage}
        </div>
      </div>
    )
  }

  return null
}

export default FreelancerComment
