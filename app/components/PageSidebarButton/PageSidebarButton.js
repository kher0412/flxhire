import React from 'react'
import { ResponsiveButton } from 'components'
import PageContext from '../Page/context'

/**
 * On small screens, renders a button to toggle the sidebar (if any).
 */
export default class PageSidebarButton extends React.Component {
  static contextType = PageContext

  render() {
    const { component = ResponsiveButton, children, onClick, ...restProps } = this.props
    const { sidebar, sidebarMode } = this.context || {}

    if (!sidebar || sidebarMode !== 'drawer') {
      return null
    }

    const ButtonComponent = component

    return (
      <ButtonComponent onClick={this.handleClick} {...restProps}>
        {children}
      </ButtonComponent>
    )
  }

  handleClick = (e) => {
    const { onClick } = this.props
    const { sidebarOpen, setSidebarOpenState } = this.context || {}

    setSidebarOpenState(!sidebarOpen)

    if (onClick) {
      onClick(e)
    }
  }
}
