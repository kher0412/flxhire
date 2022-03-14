import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { FocusedFreelancerActions_Query } from '__generated__/FocusedFreelancerActions_Query.graphql'
import FreelancerActions from '../FreelancerActions'
import FeedbackButton from '../Freelancer/components/FeedbackButton'
import FreelancerCardChatButton from '../Freelancer/components/FreelancerCardChatButton'

interface IFocusedFreelancerActionsProp {
  contract?: {
    id: number
    job_id: number
  }
  freelancer: {
    id: number
    job_id?: number
    contract_id?: number
  }
  autoOpenAction?: string
}

const FocusedFreelancerActions = ({ contract: contractProp, freelancer: freelancerProp, autoOpenAction }: IFocusedFreelancerActionsProp) => {
  const data = useLazyLoadQuery<FocusedFreelancerActions_Query>(graphql`
    query FocusedFreelancerActions_Query($contractId: Int, $freelancerId: Int!, $jobId: Int!, $hasContract: Boolean!) {
      freelancer: user(rawId: $freelancerId) {
        ...FreelancerCardChatButton_Freelancer
        ...FeedbackButton_Freelancer
        ...FreelancerActions_Freelancer
      }
      contract(rawId: $contractId) @include(if: $hasContract) {
        ...FreelancerCardChatButton_Contract
        ...FeedbackButton_Contract
        ...FreelancerActions_Contract
      }
      job(rawId: $jobId) {
        ...FreelancerActions_Job
      }
    }
  `, {
    contractId: contractProp?.id || freelancerProp?.contract_id,
    freelancerId: freelancerProp?.id,
    jobId: contractProp?.job_id || freelancerProp?.job_id,
    hasContract: Boolean(contractProp?.id),
  }, {
    fetchPolicy: 'store-and-network',
  })
  const focusedContract = data?.contract
  const freelancer = data?.freelancer
  const job = data?.job
  return (
    <React.Fragment>
      <FeedbackButton
        contract={focusedContract}
        freelancer={freelancer}
        autoOpen={autoOpenAction === 'feedback'}
      />
      <FreelancerCardChatButton
        contract={focusedContract}
        freelancer={freelancer}
        style={{ marginRight: 8 }}
      />
      <FreelancerActions
        freelancer={freelancer}
        contract={focusedContract}
        job={job}
        autoOpenAction={autoOpenAction}
      />
    </React.Fragment>
  )
}

export default FocusedFreelancerActions
