import React from 'react'
import { Typography } from '@material-ui/core'
import { graphql, useFragment } from 'react-relay'
import { IContractRequestStatus, IContractStatus } from 'types'
import { FreelancerCardStatus_Freelancer$key } from '__generated__/FreelancerCardStatus_Freelancer.graphql'
import { FreelancerCardStatus_Contract$key } from '__generated__/FreelancerCardStatus_Contract.graphql'
import ContractStatusBadge from '../ContractStatusBadge'
import MemberPipelineStatusBadge from '../MemberPipelineStatusBadge'
import styles from './FreelancerCardStatus.module.css'

interface IFreelancerCardStatusProps {
  freelancer: FreelancerCardStatus_Freelancer$key
  contract: FreelancerCardStatus_Contract$key
  additionalText?: string
}

const FreelancerCardStatus = (props: IFreelancerCardStatusProps) => {
  const { freelancer: freelancerProp, contract: contractProp, additionalText } = props

  const freelancer = useFragment(graphql`
    fragment FreelancerCardStatus_Freelancer on User {
      status
      hidden
      createdAt
      appliedAt
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment FreelancerCardStatus_Contract on Contract {
      status
      requestsStatus
      lastInteractionAt
      invitationType
    }
  `, contractProp)

  if (!freelancer && !contract && !additionalText) {
    return null
  }

  return (
    <div className={styles.container}>
      <Typography variant="subtitle1">
        {contract && (
          <ContractStatusBadge
            contract={{
              status: contract?.status as IContractStatus,
              requests_status: contract?.requestsStatus as IContractRequestStatus,
              last_interaction_at: contract?.lastInteractionAt as string,
              invitation_type: contract?.invitationType as 'hire' | 'invitation',
            }}
          />
        )}

        {!contract && freelancer && (
          <MemberPipelineStatusBadge
            freelancer={{
              status: freelancer.status as any,
              hidden: freelancer.hidden,
              created_at: freelancer.createdAt as string,
              applied_at: freelancer.appliedAt as string,
            }}
          />
        )}

        {additionalText}
      </Typography>
    </div>
  )
}

export default FreelancerCardStatus
