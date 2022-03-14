import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, DialogTitle, DialogContent, DialogActions, Button, Tooltip } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { MoreHoriz } from '@material-ui/icons'

export default class MoreButtonDialog extends React.PureComponent {
  static propTypes = {
    dialogCloseButtonLabel: PropTypes.string,
  }

  static defaultProps = {
    component: IconButton,
    icon: (<MoreHoriz />),
    dialogCloseButtonLabel: 'Close',
    onOpen: () => undefined,
    onClose: () => undefined,
  }

  state = {
    isDialogOpen: false,
  }

  render() {
    const {
      icon,
      label,
      tooltip,
      component: ComponentConstructor,
      dialogTitle,
      dialogCloseButtonLabel,
      CloseButtonProps,
      children,
      onOpen,
      ...restProps
    } = this.props

    return (
      <React.Fragment>
        {tooltip && (
          <Tooltip title={tooltip}>
            <span>
              <ComponentConstructor {...restProps} onClick={this.handleOpen}>
                {icon} {label}
              </ComponentConstructor>
            </span>
          </Tooltip>
        )}

        {!tooltip && (
          <ComponentConstructor {...restProps} onClick={this.handleOpen}>
            {icon} {label}
          </ComponentConstructor>
        )}

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { isDialogOpen } = this.state

    if (!isDialogOpen) return null

    return (
      <ResponsiveDialog
        open
        onClose={this.handleClose}
      >
        {this.renderDialogContents()}
      </ResponsiveDialog>
    )
  }

  renderDialogContents() {
    const { children, dialogTitle, dialogCloseButtonLabel, CloseButtonProps = {} } = this.props

    if (typeof children === 'function') {
      return children({
        closeDialog: this.handleClose,
        dialogTitle: dialogTitle,
        dialogCloseButtonLabel: dialogCloseButtonLabel,
      })
    }

    return (
      <React.Fragment>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>

        <DialogContent>
          {children}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} {...CloseButtonProps}>
            {dialogCloseButtonLabel}
          </Button>
        </DialogActions>
      </React.Fragment>
    )
  }

  handleOpen = () => {
    this.setState({
      isDialogOpen: true,
    })

    this.props.onOpen()
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
    })

    this.props.onClose()
  }
}
