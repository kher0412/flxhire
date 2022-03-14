import React from 'react'
import { useCurrentUser, useSnackbar, useQuickCommit } from 'hooks'
import { ChatButton, ConfirmButton } from 'components'
import { Button } from 'components/themed'
import PauseIcon from '@material-ui/icons/PauseCircleFilled'
import StopIcon from '@material-ui/icons/Cancel'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'
import { graphql, useFragment } from 'react-relay'
import { TeamMemberActions_Contract, TeamMemberActions_Contract$key } from '__generated__/TeamMemberActions_Contract.graphql'
import { TeamMemberActions_DeleteContractMutation } from '__generated__/TeamMemberActions_DeleteContractMutation.graphql'

import { TeamMemberActions_ResendInvitationEmailMutation } from '__generated__/TeamMemberActions_ResendInvitationEmailMutation.graphql'
import { commitMutation } from 'api/graphql'
import { trackError } from 'services/analytics'
import { DeleteForever } from '@material-ui/icons'
import ContractSettingsDialog from '../ContractSettingsDialog'

interface ITeamMemberActionProps {
  contract: TeamMemberActions_Contract$key
  pauseContract: (contract: { id: string }) => void
  resumeContract: (contract: { id: string }) => void
}

function getRemoveConfirmMessage(contract: TeamMemberActions_Contract) {
  if (contract.status === 'active' || contract.status === 'paused') {
    return (
      <React.Fragment>
        Remove {contract?.freelancer?.firstName || 'this member'} from the team?
        Doing so will also immediately terminate their contract, and cannot be undone.
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      Remove {contract?.freelancer?.firstName || 'this member'} from the team?
      This cannot be undone.
    </React.Fragment>
  )
}

const TeamMemberActions = (props: ITeamMemberActionProps) => {
  const { contract: contractProp, pauseContract, resumeContract } = props
  const [user] = useCurrentUser()
  const [resendingInvitation, setResendingInvitation] = React.useState(false)
  const showSnackbar = useSnackbar()

  const contract = useFragment(graphql`
    fragment TeamMemberActions_Contract on Contract {
      client {
        rawId
      }
      id
      rawId
      status
      paymentMode
      invitationType
      deletable
      freelancer {
        rawId
        firstName
        lastName
        avatarUrl
        lastSeenAt
        directChatThreadId
      }
      ...ContractSettingsDialog_Contract
    }
  `, contractProp)

  const { execute: commitDeleteContract, loading: isDeletingContract } = useQuickCommit<TeamMemberActions_DeleteContractMutation>(graphql`
    mutation TeamMemberActions_DeleteContractMutation($input: DeleteContractInput!) {
      deleteContract(input: $input) {
        contract {
          status
          lastInteractionAt
        }
      }
    }
  `)

  const handleDeleteContract = async () => {
    await commitDeleteContract({
      input: {
        contractId: contract?.id,
      },
    })
  }

  const resendInvitation = React.useCallback(async () => {
    setResendingInvitation(true)

    try {
      await commitMutation<TeamMemberActions_ResendInvitationEmailMutation>({
        mutation: graphql`
          mutation TeamMemberActions_ResendInvitationEmailMutation($input: ResendInvitationEmailInput!) {
            resendInvitationEmail(input: $input) {
              contract {
                lastInteractionAt
              }
            }
          }
        `,
        variables: {
          input: {
            contractId: contract?.id,
          },
        },
      })

      showSnackbar('Invitation sent')
    } catch (err) {
      trackError(err)
      showSnackbar('Failed to resend invitation')
    } finally {
      setResendingInvitation(false)
    }
  }, [contract?.id])

  if (contract?.status === 'deleted') {
    return (
      <Button disabled>
        Deleted
      </Button>
    )
  }

  const editable = contract?.client?.rawId === user.id || user?.is_firm_admin

  let chatAction = null
  let editAction = null
  let pauseAction = null
  let resumeAction = null
  let endAction = null

  if (editable) {
    editAction = (
      <ContractSettingsDialog
        show={contract?.status !== 'expired'}
        contract={contract}
      />
    )
  }

  if (contract?.status === 'active' && contract?.paymentMode === 'pay_work_reports') {
    pauseAction = (
      <Button
        onClick={() => pauseContract({ id: contract?.id })}
        data-cy="pause-contract"
        color="secondary"
        responsive
      >
        <PauseIcon /> Pause
      </Button>
    )
  }

  if (contract?.status === 'paused' || (contract?.status === 'expired' && contract?.paymentMode === 'pay_work_reports')) {
    resumeAction = (
      <Button
        onClick={() => resumeContract({ id: contract?.id })}
        data-cy="resume-contract"
        color="secondary"
        responsive
      >
        <PlayIcon /> {contract?.status === 'expired' ? 'Restart' : 'Resume'}
      </Button>
    )
  } else if (contract?.status === 'offer_made' && contract?.invitationType === 'invitation') {
    resumeAction = (
      <Button
        onClick={() => resendInvitation()}
        color="secondary"
        data-cy="resend-invitation"
        responsive
        disabled={resendingInvitation}
      >
        <PlayIcon /> Resend Invitation
      </Button>
    )
  }

  if (contract?.status !== 'expired') {
    if (contract?.status === 'offer_made' && contract?.invitationType === 'invitation') {
      // replace contract terminate button (remove from team) with revoke invitation button
      // in this case, the contract should be deleted as well
      endAction = (
        <ConfirmButton
          dialogTitle="Revoke invitation?"
          dialogMessage={`Revoke the invitation sent to ${contract?.freelancer?.firstName || 'the invitee'}? This cannot be undone.`}
          onClick={handleDeleteContract}
          data-cy="end-contract"
          color="delete"
          disabled={isDeletingContract}
          critical
        >
          <StopIcon /> Revoke
        </ConfirmButton>
      )
    } else {
      // regular "remove from team" button (expires and deletes contract)
      endAction = (
        <ConfirmButton
          dialogTitle="Remove"
          dialogMessage={getRemoveConfirmMessage(contract)}
          onClick={handleDeleteContract}
          data-cy="end-contract"
          color="delete"
          disabled={isDeletingContract}
          critical
        >
          <DeleteForever /> Remove
        </ConfirmButton>
      )
    }

    if (contract.freelancer) {
      chatAction = (
        <ChatButton
          threadId={contract.freelancer?.directChatThreadId}
          recipientId={contract.freelancer?.rawId}
          contact={{
            first_name: contract.freelancer?.firstName,
            name: `${contract.freelancer?.firstName || ''} ${contract.freelancer?.lastName || ''}`.trim(),
            avatar_url: contract.freelancer?.avatarUrl,
            last_seen_at: contract.freelancer?.lastSeenAt as string,
          }}
        />
      )
    }
  } else {
    // note: while the behavior is to also remove the member from the team when *manually* terminating a contract,
    // this button may still show up in some cases: (1) for older contracts which were terminated but not deleted, and (2) for contracts
    // which expire on their own, i.e. not by terminating the contract manually
    endAction = (
      <ConfirmButton
        dialogTitle="Remove"
        dialogMessage={getRemoveConfirmMessage(contract)}
        onClick={handleDeleteContract}
        data-cy="end-contract"
        color="delete"
        disabled={isDeletingContract || !contract?.deletable}
      >
        <DeleteForever /> Remove
      </ConfirmButton>
    )
  }

  return (
    <React.Fragment>
      {chatAction}
      {editAction}
      {pauseAction}
      {resumeAction}
      {endAction}
    </React.Fragment>
  )
}

export default TeamMemberActions
