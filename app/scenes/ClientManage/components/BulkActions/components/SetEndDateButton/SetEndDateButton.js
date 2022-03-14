import React from 'react'
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { CalendarToday } from '@material-ui/icons'

export default class SetEndDateButton extends React.PureComponent {
  state = {
    isDialogOpen: false,
  }

  render() {
    return (
      <div>
        <Button fullWidth onClick={this.handleButtonClick} data-cy="set-end-date">
          <CalendarToday style={{ marginRight: 12 }} /> Set end date
        </Button>

        {this.renderDialog()}
      </div>
    )
  }

  renderDialog() {
    const { endDate, onChange, numSelectedItems } = this.props
    const { isDialogOpen } = this.state

    if (isDialogOpen) {
      return (
        <ResponsiveDialog open onClose={this.handleDialogClose}>
          <DialogTitle>
            Set end date
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Set the end date of selected contracts ({numSelectedItems}) to:
            </DialogContentText>
            <DatePicker
              onChange={onChange}
              autoOk
              locale="en-US"
              value={endDate}
              format="MMM Do, YYYY"
              inputProps={{ 'data-cy': 'end-date' }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDialogClose}>
              Cancel
            </Button>

            <Button onClick={this.handleSaveClick} color="primary" disabled={!endDate} data-cy="update-bulk">
              Update ({numSelectedItems})
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }

    return null
  }

  handleButtonClick = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleSaveClick = () => {
    const { performBulkAction } = this.props

    if (performBulkAction) {
      performBulkAction()
    }

    this.setState({
      isDialogOpen: false,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
