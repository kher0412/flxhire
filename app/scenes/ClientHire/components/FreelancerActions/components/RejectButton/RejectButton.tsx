import React, { useState } from 'react'
import { useOnMount } from 'hooks'
import { IContractStatus, IContractForClient } from 'types'
import dynamic from 'services/dynamic'
import { Button } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { isRejectable } from 'services/freelancer'
import { isUnsentJobApplication } from 'services/contract'
import { RejectButton_Contract$key } from '__generated__/RejectButton_Contract.graphql'
import { RejectButton_Freelancer$key } from '__generated__/RejectButton_Freelancer.graphql'
import { RejectButton_Job$key } from '__generated__/RejectButton_Job.graphql'
import { Cancel } from '@material-ui/icons'

const RejectDialog = dynamic(() => import(/* webpackChunkName: "RejectDialog" */'../RejectDialog'), { ssr: false }) as any

interface IRejectButtonProps {
  contract: RejectButton_Contract$key
  freelancer: RejectButton_Freelancer$key
  job: RejectButton_Job$key
  autoOpenAction?: string
  connectionId?: string
}

const RejectButton = ({ contract: contractProp, freelancer: freelancerProp, job: jobProp, autoOpenAction, connectionId }: IRejectButtonProps) => {
  const freelancer = useFragment(graphql`
    fragment RejectButton_Freelancer on User {
      ...RejectDialog_Freelancer
    }
  `, freelancerProp)
  const job = useFragment(graphql`
    fragment RejectButton_Job on Job {
      id
      status
    }
  `, jobProp)
  const contract = useFragment(graphql`
    fragment RejectButton_Contract on Contract {
      status
      invitationType
      ...RejectDialog_Contract
    }
  `, contractProp)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

  const rejectable = isRejectable({
    status: contract?.status as IContractStatus,
    invitation_type: contract?.invitationType as IContractForClient['invitation_type'],
  })
  useOnMount(() => {
    if (autoOpenAction === 'reject' && rejectable) setRejectDialogOpen(true)
  })
  const isCandidate = !contract || isUnsentJobApplication({ status: contract?.status as IContractStatus })
  const label = isCandidate ? 'Skip' : 'Reject'
  const jobStatus = job?.status

  if (!rejectable) return null

  return (
    <React.Fragment>
      <Button
        data-cy="skip"
        onClick={() => setRejectDialogOpen(true)}
        disabled={!isCandidate && jobStatus === 'draft'}
      >
        <Cancel /> {label}
      </Button>
      {rejectDialogOpen && (
        <RejectDialog
          open
          onClose={() => setRejectDialogOpen(false)}
          freelancer={freelancer}
          contract={contract}
          jobId={job?.id}
          connectionId={connectionId}
        />
      )}
    </React.Fragment>
  )
}

export default RejectButton
