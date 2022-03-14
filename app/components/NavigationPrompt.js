import React from 'react'
import { isCypress } from 'services/browserAgent'

class NavigationPrompt extends React.PureComponent {
  componentDidMount() {
    // This prevents navigating away with full page loads or closing the browser / browser tab
    if (!isCypress) window.addEventListener('beforeunload', this.handleBeforeUnload)
    // There is a hack that prevents navigating away with html5 pushState using Next.js routing
    // See: https://github.com/zeit/next.js/issues/2476
    // I could not get it to work though
    // TODO: Figure out how to block next.js navigation
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

  render() {
    return null
  }

  handleBeforeUnload = (e) => {
    const {
      message = 'Some changes may not be saved. Continue?',
    } = this.props
    // e.preventDefault()
    // Note: most browsers will not display custom messages
    return (e.returnValue = message)
  }
}

export default NavigationPrompt
