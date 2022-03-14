import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { Button } from 'components/themed'
import { browserHistory } from 'services/router'
import { IContractForFreelancer } from 'types'
import { ResponsiveDialog } from 'components'

interface IDeleteDialogProps {
  contract: IContractForFreelancer
  open: boolean
  onClose: () => void
  onDelete: () => void
}

class DeleteDialog extends React.Component<IDeleteDialogProps> {
  render() {
    const { contract, open, onClose, onDelete } = this.props
    if (!contract || !open) return null

    const client = contract?.job?.company_name
    const title = contract?.job_title

    return (
      <ResponsiveDialog open={open} onClose={onClose} data-cy="delete-dialog">
        <DialogTitle data-cy="dialog-title">Decline invitation from {client}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By declining the invitation from {client} to apply to {title}, you will lose the ability to apply to this position.
          </DialogContentText>
          <DialogContentText>
            {client} will be emailed about your decision. At Flexhire we are always looking for the best jobs for our members: you will be emailed as soon as we have other opportunities for you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.openJob} data-cy="view-job">View Job</Button>
          <Button onClick={onClose} data-cy="close">Close</Button>
          <Button color="primary" onClick={onDelete} data-cy="send">Decline</Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  openJob = () => {
    const { contract } = this.props
    browserHistory.push('/[...slugs]', `/${contract.firm_slug}/${contract.job_slug}`)
  }
}
export default DeleteDialog
