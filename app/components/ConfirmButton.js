import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { ResponsiveDialog, ResponsiveButton } from 'components'
import { Button } from 'components/themed'
import styles from './ConfirmButton.module.css'

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

    // TODO: clean this up and use restProps instead
    delete props.icon
    delete props.tooltip
    delete props.children
    delete props.dialogTitle
    delete props.dialogMessage
    delete props.dialogConfirmLabel
    delete props.dialogCancelLabel
    delete props.critical
    delete props.responsive
    delete props.label
    delete props.component

    if (this.props.component) {
      const ButtonComponent = this.props.component

      return (
        <React.Fragment>
          {this.renderDialog()}

          <ButtonComponent ref={button => this.button = button} {...props} responsive={this.props.responsive}>
            {this.props.children}
          </ButtonComponent>
        </React.Fragment>
      )
    }

    if (this.props.responsive) {
      return (
        <React.Fragment>
          {this.renderDialog()}

          <ResponsiveButton
            ref={button => this.button = button}
            icon={this.props.icon}
            tooltip={this.props.tooltip}
            label={this.props.label}
            {...props}
          >
            {this.props.children}
          </ResponsiveButton>
        </React.Fragment>
      )
    }

    if (this.props.icon) {
      if (this.props.tooltip) {
        return (
          <React.Fragment>
            <Tooltip title={this.props.tooltip}>
              <span>
                <IconButton ref={button => this.button = button} {...props}>
                  {this.props.children}
                </IconButton>
              </span>
            </Tooltip>

            {this.renderDialog()}
          </React.Fragment>
        )
      }

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
      let confirmButtonStyleName = ''

      if (this.props.critical) {
        confirmButtonStyleName = this.state.isConfirmEnabled ? styles['critical-confirm'] : styles['critical-confirm-disabled']
      }

      return (
        <ResponsiveDialog
          open
          onClose={this.handleDialogClose}
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          data-cy="confirm-dialog"
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
              color={this.props.critical ? 'delete' : 'primary'}
              onClick={this.handleConfirmClick}
              disabled={!this.state.isConfirmEnabled}
              data-cy="confirm-dialog-confirm"
            >
              <span className={confirmButtonStyleName}>
                {this.props.dialogConfirmLabel}
              </span>
            </Button>
          </DialogActions>
        </ResponsiveDialog>
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
