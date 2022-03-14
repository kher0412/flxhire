import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItemIcon,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { SubmitWarningDialogContainerProps } from './SubmitWarningDialogContainer'

export interface ISubmitWarningDialogProps {
}

export interface ISubmitWarningDialogState {
  confirmSubmit: boolean
}

export default class SubmitWarningDialog extends React.Component<ISubmitWarningDialogProps & SubmitWarningDialogContainerProps, ISubmitWarningDialogState> {
  constructor(props: ISubmitWarningDialogProps & SubmitWarningDialogContainerProps) {
    super(props)
    this.state = {
      confirmSubmit: (this.getNumberOfDaysLeft() <= 2),
    }
  }

  getNumberOfDaysLeft() {
    return 7 - (new Date().getDay())
  }

  handleConfirmSubmitCheck = (e, checked) => {
    this.setState({ confirmSubmit: checked })
  }

  render() {
    const { open, handleClose, handleSubmit, id, amount, payments_enabled, client_id } = this.props

    return (
      <ResponsiveDialog open={open}>
        <DialogTitle>
          Submit Work Report
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <strong>
              Submitting your work report is final.
              Once submitted, you can no longer edit your report, and
              you cannot submit another one for the same time period.
            </strong>
          </DialogContentText>

          <DialogContentText>
            If you intend to make changes to the report, please hit cancel instead, and submit your report later when everything's done and final.
          </DialogContentText>

          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  checked={this.state.confirmSubmit}
                  onChange={this.handleConfirmSubmitCheck}
                  inputProps={{ 'data-cy': 'checkbox-input-confirm_submit' } as any}
                />
              </ListItemIcon>

              <ListItemText
                primary="My work report is ready to be submitted"
                secondary="and no more edits or additions will be needed"
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            color="primary"
            disabled={!this.state.confirmSubmit}
            onClick={() => this.state.confirmSubmit ? handleSubmit(id, amount, payments_enabled, client_id) : undefined}
            data-cy="submit-timesheet"
          >
            Submit
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}
