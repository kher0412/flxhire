import React, { CSSProperties, HTMLAttributes } from 'react'
import MediaQuery from 'components/MediaQuery'
import { Popover, Button } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'

interface ITutorialBubbleProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  buttonLabel?: string
  message: string
  paperStyle?: CSSProperties
  children?: React.ReactNode
}

export default class TutorialBubble extends React.Component<ITutorialBubbleProps, { open: boolean }> {
  container: HTMLDivElement

  state = {
    open: false,
  }

  componentDidMount() {
    // Popover requires the container ref, which is not available initially.
    this.setState({
      open: true,
    })
  }

  render() {
    const { children, message, buttonLabel = 'Got it!', active, paperStyle = {}, ...restProps } = this.props
    const { open } = this.state

    // TODO: a mobile-optimized version of this is needed.
    return (
      <div ref={div => this.container = div} {...restProps}>
        {children}

        <MediaQuery minWidth={800}>
          <Popover
            open={open && active}
            onClose={this.handleClose}
            anchorEl={this.container}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                transform: 'translateY(-4px)',
                borderTopLeftRadius: 9999,
                borderBottomLeftRadius: 9999,
                color: '#fff',
                background: '#3399ff',
                ...paperStyle,
              },
            }}
          >
            <div style={{ padding: 12, fontSize: '14px' }}>
              <KeyboardArrowLeft style={{ marginRight: 12, verticalAlign: 'middle', marginTop: -3 }} />

              {message}

              <Button
                onClick={this.handleClose}
                variant="outlined"
                style={{ marginLeft: 12, color: '#fff', borderColor: '#fff' }}
                data-cy="tutorial-bubble-close"
              >
                {buttonLabel}
              </Button>
            </div>
          </Popover>
        </MediaQuery>
      </div>
    )
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }
}
