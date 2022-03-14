import React from 'react'
import { IconButton, Tooltip, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { trackEvent } from 'services/analytics'
import { Cancel } from '@material-ui/icons'
import styles from './CloseButton.module.css'

export default class CloseButton extends React.PureComponent {
  state = {
    isConfirmationDialogOpen: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <div className={styles.container}>
        <Tooltip title="Close (ESC)">
          <IconButton className={styles.button} onClick={this.handleClose}>
            <Cancel />
          </IconButton>
        </Tooltip>

        {this.renderDialog()}
      </div>
    )
  }

  renderDialog() {
    const { isNewRecordingAvailable, onClose, onSave } = this.props
    const { isConfirmationDialogOpen } = this.state

    if (!isConfirmationDialogOpen || !isNewRecordingAvailable) {
      return null
    }

    return (
      <ResponsiveDialog open>
        <DialogTitle>
          Close Video Recorder
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You have a new unsaved recording.
            Are you sure you want to close the recorder now?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose}>
            Cancel
          </Button>

          <Button onClick={onClose}>
            Discard and close
          </Button>

          <Button onClick={onSave} color="primary">
            Save and close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogClose = () => {
    this.setState({
      isConfirmationDialogOpen: false,
    })
  }

  handleClose = () => {
    const { onClose, isNewRecordingAvailable } = this.props

    if (isNewRecordingAvailable) {
      this.setState({
        isConfirmationDialogOpen: true,
      })
      trackEvent('Video Recorder Close Confirmation Dialog Open')
    } else if (onClose) {
      onClose()
    }
  }

  handleKeyDown = (e) => {
    const { onClose } = this.props

    if (e.key === 'Escape') {
      if (onClose) {
        onClose()
      }
    }
  }
}
