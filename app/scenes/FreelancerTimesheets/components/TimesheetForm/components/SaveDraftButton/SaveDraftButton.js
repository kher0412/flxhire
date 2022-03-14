import React from 'react'
import PropTypes from 'prop-types'
import { DialogTitle, DialogContent, DialogActions, DialogContentText, ListItem, List, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core'
import { Button } from 'components/themed'
import { ResponsiveDialog, LoadingIcon } from 'components'
import { Save } from '@material-ui/icons'
import styles from './SaveDraftButton.module.css'

export default class SaveDraftButton extends React.PureComponent {
  static propTypes = {
    showSaveNotificationDialog: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => undefined,
  }

  state = {
    isDialogOpen: false,
    isHideCheckboxSet: false,
  }

  render() {
    const { disabled, isSubmitting, isNew } = this.props

    return (
      <React.Fragment>
        <Button
          color="primary"
          data-cy="save-timesheet"
          onClick={this.handleSaveClick}
          disabled={disabled || isSubmitting}
        >
          {isSubmitting && (<LoadingIcon className={styles['button-icon']} />)}
          {!isSubmitting && (<Save className={styles['button-icon']} />)}
          {isNew ? 'Save' : 'Update'} Draft
        </Button>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { onClick } = this.props
    const { isDialogOpen, isHideCheckboxSet } = this.state

    return (
      <ResponsiveDialog open={isDialogOpen} onClose={this.handleDialogClose}>
        <DialogTitle>
          Save Draft
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You are now saving your work report as an editable draft.
            Your client will not receive your report until you submit it.
            Remember you need to submit your report in order to receive payments.
          </DialogContentText>

          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isHideCheckboxSet}
                  onChange={this.handleCheck}
                />
              </ListItemIcon>

              <ListItemText primary="Don't show again" />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            data-cy="save-timesheet-confirm"
            onClick={() => onClick(isHideCheckboxSet)}
          >
            Save Draft
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleSaveClick = () => {
    const { onClick, showSaveNotificationDialog } = this.props
    const { isHideCheckboxSet } = this.state

    if (showSaveNotificationDialog) {
      this.setState({
        isDialogOpen: true,
      })
    } else {
      onClick(isHideCheckboxSet)
    }
  }

  handleCheck = (e) => {
    this.setState({
      isHideCheckboxSet: e.target.checked,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
