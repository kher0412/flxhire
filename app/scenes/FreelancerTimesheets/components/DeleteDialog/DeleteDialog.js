import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'

class DeleteDialog extends React.Component {
  render() {
    const { open, handleClose, handleSubmit, id } = this.props

    return (
      <ResponsiveDialog open={open}>
        <DialogTitle>
          Delete Report
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this report? This cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={() => handleSubmit(id)} style={{ color: 'rgb(235,0,0)' }} data-cy="delete-timesheet">
            Delete
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}

export default DeleteDialog
