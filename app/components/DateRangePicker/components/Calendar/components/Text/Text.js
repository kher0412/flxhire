import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

class Text extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return (
      <Typography style={{ ...style, ...this.props.style }}>
        {this.props.children}
      </Typography>
    )
  }
}

export default Text
