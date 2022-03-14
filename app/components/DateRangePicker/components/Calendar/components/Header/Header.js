import React, { PureComponent } from 'react'
import { withTheme } from '@material-ui/core/styles'
import { fromTheme } from '../../../../services'
import { Cell } from '../Cell'

class Header extends PureComponent {
  render() {
    return (
      <Cell {...this.props}>
        {React.cloneElement(this.props.children, { style: { color: fromTheme(this.props.theme, 'header', '#9e9e9e') } })}
      </Cell>
    )
  }
}

export default withTheme(Header)
