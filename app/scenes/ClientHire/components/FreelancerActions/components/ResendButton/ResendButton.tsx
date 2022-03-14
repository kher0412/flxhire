import React from 'react'
import { IJob } from 'types'
import { ConfirmButton } from 'components'
import { useDispatchAction } from 'hooks'
import { createAction } from 'redux-actions'
import { RESEND_INVITATION } from 'scenes/ClientHire/HireDucks'
import { graphql, useFragment } from 'react-relay'
import { jobActionsDisabled } from 'services/job'
import { ResendButton_Contract$key } from '__generated__/ResendButton_Contract.graphql'
import { Send } from '@material-ui/icons'

interface IResendButtonProps {
  contract: ResendButton_Contract$key
}

const ResendButton = ({ contract: contractProp }: IResendButtonProps) => {
  const contract = useFragment(graphql`
    fragment ResendButton_Contract on Contract {
      rawId
      status
      invitationType
      freelancerFirstName
      freelancerEmail
      job {
        status
      }
    }
  `, contractProp)
  const contractId = contract?.rawId
  const resend = useDispatchAction(() => createAction(RESEND_INVITATION)({ contract: { id: contractId } }), [contractId])

  const resendable = contract?.status === 'offer_made' && contract?.invitationType === 'invitation'

  if (!resendable) return null

  const title = 'Resend Invite'
  const message = `Are you sure? The invite email will be sent again to ${contract.freelancerFirstName} at ${contract.freelancerEmail}.`
  const label = 'Resend'

  return (
    <ConfirmButton
      color="secondary"
      dialogTitle={title}
      dialogMessage={message}
      data-cy="resend"
      onClick={resend}
      disabled={jobActionsDisabled({ status: contract?.job?.status as IJob['status'] })}
    >
      <Send /> {label}
    </ConfirmButton>
  )
}

export default ResendButton
