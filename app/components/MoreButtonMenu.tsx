import React from 'react'
import { IconButton, Tooltip, Menu } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { ResponsiveButton } from 'components'
import { Button } from 'components/themed'

interface IMoreButtonMenuState {
  isOpen: boolean
}

class MoreButtonMenu extends React.Component<any, IMoreButtonMenuState> {
  state = {
    isOpen: false,
  }

  anchorEl: any

  renderButton() {
    const { responsive, component, tooltip, disabled, label, icon, color, variant, fullWidth, style, className, iconOnly, ...restProps } = this.props
    const buttonProps = { disabled, color, variant, fullWidth, style, className, iconOnly, 'data-cy': restProps['data-cy'] }
    const iconProp = icon || <MoreHorizIcon />

    if (component) {
      const Component = component
      return (
        <Component
          onClick={this.handleButtonClick}
          responsive={responsive}
          tooltip={tooltip}
          {...buttonProps}
        >
          {icon || <MoreHorizIcon />}{label}
        </Component>
      )
    }

    if (responsive) {
      return (
        <ResponsiveButton
          onClick={this.handleButtonClick}
          label={label}
          icon={iconProp}
          tooltip={tooltip}
          {...buttonProps}
        />
      )
    }

    if (label) {
      return (
        <Button onClick={this.handleButtonClick} {...buttonProps}>
          {label} {icon}
        </Button>
      )
    }

    if (tooltip && !disabled) {
      return (
        <Tooltip title={tooltip}>
          <IconButton onClick={this.handleButtonClick} {...buttonProps}>
            {iconProp}
          </IconButton>
        </Tooltip>
      )
    }

    return (
      <IconButton onClick={this.handleButtonClick} {...buttonProps}>
        {iconProp}
      </IconButton>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderButton()}

        <Menu
          open={this.state.isOpen}
          anchorEl={this.anchorEl}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
          onClose={this.handleMenuClose}
          onClickCapture={this.handleMenuClose}
          disableAutoFocusItem
          keepMounted
        >
          {this.props.children}
        </Menu>
      </React.Fragment>
    )
  }

  handleButtonClick = (e) => {
    this.anchorEl = e.currentTarget

    this.setState({
      isOpen: true,
    })

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  handleMenuClose = () => {
    this.setState({
      isOpen: false,
    })

    this.anchorEl = undefined
  }
}

export default MoreButtonMenu
