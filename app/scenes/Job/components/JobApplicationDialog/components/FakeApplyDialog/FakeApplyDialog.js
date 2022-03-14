import React from 'react'
import { DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'

export default class FakeApplyDialog extends React.PureComponent {
  render() {
    const { open, close } = this.props

    if (!open) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={close}>
        <DialogTitle>
          Apply Now
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Only Flexhire members can apply to Jobs
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={close} data-cy="dialog-ok">
            OK
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}
