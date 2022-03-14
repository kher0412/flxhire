import React, { useState, useCallback } from 'react'
import { MenuItem, ListItemIcon, ListItemText, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core'
import { masqAsUser } from 'services/masq'
import { MoreButtonMenu, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { IUserStatus, IContractStatus } from 'types'
import { isFreelancerApplying } from 'services/freelancer'
import { isUnsentJobApplication } from 'services/contract'
import { graphql, useFragment } from 'react-relay'
import { useQuickCommit } from 'hooks'
import { trackError } from 'services/analytics'
import { AdminTools_Freelancer$key } from '__generated__/AdminTools_Freelancer.graphql'
import { AdminTools_Contract$key } from '__generated__/AdminTools_Contract.graphql'
import { AdminTools_UpdateUserMutation, AdminTools_UpdateUserMutationVariables } from '__generated__/AdminTools_UpdateUserMutation.graphql'
import { AdminTools_DeleteUserMutation, AdminTools_DeleteUserMutationVariables } from '__generated__/AdminTools_DeleteUserMutation.graphql'
import { AdminTools_SkipMutation } from '__generated__/AdminTools_SkipMutation.graphql'
import { AccountCircle, BlockOutlined, Build, Cancel, CheckCircle, Delete, OpenInNew, VisibilityOff } from '@material-ui/icons'

const openFreelancerInAdminConsole = (freelancer: { rawId: number }) => window.open(`/admin#/users/${freelancer?.rawId}`, '_blank')
const openContractInAdminConsole = (contract: { rawId: number }) => window.open(`/admin#/contracts/${contract?.rawId}`, '_blank')

interface IAdminToolsProps {
  freelancer: AdminTools_Freelancer$key
  contract?: AdminTools_Contract$key
  jobId?: string
}

const useContainer = (props: IAdminToolsProps) => {
  const { freelancer: freelancerProp, contract: contractProp, jobId } = props

  const freelancer = useFragment(graphql`
    fragment AdminTools_Freelancer on User {
      id
      rawId
      hidden
      status
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment AdminTools_Contract on Contract {
      id
      rawId
      status
    }
  `, contractProp)

  const { execute: commitUpdateUser } = useQuickCommit<AdminTools_UpdateUserMutation>(graphql`
    mutation AdminTools_UpdateUserMutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user {
          status
          hidden
        }
      }
    }
  `)

  const { execute: commitDeleteUser } = useQuickCommit<AdminTools_DeleteUserMutation>(graphql`
    mutation AdminTools_DeleteUserMutation($input: DeleteUserInput!) {
      deleteUser(input: $input) {
        user {
          ...Freelancer_FreelancerMemberPipelineFragment
        }
      }
    }
  `)

  const { execute: commitSkip } = useQuickCommit<AdminTools_SkipMutation>(graphql`
    mutation AdminTools_SkipMutation($input: SkipCandidateInput!) {
      skipCandidate(input: $input) {
        candidate {
          id
        }
      }
    }
  `)

  // Actions
  const [confirmingAction, setConfirmingAction] = useState(null)

  const skip = useCallback(async () => {
    await commitSkip({
      input: {
        reason: 'System skipped by admin',
        jobId: jobId,
        freelancerId: freelancer?.id,
        system: true,
      },
    })
  }, [jobId])

  const updateUser = useCallback(async (input: AdminTools_UpdateUserMutationVariables['input']) => {
    await commitUpdateUser({
      input: { ...input, userId: freelancer.id },
    })
  }, [])

  const deleteUser = useCallback(async (input: AdminTools_DeleteUserMutationVariables['input']) => {
    await commitDeleteUser({
      input: { ...input, userId: freelancer.id },
    })
  }, [])

  const accept = () => updateUser({ accept: true })
  const reject = () => updateUser({ reject: true })
  const setUnverified = () => updateUser({ status: 'unverified' })
  const toggleHidden = () => updateUser({ hidden: !freelancer?.hidden })
  const actionMap = { accept, reject, setUnverified, skip, toggleHidden, deleteUser }
  const confirmAction = name => setConfirmingAction(name)
  const cancelAction = () => setConfirmingAction(null)
  const performAction = () => {
    try {
      actionMap[confirmingAction]()
      setConfirmingAction(null)
    } catch (error) {
      trackError(error)
    }
  }

  return {
    confirmAction,
    cancelAction,
    performAction,
    skip,
    updateUser,
    freelancer,
    contract,
    toggleHidden,
    deleteUser,
    confirmingAction,
  }
}

const AdminTools = (props: IAdminToolsProps) => {
  const {
    confirmAction,
    cancelAction,
    performAction,
    skip,
    updateUser,
    freelancer,
    contract,
    toggleHidden,
    deleteUser,
    confirmingAction,
  } = useContainer(props)

  return (
    <React.Fragment>
      <MoreButtonMenu responsive component={Button} label="Admin" icon={<Build />} data-cy="admin-tools">
        {freelancer?.rawId && (
          <MenuItem onClick={() => masqAsUser({ id: freelancer.rawId })} data-cy="masq">
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText
              primary="Masq"
              secondary="Log in as this user"
            />
          </MenuItem>
        )}
        {skip && (!contract || isUnsentJobApplication(contract as { status: IContractStatus })) && (
          <MenuItem onClick={() => confirmAction('skip')} data-cy="admin-skip">
            <ListItemIcon><Delete /></ListItemIcon>
            <ListItemText
              primary="System Skip"
              secondary="The Member will be skipped and immediately replaced by the next in rank"
            />
          </MenuItem>
        )}
        {toggleHidden && freelancer && (
          <MenuItem onClick={() => confirmAction('toggleHidden')} data-cy="toggle-hidden">
            <ListItemIcon><VisibilityOff /></ListItemIcon>
            <ListItemText
              primary="Toggle User Visibility"
              secondary={freelancer?.hidden ? 'This user is HIDDEN. Click to make them visible' : 'This user is VISIBLE. Click to hide them.'}
            />
          </MenuItem>
        )}
        {updateUser && freelancer && freelancer.status !== 'accepted' && (
          <MenuItem onClick={() => confirmAction('accept')} data-cy="accept-user">
            <ListItemIcon><CheckCircle /></ListItemIcon>
            <ListItemText
              primary="Approve"
              secondary="Click to mark the user as Verified"
            />
          </MenuItem>
        )}
        {updateUser && isFreelancerApplying(freelancer?.status as IUserStatus) && (
          <MenuItem onClick={() => confirmAction('reject')} data-cy="reject-user">
            <ListItemIcon><BlockOutlined /></ListItemIcon>
            <ListItemText
              primary="Reject"
              secondary="Click to Reject the user from being Verified"
            />
          </MenuItem>
        )}
        {updateUser && isFreelancerApplying(freelancer?.status as IUserStatus) && (
          <MenuItem onClick={() => confirmAction('setUnverified')} data-cy="reject-user">
            <ListItemIcon><Cancel /></ListItemIcon>
            <ListItemText
              primary="Remove from Screening"
              secondary="Click to set the user to Unverified and remove them from the process to Apply to be Verified"
            />
          </MenuItem>
        )}
        {deleteUser && (
          <MenuItem onClick={() => confirmAction('deleteUser')} data-cy="delete-user">
            <ListItemIcon><Delete /></ListItemIcon>
            <ListItemText
              primary="Delete"
              secondary="Click to trigger personal data deletion for this user and mark the account as deleted, preventing them from logging in."
            />
          </MenuItem>
        )}
        {freelancer?.rawId && (
          <MenuItem onClick={() => openFreelancerInAdminConsole(freelancer)} data-cy="open-user">
            <ListItemIcon><OpenInNew /></ListItemIcon>
            <ListItemText
              primary="Open User in Admin Console"
            />
          </MenuItem>
        )}
        {contract?.rawId && (
          <MenuItem onClick={() => openContractInAdminConsole(contract)} data-cy="open-user">
            <ListItemIcon><OpenInNew /></ListItemIcon>
            <ListItemText
              primary="Open Contract in Admin Console"
            />
          </MenuItem>
        )}
      </MoreButtonMenu>
      {confirmingAction && (
        <ResponsiveDialog open>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Effects will take place immediately when clicking Confirm. The action might not be undoable.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelAction}>Cancel</Button>
            <Button color="primary" onClick={performAction}>Confirm</Button>
          </DialogActions>
        </ResponsiveDialog>
      )}
    </React.Fragment>
  )
}

export default AdminTools
