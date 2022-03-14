import React, { SyntheticEvent } from 'react'
import { omit } from 'lodash'
import MediaQuery from 'components/MediaQuery'
import { IconButton, Tooltip, Popover, Dialog, DialogContent, DialogActions } from '@material-ui/core'
import { ResponsiveButton } from 'components'
import { Button } from 'components/themed'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import styles from './MoreButtonCard.module.css'

interface IMoreButtonCardProps {
  disabled?: boolean
  popoverStyle?: React.CSSProperties
  responsive?: boolean
  iconOnly?: boolean
  mobileLabel?: string
  mobileDialogCloseLabel?: React.ReactNode
  label?: string
  tooltip?: string
  icon?: any
  component?: any
  buttonChildren?: any
  color?: any
  onOpen?: () => void
  onClose?: () => void
  style?: React.CSSProperties
  className?: string
  size?: 'medium' | 'small'
}

interface IMoreButtonCardState {
  isOpen: boolean
}

class MoreButtonCard extends React.Component<IMoreButtonCardProps, IMoreButtonCardState> {
  state = {
    isOpen: false,
  }

  anchorEl: any

  close() {
    this.handlePopoverClose()
  }

  componentDidUpdate() {
    if (this.props.disabled && this.state.isOpen) {
      this.setState({
        isOpen: false,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderButton()}

        {(this.state.isOpen && !this.props.disabled) && (
          <React.Fragment>
            <MediaQuery maxWidth={500}>
              <Dialog fullScreen open onClose={this.handlePopoverClose}>
                <DialogContent>
                  {this.renderChildren()}
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handlePopoverClose}>
                    {this.props.mobileDialogCloseLabel || 'Close'}
                  </Button>
                </DialogActions>
              </Dialog>
            </MediaQuery>

            <MediaQuery minWidth={501}>
              <Popover
                open
                anchorEl={this.anchorEl}
                onClose={this.handlePopoverClose}
              >
                <div
                  className={styles['popover-content']}
                  style={this.props.popoverStyle}
                >
                  {this.renderChildren()}
                </div>
              </Popover>
            </MediaQuery>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  renderButton() {
    const { responsive, mobileLabel, label, tooltip, disabled, icon = <MoreHorizIcon />, component, buttonChildren, ...otherProps } = this.props

    const restProps = omit(otherProps, ['popoverStyle', 'children'])

    if (component) {
      const Component = component

      return (
        <Component
          onClick={this.handleButtonClick}
          label={label}
          icon={icon}
          tooltip={tooltip}
          disabled={disabled}
          {...restProps}
        >
          {buttonChildren}
        </Component>
      )
    }

    if (responsive) {
      return (
        <ResponsiveButton
          {...restProps}
          onClick={this.handleButtonClick}
          label={label}
          mobileLabel={mobileLabel}
          icon={icon}
          tooltip={tooltip}
          disabled={disabled}
        />
      )
    }

    if (tooltip && !disabled) {
      return (
        <Tooltip title={tooltip}>
          <IconButton
            {...restProps}
            onClick={this.handleButtonClick}
          >
            {icon}
          </IconButton>
        </Tooltip>
      )
    }

    return (
      <IconButton
        {...restProps}
        onClick={this.handleButtonClick}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    )
  }

  renderChildren() {
    if (typeof this.props.children === 'function') {
      return this.props.children({ close: this.handlePopoverClose })
    }

    return this.props.children
  }

  handleButtonClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { onOpen } = this.props

    e.stopPropagation()
    e.preventDefault()

    this.anchorEl = e.currentTarget

    this.setState({
      isOpen: true,
    })

    if (onOpen) onOpen()
  }

  handlePopoverClose = (e?: any) => {
    const { onClose } = this.props

    e?.stopPropagation()

    this.setState({
      isOpen: false,
    })

    this.anchorEl = undefined

    if (onClose) onClose()
  }
}

export default MoreButtonCard
