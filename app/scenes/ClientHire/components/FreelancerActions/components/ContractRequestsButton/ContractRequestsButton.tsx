import React, { useState } from 'react'
import { useOnMount } from 'hooks'
import dynamic from 'services/dynamic'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Button } from 'components/themed'
import FilterIcon from 'components/Icons/FilterIcon'
import { canScreen } from 'services/freelancer'
import { IContractStatus, IContractForClient } from 'types'
import type { RequestMoreInfoDialogComponent } from 'components/RequestMoreInfoDialog/RequestMoreInfoDialog'
import { ContractRequestsButton_Query } from '__generated__/ContractRequestsButton_Query.graphql'

const RequestMoreInfoDialog = dynamic(() => (
  import(/* webpackChunkName: "RequestMoreInfoDialog" */'components/RequestMoreInfoDialog')
), { ssr: false }) as RequestMoreInfoDialogComponent

interface IContractRequestsButtonProps {
  freelancerId: number
  contractId: number
  autoOpenAction?: string
  connectionId?: string
}

const ContractRequestsButton = ({ freelancerId, contractId, autoOpenAction, connectionId }: IContractRequestsButtonProps) => {
  // TODO: switch to preloaded query
  const data = useLazyLoadQuery<ContractRequestsButton_Query>(graphql`
    query ContractRequestsButton_Query($freelancerId: Int, $contractId: Int, $withContract: Boolean!, $withFreelancer: Boolean!) {
      contract(rawId: $contractId) @include(if: $withContract) {
        status
        requestsStatus
        job {
          ...RequestMoreInfoDialog_Job
        }
        contractRequests {
          status
          requestType
        }
        ...RequestMoreInfoDialog_Contract
      }
      freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
        video {
          status # we just need to check existance of the video
        }
        ...RequestMoreInfoDialog_Freelancer
      }
    } 
  `, {
    freelancerId,
    contractId,
    withContract: Boolean(contractId),
    withFreelancer: Boolean(freelancerId),
  }, {
    fetchPolicy: 'store-and-network',
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  useOnMount(() => {
    if (autoOpenAction === 'screen') setDialogOpen(true)
  })
  const freelancer = data?.freelancer
  const contract = data?.contract

  if (!freelancer || !canScreen({ status: contract?.status as IContractStatus })) return null

  const screeningStatus = contract?.requestsStatus as IContractForClient['requests_status']
  let requests = contract?.contractRequests || []
  let completed = requests.filter(x => x.status === 'completed').length
  let pending = requests.filter(x => x.status !== 'completed').length

  // For freelancers with an introduction video already existing, but without an explicit client request for an introduction video,
  // the introduction video is considered as an already completed screening request; but only once the client explicitly send at least 1 other request.
  // Otherwise the freelancer would come up as "screening completed (1/1)", which is misleading to the client, having made no screening before.
  if (freelancer.video && requests.length > 0 && !requests.some(r => r.requestType === 'video_introduction')) {
    completed++
  }

  let label = 'Screen'
  let labelStatus = ''
  if (screeningStatus === 'pending') labelStatus = 'Requested'
  if (screeningStatus === 'started') labelStatus = 'Started'
  if (screeningStatus === 'completed') labelStatus = 'Completed'
  let counts = ''
  if (pending > 0 || completed > 0) counts = `${completed}/${pending + completed}`

  if (labelStatus && counts) {
    label += ` (${labelStatus}, ${counts})`
  } else if (labelStatus || counts) {
    label += ` (${labelStatus || counts})`
  }

  return (
    <React.Fragment>
      {dialogOpen && (
        <RequestMoreInfoDialog
          contract={contract}
          freelancer={freelancer}
          job={contract?.job}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          connectionId={connectionId}
        />
      )}

      <Button onClick={() => setDialogOpen(true)} data-cy="ask-more" color="secondary">
        <FilterIcon width={24} height={24} /> {label}
      </Button>
    </React.Fragment>
  )
}

export default ContractRequestsButton
