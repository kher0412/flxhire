import React, { useCallback, useState } from 'react'
import { ResponsiveDialog } from 'components'
import { Button, TextField } from 'components/themed'
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { useCurrentUser, useDispatchAction } from 'hooks'
import { createAction } from 'redux-actions'
import { DELETE_ACCOUNT } from '../../../AccountDucks'

const AccountDeleteButton = () => {
  const [user] = useCurrentUser()
  const hasProfile = Boolean(user?.profile)
  const hasFirm = Boolean(user?.firm)
  const [password, setPassword] = useState('')
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const deleteAccount = useDispatchAction(() => createAction(DELETE_ACCOUNT)({ password }), [password])
  const handlePasswordChange = useCallback(e => setPassword(e.target.value), [])
  const handleDeleteClick = useCallback(() => setConfirmDialogOpen(true), [])
  const handleDialogClose = useCallback(() => setConfirmDialogOpen(false), [])
  const handleConfirm = () => {
    // NOTE: do NOT just use useCallback() here because for some reason
    // it caused an issue with the password always being empty when calling deleteAccount()
    // we can get back to useCallback if we figure it out
    deleteAccount()
    setConfirmDialogOpen(false)
    setPassword('')
  }

  return (
    <div>
      {isConfirmDialogOpen && (
        <ResponsiveDialog open onClose={handleDialogClose}>
          <DialogTitle>
            Delete My Account
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              This action will <strong>permanently delete your account</strong>.
              Deleting your account is permanent and doing so will {hasProfile ? 'destroy your profile page, ' : ''}prevent you from logging in,
              and instantly terminate any contracts or interviews you may have.
              <br /><br />
              {hasFirm && (
                <React.Fragment>
                  Any company data you have ownership of will be transferred to another manager automatically (if any). If there are no other managers,
                  your company will also be deleted. Manually transfer ownership of jobs, contracts, and other data before deleting your account
                  if you want to control who will receive ownership.
                  <br /><br />
                </React.Fragment>
              )}
              To confirm deletion, please input your password below, then click DELETE. This is permanent.
            </DialogContentText>

            <div style={{ marginTop: 24 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
                data-cy="confirm-password-to-delete"
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose}>
              Cancel
            </Button>

            <Button
              onClick={handleConfirm}
              style={password ? { color: '#d00' } : undefined}
              disabled={!password}
              data-cy="confirm-deletion"
            >
              Delete
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )}

      <Button style={{ color: '#d00', height: 48 }} onClick={handleDeleteClick} data-cy="delete-account">
        Delete My Account
      </Button>
    </div>
  )
}

export default AccountDeleteButton
