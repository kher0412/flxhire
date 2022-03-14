import React from 'react'
import moment from 'moment'
import { getContractStatus, getStatusColor } from 'services/contract'
import { StatusBadge } from 'components'
import { IContractForClient } from 'types'

function arePropsEqual(prevProps, nextProps) {
  return prevProps.contract?.id === nextProps.contract?.id &&
    prevProps.contract?.last_interaction_at === nextProps.contract?.last_interaction_at &&
    prevProps.contract?.status === nextProps.contract?.status
}

type PartialContract = Pick<IContractForClient, ('status' | 'last_interaction_at' | 'requests_status' | 'invitation_type')>

const ContractStatusBadge = React.memo(({ contract }: { contract: PartialContract }) => {
  if (!contract?.status) return null

  const { status, last_interaction_at: lastInteractionAt } = contract
  let statusText = getContractStatus(contract)
  let color = getStatusColor(contract)

  if (lastInteractionAt && status !== 'active') {
    statusText += ` ${moment(lastInteractionAt).fromNow()}`
  }

  return <StatusBadge color={color} text={statusText} />
}, arePropsEqual)

export default ContractStatusBadge
