import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Slide,
} from '@material-ui/core'

const dialogTransition = props => (<Slide direction="up" {...props} />)

/**
 * Drop-in replacement for `@material-ui/core/Button` that shows a confirmation dialog before triggering the `onClick` handler.
 */
class ConfirmButton extends React.Component {
  static defaultProps = {
    dialogTitle: 'Are you sure?',
    dialogMessage: 'Are you sure?',
    dialogConfirmLabel: 'Yes',
    dialogCancelLabel: 'Cancel',
  }

  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isDialogOpen: false,
      isConfirmEnabled: !props.critical,
    }
  }

  render() {
    let props = {
      ...this.props,
      onClick: this.handleButtonClick,
    }

    delete props.icon
    delete props.children
    delete props.dialogTitle
    delete props.dialogMessage
    delete props.dialogConfirmLabel
    delete props.dialogCancelLabel
    delete props.critical

    if (this.props.icon) {
      return (
        <IconButton ref={button => this.button = button} {...props}>
          {this.renderDialog()}
          {this.props.children}
        </IconButton>
      )
    }

    return (
      <Button ref={button => this.button = button} {...props}>
        {this.renderDialog()}
        {this.props.children}
      </Button>
    )
  }

  renderDialog() {
    if (this.state.isDialogOpen) {
      return (
        <Dialog
          open
          onClose={this.handleDialogClose}
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          fullScreen={this.props.responsive && this.props.fullScreen}
          TransitionComponent={(this.props.responsive && this.props.fullScreen) ? dialogTransition : undefined}
        >
          {this.renderDialogTitle()}
          {this.renderDialogMessage()}

          <DialogActions>
            <Button
              onClick={this.handleCancelClick}
              data-cy="confirm-dialog-cancel"
            >
              {this.props.dialogCancelLabel}
            </Button>

            <Button
              color="primary"
              onClick={this.handleConfirmClick}
              disabled={!this.state.isConfirmEnabled}
              data-cy="confirm-dialog-confirm"
            >
              {this.props.dialogConfirmLabel}
            </Button>
          </DialogActions>
        </Dialog>
      )
    }

    return null
  }

  renderDialogTitle() {
    if (this.props.dialogTitle) {
      return (
        <DialogTitle data-cy="confirm-dialog-title">
          {this.props.dialogTitle}
        </DialogTitle>
      )
    }

    return null
  }

  renderDialogMessage() {
    if (this.props.dialogMessage) {
      return (
        <DialogContent>
          <DialogContentText data-cy="confirm-dialog-message">
            {this.props.dialogMessage}
          </DialogContentText>
        </DialogContent>
      )
    }

    return null
  }

  handleConfirmClick = (e) => {
    if (!this.state.isConfirmEnabled) {
      // extra safeguard for any possible rogue events coming up
      return
    }

    window.clearTimeout(this.confirmEnableTimeoutHandle)

    this.setState({
      isDialogOpen: false,
      isConfirmEnabled: false,
    })

    if (this.props.onDialogClose) {
      this.props.onDialogClose()
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  handleCancelClick = () => {
    const { onDialogClose, onCancel } = this.props

    window.clearTimeout(this.confirmEnableTimeoutHandle)

    this.setState({
      isDialogOpen: false,
      isConfirmEnabled: false,
    })

    if (onCancel) {
      onCancel()
    }

    if (onDialogClose) {
      onDialogClose()
    }
  }

  handleDialogClose = () => {
    const { onDialogClose, onCancel } = this.props

    window.clearTimeout(this.confirmEnableTimeoutHandle)

    this.setState({
      isDialogOpen: false,
      isConfirmEnabled: false,
    })

    if (onCancel) {
      onCancel()
    }

    if (onDialogClose) {
      onDialogClose()
    }
  }

  handleButtonClick = () => {
    if (this.props.onDialogOpen) {
      this.props.onDialogOpen()
    }

    this.setState({
      isDialogOpen: true,
      isConfirmEnabled: !this.props.critical,
    })

    if (this.props.critical) {
      window.clearTimeout(this.confirmEnableTimeoutHandle)

      this.confirmEnableTimeoutHandle = window.setTimeout(() => {
        this.setState({
          isConfirmEnabled: true,
        })
      }, 800)
    }
  }
}

export default ConfirmButton
