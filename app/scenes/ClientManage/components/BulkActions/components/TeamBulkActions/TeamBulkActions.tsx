import React, { useCallback, useMemo } from 'react'
import { Grid, MenuItem, Divider } from '@material-ui/core'
import { MoreButtonMenu } from 'components'
import { Button, ConfirmationDialog } from 'components/themed'
import { IBulkActionParams, ManageState } from 'scenes/ClientManage/ManageDucks'
import { DeleteForever, Clear, Mail, PauseCircleFilled, PlayCircleFilled, PowerSettingsNew } from '@material-ui/icons'
import { useQuickCommit } from 'hooks/useQuickCommit'
import { graphql } from 'react-relay'
import { TeamBulkActions_DeleteContractMutation } from '__generated__/TeamBulkActions_DeleteContractMutation.graphql'
import { useActionConfirmation, useSnackbar } from 'hooks'
import SetEndDateButton from '../SetEndDateButton'
import SetManagerButton from '../SetManagerButton'
import styles from '../../BulkActions.module.css'

export interface ITeamBulkActionsProps {
  bulkActions: ManageState['team']['bulkActions']
  setBulkActionParam: (key: keyof IBulkActionParams, value: any) => void
  performBulkAction: () => void
  performBulkEmail: () => void
  clearSelection: () => void
}

function TeamBulkActions(props: ITeamBulkActionsProps) {
  const { bulkActions, setBulkActionParam, performBulkAction, clearSelection, performBulkEmail } = props

  const showSnackbarMessage = useSnackbar()

  const { execute: executeDeleteContract, loading: isDeletingContract } = useQuickCommit<TeamBulkActions_DeleteContractMutation>(graphql`
    mutation TeamBulkActions_DeleteContractMutation($input: DeleteContractInput!) {
      deleteContract(input: $input) {
        contract {
          status
          lastInteractionAt
          endDate
        }
      }
    }
  `)

  const performBulkRemove = async () => {
    const rawIds = bulkActions.ids.slice()
    const numContracts = rawIds.length

    showSnackbarMessage(`Removing (${numContracts})...`)

    // TODO: this is an absolute dungshow
    // the entire bulk actions frontend needs to be nuked and rebuilt on graphql and then the raw IDs here cleaned up
    // additionally, we could create a mutation for deleting multiple contracts, but we don't have a standard approach
    for (let rawId of rawIds) {
      await executeDeleteContract({ input: { contractRawId: rawId } })
    }

    clearSelection()
    showSnackbarMessage(`Removed ${numContracts} ${numContracts === 1 ? 'contract' : 'contracts'}`)
  }

  const confirmationProps = useActionConfirmation(useCallback(() => performBulkRemove(), []))
  const confirmationDialogProps = useMemo(() => ({
    ...confirmationProps,
    title: 'Remove',
    text: 'Terminate and permanently remove the selected contracts? This cannot be undone.',
    confirmLabel: 'Remove',
  }), [confirmationProps])

  if (!bulkActions) {
    return null
  }

  const setAndPerformBulkActionParam = (name: keyof IBulkActionParams, value: any) => {
    setBulkActionParam(name, value)
    performBulkAction()
  }

  const numSelectedItems = bulkActions.ids.length

  return (
    <React.Fragment>
      <ConfirmationDialog {...confirmationDialogProps} />

      <Grid container style={isDeletingContract ? { opacity: 0.3, pointerEvents: 'none' } : undefined}>
        <Grid item xs={12} md={2}>
          <Button onClick={() => performBulkEmail()} color="secondary" fullWidth data-cy="send-email">
            <Mail className={styles['button-icon']} style={{ marginRight: 12 }} /> Send e-mail
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <SetEndDateButton
            endDate={bulkActions.params.end_date}
            numSelectedItems={numSelectedItems}
            onChange={value => setBulkActionParam('end_date', value)}
            performBulkAction={performBulkAction}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <MoreButtonMenu
            label={<React.Fragment><PowerSettingsNew className={styles['button-icon']} /> Set status</React.Fragment>}
            fullWidth
            style={{ width: '100%' }}
            data-cy="set-status"
          >
            <MenuItem onClick={() => setAndPerformBulkActionParam('status', 'active')} data-cy="set-status-active">
              <PlayCircleFilled className={styles['button-icon']} /> Resume selected contracts ({numSelectedItems})
            </MenuItem>

            <MenuItem onClick={() => setAndPerformBulkActionParam('status', 'paused')} data-cy="set-status-paused">
              <PauseCircleFilled className={styles['button-icon']} /> Pause selected contracts ({numSelectedItems})
            </MenuItem>

            <Divider />

            <MenuItem onClick={confirmationProps.perform} data-cy="set-status-expired">
              <DeleteForever className={styles['button-icon']} /> Remove selected ({numSelectedItems})
            </MenuItem>
          </MoreButtonMenu>
        </Grid>

        <Grid item xs={12} md={2}>
          <SetManagerButton
            numSelectedItems={numSelectedItems}
            onChange={value => setAndPerformBulkActionParam('client_id', value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Button onClick={clearSelection} className={styles['close-button']} fullWidth>
            <Clear style={{ marginRight: 12 }} /> Deselect all ({numSelectedItems})
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default React.memo(TeamBulkActions)
